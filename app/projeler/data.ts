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

export const projects: Project[] = [
  {
    id: 1,
    title: "LINS'S CONCEPT",
    location: 'Düzce',
    type: 'Mağaza',
    folder: 'LINSSCONCEPT',
    slug: 'lins-concept',
    description: 'Modern ve şık bir mağaza tasarımı. LINS\'S CONCEPT, çağdaş alışveriş deneyimi sunan özenle tasarlanmış bir mekan.',
    images: [
      "/projeler/LINSSCONCEPT/LINS2.webp",
      "/projeler/LINSSCONCEPT/LINS3.webp",
      "/projeler/LINSSCONCEPT/LINS4.webp",
      "/projeler/LINSSCONCEPT/LINS5.webp",
      "/projeler/LINSSCONCEPT/LINS6.webp",
    ],
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
      "/projeler/Villatreduzce/2.webp",
      "/projeler/Villatreduzce/4.webp",
      "/projeler/Villatreduzce/5.webp",
      "/projeler/Villatreduzce/6.webp",
      "/projeler/Villatreduzce/7.webp",
      "/projeler/Villatreduzce/8.webp",
      "/projeler/Villatreduzce/9.webp",
      "/projeler/Villatreduzce/10.webp",
      "/projeler/Villatreduzce/11.webp",
      "/projeler/Villatreduzce/12.webp",
      "/projeler/Villatreduzce/13.webp",
      "/projeler/Villatreduzce/14.webp",
      "/projeler/Villatreduzce/15.webp",
      "/projeler/Villatreduzce/16.webp",
      "/projeler/Villatreduzce/18.webp",
      "/projeler/Villatreduzce/20.webp",
      "/projeler/Villatreduzce/22.webp",
      "/projeler/Villatreduzce/23.webp",
    ],
  },
  {
    id: 3,
    title: 'GANİTA',
    location: 'Bolu',
    type: 'Restoran',
    folder: 'ganitabolu',
    slug: 'ganita',
    description: 'Sıcak ve davetkar bir restoran atmosferi. GANİTA, lezzetli yemeklerin yanı sıra estetik bir deneyim sunuyor.',
    images: [
      "/projeler/ganitabolu/RENDER1.webp",
      "/projeler/ganitabolu/RENDER2.webp",
      "/projeler/ganitabolu/RENDER3.webp",
      "/projeler/ganitabolu/RENDER4.webp",
      "/projeler/ganitabolu/RENDER5.webp",
      "/projeler/ganitabolu/RENDER6.webp",
      "/projeler/ganitabolu/RENDER8.webp",
      "/projeler/ganitabolu/RENDER9.webp",
      "/projeler/ganitabolu/RENDER11.webp",
      "/projeler/ganitabolu/RENDER12.webp",
      "/projeler/ganitabolu/RENDER13.webp",
      "/projeler/ganitabolu/RENDER14.webp",
      "/projeler/ganitabolu/RENDER16.webp",
      "/projeler/ganitabolu/RENDER17.webp",
      "/projeler/ganitabolu/RENDER22.webp",
      "/projeler/ganitabolu/RENDER23.webp",
      "/projeler/ganitabolu/RENDER25.webp",
      "/projeler/ganitabolu/RENDER26.webp",
    ],
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
      "/projeler/etilervillaistanbul/1.webp",
      "/projeler/etilervillaistanbul/5.webp",
      "/projeler/etilervillaistanbul/8.webp",
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
      "/projeler/cabincoffee/1.webp",
      "/projeler/cabincoffee/3.webp",
      "/projeler/cabincoffee/5.webp",
      "/projeler/cabincoffee/6.webp",
      "/projeler/cabincoffee/7.webp",
      "/projeler/cabincoffee/9.webp",
      "/projeler/cabincoffee/10.webp",
    ],
  },
]


