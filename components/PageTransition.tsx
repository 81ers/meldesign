'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

// Global state için event system
if (typeof window !== 'undefined') {
  (window as any).__pageTransitionStart = () => {}
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const isFirstRender = useRef(true)
  const prevPathnameRef = useRef(pathname)
  const [displayChildren, setDisplayChildren] = useState(children)
  const transitionStartedRef = useRef(false)

  useEffect(() => {
    // Global event listener - link tıklandığında hemen animasyonu başlat
    const handleTransitionStart = () => {
      transitionStartedRef.current = true
      setIsVisible(false)
      setIsLoading(true)
    }

    if (typeof window !== 'undefined') {
      (window as any).__pageTransitionStart = handleTransitionStart
    }

    // Next.js router event'lerini dinle
    const handleRouteChange = () => {
      if (!transitionStartedRef.current) {
        handleTransitionStart()
      }
    }

    // Link tıklamalarını yakala
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href]')
      if (link && (link as HTMLAnchorElement).href.startsWith(window.location.origin)) {
        const href = (link as HTMLAnchorElement).getAttribute('href')
        if (href && href !== pathname && !href.startsWith('#')) {
          handleTransitionStart()
        }
      }
    }

    document.addEventListener('click', handleLinkClick, true)

    return () => {
      if (typeof window !== 'undefined') {
        (window as any).__pageTransitionStart = () => {}
      }
      document.removeEventListener('click', handleLinkClick, true)
    }
  }, [pathname])

  useEffect(() => {
    // İlk render'da animasyonu atla, içeriği hemen göster
    if (isFirstRender.current) {
      isFirstRender.current = false
      prevPathnameRef.current = pathname
      setDisplayChildren(children)
      // İlk yüklemede animasyon yok, içerik hemen görünür
      return
    }

    // Pathname değiştiğinde hemen içeriği gizle ve loading göster
    if (prevPathnameRef.current !== pathname) {
      // Eğer transition başlatılmadıysa, şimdi başlat
      if (!transitionStartedRef.current) {
        setIsVisible(false)
        setIsLoading(true)
      }
      
      setDisplayChildren(children)
      
      // Kısa bir delay sonra animasyonu başlat
      const timer1 = setTimeout(() => {
        setIsLoading(false)
        const timer2 = setTimeout(() => {
          setIsVisible(true)
          transitionStartedRef.current = false
        }, 30)
        return () => clearTimeout(timer2)
      }, 100)

      prevPathnameRef.current = pathname
      return () => clearTimeout(timer1)
    } else {
      // Pathname aynı ama children değişti (aynı sayfada içerik güncellendi)
      setDisplayChildren(children)
      transitionStartedRef.current = false
    }
  }, [pathname, children])

  return (
    <>
      {/* Beyaz arkaplan overlay - her zaman render et, opacity ile kontrol et */}
      <div 
        className={`fixed inset-0 bg-white z-40 transition-opacity duration-200 ease-in-out ${
          isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ willChange: 'opacity' }}
      />
      {/* Sayfa içeriği - fade-in animasyonu ile */}
      <div 
        key={pathname}
        className={`transition-opacity duration-500 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          willChange: 'opacity',
          // İçerik görünür değilse pointer events'i devre dışı bırak
          pointerEvents: isVisible ? 'auto' : 'none',
          // İçerik görünür değilse visibility de gizle
          visibility: isVisible ? 'visible' : 'hidden'
        }}
      >
        {displayChildren}
      </div>
    </>
  )
}

