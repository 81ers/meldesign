export default function HakkimizdaPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Hakkımızda
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tasarım anlayışımız ve ekibimiz hakkında bilgi edinin
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              Kuruluş Hikâyemiz
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              İçerik yakında eklenecek...
            </p>

            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 mt-12">
              Misyon & Vizyon
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              İçerik yakında eklenecek...
            </p>

            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 mt-12">
              Ekip
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              İçerik yakında eklenecek...
            </p>

            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 mt-12">
              Tasarım Yaklaşımımız
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              İçerik yakında eklenecek...
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

