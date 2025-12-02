import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* 404 Sayı */}
          <h1 className="text-9xl md:text-[12rem] font-serif font-bold text-gray-200 mb-4">
            404
          </h1>
          
          {/* Başlık */}
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Sayfa Bulunamadı
          </h2>
          
          {/* Açıklama */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          </p>
          
          {/* Butonlar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Ana Sayfaya Dön
            </Link>
            <Link
              href="/projeler"
              className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-colors duration-200"
            >
              Projelerimizi İncele
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

