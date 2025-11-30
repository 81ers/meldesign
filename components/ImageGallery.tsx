'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface ImageGalleryProps {
  images: string[]
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
}

export default function ImageGallery({ images, isOpen, onClose, initialIndex = 0 }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [prevIndex, setPrevIndex] = useState(initialIndex)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentIndex(initialIndex)
    setPrevIndex(initialIndex)
  }, [initialIndex, isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Fullscreen moduna geç
      if (containerRef.current) {
        const element = containerRef.current as HTMLElement & {
          requestFullscreen?: () => Promise<void>
        }
        if (element.requestFullscreen) {
          element.requestFullscreen().catch((err) => {
            console.log('Fullscreen hatası:', err)
          })
        } else if ((element as any).webkitRequestFullscreen) {
          (element as any).webkitRequestFullscreen()
        } else if ((element as any).mozRequestFullScreen) {
          (element as any).mozRequestFullScreen()
        } else if ((element as any).msRequestFullscreen) {
          (element as any).msRequestFullscreen()
        }
      }
    } else {
      document.body.style.overflow = 'unset'
      // Fullscreen'den çık
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch((err) => {
            console.log('Exit fullscreen hatası:', err)
          })
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen()
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen()
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen()
        }
      }
    }
    return () => {
      document.body.style.overflow = 'unset'
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {})
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen()
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen()
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen()
        }
      }
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') {
        // ESC ile fullscreen'den çık ve albümü kapat
        if (document.fullscreenElement) {
          if (document.exitFullscreen) {
            document.exitFullscreen().then(() => {
              onClose()
            }).catch(() => {
              onClose()
            })
          } else {
            onClose()
          }
        } else {
          onClose()
        }
      } else if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, images.length, onClose])

  // Fullscreen değişikliklerini dinle
  useEffect(() => {
    const handleFullscreenChange = () => {
      // Eğer fullscreen'den çıkıldıysa albümü kapat
      if (!document.fullscreenElement && isOpen) {
        onClose()
      }
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [isOpen, onClose])

  if (!isOpen || images.length === 0) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          if (document.fullscreenElement) {
            if (document.exitFullscreen) {
              document.exitFullscreen().then(() => {
                onClose()
              }).catch(() => {
                onClose()
              })
            } else {
              onClose()
            }
          } else {
            onClose()
          }
        }}
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

      {/* Image Container - Tam Ekran */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Önceki resim - fade out (sadece geçiş sırasında) */}
          {prevIndex !== currentIndex && (
            <div
              key={`prev-${prevIndex}`}
              className="absolute inset-0 w-full h-full animate-fade-out pointer-events-none"
            >
              <Image
                src={images[prevIndex]}
                alt={`Görüntü ${prevIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                quality={95}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          )}
          {/* Yeni resim - fade in */}
          <div
            key={`current-${currentIndex}`}
            className="absolute inset-0 w-full h-full animate-fade-in"
          >
            <Image
              src={images[currentIndex]}
              alt={`Görüntü ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority={currentIndex === initialIndex}
              sizes="100vw"
              quality={90}
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
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
