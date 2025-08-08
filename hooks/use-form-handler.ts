"use client"

import { useState, useCallback, useMemo } from 'react'
import { useToast } from './use-toast'
import { 
  WhatsAppIntegrator, 
  FormData, 
  WhatsAppIntegrationError,
  WhatsAppFallbackHandler,
  createWhatsAppIntegrator 
} from '@/lib/whatsapp-integration'
import { getWhatsAppNumber, getWhatsAppBaseUrl } from '@/lib/contact-config'

// Import validation utilities
import { 
  validateForm as validateFormData,
  validateField as validateSingleField,
  ValidationResult,
  sanitizeInput
} from '@/lib/form-validation'

/**
 * Form handler hook props interface
 */
interface UseFormHandlerProps {
  formData: FormData
  formType: string
  onSuccess?: () => void
  onError?: (error: string) => void
  onReset?: () => void
}

/**
 * Form handler hook return interface
 */
interface UseFormHandlerReturn {
  handleSubmit: (e: React.FormEvent) => Promise<void>
  isSubmitting: boolean
  errors: string[]
  clearErrors: () => void
  validateForm: () => boolean
}

// Validation patterns are now imported from form-validation.ts

/**
 * Reusable form handler hook for Honda Permata forms
 * Handles validation, WhatsApp integration, loading states, and error handling
 */
export function useFormHandler({
  formData,
  formType,
  onSuccess,
  onError,
  onReset
}: UseFormHandlerProps): UseFormHandlerReturn {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const { toast } = useToast()

  // Create WhatsApp integrator instance with memoization
  const whatsappIntegrator = useMemo(() => {
    try {
      return createWhatsAppIntegrator({
        number: getWhatsAppNumber(),
        baseUrl: getWhatsAppBaseUrl()
      })
    } catch (error) {
      console.error('Failed to create WhatsApp integrator:', error)
      // Return a fallback integrator with default config
      return new WhatsAppIntegrator({
        number: '6282297098292',
        baseUrl: 'https://wa.me'
      })
    }
  }, [])

  // Create fallback handler instance
  const fallbackHandler = useMemo(() => {
    return new WhatsAppFallbackHandler(whatsappIntegrator, toast)
  }, [whatsappIntegrator, toast])

  /**
   * Validates form data using the centralized validation system
   * @param data - Form data to validate
   * @returns Validation result with errors and field-specific errors
   */
  const validateFormDataInternal = useCallback((data: FormData): ValidationResult => {
    // Sanitize form data first
    const sanitizedData: Record<string, string> = {}
    Object.entries(data).forEach(([key, value]) => {
      sanitizedData[key] = sanitizeInput(String(value || ''))
    })
    
    return validateFormData(sanitizedData, formType)
  }, [formType])

  /**
   * Validates the form and updates error state
   * @returns true if form is valid, false otherwise
   */
  const validateForm = useCallback((): boolean => {
    const validation = validateFormDataInternal(formData)
    setErrors(validation.errors.map(error => error.message))
    return validation.isValid
  }, [formData, validateFormDataInternal])

  /**
   * Clears all validation errors
   */
  const clearErrors = useCallback(() => {
    setErrors([])
  }, [])

  /**
   * Handles WhatsApp integration errors with comprehensive fallback actions
   */
  const handleWhatsAppError = useCallback(async (
    error: WhatsAppIntegrationError, 
    formData: FormData, 
    formType: string
  ) => {
    console.error('WhatsApp integration error:', error)

    try {
      const fallbackAction = await fallbackHandler.handleError(error, formData, formType)
      
      // Execute the fallback action
      switch (fallbackAction.type) {
        case 'DIRECT_URL':
          if (fallbackAction.url) {
            // Direct navigation is already handled in the fallback handler
            console.log('Direct URL fallback executed:', fallbackAction.url)
          }
          break
          
        case 'SIMPLIFIED_MESSAGE':
          if (fallbackAction.url) {
            // Try to open the simplified URL
            const fallbackWindow = window.open(fallbackAction.url, '_blank', 'noopener,noreferrer')
            
            // Check if this also gets blocked
            setTimeout(() => {
              if (WhatsAppIntegrator.detectPopupBlocked(fallbackWindow)) {
                // Ultimate fallback - direct navigation
                window.location.href = fallbackAction.url!
              }
            }, 1000)
          }
          break
          
        case 'MANUAL_CONTACT':
          // Manual contact info is already shown in toast by fallback handler
          console.log('Manual contact fallback:', fallbackAction.contactInfo)
          break
          
        case 'COPY_TO_CLIPBOARD':
          // Future enhancement - copy contact info to clipboard
          if (fallbackAction.message && navigator.clipboard) {
            try {
              await navigator.clipboard.writeText(fallbackAction.message)
              toast({
                title: "Disalin ke Clipboard",
                description: "Informasi kontak telah disalin.",
                variant: "default"
              })
            } catch (clipboardError) {
              console.error('Clipboard copy failed:', clipboardError)
            }
          }
          break
      }
      
      return fallbackAction
    } catch (fallbackError) {
      console.error('Fallback handler failed:', fallbackError)
      
      // Ultimate emergency fallback
      toast({
        title: "Hubungi Kami Langsung",
        description: "WhatsApp: +6282297098292",
        variant: "default"
      })
      
      // Return emergency fallback action
      return {
        type: 'MANUAL_CONTACT' as const,
        contactInfo: {
          phone: '+6282297098292',
          whatsappUrl: 'https://wa.me/6282297098292'
        },
        message: 'Emergency fallback - all other methods failed'
      }
    }
  }, [fallbackHandler, toast])

  /**
   * Normalizes form data to ensure consistent field names for WhatsApp integration
   */
  const normalizeFormData = useCallback((data: FormData): FormData => {
    const normalized = { ...data }
    
    // Normalize name field
    if ((data as any).fullName && !data.nama) {
      normalized.nama = (data as any).fullName
    }
    
    // Normalize phone field
    if ((data as any).mobile && !data.phone) {
      normalized.phone = (data as any).mobile
    }
    
    // Normalize car model field
    if ((data as any).carModel && !data.model) {
      normalized.model = (data as any).carModel
    }
    
    return normalized
  }, [])

  /**
   * Handles form submission with validation, WhatsApp integration, and error handling
   */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()

    // Prevent duplicate submissions
    if (isSubmitting) {
      return
    }

    // Clear previous errors
    clearErrors()

    // Validate form data using centralized validation
    const validation = validateFormDataInternal(formData)
    if (!validation.isValid) {
      const errorMessages = validation.errors.map(error => error.message)
      setErrors(errorMessages)
      
      toast({
        title: "Form tidak valid",
        description: errorMessages.join(', '),
        variant: "destructive"
      })
      
      onError?.(errorMessages.join(', '))
      return
    }

    setIsSubmitting(true)

    // Normalize form data for consistent field names
    const normalizedData = normalizeFormData(formData)
    
    try {
      
      // Generate WhatsApp URL
      const whatsappUrl = whatsappIntegrator.generateWhatsAppUrl(normalizedData, formType)
      
      // Show success message
      toast({
        title: "Berhasil!",
        description: "Anda akan diarahkan ke WhatsApp untuk melanjutkan percakapan.",
        variant: "default"
      })
      
      // Small delay to ensure toast is visible before redirect
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Open WhatsApp in new tab with security attributes
      const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
      
      // Enhanced popup blocker detection with fallback
      setTimeout(() => {
        if (WhatsAppIntegrator.detectPopupBlocked(newWindow)) {
          // Create a popup blocked error and handle it with fallback mechanisms
          const popupError = new WhatsAppIntegrationError(
            'POPUP_BLOCKED',
            'Popup was blocked by browser',
            new Error('Browser blocked popup window')
          )
          
          handleWhatsAppError(popupError, normalizedData, formType)
        }
      }, 1000)
      
      // Call success callback
      onSuccess?.()
      
      // Reset form if callback provided
      onReset?.()
      
    } catch (error) {
      console.error('Form submission error:', error)
      
      if (error instanceof WhatsAppIntegrationError) {
        await handleWhatsAppError(error, normalizedData, formType)
      } else {
        // Handle network errors or other unexpected errors
        const networkError = new WhatsAppIntegrationError(
          'NETWORK_ERROR',
          'Network or unexpected error occurred',
          error instanceof Error ? error : new Error('Unknown error')
        )
        
        await handleWhatsAppError(networkError, normalizedData, formType)
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      onError?.(errorMessage)
      
    } finally {
      setIsSubmitting(false)
    }
  }, [
    isSubmitting,
    formData,
    formType,
    whatsappIntegrator,
    validateFormData,
    normalizeFormData,
    clearErrors,
    handleWhatsAppError,
    toast,
    onSuccess,
    onError,
    onReset
  ])

  return {
    handleSubmit,
    isSubmitting,
    errors,
    clearErrors,
    validateForm
  }
}

// Export utility functions from form-validation.ts
export { formatPhoneNumber } from '@/lib/form-validation'

/**
 * Utility function to validate individual fields (legacy compatibility)
 * @param field - Field name
 * @param value - Field value
 * @returns Validation error message or null if valid
 */
export function validateField(field: string, value: string): string | null {
  return validateSingleField(field, value)
}