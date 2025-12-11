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
  description: 'Zarif ve modern iç mimarlık çözümleri',
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
  return (
    <html lang="tr" className="h-full">
      <body className={`${inter.variable} ${playfair.variable} ${caveat.variable} font-sans antialiased h-full`}>
        <Navigation />
        <main className="min-h-full">
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

