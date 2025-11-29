'use client'

import Image from 'next/image'
import Link from 'next/link'
import ImageGallery from '@/components/ImageGallery'
import { useState } from 'react'
import { projects } from '../page'

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

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/projeler"
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

      {/* Hero Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-12">
        <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => handleImageClick(0)}
        >
          <Image
            src={firstImage}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </div>

      {/* Project Info */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">
          {project.title}
        </h1>
        <p className="text-sm md:text-base text-gray-400 font-light mb-4">
          {project.location} / {project.type}
        </p>
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 leading-relaxed text-sm">
            {project.description}
          </p>
        </div>
      </div>

      {/* Image Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
          Proje Görselleri
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {project.images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={image}
                alt={`${project.title} - Görsel ${index + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
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

