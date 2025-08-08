"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { AlertCircle, X } from "lucide-react"

/**
 * Props for individual field error display
 */
interface FieldErrorProps {
  error?: string | null | undefined
  className?: string
}

/**
 * Individual field error component with icon
 */
export const FieldError = React.forwardRef<
  HTMLParagraphElement,
  FieldErrorProps
>(({ error, className, ...props }, ref) => {
  if (!error) return null

  return (
    <p
      ref={ref}
      className={cn(
        "flex items-center gap-2 text-sm font-medium text-red-600 mt-1",
        className
      )}
      role="alert"
      aria-live="polite"
      {...props}
    >
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <span>{error}</span>
    </p>
  )
})
FieldError.displayName = "FieldError"

/**
 * Props for form error summary component
 */
interface FormErrorSummaryProps {
  errors: string[]
  title?: string
  className?: string
  onDismiss?: () => void
  dismissible?: boolean
}

/**
 * Form error summary component for displaying multiple validation errors
 */
export const FormErrorSummary = React.forwardRef<
  HTMLDivElement,
  FormErrorSummaryProps
>(({ 
  errors, 
  title = "Terdapat kesalahan pada form:", 
  className,
  onDismiss,
  dismissible = false,
  ...props 
}, ref) => {
  if (!errors || errors.length === 0) return null

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg bg-red-50 border border-red-200 p-4",
        className
      )}
      role="alert"
      aria-live="assertive"
      {...props}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            {title}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
        {dismissible && onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onDismiss}
                className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                aria-label="Tutup pesan error"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
})
FormErrorSummary.displayName = "FormErrorSummary"

/**
 * Props for enhanced input with error state
 */
interface InputWithErrorProps extends React.ComponentProps<"input"> {
  error?: string | null
  label?: string
  required?: boolean
  helpText?: string
}

/**
 * Enhanced input component with built-in error handling and visual indicators
 */
export const InputWithError = React.forwardRef<
  HTMLInputElement,
  InputWithErrorProps
>(({ 
  error, 
  label, 
  required, 
  helpText, 
  className, 
  id,
  ...props 
}, ref) => {
  const generatedId = React.useId()
  const inputId = id || generatedId
  const hasError = Boolean(error)

  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={inputId}
          className={cn(
            "text-sm font-medium",
            hasError ? "text-red-700" : "text-gray-700"
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-colors",
            hasError 
              ? "border-red-300 focus-visible:ring-red-500 focus-visible:border-red-500" 
              : "border-input focus-visible:ring-ring",
            className
          )}
          aria-invalid={hasError}
          aria-describedby={
            hasError 
              ? `${inputId}-error` 
              : helpText 
                ? `${inputId}-help` 
                : undefined
          }
          {...props}
        />
        
        {hasError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <AlertCircle className="h-4 w-4 text-red-500" />
          </div>
        )}
      </div>
      
      {helpText && !hasError && (
        <p 
          id={`${inputId}-help`}
          className="text-sm text-gray-500"
        >
          {helpText}
        </p>
      )}
      
      <FieldError 
        error={error}
      />
    </div>
  )
})
InputWithError.displayName = "InputWithError"

/**
 * Props for enhanced textarea with error state
 */
interface TextareaWithErrorProps extends React.ComponentProps<"textarea"> {
  error?: string | null
  label?: string
  required?: boolean
  helpText?: string
}

/**
 * Enhanced textarea component with built-in error handling and visual indicators
 */
export const TextareaWithError = React.forwardRef<
  HTMLTextAreaElement,
  TextareaWithErrorProps
>(({ 
  error, 
  label, 
  required, 
  helpText, 
  className, 
  id,
  ...props 
}, ref) => {
  const generatedId = React.useId()
  const textareaId = id || generatedId
  const hasError = Boolean(error)

  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={textareaId}
          className={cn(
            "text-sm font-medium",
            hasError ? "text-red-700" : "text-gray-700"
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-colors resize-none",
            hasError 
              ? "border-red-300 focus-visible:ring-red-500 focus-visible:border-red-500" 
              : "border-input focus-visible:ring-ring",
            className
          )}
          aria-invalid={hasError}
          aria-describedby={
            hasError 
              ? `${textareaId}-error` 
              : helpText 
                ? `${textareaId}-help` 
                : undefined
          }
          {...props}
        />
        
        {hasError && (
          <div className="absolute top-3 right-3 pointer-events-none">
            <AlertCircle className="h-4 w-4 text-red-500" />
          </div>
        )}
      </div>
      
      {helpText && !hasError && (
        <p 
          id={`${textareaId}-help`}
          className="text-sm text-gray-500"
        >
          {helpText}
        </p>
      )}
      
      <FieldError 
        error={error}
      />
    </div>
  )
})
TextareaWithError.displayName = "TextareaWithError"

/**
 * Success message component for form submissions
 */
interface FormSuccessProps {
  message: string
  className?: string
  onDismiss?: () => void
  dismissible?: boolean
}

export const FormSuccess = React.forwardRef<
  HTMLDivElement,
  FormSuccessProps
>(({ 
  message, 
  className,
  onDismiss,
  dismissible = false,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg bg-green-50 border border-green-200 p-4",
        className
      )}
      role="alert"
      aria-live="polite"
      {...props}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-green-800">
            {message}
          </p>
        </div>
        {dismissible && onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onDismiss}
                className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                aria-label="Tutup pesan sukses"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
})
FormSuccess.displayName = "FormSuccess"
