'use client'

import Image from 'next/image'
import Link from 'next/link'
import { projects } from './data'

export default function ProjelerPage() {
  // Tüm projeleri göster - lazy load yok
  const displayedProjects = projects

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-vizon-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-3 text-white">
            Projelerimiz
          </h1>
          <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto">
            Yaratıcılığımızın ve uzmanlığımızın yansıması olan projelerimizi keşfedin
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 -mt-[70px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {displayedProjects.map((project) => {
              const firstImage = project.images[0]
              return (
                <Link
                  key={project.id}
                  href={`/projeler/${project.slug}`}
                  className="group block bg-white overflow-hidden hover:shadow-xl transition-all duration-300 w-full max-w-[500px]"
                >
                  {/* Image Container - 500x400 piksel */}
                  <div className="relative w-[500px] h-[400px] overflow-hidden">
                    <Image
                      src={firstImage}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 500px"
                      quality={90}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      unoptimized
                    />
                  </div>
                  
                  {/* Text Container - Altta */}
                  <div className="p-6">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
                      {project.title}
                    </h2>
                    <p className="text-sm md:text-base text-gray-400 font-light">
                      {project.location} / {project.type}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
