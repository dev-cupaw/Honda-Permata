/**
 * Production-safe logging utility
 * Only logs in development or when explicitly enabled
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, unknown>
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'
  private isLoggingEnabled = process.env.NEXT_PUBLIC_ENABLE_LOGGING === 'true'

  private shouldLog(level: LogLevel): boolean {
    // Always allow warnings and errors
    if (level === 'warn' || level === 'error') {
      return true
    }
    
    // Only allow info and debug in development or when explicitly enabled
    return this.isDevelopment || this.isLoggingEnabled
  }

  private formatMessage(level: LogLevel, message: string, context?: Record<string, unknown>): string {
    const timestamp = new Date().toISOString()
    const prefix = this.getPrefix(level)
    
    let formatted = `${prefix} [${timestamp}] ${message}`
    
    if (context && Object.keys(context).length > 0) {
      formatted += ` | Context: ${JSON.stringify(context)}`
    }
    
    return formatted
  }

  private getPrefix(level: LogLevel): string {
    switch (level) {
      case 'info': return '✅'
      case 'warn': return '⚠️'
      case 'error': return '❌'
      case 'debug': return '🔍'
      default: return 'ℹ️'
    }
  }

  info(message: string, context?: Record<string, unknown>): void {
    if (this.shouldLog('info')) {
      console.warn(this.formatMessage('info', message, context))
    }
  }

  warn(message: string, context?: Record<string, unknown>): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, context))
    }
  }

  error(message: string, error?: Error | unknown, context?: Record<string, unknown>): void {
    if (this.shouldLog('error')) {
      const errorContext = error ? { 
        ...context, 
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      } : context
      
      console.error(this.formatMessage('error', message, errorContext))
    }
  }

  debug(message: string, context?: Record<string, unknown>): void {
    if (this.shouldLog('debug')) {
      console.warn(this.formatMessage('debug', message, context))
    }
  }

  // Business-specific logging methods
  configValidation(isValid: boolean, message: string, context?: Record<string, unknown>): void {
    if (isValid) {
      this.info(`Honda Permata configuration: ${message}`, context)
    } else {
      this.error(`Honda Permata configuration: ${message}`, undefined, context)
    }
  }

  whatsappIntegration(success: boolean, message: string, context?: Record<string, unknown>): void {
    if (success) {
      this.info(`WhatsApp integration: ${message}`, context)
    } else {
      this.error(`WhatsApp integration: ${message}`, undefined, context)
    }
  }

  formSubmission(success: boolean, formType: string, context?: Record<string, unknown>): void {
    const message = `Form submission (${formType}): ${success ? 'Success' : 'Failed'}`
    if (success) {
      this.info(message, context)
    } else {
      this.error(message, undefined, context)
    }
  }
}

// Export singleton instance
export const logger = new Logger()

// Export types for external use
export type { LogLevel, LogEntry }