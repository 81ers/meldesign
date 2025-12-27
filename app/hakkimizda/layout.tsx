import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hakkımızda | mel design studio',
  description: 'Mel Design Studio hakkında bilgi edinin. Düzce merkezli iç mimarlık ofisimiz ve ekibimiz hakkında detaylar.',
}

export default function HakkimizdaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

