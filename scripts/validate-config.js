#!/usr/bin/env node

/**
 * Configuration validation script for Honda Permata
 * Can be run standalone or integrated into build process
 */

const fs = require('fs')
const path = require('path')

// ANSI color codes for terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

/**
 * Loads environment variables from .env.local file
 */
function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local')
  
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8')
    const lines = envContent.split('\n')
    
    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').replace(/^["']|["']$/g, '')
          process.env[key] = value
        }
      }
    }
    
    console.log(`${colors.blue}ℹ${colors.reset} Loaded environment variables from .env.local`)
  } else {
    console.log(`${colors.yellow}⚠${colors.reset} No .env.local file found`)
  }
}

/**
 * Validates environment configuration
 */
function validateConfiguration() {
  const errors = []
  const warnings = []
  const missingRequired = []
  const invalidValues = []

  // Required environment variables
  const requiredVars = {
    'NEXT_PUBLIC_WHATSAPP_NUMBER': {
      description: 'WhatsApp number for contact integration',
      example: '6282297098292',
      validator: (value) => /^[0-9]{10,15}$/.test(value)
    }
  }

  // Optional environment variables
  const optionalVars = {
    'NEXT_PUBLIC_TOAST_DELAY': {
      description: 'Toast notification delay in milliseconds',
      example: '5000',
      default: '5000',
      validator: (value) => {
        const num = parseInt(value, 10)
        return !isNaN(num) && num >= 1000 && num <= 30000
      }
    }
  }

  console.log(`${colors.bold}${colors.cyan}🔍 Honda Permata Configuration Validation${colors.reset}`)
  console.log('=' .repeat(50))

  // Check required variables
  for (const [varName, config] of Object.entries(requiredVars)) {
    const value = process.env[varName]
    
    if (!value) {
      missingRequired.push(varName)
      errors.push(`Missing required variable: ${varName}`)
      console.log(`${colors.red}❌ ${varName}${colors.reset} - Missing (required)`)
      console.log(`   Description: ${config.description}`)
      console.log(`   Example: ${config.example}`)
    } else if (!config.validator(value)) {
      invalidValues.push(varName)
      errors.push(`Invalid value for ${varName}: ${value}`)
      console.log(`${colors.red}❌ ${varName}${colors.reset} - Invalid value: ${value}`)
      console.log(`   Expected format: ${config.example}`)
    } else {
      console.log(`${colors.green}✅ ${varName}${colors.reset} - Valid`)
    }
  }

  // Check optional variables
  for (const [varName, config] of Object.entries(optionalVars)) {
    const value = process.env[varName]
    
    if (!value) {
      console.log(`${colors.yellow}⚪ ${varName}${colors.reset} - Using default: ${config.default}`)
    } else if (!config.validator(value)) {
      invalidValues.push(varName)
      warnings.push(`Invalid value for ${varName}: ${value}, using default`)
      console.log(`${colors.yellow}⚠️ ${varName}${colors.reset} - Invalid value: ${value}, will use default`)
      console.log(`   Expected: ${config.example}`)
    } else {
      console.log(`${colors.green}✅ ${varName}${colors.reset} - Valid: ${value}`)
    }
  }

  console.log('=' .repeat(50))

  // Summary
  const isValid = errors.length === 0
  const hasWarnings = warnings.length > 0
  
  if (isValid && !hasWarnings) {
    console.log(`${colors.bold}${colors.green}✅ Configuration validation passed!${colors.reset}`)
  } else if (isValid && hasWarnings) {
    console.log(`${colors.bold}${colors.yellow}⚠️ Configuration validation passed with warnings!${colors.reset}`)
    console.log(`${colors.yellow}${warnings.length} warning(s):${colors.reset}`)
    warnings.forEach(warning => console.log(`   - ${warning}`))
  } else {
    console.log(`${colors.bold}${colors.red}❌ Configuration validation failed!${colors.reset}`)
    console.log(`${colors.red}${errors.length} error(s) found:${colors.reset}`)
    errors.forEach(error => console.log(`   - ${error}`))
    
    console.log(`\n${colors.bold}${colors.cyan}📝 Setup Instructions:${colors.reset}`)
    console.log('1. Create .env.local file in project root')
    console.log('2. Add the following environment variables:')
    console.log('')
    
    // Show required variables setup
    for (const [varName, config] of Object.entries(requiredVars)) {
      if (missingRequired.includes(varName) || invalidValues.includes(varName)) {
        console.log(`   ${varName}=${config.example}`)
      }
    }
    
    console.log('')
    console.log('3. Restart the development server')
    console.log('')
    
    // Show example .env.local file
    console.log(`${colors.bold}Example .env.local:${colors.reset}`)
    console.log('# Honda Permata Configuration')
    for (const [varName, config] of Object.entries(requiredVars)) {
      console.log(`${varName}=${config.example}`)
    }
    for (const [varName, config] of Object.entries(optionalVars)) {
      console.log(`# ${varName}=${config.example} # Optional: ${config.description}`)
    }
  }

  return {
    isValid,
    hasWarnings: warnings.length > 0,
    errors,
    warnings,
    missingRequired,
    invalidValues
  }
}

/**
 * Main execution
 */
function main() {
  try {
    // Load environment variables
    loadEnvFile()
    
    // Validate configuration
    const result = validateConfiguration()
    
    // Exit with appropriate code
    if (result.isValid && !result.hasWarnings) {
      process.exit(0) // Success
    } else if (result.isValid && result.hasWarnings) {
      process.exit(2) // Success with warnings
    } else {
      process.exit(1) // Error
    }
    
  } catch (error) {
    console.error(`${colors.red}❌ Validation script error:${colors.reset}`, error.message)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

module.exports = {
  validateConfiguration,
  loadEnvFile
}
