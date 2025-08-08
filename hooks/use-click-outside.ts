import { useEffect, useRef, RefObject } from 'react'

/**
 * Custom hook for handling click outside events with proper ref management
 * to prevent memory leaks from event listener re-registration
 */
export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
  enabled: boolean = true
) => {
  const callbackRef = useRef(callback)
  const enabledRef = useRef(enabled)
  
  // Update refs without causing re-renders
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])
  
  useEffect(() => {
    enabledRef.current = enabled
  }, [enabled])
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!enabledRef.current) return
      
      const element = ref.current
      if (element && !element.contains(event.target as Node)) {
        callbackRef.current()
      }
    }
    
    // Single registration, no re-registration on state changes
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref]) // Only depend on ref, not on callback or enabled
}
