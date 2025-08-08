/**
 * Form Submission Monitoring System
 * Tracks success rates and errors for Honda Permata forms
 */

interface FormSubmissionEvent {
  formType: string
  timestamp: number
  success: boolean
  error?: string | undefined
  userAgent?: string | undefined
  formData?: {
    hasName: boolean
    hasPhone: boolean
    hasEmail: boolean
    hasMessage: boolean
  } | undefined
}

interface FormMetrics {
  totalSubmissions: number
  successfulSubmissions: number
  failedSubmissions: number
  successRate: number
  errorTypes: Record<string, number>
  formTypes: Record<string, number>
}

class FormMonitoring {
  private events: FormSubmissionEvent[] = []
  private readonly MAX_EVENTS = 1000 // Keep last 1000 events
  private readonly STORAGE_KEY = 'honda_form_monitoring'

  constructor() {
    this.loadFromStorage()
  }

  /**
   * Track a form submission attempt
   */
  trackSubmission(
    formType: string,
    success: boolean,
    error?: string,
    formData?: unknown
  ): void {
    const event: FormSubmissionEvent = {
      formType,
      timestamp: Date.now(),
      success,
      error,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      formData: formData ? {
        hasName: !!formData.nama,
        hasPhone: !!formData.phone,
        hasEmail: !!formData.email,
        hasMessage: !!formData.message
      } : undefined
    }

    this.events.push(event)

    // Keep only recent events
    if (this.events.length > this.MAX_EVENTS) {
      this.events = this.events.slice(-this.MAX_EVENTS)
    }

    this.saveToStorage()
    this.logEvent(event)
  }

  /**
   * Get current form submission metrics
   */
  getMetrics(timeRangeHours: number = 24): FormMetrics {
    const cutoffTime = Date.now() - (timeRangeHours * 60 * 60 * 1000)
    const recentEvents = this.events.filter(event => event.timestamp > cutoffTime)

    const totalSubmissions = recentEvents.length
    const successfulSubmissions = recentEvents.filter(event => event.success).length
    const failedSubmissions = totalSubmissions - successfulSubmissions
    const successRate = totalSubmissions > 0 ? (successfulSubmissions / totalSubmissions) * 100 : 0

    // Count error types
    const errorTypes: Record<string, number> = {}
    recentEvents
      .filter(event => !event.success && event.error)
      .forEach(event => {
        const errorType = event.error || 'Unknown Error'
        errorTypes[errorType] = (errorTypes[errorType] || 0) + 1
      })

    // Count form types
    const formTypes: Record<string, number> = {}
    recentEvents.forEach(event => {
      formTypes[event.formType] = (formTypes[event.formType] || 0) + 1
    })

    return {
      totalSubmissions,
      successfulSubmissions,
      failedSubmissions,
      successRate,
      errorTypes,
      formTypes
    }
  }

  /**
   * Check if success rate is below threshold
   */
  isSuccessRateBelowThreshold(threshold: number = 90, timeRangeHours: number = 1): boolean {
    const metrics = this.getMetrics(timeRangeHours)
    return metrics.totalSubmissions >= 5 && metrics.successRate < threshold
  }

  /**
   * Get recent errors for debugging
   */
  getRecentErrors(count: number = 10): FormSubmissionEvent[] {
    return this.events
      .filter(event => !event.success)
      .slice(-count)
      .reverse()
  }

  /**
   * Generate monitoring report
   */
  generateReport(timeRangeHours: number = 24): string {
    const metrics = this.getMetrics(timeRangeHours)
    
    let report = `Honda Permata Form Monitoring Report (Last ${timeRangeHours}h)\n`
    report += `=================================================\n\n`
    
    report += `Overall Metrics:\n`
    report += `- Total Submissions: ${metrics.totalSubmissions}\n`
    report += `- Successful: ${metrics.successfulSubmissions}\n`
    report += `- Failed: ${metrics.failedSubmissions}\n`
    report += `- Success Rate: ${metrics.successRate.toFixed(2)}%\n\n`
    
    if (Object.keys(metrics.formTypes).length > 0) {
      report += `Form Types:\n`
      Object.entries(metrics.formTypes).forEach(([type, count]) => {
        report += `- ${type}: ${count} submissions\n`
      })
      report += `\n`
    }
    
    if (Object.keys(metrics.errorTypes).length > 0) {
      report += `Error Types:\n`
      Object.entries(metrics.errorTypes).forEach(([error, count]) => {
        report += `- ${error}: ${count} occurrences\n`
      })
      report += `\n`
    }
    
    // Health status
    if (metrics.successRate >= 95) {
      report += `Status: ✅ HEALTHY - Success rate is excellent\n`
    } else if (metrics.successRate >= 90) {
      report += `Status: ⚠️ WARNING - Success rate is acceptable but could be improved\n`
    } else {
      report += `Status: 🚨 CRITICAL - Success rate is below acceptable threshold\n`
    }
    
    return report
  }

  /**
   * Clear all monitoring data
   */
  clearData(): void {
    this.events = []
    this.saveToStorage()
  }

  private logEvent(event: FormSubmissionEvent): void {
    if (typeof console !== 'undefined') {
      const status = event.success ? '✅' : '❌'
      const message = `${status} Form ${event.formType}: ${event.success ? 'Success' : event.error}`
      
      if (event.success) {
        console.warn(`[Form Monitor] ${message}`)
      } else {
        console.error(`[Form Monitor] ${message}`)
      }
    }
  }

  private saveToStorage(): void {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.events))
      } catch (error) {
        console.warn('Failed to save form monitoring data to localStorage:', error)
      }
    }
  }

  private loadFromStorage(): void {
    if (typeof localStorage !== 'undefined') {
      try {
        const stored = localStorage.getItem(this.STORAGE_KEY)
        if (stored) {
          this.events = JSON.parse(stored)
        }
      } catch (error) {
        console.warn('Failed to load form monitoring data from localStorage:', error)
        this.events = []
      }
    }
  }
}

// Global monitoring instance
export const formMonitoring = new FormMonitoring()

/**
 * Hook for easy monitoring integration in form components
 */
export const useFormMonitoring = () => {
  const trackSuccess = (formType: string, formData?: unknown) => {
    formMonitoring.trackSubmission(formType, true, undefined, formData)
  }

  const trackError = (formType: string, error: string, formData?: unknown) => {
    formMonitoring.trackSubmission(formType, false, error, formData)
  }

  const getMetrics = (timeRangeHours?: number) => {
    return formMonitoring.getMetrics(timeRangeHours)
  }

  const isHealthy = (threshold?: number, timeRangeHours?: number) => {
    return !formMonitoring.isSuccessRateBelowThreshold(threshold, timeRangeHours)
  }

  return {
    trackSuccess,
    trackError,
    getMetrics,
    isHealthy
  }
}

/**
 * Monitoring dashboard data for admin interface
 */
export const getMonitoringDashboardData = () => {
  const metrics24h = formMonitoring.getMetrics(24)
  const metrics1h = formMonitoring.getMetrics(1)
  const recentErrors = formMonitoring.getRecentErrors(5)

  return {
    current: metrics1h,
    daily: metrics24h,
    recentErrors,
    report: formMonitoring.generateReport(24),
    isHealthy: !formMonitoring.isSuccessRateBelowThreshold(90, 1)
  }
}

/**
 * Alert system for critical issues
 */
export const checkFormHealthAlerts = (): string[] => {
  const alerts: string[] = []
  
  // Check 1-hour success rate
  if (formMonitoring.isSuccessRateBelowThreshold(90, 1)) {
    const metrics = formMonitoring.getMetrics(1)
    alerts.push(`🚨 CRITICAL: Form success rate is ${metrics.successRate.toFixed(1)}% (last hour)`)
  }
  
  // Check for high error rates
  const metrics = formMonitoring.getMetrics(1)
  if (metrics.totalSubmissions >= 10 && metrics.failedSubmissions >= 5) {
    alerts.push(`⚠️ WARNING: High error rate detected (${metrics.failedSubmissions} failures in last hour)`)
  }
  
  // Check for no submissions (potential issue)
  if (metrics.totalSubmissions === 0) {
    alerts.push(`⚠️ WARNING: No form submissions detected in the last hour`)
  }
  
  return alerts
}