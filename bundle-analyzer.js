#!/usr/bin/env node

/**
 * Bundle Analysis Script for Honda Project
 * Measures and compares bundle sizes before and after cleanup
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class BundleAnalyzer {
  constructor() {
    this.buildDir = '.next';
    this.reportFile = 'bundle-analysis-report.json';
  }

  async analyzeBuild() {
    console.log('Analyzing Next.js build...');
    
    try {
      // Run build first
      console.log('Running production build...');
      const buildOutput = execSync('npm run build', { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      // Parse build output for bundle information
      const bundleInfo = this.parseBuildOutput(buildOutput);
      
      // Get detailed file sizes
      const detailedSizes = this.getDetailedSizes();
      
      const analysis = {
        timestamp: new Date().toISOString(),
        buildOutput: buildOutput,
        bundleInfo: bundleInfo,
        detailedSizes: detailedSizes,
        summary: this.generateSummary(bundleInfo, detailedSizes)
      };
      
      // Save analysis
      fs.writeFileSync(this.reportFile, JSON.stringify(analysis, null, 2));
      
      console.log('Bundle analysis complete!');
      console.log(`Report saved to: ${this.reportFile}`);
      
      return analysis;
      
    } catch (error) {
      console.error('Bundle analysis failed:', error.message);
      throw error;
    }
  }

  parseBuildOutput(buildOutput) {
    const lines = buildOutput.split('\n');
    const routes = [];
    let inRouteSection = false;
    
    for (const line of lines) {
      if (line.includes('Route (app)')) {
        inRouteSection = true;
        continue;
      }
      
      if (inRouteSection && line.trim() === '') {
        break;
      }
      
      if (inRouteSection && line.includes('○')) {
        const match = line.match(/○\s+(.+?)\s+(\d+(?:\.\d+)?\s*\w+)\s+(\d+(?:\.\d+)?\s*\w+)/);
        if (match) {
          routes.push({
            route: match[1].trim(),
            size: match[2].trim(),
            firstLoadJS: match[3].trim()
          });
        }
      }
    }
    
    // Extract shared bundle info
    const sharedMatch = buildOutput.match(/First Load JS shared by all\s+(\d+(?:\.\d+)?\s*\w+)/);
    const sharedSize = sharedMatch ? sharedMatch[1] : 'Unknown';
    
    return {
      routes,
      sharedSize,
      totalRoutes: routes.length
    };
  }

  getDetailedSizes() {
    const buildPath = path.join(process.cwd(), this.buildDir);
    
    if (!fs.existsSync(buildPath)) {
      return { error: 'Build directory not found' };
    }
    
    try {
      const staticPath = path.join(buildPath, 'static');
      const sizes = {};
      
      if (fs.existsSync(staticPath)) {
        // Get chunks directory size
        const chunksPath = path.join(staticPath, 'chunks');
        if (fs.existsSync(chunksPath)) {
          sizes.chunks = this.getDirectorySize(chunksPath);
        }
        
        // Get CSS directory size
        const cssPath = path.join(staticPath, 'css');
        if (fs.existsSync(cssPath)) {
          sizes.css = this.getDirectorySize(cssPath);
        }
        
        // Get media directory size
        const mediaPath = path.join(staticPath, 'media');
        if (fs.existsSync(mediaPath)) {
          sizes.media = this.getDirectorySize(mediaPath);
        }
      }
      
      // Get total build directory size
      sizes.total = this.getDirectorySize(buildPath);
      
      return sizes;
      
    } catch (error) {
      return { error: error.message };
    }
  }

  getDirectorySize(dirPath) {
    let totalSize = 0;
    
    try {
      const files = fs.readdirSync(dirPath, { withFileTypes: true });
      
      for (const file of files) {
        const filePath = path.join(dirPath, file.name);
        
        if (file.isDirectory()) {
          totalSize += this.getDirectorySize(filePath);
        } else {
          const stats = fs.statSync(filePath);
          totalSize += stats.size;
        }
      }
    } catch (error) {
      // Directory might not exist or be accessible
      return 0;
    }
    
    return totalSize;
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  generateSummary(bundleInfo, detailedSizes) {
    const summary = {
      totalRoutes: bundleInfo.totalRoutes,
      sharedBundleSize: bundleInfo.sharedSize,
      buildDirectorySize: this.formatBytes(detailedSizes.total || 0),
      chunksSize: this.formatBytes(detailedSizes.chunks || 0),
      cssSize: this.formatBytes(detailedSizes.css || 0),
      mediaSize: this.formatBytes(detailedSizes.media || 0)
    };
    
    // Find largest and smallest routes
    if (bundleInfo.routes.length > 0) {
      const routeSizes = bundleInfo.routes.map(r => ({
        route: r.route,
        sizeBytes: this.parseSize(r.size)
      }));
      
      routeSizes.sort((a, b) => b.sizeBytes - a.sizeBytes);
      
      summary.largestRoute = routeSizes[0];
      summary.smallestRoute = routeSizes[routeSizes.length - 1];
    }
    
    return summary;
  }

  parseSize(sizeString) {
    const match = sizeString.match(/(\d+(?:\.\d+)?)\s*(\w+)/);
    if (!match) return 0;
    
    const value = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    
    const multipliers = {
      'b': 1,
      'kb': 1024,
      'mb': 1024 * 1024,
      'gb': 1024 * 1024 * 1024
    };
    
    return value * (multipliers[unit] || 1);
  }

  async compare(beforeFile, afterFile) {
    if (!fs.existsSync(beforeFile) || !fs.existsSync(afterFile)) {
      throw new Error('Comparison files not found');
    }
    
    const before = JSON.parse(fs.readFileSync(beforeFile, 'utf8'));
    const after = JSON.parse(fs.readFileSync(afterFile, 'utf8'));
    
    const comparison = {
      timestamp: new Date().toISOString(),
      before: before.summary,
      after: after.summary,
      improvements: this.calculateImprovements(before.summary, after.summary)
    };
    
    fs.writeFileSync('bundle-comparison.json', JSON.stringify(comparison, null, 2));
    
    console.log('\n=== BUNDLE SIZE COMPARISON ===');
    console.log(`Routes: ${before.summary.totalRoutes} → ${after.summary.totalRoutes}`);
    console.log(`Build Directory: ${before.summary.buildDirectorySize} → ${after.summary.buildDirectorySize}`);
    console.log(`Chunks: ${before.summary.chunksSize} → ${after.summary.chunksSize}`);
    
    return comparison;
  }

  calculateImprovements(before, after) {
    // This would calculate percentage improvements
    // Implementation depends on specific metrics to compare
    return {
      note: 'Improvement calculations would be implemented based on specific metrics'
    };
  }

  printSummary(analysis) {
    console.log('\n=== BUNDLE ANALYSIS SUMMARY ===');
    console.log(`Total Routes: ${analysis.summary.totalRoutes}`);
    console.log(`Shared Bundle Size: ${analysis.summary.sharedBundleSize}`);
    console.log(`Build Directory Size: ${analysis.summary.buildDirectorySize}`);
    console.log(`Chunks Size: ${analysis.summary.chunksSize}`);
    console.log(`CSS Size: ${analysis.summary.cssSize}`);
    console.log(`Media Size: ${analysis.summary.mediaSize}`);
    
    if (analysis.summary.largestRoute) {
      console.log(`Largest Route: ${analysis.summary.largestRoute.route}`);
    }
    
    if (analysis.summary.smallestRoute) {
      console.log(`Smallest Route: ${analysis.summary.smallestRoute.route}`);
    }
  }
}

// CLI usage
if (require.main === module) {
  const analyzer = new BundleAnalyzer();
  
  const command = process.argv[2];
  
  if (command === 'analyze') {
    analyzer.analyzeBuild()
      .then(analysis => {
        analyzer.printSummary(analysis);
      })
      .catch(error => {
        console.error('Analysis failed:', error.message);
        process.exit(1);
      });
  } else if (command === 'compare') {
    const beforeFile = process.argv[3];
    const afterFile = process.argv[4];
    
    if (!beforeFile || !afterFile) {
      console.error('Usage: node bundle-analyzer.js compare <before-file> <after-file>');
      process.exit(1);
    }
    
    analyzer.compare(beforeFile, afterFile)
      .catch(error => {
        console.error('Comparison failed:', error.message);
        process.exit(1);
      });
  } else {
    console.log('Usage:');
    console.log('  node bundle-analyzer.js analyze');
    console.log('  node bundle-analyzer.js compare <before-file> <after-file>');
  }
}

module.exports = BundleAnalyzer;