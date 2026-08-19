'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

interface ImageGalleryProps {
  images: string[]
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
}

const MIN_SCALE = 1
const MAX_SCALE = 4

function getTouchDistance(touches: React.TouchList | TouchList) {
  const dx = touches[0].clientX - touches[1].clientX
  const dy = touches[0].clientY - touches[1].clientY
  return Math.hypot(dx, dy)
}

export default function ImageGallery({ images, isOpen, onClose, initialIndex = 0 }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [prevIndex, setPrevIndex] = useState(initialIndex)
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [isInteracting, setIsInteracting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageAreaRef = useRef<HTMLDivElement>(null)
  const lastPinchDistance = useRef<number | null>(null)
  const lastPanPoint = useRef<{ x: number; y: number } | null>(null)
  const isDragging = useRef(false)

  const resetZoom = useCallback(() => {
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    setCurrentIndex(initialIndex)
    setPrevIndex(initialIndex)
    resetZoom()
  }, [initialIndex, isOpen, resetZoom])

  useEffect(() => {
    resetZoom()
  }, [currentIndex, resetZoom])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const element = containerRef.current as (HTMLElement & {
        requestFullscreen?: () => Promise<void>
        webkitRequestFullscreen?: () => void
        mozRequestFullScreen?: () => void
        msRequestFullscreen?: () => void
      }) | null

      if (element?.requestFullscreen) {
        element.requestFullscreen().catch(() => {})
      } else if (element?.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
      } else if (element?.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element?.msRequestFullscreen) {
        element.msRequestFullscreen()
      }
    } else {
      document.body.style.overflow = 'unset'
      if (document.fullscreenElement) {
        const doc = document as Document & {
          webkitExitFullscreen?: () => void
          mozCancelFullScreen?: () => void
          msExitFullscreen?: () => void
        }
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {})
        } else if (doc.webkitExitFullscreen) {
          doc.webkitExitFullscreen()
        } else if (doc.mozCancelFullScreen) {
          doc.mozCancelFullScreen()
        } else if (doc.msExitFullscreen) {
          doc.msExitFullscreen()
        }
      }
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handlePrevious = () => {
    setPrevIndex(currentIndex)
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setPrevIndex(currentIndex)
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleIndexChange = (index: number) => {
    if (index !== currentIndex) {
      setPrevIndex(currentIndex)
      setCurrentIndex(index)
    }
  }

  const clampScale = (value: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value))

  useEffect(() => {
    const imageArea = imageAreaRef.current
    if (!imageArea || !isOpen) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const zoomFactor = e.deltaY < 0 ? 1.12 : 0.88
      setScale((prev) => {
        const next = clampScale(prev * zoomFactor)
        if (next <= 1) {
          setTranslate({ x: 0, y: 0 })
        }
        return next
      })
    }

    imageArea.addEventListener('wheel', handleWheel, { passive: false })
    return () => imageArea.removeEventListener('wheel', handleWheel)
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') {
        if (scale > 1) {
          resetZoom()
          return
        }
        if (document.fullscreenElement) {
          document.exitFullscreen?.().then(() => onClose()).catch(() => onClose())
        } else {
          onClose()
        }
      } else if (e.key === 'ArrowLeft' && scale <= 1) {
        handlePrevious()
      } else if (e.key === 'ArrowRight' && scale <= 1) {
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, scale, resetZoom, currentIndex, images.length])

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isOpen) {
        onClose()
      }
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [isOpen, onClose])

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsInteracting(true)
    if (e.touches.length === 2) {
      lastPinchDistance.current = getTouchDistance(e.touches)
      lastPanPoint.current = null
    } else if (e.touches.length === 1 && scale > 1) {
      lastPanPoint.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastPinchDistance.current !== null) {
      e.preventDefault()
      const distance = getTouchDistance(e.touches)
      const ratio = distance / lastPinchDistance.current
      setScale((prev) => {
        const next = clampScale(prev * ratio)
        if (next <= 1) {
          setTranslate({ x: 0, y: 0 })
        }
        return next
      })
      lastPinchDistance.current = distance
    } else if (e.touches.length === 1 && scale > 1 && lastPanPoint.current) {
      e.preventDefault()
      const dx = e.touches[0].clientX - lastPanPoint.current.x
      const dy = e.touches[0].clientY - lastPanPoint.current.y
      setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }))
      lastPanPoint.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
  }

  const handleTouchEnd = () => {
    lastPinchDistance.current = null
    lastPanPoint.current = null
    setIsInteracting(false)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return
    setIsInteracting(true)
    isDragging.current = true
    lastPanPoint.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !lastPanPoint.current || scale <= 1) return
    const dx = e.clientX - lastPanPoint.current.x
    const dy = e.clientY - lastPanPoint.current.y
    setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }))
    lastPanPoint.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseUp = () => {
    isDragging.current = false
    lastPanPoint.current = null
    setIsInteracting(false)
  }

  const handleClose = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().then(() => onClose()).catch(() => onClose())
    } else {
      onClose()
    }
  }

  if (!isOpen || images.length === 0) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      onClick={handleClose}
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleClose()
        }}
        className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
        aria-label="Kapat"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {images.length > 1 && scale <= 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handlePrevious()
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
          aria-label="Önceki"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {images.length > 1 && scale <= 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleNext()
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
          aria-label="Sonraki"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <div
        ref={imageAreaRef}
        className="relative w-full h-full flex items-center justify-center overflow-hidden touch-none select-none"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: scale > 1 ? 'grab' : 'default' }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {prevIndex !== currentIndex && scale <= 1 && (
            <div
              key={`prev-${prevIndex}`}
              className="absolute inset-0 w-full h-full animate-fade-out pointer-events-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[prevIndex]}
                alt={`Görüntü ${prevIndex + 1}`}
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>
          )}

          <div
            key={`current-${currentIndex}`}
            className={`absolute inset-0 w-full h-full flex items-center justify-center ${scale <= 1 ? 'animate-fade-in' : ''}`}
            style={{
              transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
              transition: isInteracting ? 'none' : 'transform 0.08s ease-out',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[currentIndex]}
              alt={`Görüntü ${currentIndex + 1}`}
              className="max-w-full max-h-full w-auto h-auto object-contain"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-white text-sm bg-black/50 px-4 py-2 rounded-full pointer-events-none">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {images.length > 1 && images.length <= 10 && scale <= 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-2 max-w-4xl overflow-x-auto px-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                handleIndexChange(index)
              }}
              className={`relative w-20 h-20 flex-shrink-0 rounded overflow-hidden border-2 transition-all ${
                currentIndex === index
                  ? 'border-white scale-110'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
                quality={75}
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
