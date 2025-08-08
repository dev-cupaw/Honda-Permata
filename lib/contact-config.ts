interface ContactConfig {
  whatsapp: {
    number: string
    url: string
  }
  validation: {
    required: string[]
    optional: string[]
  }
}

interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export const contactConfig: ContactConfig = {
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6282297098292',
    url: 'https://wa.me'
  },
  validation: {
    required: ['NEXT_PUBLIC_WHATSAPP_NUMBER'],
    optional: ['NEXT_PUBLIC_TOAST_DELAY']
  }
}

/**
 * Validates the contact configuration and environment variables
 * @returns ValidationResult with validation status and error messages
 */
export const validateContactConfig = (): ValidationResult => {
  const errors: string[] = []
  const warnings: string[] = []

  // Check required environment variables
  const missing = contactConfig.validation.required.filter(
    key => !process.env[key]
  )

  // Only report missing variables if we don't have a fallback value
  if (missing.length > 0 && !contactConfig.whatsapp.number) {
    errors.push(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please add them to your .env.local file'
    )
  }

  // Validate WhatsApp number format
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  if (whatsappNumber && !/^[0-9]{10,15}$/.test(whatsappNumber)) {
    errors.push(
      'NEXT_PUBLIC_WHATSAPP_NUMBER must be a valid phone number (10-15 digits)'
    )
  }

  // Validate toast delay if provided
  const toastDelay = process.env.NEXT_PUBLIC_TOAST_DELAY
  if (toastDelay) {
    const delay = parseInt(toastDelay, 10)
    if (isNaN(delay) || delay < 1000 || delay > 30000) {
      warnings.push(
        'NEXT_PUBLIC_TOAST_DELAY should be between 1000-30000 milliseconds. Using default 5000ms.'
      )
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * Type-safe getter for WhatsApp number
 * @returns The configured WhatsApp number
 */
export const getWhatsAppNumber = (): string => {
  return contactConfig.whatsapp.number
}

/**
 * Type-safe getter for WhatsApp base URL
 * @returns The WhatsApp base URL for generating links
 */
export const getWhatsAppBaseUrl = (): string => {
  return contactConfig.whatsapp.url
}

/**
 * Type-safe getter for toast delay with validation
 * @returns Validated toast delay in milliseconds (default: 5000)
 */
export const getToastDelay = (): number => {
  const delay = parseInt(process.env.NEXT_PUBLIC_TOAST_DELAY || '5000', 10)
  
  // Validate and cap the delay
  if (isNaN(delay) || delay < 1000) return 5000 // Minimum 1 second, default to 5
  if (delay > 30000) return 30000 // Maximum 30 seconds
  
  return delay
}

/**
 * Validates configuration on application startup
 * Throws an error if critical configuration is missing
 */
export const validateConfigurationOnStartup = (): void => {
  const result = validateContactConfig()
  
  if (!result.isValid) {
    const errorMessage = [
      'Honda Permata Configuration Error:',
      ...result.errors,
      '',
      'Required environment variables:',
      '- NEXT_PUBLIC_WHATSAPP_NUMBER=6282297098292',
      '',
      'Optional environment variables:',
      '- NEXT_PUBLIC_TOAST_DELAY=5000 (1000-30000ms)',
      '',
      'Please create or update your .env.local file with the required variables.'
    ].join('\n')
    
    throw new Error(errorMessage)
  }
  
  // Log warnings if any
  if (result.warnings.length > 0) {
    console.warn('Honda Permata Configuration Warnings:')
    result.warnings.forEach(warning => console.warn(`- ${warning}`))
  }
}

/**
 * Gets the complete contact configuration object
 * @returns The full contact configuration
 */
export const getContactConfig = (): ContactConfig => {
  return contactConfig
}