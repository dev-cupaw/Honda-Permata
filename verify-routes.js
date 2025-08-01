#!/usr/bin/env node

/**
 * Honda Project Route Verification Script
 * Tests all routes to ensure they load without errors
 */

const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

// All routes to test based on baseline metrics
const routes = [
  '/',
  '/brochure',
  '/car/all-new-honda-accord',
  '/car/all-new-honda-cr-v',
  '/car/honda-br-v-n7x',
  '/car/honda-city-hatchback-rs',
  '/car/honda-civic-rs',
  '/car/honda-civic-type-r',
  '/car/honda-e-n1',
  '/car/honda-hr-v',
  '/car/honda-step-wgn',
  '/car/honda-wr-v',
  '/car/new-honda-brio',
  '/car/new-honda-city',
  '/kontak',
  '/promo',
  '/tentang',
  '/testimoni'
];

const BASE_URL = 'http://localhost:3000';
const TIMEOUT = 10000; // 10 seconds timeout

class RouteVerifier {
  constructor() {
    this.results = [];
    this.serverProcess = null;
  }

  async startServer() {
    console.log('Starting Next.js development server...');
    
    return new Promise((resolve, reject) => {
      this.serverProcess = spawn('npm', ['run', 'dev'], {
        stdio: ['pipe', 'pipe', 'pipe'],
        shell: true
      });

      let serverReady = false;
      
      this.serverProcess.stdout.on('data', (data) => {
        const output = data.toString();
        console.log('Server:', output.trim());
        
        if (output.includes('Ready') || output.includes('localhost:3000')) {
          if (!serverReady) {
            serverReady = true;
            setTimeout(resolve, 2000); // Wait 2 seconds after ready
          }
        }
      });

      this.serverProcess.stderr.on('data', (data) => {
        console.error('Server Error:', data.toString());
      });

      this.serverProcess.on('error', (error) => {
        reject(error);
      });

      // Timeout if server doesn't start
      setTimeout(() => {
        if (!serverReady) {
          reject(new Error('Server failed to start within timeout'));
        }
      }, 30000);
    });
  }

  async testRoute(route) {
    return new Promise((resolve) => {
      const url = `${BASE_URL}${route}`;
      const startTime = Date.now();
      
      const req = http.get(url, (res) => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          const result = {
            route,
            status: res.statusCode,
            responseTime,
            success: res.statusCode === 200,
            contentLength: data.length,
            hasError: data.includes('Error') || data.includes('error'),
            timestamp: new Date().toISOString()
          };
          
          resolve(result);
        });
      });
      
      req.on('error', (error) => {
        resolve({
          route,
          status: 0,
          responseTime: Date.now() - startTime,
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      });
      
      req.setTimeout(TIMEOUT, () => {
        req.destroy();
        resolve({
          route,
          status: 0,
          responseTime: TIMEOUT,
          success: false,
          error: 'Timeout',
          timestamp: new Date().toISOString()
        });
      });
    });
  }

  async verifyAllRoutes() {
    console.log(`\nTesting ${routes.length} routes...\n`);
    
    for (const route of routes) {
      console.log(`Testing ${route}...`);
      const result = await this.testRoute(route);
      this.results.push(result);
      
      if (result.success) {
        console.log(`✓ ${route} - ${result.status} (${result.responseTime}ms)`);
      } else {
        console.log(`✗ ${route} - ${result.status || 'ERROR'} (${result.error || 'Unknown error'})`);
      }
    }
  }

  generateReport() {
    const successful = this.results.filter(r => r.success).length;
    const failed = this.results.length - successful;
    const avgResponseTime = this.results
      .filter(r => r.success)
      .reduce((sum, r) => sum + r.responseTime, 0) / successful;

    const report = {
      summary: {
        total: this.results.length,
        successful,
        failed,
        successRate: `${((successful / this.results.length) * 100).toFixed(1)}%`,
        averageResponseTime: `${avgResponseTime.toFixed(0)}ms`
      },
      results: this.results,
      timestamp: new Date().toISOString()
    };

    // Save detailed report
    fs.writeFileSync('route-verification-report.json', JSON.stringify(report, null, 2));
    
    // Print summary
    console.log('\n=== ROUTE VERIFICATION SUMMARY ===');
    console.log(`Total Routes: ${report.summary.total}`);
    console.log(`Successful: ${report.summary.successful}`);
    console.log(`Failed: ${report.summary.failed}`);
    console.log(`Success Rate: ${report.summary.successRate}`);
    console.log(`Average Response Time: ${report.summary.averageResponseTime}`);
    
    if (failed > 0) {
      console.log('\nFailed Routes:');
      this.results.filter(r => !r.success).forEach(r => {
        console.log(`- ${r.route}: ${r.error || 'HTTP ' + r.status}`);
      });
    }
    
    console.log(`\nDetailed report saved to: route-verification-report.json`);
    
    return report;
  }

  async cleanup() {
    if (this.serverProcess) {
      console.log('\nStopping development server...');
      this.serverProcess.kill('SIGTERM');
      
      // Wait for graceful shutdown
      await new Promise(resolve => {
        this.serverProcess.on('exit', resolve);
        setTimeout(() => {
          this.serverProcess.kill('SIGKILL');
          resolve();
        }, 5000);
      });
    }
  }

  async run() {
    try {
      await this.startServer();
      await this.verifyAllRoutes();
      const report = this.generateReport();
      
      return report.summary.failed === 0;
    } catch (error) {
      console.error('Verification failed:', error.message);
      return false;
    } finally {
      await this.cleanup();
    }
  }
}

// Run if called directly
if (require.main === module) {
  const verifier = new RouteVerifier();
  
  verifier.run().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = RouteVerifier;