'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function HakkimizdaPage() {
  const [image1Loaded, setImage1Loaded] = useState(false)
  const [image2Loaded, setImage2Loaded] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // iOS kontrolü
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    setIsIOS(isIOSDevice)
    
    // iOS'ta resimleri hemen göster (animasyon olmadan)
    if (isIOSDevice) {
      setImage1Loaded(true)
      setImage2Loaded(true)
    }
  }, [])
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-vizon-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-3 text-white">
            Hakkımızda
          </h1>
          <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto">
            Tasarım anlayışımız ve ekibimiz hakkında bilgi edinin
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stüdyo Hakkında */}
          <div className="mb-24">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8">
              Stüdyo hakkında
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="max-w-none">
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Mel Design Studio, mekanlara kimlik kazandıran çağdaş ve zamansız iç mimari çözümler üretir. Her proje, kullanıcı alışkanlıklarını, ışığı ve malzemeyi bir bütün olarak ele alan özgün bir tasarım yaklaşımıyla şekillenir. Detay hassasiyeti ve titiz uygulama süreçleriyle estetik kadar işlevselliği de ön planda tutar. Düzce merkezli bir iç mimarlık ofisi olarak bölgesel sınırların ötesine geçen projelere imza atar ve her mekâna güçlü bir tasarım dili kazandırır. Modern çizgileri sıcak malzeme dokularıyla buluşturarak özgün, dengeli ve yüksek nitelikli yaşam alanları tasarlar. Stüdyo, her projenin kendi hikâyesini yaratmasını sağlayarak tasarımın yaşam kalitesini artıran bir güce dönüşmesine odaklanır.
                </p>
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <div 
                  className={`relative w-full h-full transition-all duration-1000 ease-out ${
                    image1Loaded 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-full opacity-0'
                  }`}
                  style={{
                    willChange: 'transform, opacity',
                    transform: image1Loaded ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)',
                  }}
                >
                  <Image
                    src="/hakkimizda/8.webp"
                    alt="Mel Design Studio"
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    onLoad={() => !isIOS && setImage1Loaded(true)}
                    onLoadingComplete={() => !isIOS && setImage1Loaded(true)}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Melis Yalçın */}
          <div className="mt-24">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8">
              Melis Yalçın
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="order-2 md:order-1">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
                  <div 
                    className={`relative w-full h-full transition-all duration-1000 ease-out ${
                      image2Loaded 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-full opacity-0'
                    }`}
                    style={{
                      willChange: 'transform, opacity',
                      transform: image2Loaded ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)',
                    }}
                  >
                    <Image
                      src="/hakkimizda/MELIS-YALCIN_2-838x1024.webp"
                      alt="Melis Yalçın"
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={90}
                      onLoad={() => !isIOS && setImage2Loaded(true)}
                      onLoadingComplete={() => !isIOS && setImage2Loaded(true)}
                      priority
                    />
                  </div>
                </div>
              </div>
              <div className="max-w-none order-1 md:order-2">
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-4">
                  Melis Yalçın, modern ve estetik tasarım anlayışını uluslararası deneyimleri ile birleştiren bir iç mimardır.
                </p>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-4">
                  Marmara Üniversitesi İç Mimarlık lisans eğitimini tamamladıktan sonra, Türkiye'nin en köklü ofislerinden Tabanlıoğlu Mimarlık'ta büyük ölçekli otel ve konut projelerinde görev alarak mesleki temelini güçlendirmiştir.
                </p>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-4">
                  Tasarım vizyonunu global ölçekte geliştirmek amacıyla Milano'ya taşınmış, Domus Academy'de Interior and Living Design yüksek lisansını tamamlamış ve Milano'daki tasarım stüdyolarında Beymen Club, Luxottica, Calvin Klein, Levi's, The North Face ve Guess gibi uluslararası markaların perakende projelerinde aktif rol üstlenmiştir.
                </p>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-4">
                  Kariyerinin ilerleyen döneminde, Türkiye'ye dönerek Bvlgari Hotel projesinin uygulama süreçlerinde görev almış; lüks segmentte detay yönetimi, malzeme seçimi ve kalite standartları konusunda güçlü bir uzmanlık edinmiştir.
                </p>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Bugün kurucusu olduğu Mel Design Studio ile uluslararası birikimini Türkiye'deki uygulama deneyimiyle birleştirerek modern, rafine ve yüksek nitelikli mekanlar üretmeye devam etmektedir. Her projede malzeme, ışık ve mekânsal dengeyi ustalıkla bir araya getirerek özgün kimliğiyle öne çıkan yaşam alanları tasarlamaktadır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}




