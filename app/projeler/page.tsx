'use client'

import PanoramaViewer from '@/components/PanoramaViewer'

const panoramaImages = [
  {
    id: 1,
    title: 'Comfy Cafe',
    src: '/panoramik/comfy_cafe.jpg',
    category: 'Restoran & Kafe',
  },
  {
    id: 2,
    title: 'Warm Restaurant',
    src: '/panoramik/warm_restaurant.jpg',
    category: 'Restoran & Kafe',
  },
]

const projects = [
  {
    id: 1,
    title: 'Modern Konut Projesi',
    category: 'Konut',
    description: 'Çağdaş yaşam alanları için tasarlanmış modern konut projesi',
  },
  {
    id: 2,
    title: 'Lüks Ofis Alanı',
    category: 'Ofis & Ticari',
    description: 'Profesyonel çalışma ortamları için tasarlanmış ofis alanı',
  },
  {
    id: 3,
    title: 'Şık Restoran Tasarımı',
    category: 'Restoran & Kafe',
    description: 'Zarif ve konforlu bir atmosfer sunan restoran tasarımı',
  },
]

export default function ProjelerPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-vizon-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Projelerimiz
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Yaratıcılığımızın ve uzmanlığımızın yansıması olan projelerimizi keşfedin
          </p>
        </div>
      </section>

      {/* Panoramic Images Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              360° Panoramik Görüntüler
            </h2>
            <p className="text-lg text-gray-600">
              Projelerimizi interaktif panoramik görüntülerle keşfedin
            </p>
          </div>

          <div className="space-y-16">
            {panoramaImages.map((image) => (
              <PanoramaViewer
                key={image.id}
                imageSrc={image.src}
                title={image.title}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Proje Kategorileri
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <span className="text-sm font-medium text-gray-500 mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                  {project.title}
                </h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}




