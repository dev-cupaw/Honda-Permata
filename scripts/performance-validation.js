#!/usr/bin/env node

/**
 * Performance Validation and Testing Script
 * Honda Permata Critical Fixes - Task 17
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting Performance Validation and Testing...\n');

// Performance validation results
const results = {
  bundleSize: {},
  imageOptimization: {},
  memoryUsage: {},
  lighthouse: {}
};

// Helper function to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 1. Bundle Size Validation
async function validateBundleSize() {
  console.log('📦 Validating bundle size...');
  
  try {
    const buildDir = path.join(process.cwd(), '.next');
    
    if (!fs.existsSync(buildDir)) {
      console.log('   ⚠️  Build directory not found - run npm run build first');
      results.bundleSize = { error: 'Build directory not found' };
      return;
    }
    
    const staticDir = path.join(buildDir, 'static');
    if (!fs.existsSync(staticDir)) {
      console.log('   ⚠️  Static directory not found - build may be incomplete');
      results.bundleSize = { error: 'Static directory not found' };
      return;
    }
    
    let totalSize = 0;
    let jsSize = 0;
    let cssSize = 0;
    const chunks = [];
    
    function analyzeDirectory(dir) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          analyzeDirectory(filePath);
        } else {
          const size = stat.size;
          totalSize += size;
          
          if (file.endsWith('.js')) {
            jsSize += size;
            chunks.push({ name: file, size, type: 'js' });
          } else if (file.endsWith('.css')) {
            cssSize += size;
            chunks.push({ name: file, size, type: 'css' });
          }
        }
      });
    }
    
    analyzeDirectory(staticDir);
    
    results.bundleSize = {
      totalSize,
      jsSize,
      cssSize,
      chunks: chunks.sort((a, b) => b.size - a.size).slice(0, 10)
    };
    
    console.log(`   📊 Total bundle size: ${formatBytes(totalSize)}`);
    console.log(`   📊 JavaScript: ${formatBytes(jsSize)}`);
    console.log(`   📊 CSS: ${formatBytes(cssSize)}`);
    
    if (totalSize < 5 * 1024 * 1024) {
      console.log('   ✅ Bundle size is reasonable (< 5MB)');
    } else {
      console.log('   ⚠️  Bundle size is large (> 5MB)');
    }
    
  } catch (error) {
    console.log('   ❌ Bundle size validation failed:', error.message);
    results.bundleSize = { error: error.message };
  }
}

// 2. Image Optimization Validation
async function validateImageOptimization() {
  console.log('\n🖼️  Validating image optimization...');
  
  try {
    const nextConfigPath = path.join(process.cwd(), 'next.config.mjs');
    
    if (!fs.existsSync(nextConfigPath)) {
      throw new Error('next.config.mjs not found');
    }
    
    const configContent = fs.readFileSync(nextConfigPath, 'utf8');
    
    const isOptimizationEnabled = !configContent.includes('unoptimized: true');
    const hasModernFormats = configContent.includes('webp') || configContent.includes('avif');
    const hasDeviceSizes = configContent.includes('deviceSizes');
    const hasImageSizes = configContent.includes('imageSizes');
    
    results.imageOptimization = {
      optimizationEnabled: isOptimizationEnabled,
      modernFormatsSupported: hasModernFormats,
      hasDeviceSizes,
      hasImageSizes
    };
    
    console.log(`   📊 Image optimization: ${isOptimizationEnabled ? 'Enabled' : 'Disabled'}`);
    console.log(`   📊 Modern formats: ${hasModernFormats ? 'Supported' : 'Not configured'}`);
    console.log(`   📊 Device sizes configured: ${hasDeviceSizes ? 'Yes' : 'No'}`);
    console.log(`   📊 Image sizes configured: ${hasImageSizes ? 'Yes' : 'No'}`);
    
    if (isOptimizationEnabled && hasModernFormats) {
      console.log('   ✅ Image optimization configured correctly!');
    } else {
      console.log('   ⚠️  Image optimization could be improved');
    }
    
  } catch (error) {
    console.log('   ❌ Image optimization validation failed:', error.message);
    results.imageOptimization = { error: error.message };
  }
}

// 3. Memory Usage Validation
async function validateMemoryUsage() {
  console.log('\n🧠 Validating memory usage optimization...');
  
  try {
    const checks = {
      'useClickOutside hook implemented': false,
      'Event listeners properly cleaned up': false,
      'Refs used to prevent re-registration': false,
      'Toast delay within safe limits': false,
      'No duplicate motion libraries': false
    };
    
    // Check for useClickOutside hook
    const hooksDir = path.join(process.cwd(), 'hooks');
    if (fs.existsSync(path.join(hooksDir, 'use-click-outside.ts'))) {
      checks['useClickOutside hook implemented'] = true;
    }
    
    // Check toast delay configuration
    const useToastPath = path.join(hooksDir, 'use-toast.ts');
    if (fs.existsSync(useToastPath)) {
      const toastContent = fs.readFileSync(useToastPath, 'utf8');
      const hasReasonableDelay = !toastContent.includes('1000000') && 
                               (toastContent.includes('5000') || toastContent.includes('TOAST_DELAY'));
      checks['Toast delay within safe limits'] = hasReasonableDelay;
    }
    
    // Check for duplicate motion libraries
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
      
      const hasFramerMotion = 'framer-motion' in deps;
      const hasMotion = 'motion' in deps;
      
      checks['No duplicate motion libraries'] = hasFramerMotion && !hasMotion;
    }
    
    // Check for proper event listener cleanup
    const desktopHeaderPath = path.join(process.cwd(), 'app/components/global/desktop-header.tsx');
    if (fs.existsSync(desktopHeaderPath)) {
      const headerContent = fs.readFileSync(desktopHeaderPath, 'utf8');
      checks['Event listeners properly cleaned up'] = headerContent.includes('removeEventListener');
      checks['Refs used to prevent re-registration'] = headerContent.includes('useRef') && 
                                                      headerContent.includes('callbackRef');
    }
    
    results.memoryUsage = { optimizations: checks };
    
    console.log('   📊 Memory optimization checks:');
    let passedCount = 0;
    Object.entries(checks).forEach(([check, passed]) => {
      console.log(`   ${passed ? '✅' : '❌'} ${check}`);
      if (passed) passedCount++;
    });
    
    const score = (passedCount / Object.keys(checks).length) * 100;
    console.log(`   📊 Memory optimization score: ${passedCount}/${Object.keys(checks).length} (${score.toFixed(1)}%)`);
    
    if (score >= 80) {
      console.log('   ✅ Memory optimizations well implemented!');
    } else if (score >= 60) {
      console.log('   ⚠️  Some memory optimizations missing');
    } else {
      console.log('   ❌ Memory optimizations need attention');
    }
    
  } catch (error) {
    console.log('   ❌ Memory usage validation failed:', error.message);
    results.memoryUsage = { error: error.message };
  }
}

// 4. Core Web Vitals Simulation
async function validateCoreWebVitals() {
  console.log('\n🎯 Validating Core Web Vitals improvements...');
  
  try {
    const checks = {
      'Bundle size reasonable': results.bundleSize?.totalSize < 5 * 1024 * 1024,
      'Image optimization enabled': results.imageOptimization?.optimizationEnabled,
      'Memory optimizations present': Object.values(results.memoryUsage?.optimizations || {}).filter(Boolean).length >= 3,
      'Modern image formats supported': results.imageOptimization?.modernFormatsSupported
    };
    
    console.log('   📊 Core Web Vitals indicators:');
    let passedCount = 0;
    Object.entries(checks).forEach(([check, passed]) => {
      console.log(`   ${passed ? '✅' : '❌'} ${check}`);
      if (passed) passedCount++;
    });
    
    const score = (passedCount / Object.keys(checks).length) * 100;
    console.log(`   📊 Core Web Vitals score: ${passedCount}/${Object.keys(checks).length} (${score.toFixed(1)}%)`);
    
    results.lighthouse = {
      performanceScore: score,
      checks,
      note: 'Simulated score based on optimization checks'
    };
    
    if (score >= 90) {
      console.log('   ✅ Excellent Core Web Vitals indicators!');
    } else if (score >= 70) {
      console.log('   ⚠️  Good Core Web Vitals indicators');
    } else {
      console.log('   ❌ Core Web Vitals need improvement');
    }
    
  } catch (error) {
    console.log('   ❌ Core Web Vitals validation failed:', error.message);
    results.lighthouse = { error: error.message };
  }
}

// 5. Generate Report
function generateReport() {
  console.log('\n📋 Performance Validation Report');
  console.log('================================\n');
  
  // Bundle Size Report
  if (results.bundleSize && !results.bundleSize.error) {
    console.log('📦 Bundle Size Analysis:');
    console.log(`   Total Size: ${formatBytes(results.bundleSize.totalSize)}`);
    console.log(`   JavaScript: ${formatBytes(results.bundleSize.jsSize)}`);
    console.log(`   CSS: ${formatBytes(results.bundleSize.cssSize)}`);
    
    if (results.bundleSize.chunks.length > 0) {
      console.log('   Largest Chunks:');
      results.bundleSize.chunks.slice(0, 5).forEach(chunk => {
        console.log(`     ${chunk.name}: ${formatBytes(chunk.size)}`);
      });
    }
    console.log('');
  }
  
  // Image Optimization Report
  if (results.imageOptimization && !results.imageOptimization.error) {
    console.log('🖼️  Image Optimization:');
    console.log(`   Optimization Enabled: ${results.imageOptimization.optimizationEnabled ? 'Yes' : 'No'}`);
    console.log(`   Modern Formats: ${results.imageOptimization.modernFormatsSupported ? 'Yes' : 'No'}`);
    console.log('');
  }
  
  // Memory Usage Report
  if (results.memoryUsage && !results.memoryUsage.error) {
    console.log('🧠 Memory Optimization:');
    const passedChecks = Object.values(results.memoryUsage.optimizations).filter(Boolean).length;
    const totalChecks = Object.keys(results.memoryUsage.optimizations).length;
    console.log(`   Optimization Score: ${passedChecks}/${totalChecks} checks passed`);
    console.log('');
  }
  
  // Performance Report
  if (results.lighthouse && !results.lighthouse.error) {
    console.log('🔍 Performance Analysis:');
    console.log(`   Performance Score: ${results.lighthouse.performanceScore.toFixed(1)}/100`);
    if (results.lighthouse.note) {
      console.log(`   Note: ${results.lighthouse.note}`);
    }
    console.log('');
  }
  
  // Overall Assessment
  console.log('🎯 Overall Assessment:');
  
  const assessments = [];
  
  if (results.bundleSize?.totalSize < 5 * 1024 * 1024) {
    assessments.push('✅ Bundle size is reasonable');
  } else {
    assessments.push('⚠️  Bundle size could be optimized');
  }
  
  if (results.imageOptimization?.optimizationEnabled) {
    assessments.push('✅ Image optimization enabled');
  } else {
    assessments.push('❌ Image optimization disabled');
  }
  
  if (results.memoryUsage?.optimizations) {
    const passedChecks = Object.values(results.memoryUsage.optimizations).filter(Boolean).length;
    const totalChecks = Object.keys(results.memoryUsage.optimizations).length;
    const score = (passedChecks / totalChecks) * 100;
    
    if (score >= 80) {
      assessments.push('✅ Memory optimizations implemented');
    } else if (score >= 60) {
      assessments.push('⚠️  Some memory optimizations missing');
    } else {
      assessments.push('❌ Memory optimizations need attention');
    }
  }
  
  if (results.lighthouse?.performanceScore >= 90) {
    assessments.push('✅ Excellent performance indicators');
  } else if (results.lighthouse?.performanceScore >= 70) {
    assessments.push('⚠️  Good performance indicators');
  } else {
    assessments.push('❌ Performance indicators need improvement');
  }
  
  assessments.forEach(assessment => {
    console.log(`   ${assessment}`);
  });
  
  console.log('');
}

// 6. Save baseline for future comparisons
function saveBaseline() {
  try {
    const baselineData = {
      timestamp: new Date().toISOString(),
      results: results
    };
    
    const baselineFile = path.join(__dirname, '../performance-baseline.json');
    fs.writeFileSync(baselineFile, JSON.stringify(baselineData, null, 2));
    console.log('💾 Saved performance baseline for future comparisons');
  } catch (error) {
    console.warn('⚠️  Could not save baseline:', error.message);
  }
}

// Main execution
async function main() {
  try {
    await validateBundleSize();
    await validateImageOptimization();
    await validateMemoryUsage();
    await validateCoreWebVitals();
    
    generateReport();
    saveBaseline();
    
    console.log('✅ Performance validation completed successfully!');
    
    // Check if we need to recommend running a build
    if (results.bundleSize?.error?.includes('Build directory not found')) {
      console.log('\n📝 Recommendation: Run `npm run build` to generate bundle for analysis');
    }
    
  } catch (error) {
    console.error('❌ Performance validation failed:', error.message);
    process.exit(1);
  }
}

// Run the validation
main().catch(console.error);