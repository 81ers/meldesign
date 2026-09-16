import type { Metadata } from 'next'
import { projects } from '../data'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug && p.visible)

  if (!project) {
    return {
      title: 'Proje Bulunamadı | mel design studio',
      description: 'Düzce merkezli ofisimizin gerçekleştirdiği iç mimarlık projelerini keşfedin.',
    }
  }

  return {
    title: `${project.title} | mel design studio`,
    description: `${project.title} - ${project.location} konumundaki ${project.type} projesi. Düzce merkezli ofisimizin gerçekleştirdiği iç mimarlık projesi.`,
  }
}

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

