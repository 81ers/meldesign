import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Teklif Alın | mel design studio',
  description: 'Mekanınız için özel teklif alın. Düzce merkezli ofisimizden iç mimarlık projeniz için teklif talep edin.',
}

export default function TeklifAlinLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
