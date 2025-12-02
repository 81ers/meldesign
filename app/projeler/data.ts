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
    description: 'LINS\'S Concept, doğal malzemeler ve sakin tonlarla tasarlanmış modern bir mağazadır. Minimal çizgiler, yumuşak dokular ve doğal ışığın öne çıktığı mekânsal kurgu sayesinde mağaza, ferah ve fonksiyonel bir alışveriş deneyimi sunmaktadır. Ürünlerin sade bir fon üzerinde vurgulandığı bu tasarım, hem sıcak hem de etkileyici bir atmosfer oluşturmaktadır.',
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
    description: 'Villa Tre, modern konforu doğal malzemeler ve dengeli ışık kullanımıyla bir araya getiren seçkin bir konut tasarımıdır. İç mekânlarda geniş hacim duygusu, nötr palet ve rafine detaylar ön planda tutulmuştur. Her odada sakin, şık ve zamansız bir atmosfer yaratılarak yaşam alanına karakter kazandırılmıştır.',
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
    description: 'Ganita, modern çizgiler ile rustik dokuları bir araya getiren zamansız bir restoran tasarımıdır. Doğal ahşap yüzeyler mekâna sıcaklık ve derinlik kazandırırken, tüm detayların uyum içinde şekillendiği akıcı bir iç mekân düzeni oluşturulmuştur. Mekân, malzeme geçişlerinin ve oranların dengeli kullanımıyla sofistike bir atmosfer sunmaktadır.',
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
    description: 'Etiler Villa, sofistike malzemeler ve koyu tonların dinginliğiyle modern lüksü vurgulayan bir tasarım anlayışına sahiptir. Ahşap paneller, özel üretim dokular ve yumuşak ışık geçişleri mekânın derinliğini arttırmaktadır. Her detayın özenle kurgulandığı bu konut, konforu ve estetiği üst segment bir yaşam deneyimi olarak sunmaktadır.',
    images: [
      "/projeler/etilervillaistanbul/1.webp",
      "/projeler/etilervillaistanbul/4.webp",
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
    description: 'Cabin Coffee, yalın formlar ve doğal dokularla modern bir kafe deneyimi sunan dengeli bir mekânsal kurguya sahiptir. Ahşap yüzeylerin ritmi ve nötr tonlar, mekâna sade ama güçlü bir karakter kazandırmaktadır. Bar alanının net geometrisi ve düzenli akışı, markanın kimliğini destekleyen bütüncül bir atmosfer oluşturmaktadır.',
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
  {
    id: 6,
    title: 'BEYLİKDÜZÜ GENÇ KIZ ODASI',
    location: 'İstanbul',
    type: 'Konut',
    folder: 'beylikduzugenkiz',
    slug: 'beylikduzu-genc-kiz-odasi',
    description: 'Genç kız odası, yumuşak tonlar ve zarif çizgilerle modern bir sadelik anlayışı üzerine tasarlanmıştır. Yüksek tavan formu ve geniş pencere açıklıkları, doğal ışığın mekânın ana unsuru olmasını sağlamaktadır. Fonksiyonellik, konfor ve estetik detaylar dengelenerek kullanıcıya özel, sıcak bir yaşam alanı oluşturulmuştur.',
    images: [
      "/projeler/beylikduzugenkiz/2.webp",
      "/projeler/beylikduzugenkiz/21.webp",
      "/projeler/beylikduzugenkiz/44.webp",
    ],
  },
]


