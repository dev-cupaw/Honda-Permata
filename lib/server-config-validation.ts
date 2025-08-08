/**
 * Server-side configuration validation
 * Used during build time and server startup
 */

interface ServerValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  missingRequired: string[]
  invalidValues: string[]
}

/**
 * Validates server-side configuration
 * @returns ServerValidationResult with detailed validation information
 */
export function validateServerConfig(): ServerValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const missingRequired: string[] = []
  const invalidValues: string[] = []

  // Required environment variables
  const requiredVars = ['NEXT_PUBLIC_WHATSAPP_NUMBER']
  
  // Optional environment variables with validation
  const optionalVars = ['NEXT_PUBLIC_TOAST_DELAY']

  // Check required variables
  for (const varName of requiredVars) {
    const value = process.env[varName]
    if (!value) {
      missingRequired.push(varName)
      errors.push(`Missing required environment variable: ${varName}`)
    } else {
      // Validate WhatsApp number format
      if (varName === 'NEXT_PUBLIC_WHATSAPP_NUMBER') {
        if (!/^[0-9]{10,15}$/.test(value)) {
          invalidValues.push(varName)
          errors.push(
            `${varName} must be a valid phone number (10-15 digits). Current value: ${value}`
          )
        }
      }
    }
  }

  // Check optional variables
  for (const varName of optionalVars) {
    const value = process.env[varName]
    if (value) {
      if (varName === 'NEXT_PUBLIC_TOAST_DELAY') {
        const delay = parseInt(value, 10)
        if (isNaN(delay)) {
          invalidValues.push(varName)
          warnings.push(
            `${varName} must be a number. Current value: ${value}. Using default 5000ms.`
          )
        } else if (delay < 1000 || delay > 30000) {
          invalidValues.push(varName)
          warnings.push(
            `${varName} should be between 1000-30000 milliseconds. Current value: ${delay}ms. Using capped value.`
          )
        }
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    missingRequired,
    invalidValues
  }
}

/**
 * Validates configuration and throws error if critical issues found
 * Used for server startup validation
 */
export function validateConfigurationOnServerStartup(): void {
  const result = validateServerConfig()
  
  if (!result.isValid) {
    const errorMessage = [
      '🚨 Honda Permata Server Configuration Error:',
      '',
      'Critical Issues:',
      ...result.errors.map(error => `  ❌ ${error}`),
      '',
      'Required Environment Variables:',
      '  - NEXT_PUBLIC_WHATSAPP_NUMBER=6282297098292',
      '',
      'Optional Environment Variables:',
      '  - NEXT_PUBLIC_TOAST_DELAY=5000 (1000-30000ms)',
      '',
      'Setup Instructions:',
      '  1. Create .env.local file in project root',
      '  2. Add the required environment variables',
      '  3. Restart the development server',
      '',
      'Example .env.local:',
      '  NEXT_PUBLIC_WHATSAPP_NUMBER=6282297098292',
      '  NEXT_PUBLIC_TOAST_DELAY=5000',
      ''
    ].join('\n')
    
    throw new Error(errorMessage)
  }
  
  // Log warnings if any
  if (result.warnings.length > 0) {
    console.warn('🟡 Honda Permata Server Configuration Warnings:')
    result.warnings.forEach(warning => console.warn(`  ⚠️ ${warning}`))
  }
  
  // Log success
  console.warn('✅ Honda Permata server configuration validated successfully')
}

/**
 * Gets environment variable with validation
 * @param key Environment variable key
 * @param defaultValue Default value if not found
 * @param required Whether the variable is required
 * @returns The environment variable value or default
 */
export function getValidatedEnvVar(
  key: string, 
  defaultValue?: string, 
  required: boolean = false
): string {
  const value = process.env[key]
  
  if (!value) {
    if (required) {
      throw new Error(`Required environment variable ${key} is not set`)
    }
    return defaultValue || ''
  }
  
  return value
}

/**
 * Creates a configuration summary for logging
 * @returns Configuration summary object
 */
export function getConfigurationSummary(): Record<string, unknown> {
  const result = validateServerConfig()
  
  return {
    isValid: result.isValid,
    environment: process.env.NODE_ENV || 'unknown',
    whatsappConfigured: !!process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    toastDelayConfigured: !!process.env.NEXT_PUBLIC_TOAST_DELAY,
    errorCount: result.errors.length,
    warningCount: result.warnings.length,
    timestamp: new Date().toISOString()
  }
}