import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim | mel design studio',
  description: 'Düzce merkezli ofisimizle iletişime geçin. İç mimarlık projeleriniz için bizimle iletişime geçebilirsiniz.',
}

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
