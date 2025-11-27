'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const bgImages = [
  '/bg/Screenshot_20251121_150406_Instagram.jpg',
  '/bg/Screenshot_20251121_150417_Instagram.jpg',
  '/bg/Screenshot_20251121_150424_Instagram.jpg',
]

const featuredProjects = [
  {
    id: 1,
    title: 'Modern Konut Projesi',
    category: 'Konut',
    image: '/bg/Screenshot_20251121_150406_Instagram.jpg',
  },
  {
    id: 2,
    title: 'Lüks Ofis Alanı',
    category: 'Ofis & Ticari',
    image: '/bg/Screenshot_20251121_150417_Instagram.jpg',
  },
  {
    id: 3,
    title: 'Şık Restoran Tasarımı',
    category: 'Restoran & Kafe',
    image: '/bg/Screenshot_20251121_150424_Instagram.jpg',
  },
]

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [currentBgIndex, setCurrentBgIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      // Scroll pozisyonuna göre arkaplan resmini değiştir
      const newIndex = Math.min(
        Math.floor(window.scrollY / 500),
        bgImages.length - 1
      )
      setCurrentBgIndex(newIndex)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Fixed Background for entire page */}
      <div className="fixed inset-0 -z-10">
        {bgImages.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden z-10">
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 animate-fade-in">
            mel design studio
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
            Zarif ve modern iç mimarlık çözümleri
          </p>
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
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
                href="/projeler"
                className="group relative overflow-hidden bg-gray-100 aspect-[4/3]"
              >
                <div className="absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="text-sm font-medium text-white/80 mb-2 block">
                    {project.category}
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
              className="inline-block px-8 py-3 bg-red-950 text-white font-medium hover:bg-red-900 transition-colors duration-200"
            >
              Tüm Projeleri Görüntüle
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

