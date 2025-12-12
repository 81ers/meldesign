import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projelerimiz | mel design studio',
  description: 'Düzce merkezli ofisimizin gerçekleştirdiği iç mimarlık projelerini keşfedin. Yaratıcı ve modern tasarım çözümlerimiz.',
}

export default function ProjelerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
