import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hizmetlerimiz | mel design studio',
  description: 'İç mimarlık tasarımı, 3D modelleme, proje yönetimi ve anahtar teslim proje hizmetleri. Düzce merkezli profesyonel iç mimarlık çözümleri.',
}

export default function HizmetlerPage() {
  const services = [
    {
      id: 1,
      title: 'İç Mimarlık Tasarımı',
      description: 'İçerik yakında eklenecek...',
    },
    {
      id: 2,
      title: 'Uygulama ve Proje Yönetimi',
      description: 'İçerik yakında eklenecek...',
    },
    {
      id: 3,
      title: '3D Modelleme & Render',
      description: 'İçerik yakında eklenecek...',
    },
    {
      id: 4,
      title: 'Danışmanlık',
      description: 'İçerik yakında eklenecek...',
    },
    {
      id: 5,
      title: 'Anahtar Teslim Proje',
      description: 'İçerik yakında eklenecek...',
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-vizon-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-3 text-white">
            Hizmetlerimiz
          </h1>
          <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto">
            Sunduğumuz profesyonel iç mimarlık hizmetleri
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-gray-50 p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-2xl font-serif font-bold text-gray-900">
                  {service.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}




