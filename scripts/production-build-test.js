#!/usr/bin/env node

/**
 * Production Build Test Script
 * Tests the production build with all optimizations enabled
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 Honda Permata Production Build Test')
console.log('=====================================\n')

// Test configuration
const testConfig = {
  buildTimeout: 300000, // 5 minutes
  expectedFiles: [
    '.next/static',
    '.next/server',
    'package.json',
    'next.config.mjs'
  ],
  environmentVariables: [
    'NEXT_PUBLIC_WHATSAPP_NUMBER',
    'NEXT_PUBLIC_TOAST_DELAY'
  ]
}

// Test results
const testResults = {
  environmentCheck: false,
  buildSuccess: false,
  bundleAnalysis: false,
  criticalFiles: false,
  optimizations: false,
  errors: []
}

/**
 * Run a command and capture output
 */
function runCommand(command, options = {}) {
  try {
    const output = execSync(command, {
      encoding: 'utf8',
      stdio: 'pipe',
      timeout: testConfig.buildTimeout,
      ...options
    })
    return { success: true, output }
  } catch (error) {
    return { 
      success: false, 
      output: error.stdout || '', 
      error: error.stderr || error.message 
    }
  }
}

/**
 * Check environment variables
 */
function checkEnvironment() {
  console.log('1. Checking Environment Variables...')
  
  // Check for .env.local file
  const envPath = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) {
    testResults.errors.push('❌ .env.local file not found')
    console.log('   ❌ .env.local file not found')
    return false
  }
  
  // Read environment variables
  const envContent = fs.readFileSync(envPath, 'utf8')
  const missingVars = []
  
  testConfig.environmentVariables.forEach(varName => {
    if (!envContent.includes(varName)) {
      missingVars.push(varName)
    }
  })
  
  if (missingVars.length > 0) {
    testResults.errors.push(`❌ Missing environment variables: ${missingVars.join(', ')}`)
    console.log(`   ❌ Missing environment variables: ${missingVars.join(', ')}`)
    return false
  }
  
  console.log('   ✅ All required environment variables found')
  return true
}

/**
 * Test production build
 */
function testBuild() {
  console.log('\n2. Testing Production Build...')
  
  // Clean previous build
  console.log('   🧹 Cleaning previous build...')
  const cleanResult = runCommand('npm run build -- --clean')
  
  // Run production build
  console.log('   🔨 Running production build...')
  const buildResult = runCommand('npm run build')
  
  if (!buildResult.success) {
    testResults.errors.push(`❌ Build failed: ${buildResult.error}`)
    console.log(`   ❌ Build failed: ${buildResult.error}`)
    return false
  }
  
  // Check for build warnings
  if (buildResult.output.includes('Warning:') || buildResult.output.includes('warning')) {
    console.log('   ⚠️ Build completed with warnings:')
    const warnings = buildResult.output.split('\n').filter(line => 
      line.includes('Warning:') || line.includes('warning')
    )
    warnings.forEach(warning => console.log(`      ${warning}`))
  }
  
  console.log('   ✅ Production build completed successfully')
  return true
}

/**
 * Analyze bundle and check optimizations
 */
function analyzeBuild() {
  console.log('\n3. Analyzing Build Output...')
  
  // Check critical files exist
  const missingFiles = []
  testConfig.expectedFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file)
    if (!fs.existsSync(filePath)) {
      missingFiles.push(file)
    }
  })
  
  if (missingFiles.length > 0) {
    testResults.errors.push(`❌ Missing build files: ${missingFiles.join(', ')}`)
    console.log(`   ❌ Missing build files: ${missingFiles.join(', ')}`)
    return false
  }
  
  console.log('   ✅ All critical build files present')
  
  // Check bundle size
  const buildManifest = path.join(process.cwd(), '.next/build-manifest.json')
  if (fs.existsSync(buildManifest)) {
    const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'))
    console.log('   📊 Bundle analysis:')
    
    // Count pages
    const pageCount = Object.keys(manifest.pages || {}).length
    console.log(`      - Pages: ${pageCount}`)
    
    // Check for optimization indicators
    const staticDir = path.join(process.cwd(), '.next/static')
    if (fs.existsSync(staticDir)) {
      const staticFiles = fs.readdirSync(staticDir, { recursive: true })
      const jsFiles = staticFiles.filter(file => file.toString().endsWith('.js'))
      const cssFiles = staticFiles.filter(file => file.toString().endsWith('.css'))
      
      console.log(`      - JavaScript files: ${jsFiles.length}`)
      console.log(`      - CSS files: ${cssFiles.length}`)
      
      // Check for minification (files should have hash in name)
      const hashedFiles = jsFiles.filter(file => /\.[a-f0-9]{8,}\./i.test(file.toString()))
      if (hashedFiles.length > 0) {
        console.log('   ✅ Files are properly hashed for caching')
      } else {
        console.log('   ⚠️ Files may not be properly hashed')
      }
    }
  }
  
  return true
}

/**
 * Check specific optimizations
 */
function checkOptimizations() {
  console.log('\n4. Checking Optimizations...')
  
  // Check Next.js config
  const configPath = path.join(process.cwd(), 'next.config.mjs')
  if (fs.existsSync(configPath)) {
    const configContent = fs.readFileSync(configPath, 'utf8')
    
    // Check image optimization
    if (configContent.includes('unoptimized: false') || !configContent.includes('unoptimized: true')) {
      console.log('   ✅ Image optimization enabled')
    } else {
      console.log('   ⚠️ Image optimization may be disabled')
    }
    
    // Check for modern image formats
    if (configContent.includes('webp') || configContent.includes('avif')) {
      console.log('   ✅ Modern image formats configured')
    } else {
      console.log('   ⚠️ Modern image formats not configured')
    }
  }
  
  // Check package.json for duplicate dependencies
  const packagePath = path.join(process.cwd(), 'package.json')
  if (fs.existsSync(packagePath)) {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies }
    
    // Check for motion library duplication
    const hasMotion = 'motion' in deps
    const hasFramerMotion = 'framer-motion' in deps
    
    if (hasMotion && hasFramerMotion) {
      console.log('   ⚠️ Both motion and framer-motion detected - potential duplication')
    } else if (hasFramerMotion) {
      console.log('   ✅ Using framer-motion (no duplication)')
    } else if (hasMotion) {
      console.log('   ✅ Using motion library')
    }
  }
  
  return true
}

/**
 * Test critical functionality
 */
function testCriticalFunctions() {
  console.log('\n5. Testing Critical Functions...')
  
  // Check if critical files exist and are valid
  const criticalFiles = [
    'hooks/use-toast.ts',
    'lib/whatsapp-integration.ts',
    'lib/contact-config.ts',
    'hooks/use-form-handler.ts'
  ]
  
  const missingCritical = []
  criticalFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file)
    if (!fs.existsSync(filePath)) {
      missingCritical.push(file)
    } else {
      // Basic syntax check
      const content = fs.readFileSync(filePath, 'utf8')
      if (content.includes('TOAST_REMOVE_DELAY = 1000000')) {
        testResults.errors.push(`❌ ${file} still contains the catastrophic toast delay bug`)
        console.log(`   ❌ ${file} still contains the catastrophic toast delay bug`)
      }
    }
  })
  
  if (missingCritical.length > 0) {
    testResults.errors.push(`❌ Missing critical files: ${missingCritical.join(', ')}`)
    console.log(`   ❌ Missing critical files: ${missingCritical.join(', ')}`)
    return false
  }
  
  console.log('   ✅ All critical files present and appear valid')
  return true
}

/**
 * Generate test report
 */
function generateReport() {
  console.log('\n📋 Production Build Test Report')
  console.log('================================')
  
  const totalTests = 5
  const passedTests = [
    testResults.environmentCheck,
    testResults.buildSuccess,
    testResults.bundleAnalysis,
    testResults.optimizations,
    testResults.criticalFiles
  ].filter(Boolean).length
  
  console.log(`\nTest Results: ${passedTests}/${totalTests} passed`)
  
  if (testResults.errors.length > 0) {
    console.log('\n❌ Issues Found:')
    testResults.errors.forEach(error => console.log(`   ${error}`))
  }
  
  if (passedTests === totalTests && testResults.errors.length === 0) {
    console.log('\n🎉 All tests passed! Production build is ready for deployment.')
    console.log('\nNext steps:')
    console.log('1. Deploy to staging environment')
    console.log('2. Run user acceptance tests')
    console.log('3. Deploy to production')
    return true
  } else {
    console.log('\n⚠️ Some tests failed. Please fix the issues before deploying.')
    console.log('\nRecommended actions:')
    if (!testResults.environmentCheck) {
      console.log('- Set up required environment variables in .env.local')
    }
    if (!testResults.buildSuccess) {
      console.log('- Fix build errors and warnings')
    }
    if (!testResults.criticalFiles) {
      console.log('- Ensure all critical fixes are properly implemented')
    }
    return false
  }
}

/**
 * Main test execution
 */
async function runTests() {
  try {
    testResults.environmentCheck = checkEnvironment()
    testResults.buildSuccess = testBuild()
    testResults.bundleAnalysis = analyzeBuild()
    testResults.optimizations = checkOptimizations()
    testResults.criticalFiles = testCriticalFunctions()
    
    const success = generateReport()
    process.exit(success ? 0 : 1)
    
  } catch (error) {
    console.error('\n💥 Test execution failed:', error.message)
    process.exit(1)
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests()
}

module.exports = {
  runTests,
  testConfig,
  checkEnvironment,
  testBuild,
  analyzeBuild,
  checkOptimizations,
  testCriticalFunctions
}
