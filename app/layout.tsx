import type { Metadata } from 'next'
import { Inter, Playfair_Display, Caveat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

const caveat = Caveat({ 
  subsets: ['latin'],
  variable: '--font-caveat',
})

export const metadata: Metadata = {
  title: 'mel design studio | Düzce İç Mimarlık Ofisi',
  description: 'Düzce merkezli ofisimizde yaratıcı iç mimarlık çözümleri sunuyoruz.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "InteriorDesignBusiness",
    "name": "mel design studio",
    "description": "Düzce merkezli ofisimizde yaratıcı iç mimarlık çözümleri sunuyoruz.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kültür Mahallesi, Fırın Sokak No:6",
      "addressLocality": "Düzce",
      "addressRegion": "Düzce",
      "postalCode": "81010",
      "addressCountry": "TR"
    },
    "telephone": "+90 541 635 88 81",
    "email": "info@meldesign.tr",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.843823",
      "longitude": "31.156708"
    },
    "sameAs": [
      "https://www.instagram.com/meldesign.studio/"
    ]
  }

  return (
    <html lang="tr">
      <body className={`${inter.variable} ${playfair.variable} ${caveat.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Navigation />
        <main className="min-h-screen">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}

