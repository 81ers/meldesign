import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-red-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold text-white mb-4">
              mel design studio
            </h3>
            <p className="text-sm text-gray-400">
              Zarif ve modern iç mimarlık çözümleri sunan profesyonel tasarım ofisi.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/hakkimizda" className="hover:text-white transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/projeler" className="hover:text-white transition-colors">
                  Projeler
                </Link>
              </li>
              <li>
                <Link href="/hizmetler" className="hover:text-white transition-colors">
                  Hizmetler
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-white transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">İletişim</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: info@meldedesign.com</li>
              <li>Telefon: +90 (XXX) XXX XX XX</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} mel design studio. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}

