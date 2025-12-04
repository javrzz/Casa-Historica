import { Collection } from './types';

// Helper to generate placeholder images (fallback)
const getPlaceHolder = (w: number, h: number, id: number) => `https://picsum.photos/id/${id}/${w}/${h}`;

// Real images from Wikimedia Commons for authenticity
const IMAGES = {
  facade: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Casa_Tucuman.jpg/1280px-Casa_Tucuman.jpg',
  salon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Sala_de_la_Jura_Casa_Hist%C3%B3rica_de_Tucum%C3%A1n.jpg/800px-Sala_de_la_Jura_Casa_Hist%C3%B3rica_de_Tucum%C3%A1n.jpg',
  reliefs: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Relieves_de_la_Casa_Hist%C3%B3rica_de_Tucum%C3%A1n_02.jpg/800px-Relieves_de_la_Casa_Hist%C3%B3rica_de_Tucum%C3%A1n_02.jpg',
  patio: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Patio_de_la_Casa_Hist%C3%B3rica.jpg/800px-Patio_de_la_Casa_Hist%C3%B3rica.jpg',
  well: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aljibe_de_la_Casa_de_Tucum%C3%A1n.jpg/800px-Aljibe_de_la_Casa_de_Tucum%C3%A1n.jpg',
  portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Bernardo_de_Monteagudo.jpg/640px-Bernardo_de_Monteagudo.jpg', // Representative
  sugar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ingenio_Lules_tucuman.jpg/800px-Ingenio_Lules_tucuman.jpg',
  padilla_cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Ernesto_Padilla_1913.jpg/640px-Ernesto_Padilla_1913.jpg',
  templete_cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Casa_de_Tucum%C3%A1n_1904.jpg/1024px-Casa_de_Tucum%C3%A1n_1904.jpg'
};

export const COLLECTIONS: Collection[] = [
  {
    id: 'padilla',
    title: 'Colección Padilla',
    icon: 'Feather',
    shortDescription: 'Legado de una de las familias más influyentes en la independencia.',
    fullDescription: 'La Colección Padilla conserva el mobiliario, documentos y objetos personales pertenecientes a la familia Padilla. Esta sala ofrece una ventana a la vida doméstica y política del siglo XIX en Tucumán, destacando la influencia de sus miembros en los procesos independentistas.',
    coverImage: IMAGES.padilla_cover,
    themeColor: 'bg-slate-800', 
    artifacts: [
      {
        id: 'p1',
        title: 'Retrato de Prócer',
        description: 'Óleo sobre lienzo representativo de la época de la independencia.',
        type: 'photo',
        url: IMAGES.portrait,
        date: '1820'
      },
      {
        id: 'p2',
        title: 'Retrato del Coronel Murga',
        description: 'Busto esculpido del Coronel Julián Murga. Visualización 3D interactiva cortesía de Sketchfab.',
        type: 'model3d',
        url: 'https://via.placeholder.com/800x600?text=Cargando+Modelo...', // Fallback image if iframe fails
        modelUrl: 'https://sketchfab.com/models/25f03e2cd1984d9abb910797d76d7bdf/embed',
        date: 'Siglo XIX'
      },
      {
        id: 'p3',
        title: 'Acta de la Independencia',
        description: 'Facsímil del documento original firmado el 9 de julio.',
        type: 'blueprint',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Acta_de_Independencia_de_Argentina_%28Quechua%29.jpg/640px-Acta_de_Independencia_de_Argentina_%28Quechua%29.jpg',
        date: '1816'
      }
    ]
  },
  {
    id: 'nougues',
    title: 'Colección Nougués',
    icon: 'Factory',
    shortDescription: 'Industrialización y progreso: la visión de los Nougués.',
    fullDescription: 'Esta colección rinde homenaje a los pioneros en la industria azucarera y la modernización de la provincia. Se exhiben planos de ingenios, fotografías de las primeras zafras y objetos que denotan el auge económico de la época.',
    coverImage: IMAGES.sugar,
    themeColor: 'bg-cyan-900',
    artifacts: [
      {
        id: 'n1',
        title: 'Ruinas de Ingenio',
        description: 'Fotografía histórica de las primeras instalaciones fabriles en Tucumán.',
        type: 'photo',
        url: IMAGES.sugar,
        date: '1910'
      },
      {
        id: 'n2',
        title: 'Maquinaria a Vapor',
        description: 'Modelo de las máquinas importadas para la molienda de caña.',
        type: 'model3d',
        url: getPlaceHolder(600, 600, 319),
        date: '1905'
      }
    ]
  },
  {
    id: 'templete',
    title: 'El Templete',
    icon: 'Landmark',
    shortDescription: 'Resguardo del Salón de la Jura de la Independencia.',
    fullDescription: 'El Templete es la estructura construida para proteger el Salón de la Jura, el corazón de la Casa Histórica. Aquí exploramos la arquitectura monumental diseñada para preservar el sitio donde se declaró la independencia en 1816.',
    coverImage: IMAGES.templete_cover,
    themeColor: 'bg-blue-900',
    artifacts: [
      {
        id: 't1',
        title: 'Relieves de Lola Mora',
        description: 'Detalle de los bronces históricos que conmemoran la gesta de 1816 en el patio posterior.',
        type: 'image',
        url: IMAGES.reliefs,
        date: '1904'
      },
      {
        id: 't2',
        title: 'Estructura del Techo',
        description: 'Plano de ingeniería de la cubierta vidriada del templete.',
        type: 'blueprint',
        url: getPlaceHolder(800, 600, 400),
        date: '1903'
      }
    ]
  },
  {
    id: 'colonial',
    title: 'Casa Colonial',
    icon: 'Home',
    shortDescription: 'Arquitectura y vida cotidiana antes de la revolución.',
    fullDescription: 'Un recorrido por la estructura original de la casa típica colonial: sus patios, sus muros de adobe y la disposición de las habitaciones. Esta colección se centra en la vida cotidiana de los habitantes anónimos.',
    coverImage: IMAGES.patio,
    themeColor: 'bg-indigo-900',
    artifacts: [
      {
        id: 'c1',
        title: 'El Aljibe',
        description: 'Punto central del patio, utilizado para el abastecimiento de agua.',
        type: 'image',
        url: IMAGES.well,
        date: '1800'
      },
      {
        id: 'c2',
        title: 'Fachada Original',
        description: 'Reconstrucción visual de la fachada antes de las demoliciones del siglo XIX.',
        type: 'image',
        url: IMAGES.facade,
        date: '1810 (Reconst.)'
      }
    ]
  }
];