'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface ImageGalleryProps {
  images: string[]
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
}

export default function ImageGallery({ images, isOpen, onClose, initialIndex = 0 }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex, isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex])

  if (!isOpen || images.length === 0) return null

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
        aria-label="Kapat"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handlePrevious()
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
          aria-label="Önceki"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleNext()
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
          aria-label="Sonraki"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* Image Container */}
      <div
        className="relative max-w-7xl w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-h-[90vh] aspect-auto flex items-center justify-center">
          <div className="relative w-full h-full min-h-[400px] max-h-[90vh]">
            <Image
              src={images[currentIndex]}
              alt={`Görüntü ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
          </div>
        </div>
      </div>

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Thumbnail Navigation */}
      {images.length > 1 && images.length <= 10 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-2 max-w-4xl overflow-x-auto px-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                setCurrentIndex(index)
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
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

