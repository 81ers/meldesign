/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cache kontrolü için: Her build'de cache'i temizle
  // Geliştirme ortamında cache sorunlarını önlemek için
  onDemandEntries: {
    // Sayfaları ne kadar süre bellekte tutacağız (milisaniye)
    maxInactiveAge: 25 * 1000,
    // Aynı anda kaç sayfa tutulacak
    pagesBufferLength: 2,
  },
  images: {
    // AVIF ve WebP formatlarını önceliklendir (AVIF daha küçük, WebP daha geniş destek)
    formats: ['image/avif', 'image/webp'],
    // Modern cihazlar için optimize edilmiş boyutlar
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Küçük resimler için optimize edilmiş boyutlar
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache süresini artır (60 saniye yerine 1 yıl)
    minimumCacheTTL: 31536000,
    // SVG güvenlik ayarları
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Resim kalitesi (varsayılan 75, daha yüksek kalite için)
    // Not: Bu ayar component seviyesinde de ayarlanabilir
    // Optimize edilmiş yükleme için
    unoptimized: false,
  },
}

module.exports = nextConfig




