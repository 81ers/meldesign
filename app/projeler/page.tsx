'use client'

import Image from 'next/image'
import Link from 'next/link'

interface Project {
  id: number
  title: string
  location: string
  type: string
  folder: string
  slug: string
  images: string[]
  description: string
}

// Moodboard'ları en sona alan helper fonksiyon
const sortImages = (images: string[]): string[] => {
  const moodboardImages = images.filter(img => 
    img.toLowerCase().includes('moodboard')
  )
  const otherImages = images.filter(img => 
    !img.toLowerCase().includes('moodboard')
  )
  return [...otherImages, ...moodboardImages]
}

// İlk resmi al (moodboard hariç)
const getFirstImage = (images: string[]): string => {
  const firstNonMoodboard = images.find(img => 
    !img.toLowerCase().includes('moodboard')
  )
  return firstNonMoodboard || images[0]
}

const projects: Project[] = [
  {
    id: 1,
    title: "LINS'S CONCEPT",
    location: 'Düzce',
    type: 'Mağaza',
    folder: 'LINSSCONCEPT',
    slug: 'lins-concept',
    description: 'Modern ve şık bir mağaza tasarımı. LINS\'S CONCEPT, çağdaş alışveriş deneyimi sunan özenle tasarlanmış bir mekan.',
    images: sortImages([
      "/projeler/LINSSCONCEPT/LINS2.png",
      "/projeler/LINSSCONCEPT/LINS3.png",
      "/projeler/LINSSCONCEPT/LINS4.png",
      "/projeler/LINSSCONCEPT/LINS5.png",
      "/projeler/LINSSCONCEPT/LINS'S MOODBOARD.jpg",
    ]),
  },
  {
    id: 2,
    title: 'VİLLA TRE',
    location: 'Düzce',
    type: 'Konut',
    folder: 'Villatreduzce',
    slug: 'villa-tre',
    description: 'Lüks villa tasarımı. Doğa ile iç içe, modern konforun buluştuğu özel bir yaşam alanı.',
    images: [
      "/projeler/Villatreduzce/2.jpg",
      "/projeler/Villatreduzce/4.jpg",
      "/projeler/Villatreduzce/5.jpg",
      "/projeler/Villatreduzce/6.jpg",
      "/projeler/Villatreduzce/7.jpg",
      "/projeler/Villatreduzce/8.jpg",
      "/projeler/Villatreduzce/9.jpg",
      "/projeler/Villatreduzce/10.jpg",
      "/projeler/Villatreduzce/11.jpg",
      "/projeler/Villatreduzce/12.jpg",
      "/projeler/Villatreduzce/13.jpg",
      "/projeler/Villatreduzce/14.jpg",
      "/projeler/Villatreduzce/15.jpg",
      "/projeler/Villatreduzce/16.jpg",
      "/projeler/Villatreduzce/18.jpg",
      "/projeler/Villatreduzce/20.jpg",
      "/projeler/Villatreduzce/22.jpg",
      "/projeler/Villatreduzce/23.jpg",
    ],
  },
  {
    id: 3,
    title: 'GANİTA',
    location: 'Bolu',
    type: 'Restaurant',
    folder: 'ganitabolu',
    slug: 'ganita',
    description: 'Sıcak ve davetkar bir restoran atmosferi. GANİTA, lezzetli yemeklerin yanı sıra estetik bir deneyim sunuyor.',
    images: sortImages([
      "/projeler/ganitabolu/RENDER1.jpg",
      "/projeler/ganitabolu/RENDER2.jpg",
      "/projeler/ganitabolu/RENDER3.jpg",
      "/projeler/ganitabolu/RENDER4.jpg",
      "/projeler/ganitabolu/RENDER5.jpg",
      "/projeler/ganitabolu/RENDER6.jpg",
      "/projeler/ganitabolu/RENDER8.jpg",
      "/projeler/ganitabolu/RENDER9.jpg",
      "/projeler/ganitabolu/RENDER11.jpg",
      "/projeler/ganitabolu/RENDER12.jpg",
      "/projeler/ganitabolu/RENDER13.jpg",
      "/projeler/ganitabolu/RENDER14.jpg",
      "/projeler/ganitabolu/RENDER16.jpg",
      "/projeler/ganitabolu/RENDER17.jpg",
      "/projeler/ganitabolu/RENDER22.jpg",
      "/projeler/ganitabolu/RENDER23.jpg",
      "/projeler/ganitabolu/RENDER25.jpg",
      "/projeler/ganitabolu/RMoodboard.jpg",
    ]),
  },
  {
    id: 4,
    title: 'ETİLER VİLLA',
    location: 'İstanbul',
    type: 'Konut',
    folder: 'etilervillaistanbul',
    slug: 'etiler-villa',
    description: 'İstanbul\'un en prestijli bölgelerinden birinde konumlanan lüks villa. Modern mimari ve klasik zarafetin buluşması.',
    images: [
      "/projeler/etilervillaistanbul/1.png",
      "/projeler/etilervillaistanbul/5.png",
      "/projeler/etilervillaistanbul/8.png",
    ],
  },
  {
    id: 5,
    title: 'CABIN COFFEE',
    location: 'Bolu',
    type: 'Cafe',
    folder: 'cabincoffee',
    slug: 'cabin-coffee',
    description: 'Sıcak ve samimi bir kafe atmosferi. CABIN COFFEE, kahve severler için tasarlanmış özel bir mekan.',
    images: [
      "/projeler/cabincoffee/1.jpg",
      "/projeler/cabincoffee/3.jpg",
      "/projeler/cabincoffee/5.jpg",
      "/projeler/cabincoffee/6.jpg",
      "/projeler/cabincoffee/7.jpg",
      "/projeler/cabincoffee/9.jpg",
      "/projeler/cabincoffee/10.jpg",
    ],
  },
]

export default function ProjelerPage() {
  // Tüm projeleri göster - lazy load yok
  const displayedProjects = projects

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-vizon-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-3 text-white">
            Projelerimiz
          </h1>
          <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto">
            Yaratıcılığımızın ve uzmanlığımızın yansıması olan projelerimizi keşfedin
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {displayedProjects.map((project) => {
              const firstImage = getFirstImage(project.images)
              return (
                <Link
                  key={project.id}
                  href={`/projeler/${project.slug}`}
                  className="group block bg-white overflow-hidden hover:shadow-xl transition-all duration-300 w-full max-w-[700px]"
                >
                  {/* Image Container - 700x700 piksel kare */}
                  <div className="relative w-full aspect-square max-w-[700px] max-h-[700px] overflow-hidden">
                    <Image
                      src={firstImage}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 700px"
                    />
                  </div>
                  
                  {/* Text Container - Altta */}
                  <div className="p-6">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
                      {project.title}
                    </h2>
                    <p className="text-sm md:text-base text-gray-400 font-light">
                      {project.location} / {project.type}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>

        </div>
      </section>
    </div>
  )
}

// Projeleri dışa aktar (detay sayfası için)
export { projects }
