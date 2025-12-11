'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Sadece ana sayfada scroll ile renk değişimi olsun
    if (pathname !== '/') {
      setIsScrolled(true)
      return
    }

    // Menü açıkken scroll event'ini dinleme (animasyon takılmasını önlemek için)
    if (isMobileMenuOpen || isClosing) {
      return
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname, isMobileMenuOpen, isClosing])

  const navItems = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/projeler', label: 'Projeler' },
    { href: '/hizmetler', label: 'Hizmetler' },
    { href: '/teklif-alin', label: 'Teklif Alın', isSpecial: true },
    { href: '/hakkimizda', label: 'Hakkımızda' },
    { href: '/iletisim', label: 'İletişim' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <span className={`text-2xl font-serif font-bold ${
              pathname === '/' && !isScrolled ? 'text-white' : 'text-gray-900'
            }`}>
              mel design studio
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isCurrentPage = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    // Eğer aynı sayfadaysak, link tıklamasını engelle
                    if (isCurrentPage) {
                      e.preventDefault()
                      return
                    }
                    // Link tıklandığında hemen animasyonu başlat
                    if (typeof window !== 'undefined' && (window as any).__pageTransitionStart) {
                      (window as any).__pageTransitionStart()
                    }
                  }}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    item.isSpecial
                      ? pathname === '/' && !isScrolled
                        ? 'px-4 py-2 border-2 border-vizon-700 text-white hover:bg-vizon-700/20'
                        : 'px-4 py-2 border-2 border-vizon-700 text-gray-700 hover:bg-vizon-700 hover:text-white'
                      : pathname === '/' && !isScrolled
                      ? pathname === item.href
                        ? 'text-white border-b-2 border-white cursor-default'
                        : 'text-white hover:text-white/80'
                      : pathname === item.href
                      ? 'text-gray-900 border-b-2 border-gray-900 cursor-default'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 relative w-8 h-8 flex flex-col justify-center items-center ${pathname === '/' && !isScrolled ? 'text-white' : 'text-gray-700'}`}
            onClick={() => {
              if (isMobileMenuOpen) {
                setIsClosing(true)
                // Container animasyonu bitene kadar bekle (750ms delay + 500ms animasyon)
                setTimeout(() => {
                  setIsMobileMenuOpen(false)
                  setIsClosing(false)
                }, 50)
              } else {
                setIsClosing(false)
                setIsMobileMenuOpen(true)
              }
            }}
            aria-label="Menu"
          >
            <span
              className={`absolute w-6 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen
                  ? 'rotate-45 translate-y-0'
                  : '-translate-y-2'
              }`}
            />
            <span
              className={`absolute w-6 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute w-6 h-0.5 bg-current transition-all duration-300 ${
                isMobileMenuOpen
                  ? '-rotate-45 translate-y-0'
                  : 'translate-y-2'
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {(isMobileMenuOpen || isClosing) && (
          <div 
            className={`md:hidden pb-4 backdrop-blur-md ${
              pathname === '/' && !isScrolled
                ? 'bg-black/40'
                : 'bg-white/95'
            } ${
              isClosing 
                ? 'animate-fade-out' 
                : 'animate-fade-in'
            }`}
            style={{
              animationDelay: isClosing ? '0ms' : '0ms',
            }}
          >
            {navItems.map((item, index) => {
              const isTransparentMode = pathname === '/' && !isScrolled
              const isCurrentPage = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    // Eğer aynı sayfadaysak, sadece menüyü kapat
                    if (isCurrentPage) {
                      e.preventDefault()
                      setIsClosing(true)
                      setTimeout(() => {
                        setIsMobileMenuOpen(false)
                        setIsClosing(false)
                      }, 200)
                      return
                    }
                    // Link tıklandığında hemen animasyonu başlat
                    if (typeof window !== 'undefined' && (window as any).__pageTransitionStart) {
                      (window as any).__pageTransitionStart()
                    }
                    setIsClosing(true)
                    // Menüyü anında kapat
                    setTimeout(() => {
                      setIsMobileMenuOpen(false)
                      setIsClosing(false)
                    }, 200)
                  }}
                  className={`block px-4 py-2 text-sm font-medium ${
                    isClosing ? 'animate-fade-out-down' : 'animate-fade-in-up'
                  } ${
                    item.isSpecial
                      ? isTransparentMode
                        ? 'mx-4 my-2 text-center border-2 border-white text-white hover:bg-white/20'
                        : 'mx-4 my-2 text-center border-2 border-vizon-700 text-gray-700 hover:bg-vizon-700 hover:text-white'
                      : isTransparentMode
                      ? pathname === item.href
                        ? 'text-white bg-white/20'
                        : 'text-white hover:text-white/80 hover:bg-white/10'
                      : pathname === item.href
                      ? 'text-gray-900 bg-gray-50'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'both',
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}

