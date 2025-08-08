'use client'

import { useEffect, useState } from 'react'
import { validateContactConfig } from '@/lib/contact-config'

/**
 * Configuration Validator Component
 * Validates environment variables on client-side startup
 * Shows development-friendly errors and production-safe fallbacks
 */
export function ConfigValidator() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    // Only run validation in development or when explicitly enabled
    const shouldValidate = process.env.NODE_ENV === 'development' ||
      process.env.NEXT_PUBLIC_ENABLE_CONFIG_VALIDATION === 'true'

    if (!shouldValidate) return

    try {
      // Check if environment variables are available on client-side
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

      // If environment variable is available, proceed with validation
      if (whatsappNumber) {
        const result = validateContactConfig()

        // Log success in development only
        if (result.isValid && process.env.NODE_ENV === 'development') {
          // Use proper logging in production
          if (process.env.NODE_ENV === 'development') {
            console.warn('✅ Honda Permata configuration validated successfully')
          }
        }

        // Log warnings if any
        if (result.warnings.length > 0) {
          console.warn('🟡 Honda Permata Configuration Warnings:')
          result.warnings.forEach(warning => console.warn(`⚠️ ${warning}`))
        }
      } else {
        // Environment variable not available on client-side, but this is normal
        // The fallback value will be used from the configuration
        if (process.env.NODE_ENV === 'development') {
          console.warn('✅ Honda Permata using fallback configuration (this is normal)')
        }
      }

    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('🚨 Configuration validation failed:', error)
      } else {
        console.warn('Configuration check failed. Using default values.')
      }
    }
  }, [isClient])

  // This component doesn't render anything
  return null
}