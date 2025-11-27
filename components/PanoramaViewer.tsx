'use client'

import { useEffect, useRef, useState } from 'react'

interface PanoramaViewerProps {
  imageSrc: string
  title?: string
}

declare global {
  interface Window {
    PANOLENS: any
    THREE: any
  }
}

// Script yükleme durumunu takip et
let scriptsLoaded = false
let scriptsLoading = false
const scriptLoadPromise = new Promise<void>((resolve) => {
  if (typeof window === 'undefined') {
    resolve()
    return
  }

  const checkLibraries = () => {
    if (window.THREE && window.PANOLENS) {
      scriptsLoaded = true
      resolve()
      return true
    }
    return false
  }

  // Zaten yüklü mü kontrol et
  if (checkLibraries()) {
    return
  }

  // Yükleniyor mu kontrol et
  if (scriptsLoading) {
    return
  }

  scriptsLoading = true

  // Three.js yükle
  const loadThree = () => {
    return new Promise<void>((resolveThree) => {
      if (window.THREE) {
        resolveThree()
        return
      }

      const existingThree = document.querySelector('script[data-three]')
      if (existingThree) {
        const checkInterval = setInterval(() => {
          if (window.THREE) {
            clearInterval(checkInterval)
            resolveThree()
          }
        }, 50)
        return
      }

      const threeScript = document.createElement('script')
      threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r105/three.min.js'
      threeScript.async = true
      threeScript.setAttribute('data-three', 'true')
      threeScript.onload = () => resolveThree()
      threeScript.onerror = () => {
        console.error('Three.js yüklenemedi')
        resolveThree()
      }
      document.head.appendChild(threeScript)
    })
  }

  // Panolens.js yükle
  const loadPanolens = () => {
    return new Promise<void>((resolvePanolens) => {
      if (window.PANOLENS) {
        resolvePanolens()
        return
      }

      const existingPanolens = document.querySelector('script[data-panolens]')
      if (existingPanolens) {
        const checkInterval = setInterval(() => {
          if (window.PANOLENS) {
            clearInterval(checkInterval)
            resolvePanolens()
          }
        }, 50)
        return
      }

      const panolensScript = document.createElement('script')
      panolensScript.src = 'https://cdn.jsdelivr.net/npm/panolens@0.11.0/build/panolens.min.js'
      panolensScript.async = true
      panolensScript.setAttribute('data-panolens', 'true')
      panolensScript.onload = () => resolvePanolens()
      panolensScript.onerror = () => {
        console.error('Panolens.js yüklenemedi')
        resolvePanolens()
      }
      document.head.appendChild(panolensScript)
    })
  }

  // Sırayla yükle
  loadThree()
    .then(() => loadPanolens())
    .then(() => {
      // Kısa bir gecikme ekle
      setTimeout(() => {
        if (checkLibraries()) {
          scriptsLoaded = true
          resolve()
        } else {
          // Tekrar dene
          setTimeout(() => {
            if (checkLibraries()) {
              scriptsLoaded = true
              resolve()
            } else {
              console.error('Kütüphaneler yüklenemedi')
              resolve()
            }
          }, 500)
        }
      }, 200)
    })
})

export default function PanoramaViewer({ imageSrc, title }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<any>(null)
  const wheelHandlerRef = useRef<((event: WheelEvent) => void) | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    let isMounted = true

    const initializeViewer = async () => {
      try {
        // Script'lerin yüklenmesini bekle
        await scriptLoadPromise

        if (!isMounted || !containerRef.current) return

        // Kütüphaneler yüklü mü kontrol et
        if (!window.THREE || !window.PANOLENS) {
          throw new Error('Kütüphaneler yüklenemedi')
        }

        // Eski viewer'ı temizle
        if (viewerRef.current) {
          try {
            viewerRef.current.dispose()
          } catch (e) {
            console.warn('Eski viewer temizlenirken hata:', e)
          }
          viewerRef.current = null
        }

        // Container'ı temizle
        if (containerRef.current) {
          containerRef.current.innerHTML = ''
        }

        // Container kontrolü
        if (!containerRef.current) {
          throw new Error('Container bulunamadı')
        }

        // Viewer oluştur
        const viewer = new window.PANOLENS.Viewer({
          container: containerRef.current,
          autoRotate: false,
          autoRotateSpeed: 0.3,
          controlBar: true,
          cameraFov: 75,
        })

        // Viewer'ın düzgün oluşturulduğunu kontrol et
        if (!viewer || !viewer.container) {
          throw new Error('Viewer oluşturulamadı')
        }

        // Panolens'in kendi zoom kontrolünü devre dışı bırak
        if (viewer.OrbitControls) {
          const controls = viewer.OrbitControls
          if (controls) {
            controls.enableZoom = false
          }
        }

        // Zoom kontrolünü düzelt - geriye scroll = zoom out, ileriye scroll = zoom in
        const handleWheel = (event: WheelEvent) => {
          event.preventDefault()
          event.stopPropagation()
          if (viewer && viewer.camera && containerRef.current) {
            const fov = viewer.camera.fov
            // Geriye scroll (deltaY pozitif) = zoom out (fov artmalı)
            // İleriye scroll (deltaY negatif) = zoom in (fov azalmalı)
            const newFov = fov + event.deltaY * 0.1
            viewer.camera.fov = Math.max(30, Math.min(120, newFov))
            viewer.camera.updateProjectionMatrix()
          }
        }
        
        wheelHandlerRef.current = handleWheel
        if (containerRef.current) {
          containerRef.current.addEventListener('wheel', handleWheel, { passive: false, capture: true })
        }

        // Panorama oluştur - tam yol kullan
        const fullImagePath = imageSrc.startsWith('/') 
          ? imageSrc 
          : `/${imageSrc}`
        
        if (!window.PANOLENS.ImagePanorama) {
          throw new Error('Panolens ImagePanorama bulunamadı')
        }

        const panorama = new window.PANOLENS.ImagePanorama(fullImagePath)

        if (!panorama) {
          throw new Error('Panorama oluşturulamadı')
        }

        // Panorama yükleme event'leri
        panorama.addEventListener('load', () => {
          console.log('Panorama yüklendi:', fullImagePath)
          if (isMounted && viewer) {
            setIsLoading(false)
            setError(null)
          }
        })

        panorama.addEventListener('progress', (event: any) => {
          console.log('Panorama yükleme ilerlemesi:', event)
        })

        panorama.addEventListener('error', (err: any) => {
          console.error('Panorama yükleme hatası:', err, 'Yol:', fullImagePath)
          if (isMounted) {
            setError(`Resim yüklenemedi: ${fullImagePath}`)
            setIsLoading(false)
          }
        })

        // Viewer'a panorama ekle
        if (viewer && viewer.add) {
          viewer.add(panorama)
        } else {
          throw new Error('Viewer add metodu bulunamadı')
        }

        viewerRef.current = viewer

        // Viewer'ın render'ını başlat
        if (viewer && typeof viewer.render === 'function') {
          try {
            viewer.render()
          } catch (renderError) {
            console.warn('Viewer render hatası:', renderError)
          }
        }
      } catch (err) {
        console.error('Viewer oluşturma hatası:', err)
        if (isMounted) {
          setError('Panoramik görüntü oluşturulurken bir hata oluştu')
          setIsLoading(false)
        }
      }
    }

    initializeViewer()

    // Cleanup
    return () => {
      isMounted = false
      if (wheelHandlerRef.current && containerRef.current) {
        containerRef.current.removeEventListener('wheel', wheelHandlerRef.current)
        wheelHandlerRef.current = null
      }
      if (viewerRef.current) {
        try {
          viewerRef.current.dispose()
        } catch (err) {
          console.error('Viewer temizleme hatası:', err)
        }
        viewerRef.current = null
      }
    }
  }, [imageSrc])

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
          {title}
        </h3>
      )}
      <div className="relative w-full rounded-lg overflow-hidden bg-red-950" style={{ height: '600px' }}>
        <div
          ref={containerRef}
          className="w-full h-full"
        />
        {isLoading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-950 z-10">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Yükleniyor...</p>
            </div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-950 z-10">
            <div className="text-white text-center px-4">
              <p className="mb-2 text-red-400">{error}</p>
              <p className="text-sm text-gray-400">Resim yolu: {imageSrc}</p>
              <p className="text-xs text-gray-500 mt-2">Tarayıcı konsolunu kontrol edin (F12)</p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Mouse ile sürükleyerek döndürebilir, scroll ile zoom yapabilirsiniz</p>
      </div>
    </div>
  )
}
