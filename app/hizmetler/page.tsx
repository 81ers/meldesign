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
      <section className="bg-gray-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Hizmetlerimiz
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
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
                className="bg-gray-50 p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

