# mel design studio - İç Mimarlık Ofisi Web Sayfası

Next.js kullanılarak geliştirilmiş zarif ve modern bir iç mimarlık ofisi web sayfası.

## Özellikler

- **Ana Sayfa**: Arkaplan geçişli hero section ve öne çıkan projeler
- **Hakkımızda**: Ofis hikayesi, misyon, vizyon ve ekip bilgileri
- **Projeler**: Panoramik görüntülerle interaktif proje galerisi
- **Hizmetler**: Sunulan profesyonel hizmetler
- **Blog**: Tasarım trendleri ve haberler
- **Yorumlar**: Müşteri yorumları ve çalışılan markalar
- **İletişim**: İletişim formu ve bilgileri

## Teknolojiler

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Panolens.js (360° panoramik görüntüleme)
- Three.js

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Proje Yapısı

```
meldesigntr/
├── app/                    # Next.js App Router sayfaları
│   ├── page.tsx           # Ana sayfa
│   ├── hakkimizda/        # Hakkımızda sayfası
│   ├── projeler/          # Projeler sayfası
│   ├── hizmetler/         # Hizmetler sayfası
│   ├── blog/              # Blog sayfası
│   ├── yorumlar/       # Yorumlar sayfası
│   └── iletisim/          # İletişim sayfası
├── components/            # React bileşenleri
│   ├── Navigation.tsx     # Navigasyon menüsü
│   ├── Footer.tsx         # Footer bileşeni
│   └── PanoramaViewer.tsx # Panoramik görüntüleyici
├── public/                # Statik dosyalar
│   ├── bg/               # Arkaplan resimleri
│   └── panoramik/        # Panoramik resimler
└── ...
```

## Özellikler

### Panoramik Görüntüleyici
Projeler sayfasında panoramik resimler Panolens.js kullanılarak 360° döndürülebilir ve zoom yapılabilir şekilde görüntülenir. Street View benzeri bir deneyim sunar.

### Arkaplan Geçişleri
Ana sayfada scroll pozisyonuna göre arkaplan resimleri yumuşak bir şekilde değişir.

## Notlar

- Sayfalar şu anda placeholder içeriklerle doldurulmuştur. İçerikler daha sonra eklenecektir.
- İletişim formu şu anda demo amaçlıdır, backend entegrasyonu gereklidir.

