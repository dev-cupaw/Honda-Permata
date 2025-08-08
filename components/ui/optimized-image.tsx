"use client"

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  fill?: boolean
  sizes?: string
  style?: React.CSSProperties
  onLoad?: () => void
  onError?: (error: Error) => void
  fallbackSrc?: string
  loading?: 'lazy' | 'eager'
}

interface ImageError extends Error {
  code?: string
  statusCode?: number
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  fill = false,
  sizes,
  style,
  onLoad,
  onError,
  fallbackSrc,
  loading = 'lazy',
  ...props
}: OptimizedImageProps) {
  const [hasOptimizationError, setHasOptimizationError] = useState(false)
  const [hasImageError, setHasImageError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  // Handle Next.js Image optimization errors
  const handleOptimizationError = useCallback((error: ImageError) => {
    console.warn('Image optimization failed, falling back to standard img:', {
      src: currentSrc,
      error: error.message,
      code: error.code
    })

    // Try fallback source if available and not already tried
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      return
    }

    setHasOptimizationError(true)
    onError?.(error)
  }, [currentSrc, fallbackSrc, onError])

  // Handle general image loading errors (broken src, network issues, etc.)
  const handleImageError = useCallback((error: React.SyntheticEvent<HTMLImageElement, Event> | Error) => {
    const errorMessage = error instanceof Error ? error.message : 'Image loading failed'
    console.warn('Image loading failed:', {
      src: currentSrc,
      error: errorMessage
    })

    // Try fallback source if available and not already tried
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      return
    }

    setHasImageError(true)
    onError?.(error instanceof Error ? error : new Error(errorMessage))
  }, [currentSrc, fallbackSrc, onError])

  // Handle successful image load
  const handleImageLoad = useCallback(() => {
    onLoad?.()
  }, [onLoad])

  // Generate blur data URL for placeholder
  const generateBlurDataURL = useCallback(() => {
    if (blurDataURL) return blurDataURL

    // Return a simple base64 encoded 1x1 gray pixel for blur placeholder
    // This works both server-side and client-side
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
  }, [blurDataURL])

  // If image loading completely failed, show error placeholder
  if (hasImageError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-100 text-gray-400 text-sm",
          className
        )}
        style={{
          width: fill ? '100%' : width,
          height: fill ? '100%' : height,
          ...style
        }}
      >
        <div className="text-center">
          <div className="text-xs">Image unavailable</div>
          <div className="text-xs opacity-75">{alt}</div>
        </div>
      </div>
    )
  }

  // If Next.js optimization failed, fallback to standard img tag
  if (hasOptimizationError) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={currentSrc}
        alt={alt || ""}
        width={width}
        height={height}
        className={className}
        style={style}
        loading={loading}
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...props}
      />
    )
  }

  // Use Next.js optimized Image component
  const baseProps = {
    src: currentSrc,
    alt,
    priority,
    quality,
    placeholder,
    onLoad: handleImageLoad,
    onError: (_e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const error = new Error('Image loading failed')
      handleOptimizationError(error)
    },
    ...(className && { className }),
    ...(style && { style }),
    ...props
  }

  // Handle fill vs width/height props
  const sizeProps = fill
    ? { fill: true, ...(sizes && { sizes }) }
    : { ...(width && { width }), ...(height && { height }) }

  // Add blur placeholder if specified
  const blurProps = placeholder === 'blur'
    ? { blurDataURL: generateBlurDataURL() }
    : {}

  {/* eslint-disable-next-line jsx-a11y/alt-text */ }
  return <Image {...baseProps} {...sizeProps} {...blurProps} />
}

// Higher-order component for easy migration from existing Image components
export function withOptimizedImage<T extends { src: string; alt: string }>(
  Component: React.ComponentType<T>
) {
  return function OptimizedImageWrapper(props: T) {
    return <Component {...props} />
  }
}

// Utility function to check if image optimization is available
export function isImageOptimizationAvailable(): boolean {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return true

    // Check if Next.js image optimization is enabled
    // This is a simple check - in a real scenario, you might want to
    // make a test request to /_next/image to verify
    return true
  } catch {
    return false
  }
}

// Utility function to generate responsive sizes string
export function generateResponsiveSizes(breakpoints: { [key: string]: string }): string {
  const entries = Object.entries(breakpoints)
  const mediaQueries = entries.slice(0, -1).map(([breakpoint, size]) =>
    `(max-width: ${breakpoint}) ${size}`
  )
  const defaultSize = entries[entries.length - 1][1]

  return [...mediaQueries, defaultSize].join(', ')
}

// Common responsive sizes presets
export const RESPONSIVE_SIZES = {
  // Full width responsive
  full: '100vw',

  // Common responsive patterns
  hero: generateResponsiveSizes({
    '768px': '100vw',
    '1200px': '50vw',
    'default': '33vw'
  }),

  // Card/thumbnail sizes
  card: generateResponsiveSizes({
    '640px': '100vw',
    '768px': '50vw',
    '1024px': '33vw',
    'default': '25vw'
  }),

  // Gallery/grid sizes
  gallery: generateResponsiveSizes({
    '640px': '50vw',
    '768px': '33vw',
    '1024px': '25vw',
    'default': '20vw'
  })
}
