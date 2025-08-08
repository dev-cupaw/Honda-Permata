// Utility to suppress known development warnings that don't affect functionality
export function suppressKnownWarnings() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    // Store original console methods
    const originalWarn = console.warn
    const originalError = console.error

    // List of known warnings to suppress
    const suppressedWarnings = [
      'Automatic fallback to software WebGL has been deprecated',
      'GroupMarkerNotSet',
      'Download the React DevTools',
      '[Fast Refresh] done in NaNms'
    ]

    // Override console.warn
    console.warn = (...args: unknown[]) => {
      const message = args.join(' ')
      const shouldSuppress = suppressedWarnings.some(warning => 
        message.includes(warning)
      )
      
      if (!shouldSuppress) {
        originalWarn.apply(console, args)
      }
    }

    // Override console.error for specific cases
    console.error = (...args: unknown[]) => {
      const message = args.join(' ')
      const shouldSuppress = suppressedWarnings.some(warning => 
        message.includes(warning)
      )
      
      if (!shouldSuppress) {
        originalError.apply(console, args)
      }
    }
  }
}

// Clean up function to restore original console methods
export function restoreConsole() {
  if (typeof window !== 'undefined') {
    // This would need to store the original methods to restore them
    // For now, we'll just reload the page if needed
  }
}
