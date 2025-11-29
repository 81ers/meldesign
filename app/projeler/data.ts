export interface Project {
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

export const projects: Project[] = [
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

