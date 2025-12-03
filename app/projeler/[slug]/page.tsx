'use client'

import Image from 'next/image'
import Link from 'next/link'
import ImageGallery from '@/components/ImageGallery'
import { useState } from 'react'
import { projects } from '../data'

interface ProjectDetailPageProps {
  params: { slug: string }
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = params
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [initialImageIndex, setInitialImageIndex] = useState(0)

  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Proje Bulunamadı
          </h1>
          <Link
            href="/projeler"
            onClick={() => {
              // Link tıklandığında hemen animasyonu başlat
              if (typeof window !== 'undefined' && (window as any).__pageTransitionStart) {
                (window as any).__pageTransitionStart()
              }
            }}
            className="text-vizon-800 hover:text-vizon-700 underline"
          >
            Projeler sayfasına dön
          </Link>
        </div>
      </div>
    )
  }

  const firstImage = project.images[0]

  const handleImageClick = (index: number) => {
    setInitialImageIndex(index)
    setIsGalleryOpen(true)
  }

  const remainingImages = project.images.slice(1)

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Link
          href="/projeler"
          onClick={() => {
            // Link tıklandığında hemen animasyonu başlat
            if (typeof window !== 'undefined' && (window as any).__pageTransitionStart) {
              (window as any).__pageTransitionStart()
            }
          }}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
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
          Projelere Dön
        </Link>
      </div>

      {/* Main Content: Title/Description on Left, Images on Right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side: Title and Description */}
          <div className="lg:sticky lg:top-24">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-3">
              {project.title}
            </h1>
            <p className="text-sm md:text-base text-gray-400 font-light mb-6">
              {project.location} / {project.type}
            </p>
            <div className="prose prose-lg max-w-none">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          {/* Right Side: First Image Large, Others Small Below */}
          <div className="space-y-4">
            {/* First Image - Large */}
            <div 
              className="relative w-full aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => handleImageClick(0)}
            >
              <Image
                src={firstImage}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={95}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                unoptimized
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            {/* Remaining Images - Small Grid */}
            {remainingImages.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {remainingImages.map((image, index) => (
                  <div
                    key={index + 1}
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() => handleImageClick(index + 1)}
                  >
                    <Image
                      src={image}
                      alt={`${project.title} - Görsel ${index + 2}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      quality={85}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      <ImageGallery
        images={project.images}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialIndex={initialImageIndex}
      />
    </div>
  )
}



