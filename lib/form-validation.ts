/**
 * Form validation utilities for Honda Permata website
 * Provides structured error handling with Indonesian messages
 */

/**
 * Form validation error class for structured error handling
 */
export class FormValidationError extends Error {
  constructor(
    public field: string,
    public message: string,
    public code: string
  ) {
    super(`${field}: ${message}`)
    this.name = 'FormValidationError'
  }
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean
  errors: FormValidationError[]
  fieldErrors: Record<string, string>
}

/**
 * Field validation rules
 */
export interface FieldValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  customValidator?: (value: string) => string | null
}

/**
 * Indonesian phone number validation regex pattern
 * Supports formats: +62xxx, 62xxx, 0xxx
 * Length: 10-15 digits total
 */
export const INDONESIAN_PHONE_REGEX = /^(\+62|62|0)[0-9]{8,13}$/

/**
 * Email validation regex pattern
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Indonesian error messages for common validation scenarios
 */
export const VALIDATION_MESSAGES = {
  REQUIRED: 'wajib diisi',
  INVALID_FORMAT: 'format tidak valid',
  TOO_SHORT: 'terlalu pendek',
  TOO_LONG: 'terlalu panjang',
  INVALID_PHONE: 'Format nomor HP tidak valid. Gunakan format: +62xxx, 62xxx, atau 0xxx',
  INVALID_EMAIL: 'Format email tidak valid',
  PHONE_TOO_SHORT: 'Nomor HP minimal 10 digit',
  PHONE_TOO_LONG: 'Nomor HP maksimal 15 digit',
  NAME_TOO_SHORT: 'Nama minimal 2 karakter',
  NAME_TOO_LONG: 'Nama maksimal 100 karakter',
  EMAIL_TOO_LONG: 'Email terlalu panjang (maksimal 254 karakter)',
  MESSAGE_TOO_LONG: 'Pesan terlalu panjang (maksimal 1000 karakter)',
  INVALID_CHARACTERS: 'mengandung karakter yang tidak diperbolehkan'
} as const

/**
 * Field validation rules configuration
 */
export const FIELD_VALIDATION_RULES: Record<string, FieldValidationRule> = {
  nama: {
    required: true,
    minLength: 2,
    maxLength: 100,
    customValidator: (value: string) => {
      const trimmed = value.trim()
      if (!trimmed) return 'Nama wajib diisi'
      if (trimmed.length < 2) return VALIDATION_MESSAGES.NAME_TOO_SHORT
      if (trimmed.length > 100) return VALIDATION_MESSAGES.NAME_TOO_LONG
      // Check for invalid characters (only letters, spaces, and common punctuation)
      if (!/^[a-zA-Z\s\-'.]+$/.test(trimmed)) {
        return `Nama ${VALIDATION_MESSAGES.INVALID_CHARACTERS}`
      }
      return null
    }
  },

  phone: {
    required: true,
    customValidator: (value: string) => {
      const trimmed = value.trim()
      if (!trimmed) return 'Nomor HP wajib diisi'

      const cleanPhone = trimmed.replace(/[-\s]/g, '')

      // First check basic format
      if (!INDONESIAN_PHONE_REGEX.test(cleanPhone)) {
        return VALIDATION_MESSAGES.INVALID_PHONE
      }

      // Additional length checks after cleaning for edge cases
      let digits = cleanPhone
      if (digits.startsWith('+62')) {
        digits = '0' + digits.slice(3)
      } else if (digits.startsWith('62')) {
        digits = '0' + digits.slice(2)
      }

      // Remove leading zero for digit counting
      const actualDigits = digits.replace(/^0/, '')
      if (actualDigits.length < 8) return VALIDATION_MESSAGES.PHONE_TOO_SHORT
      if (actualDigits.length > 13) return VALIDATION_MESSAGES.PHONE_TOO_LONG

      return null
    }
  },

  email: {
    required: false,
    maxLength: 254,
    customValidator: (value: string) => {
      const trimmed = value.trim()
      if (!trimmed) return null // Email is optional

      if (!EMAIL_REGEX.test(trimmed)) {
        return VALIDATION_MESSAGES.INVALID_EMAIL
      }

      if (trimmed.length > 254) {
        return VALIDATION_MESSAGES.EMAIL_TOO_LONG
      }

      return null
    }
  },

  message: {
    required: false,
    maxLength: 1000,
    customValidator: (value: string) => {
      if (!value) return null // Message is optional

      if (value.trim().length > 1000) {
        return VALIDATION_MESSAGES.MESSAGE_TOO_LONG
      }

      return null
    }
  },

  model: {
    required: true,
    customValidator: (value: string) => {
      const trimmed = value.trim()
      if (!trimmed) return 'Model Honda wajib dipilih'
      return null
    }
  },

  serviceType: {
    required: true,
    customValidator: (value: string) => {
      const trimmed = value.trim()
      if (!trimmed) return 'Jenis layanan wajib dipilih'
      return null
    }
  }
}

/**
 * Validates a single field value
 * @param fieldName - Name of the field to validate
 * @param value - Value to validate
 * @param customRules - Optional custom validation rules
 * @returns Validation error message or null if valid
 */
export function validateField(
  fieldName: string,
  value: string,
  customRules?: FieldValidationRule
): string | null {
  const rules = customRules || FIELD_VALIDATION_RULES[fieldName]

  if (!rules) {
    console.warn(`No validation rules found for field: ${fieldName}`)
    return null
  }

  const trimmedValue = value?.trim() || ''

  // Check required field
  if (rules.required && !trimmedValue) {
    return `${getFieldDisplayName(fieldName)} ${VALIDATION_MESSAGES.REQUIRED}`
  }

  // Skip other validations if field is empty and not required
  if (!trimmedValue && !rules.required) {
    return null
  }

  // Check minimum length
  if (rules.minLength && trimmedValue.length < rules.minLength) {
    return `${getFieldDisplayName(fieldName)} minimal ${rules.minLength} karakter`
  }

  // Check maximum length
  if (rules.maxLength && trimmedValue.length > rules.maxLength) {
    return `${getFieldDisplayName(fieldName)} maksimal ${rules.maxLength} karakter`
  }

  // Check pattern
  if (rules.pattern && !rules.pattern.test(trimmedValue)) {
    return `${getFieldDisplayName(fieldName)} ${VALIDATION_MESSAGES.INVALID_FORMAT}`
  }

  // Run custom validator
  if (rules.customValidator) {
    return rules.customValidator(trimmedValue)
  }

  return null
}

/**
 * Validates multiple fields at once
 * @param formData - Object containing form field values
 * @param formType - Type of form for context-specific validation
 * @returns Validation result with errors and field-specific errors
 */
export function validateForm(
  formData: Record<string, unknown>,
  formType?: string
): ValidationResult {
  const errors: FormValidationError[] = []
  const fieldErrors: Record<string, string> = {}

  // Standard field validations
  Object.entries(formData).forEach(([fieldName, value]) => {
    const error = validateField(fieldName, String(value || ''))
    if (error) {
      const validationError = new FormValidationError(
        fieldName,
        error,
        'VALIDATION_ERROR'
      )
      errors.push(validationError)
      fieldErrors[fieldName] = error
    }
  })

  // Form-specific validations
  if (formType === 'test-drive') {
    const model = formData.model || formData.carModel
    if (!model || typeof model !== 'string' || !model.trim()) {
      const error = new FormValidationError(
        'model',
        'Model Honda wajib dipilih untuk test drive',
        'REQUIRED_FIELD'
      )
      errors.push(error)
      fieldErrors.model = error.message
    }
  }

  if (formType === 'service') {
    if (!formData.serviceType || typeof formData.serviceType !== 'string' || !formData.serviceType.trim()) {
      const error = new FormValidationError(
        'serviceType',
        'Jenis layanan wajib dipilih',
        'REQUIRED_FIELD'
      )
      errors.push(error)
      fieldErrors.serviceType = error.message
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    fieldErrors
  }
}

/**
 * Gets user-friendly display name for form fields
 * @param fieldName - Internal field name
 * @returns User-friendly field name in Indonesian
 */
export function getFieldDisplayName(fieldName: string): string {
  const displayNames: Record<string, string> = {
    nama: 'Nama',
    fullName: 'Nama Lengkap',
    phone: 'Nomor HP',
    mobile: 'Nomor HP',
    email: 'Email',
    message: 'Pesan',
    model: 'Model Honda',
    carModel: 'Model Honda',
    serviceType: 'Jenis Layanan',
    service: 'Layanan',
    preferredDate: 'Tanggal Pilihan',
    preferredTime: 'Waktu Pilihan',
    licensePlate: 'Nomor Polisi',
    vehicleModel: 'Model Kendaraan'
  }

  return displayNames[fieldName] || fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
}

/**
 * Formats phone number for display
 * @param phone - Raw phone number input
 * @returns Formatted phone number
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone) return ''

  const cleaned = phone.replace(/\D/g, '')

  // Indonesian phone number formatting
  if (cleaned.startsWith('62')) {
    return `+${cleaned}`
  } else if (cleaned.startsWith('0')) {
    return `+62${cleaned.slice(1)}`
  }

  return phone
}

/**
 * Sanitizes input to prevent XSS and other security issues
 * @param input - Raw input string
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  if (!input) return ''

  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000) // Limit length
}

/**
 * Validates and sanitizes form data
 * @param formData - Raw form data
 * @param formType - Type of form
 * @returns Sanitized form data and validation result
 */
export function validateAndSanitizeForm(
  formData: Record<string, unknown>,
  formType?: string
): {
  sanitizedData: Record<string, string>
  validation: ValidationResult
} {
  // Sanitize all string values
  const sanitizedData: Record<string, string> = {}
  Object.entries(formData).forEach(([key, value]) => {
    sanitizedData[key] = sanitizeInput(String(value || ''))
  })

  // Validate sanitized data
  const validation = validateForm(sanitizedData, formType)

  return {
    sanitizedData,
    validation
  }
}

/**
 * Creates a validation error for a specific field
 * @param field - Field name
 * @param message - Error message
 * @param code - Error code
 * @returns FormValidationError instance
 */
export function createValidationError(
  field: string,
  message: string,
  code: string = 'VALIDATION_ERROR'
): FormValidationError {
  return new FormValidationError(field, message, code)
}

/**
 * Checks if a value is empty (null, undefined, empty string, or whitespace only)
 * @param value - Value to check
 * @returns True if value is empty
 */
export function isEmpty(value: unknown): boolean {
  return value == null || String(value).trim() === ''
}

/**
 * Debounced validation function for real-time field validation
 * @param validator - Validation function
 * @param delay - Debounce delay in milliseconds
 * @returns Debounced validation function
 */
export function debounceValidation(
  validator: (value: string) => string | null,
  delay: number = 300
): (value: string) => Promise<string | null> {
  let timeoutId: NodeJS.Timeout

  return (value: string): Promise<string | null> => {
    return new Promise((resolve) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        resolve(validator(value))
      }, delay)
    })
  }
}
