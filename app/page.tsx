'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const bgImages = [
  '/bg/Screenshot_20251121_150406_Instagram.webp',
  '/bg/Screenshot_20251121_150417_Instagram.webp',
  '/bg/Screenshot_20251121_150424_Instagram.webp',
]

const featuredProjects = [
  {
    id: 1,
    title: "LINS'S CONCEPT",
    category: 'Mağaza',
    location: 'Düzce',
    image: '/projeler/LINSSCONCEPT/LINS2.webp',
    slug: 'lins-concept',
  },
  {
    id: 2,
    title: 'VİLLA TRE',
    category: 'Konut',
    location: 'Düzce',
    image: '/projeler/Villatreduzce/2.webp',
    slug: 'villa-tre',
  },
  {
    id: 3,
    title: 'GANİTA',
    category: 'Restoran',
    location: 'Bolu',
    image: '/projeler/ganitabolu/RENDER1.webp',
    slug: 'ganita',
  },
]

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [currentBgIndex, setCurrentBgIndex] = useState(0)
  const [viewportHeight, setViewportHeight] = useState('100vh')

  useEffect(() => {
    // Body background'unu kaldır (ana sayfa için)
    document.body.style.background = 'transparent'
    
    // Mobil viewport bug düzeltmesi - gerçek viewport yüksekliğini hesapla
    const setRealViewportHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      setViewportHeight(`${window.innerHeight}px`)
    }

    // İlk yüklemede ve resize'da çalıştır
    // Küçük bir gecikme ile çalıştır (mobil tarayıcıların viewport'u düzgün hesaplaması için)
    const initViewport = () => {
      setRealViewportHeight()
      // Kısa bir süre sonra tekrar kontrol et
      setTimeout(setRealViewportHeight, 100)
    }
    
    initViewport()
    window.addEventListener('resize', setRealViewportHeight)
    window.addEventListener('orientationchange', () => {
      setTimeout(setRealViewportHeight, 100)
    })
    // Visual viewport API kullan (destekleniyorsa)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', setRealViewportHeight)
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset
      setScrollY(scrollPosition)
      // Scroll pozisyonuna göre arkaplan resmini değiştir
      const newIndex = Math.min(
        Math.floor(scrollPosition / 500),
        bgImages.length - 1
      )
      setCurrentBgIndex(newIndex)
    }

    // İlk render'da da çalıştır
    handleScroll()

    // Scroll event listener ekle
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', setRealViewportHeight)
      window.removeEventListener('orientationchange', setRealViewportHeight)
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', setRealViewportHeight)
      }
      // Body background'unu geri yükle
      document.body.style.background = ''
    }
  }, [])

  return (
    <div className="relative min-h-screen" style={{ minHeight: viewportHeight }}>
      {/* Fixed Background for entire page */}
      <div 
        className="fixed -z-10"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: viewportHeight,
          minHeight: '100vh',
        }}
      >
        {bgImages.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: viewportHeight,
              minHeight: '100vh',
            }}
          >
            <Image
              src={bg}
              alt={`Arkaplan ${index + 1}`}
              fill
              className="object-cover"
              quality={90}
              priority={index === 0}
              sizes="100vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              unoptimized
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section 
        className="relative flex items-center justify-center overflow-hidden z-10"
        style={{ height: viewportHeight, minHeight: '100vh' }}
      >
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 animate-fade-in">
            mel design studio
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 font-light">
            Zarif ve modern iç mimarlık çözümleri
          </p>
          <p className="text-lg text-white mb-12 max-w-2xl mx-auto">
            Yaratıcı tasarım anlayışımızla mekanlarınıza değer katıyoruz
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projeler"
              className="px-8 py-3 bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Projelerimiz
            </Link>
            <Link
              href="/iletisim"
              className="px-8 py-3 border-2 border-white text-white font-medium hover:bg-white/10 transition-colors duration-200"
            >
              İletişime Geçin
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 bg-transparent drop-shadow-lg">
              Öne Çıkan Projeler
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto bg-transparent drop-shadow-md">
              Yaratıcılığımızın ve uzmanlığımızın yansıması olan seçkin projelerimiz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Link
                key={project.id}
                href={`/projeler/${project.slug}`}
                onClick={() => {
                  // Link tıklandığında hemen animasyonu başlat
                  if (typeof window !== 'undefined' && (window as any).__pageTransitionStart) {
                    (window as any).__pageTransitionStart()
                  }
                }}
                className="group relative overflow-hidden bg-gray-100 aspect-[4/3]"
              >
                <div className="absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    quality={90}
                    priority={index === 0}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="text-sm font-medium text-white/80 mb-2 block">
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1).toLowerCase()} / {project.location.charAt(0).toUpperCase() + project.location.slice(1).toLowerCase()}
                  </span>
                  <h3 className="text-2xl font-serif font-bold">
                    {project.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/projeler"
              onClick={() => {
                // Link tıklandığında hemen animasyonu başlat
                if (typeof window !== 'undefined' && (window as any).__pageTransitionStart) {
                  (window as any).__pageTransitionStart()
                }
              }}
              className="inline-block px-8 py-3 bg-vizon-700 text-gray-900 font-medium hover:bg-vizon-600 transition-colors duration-200"
            >
              Tüm Projelerimizi Görüntüleyin
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

