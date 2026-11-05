export const DECORATION_CATEGORIES = [
  { id: 'all', label: 'All Elements', icon: 'Sparkles' },
  { id: 'diyas', label: 'Diyas', icon: 'Flame' },
  { id: 'fairy_lights', label: 'Fairy Lights', icon: 'Lightbulb' },
  { id: 'rangoli', label: 'Rangoli', icon: 'Compass' },
  { id: 'flowers', label: 'Flowers', icon: 'Flower2' },
  { id: 'torans', label: 'Torans', icon: 'ShieldAlert' },
  { id: 'lanterns', label: 'Lanterns', icon: 'Lamp' },
  { id: 'candles', label: 'Candles', icon: 'Sun' },
  { id: 'pooja', label: 'Pooja Decor', icon: 'HeartHandshake' },
];

export const DECORATION_ITEMS = [
  // Diyas
  {
    id: 'clay_diya_classic',
    name: 'Handcrafted Clay Diya',
    category: 'diyas',
    image: '/assets/decorations/clay_diya.svg',
    defaultWidth: 140,
    defaultHeight: 112,
    description: 'Earthen terracotta diya with shimmering oil flame',
    tags: ['traditional', 'clay', 'warm', 'flame'],
  },
  {
    id: 'brass_samai_tall',
    name: 'Royal Brass Samai Lamp',
    category: 'diyas',
    image: '/assets/decorations/brass_samai.svg',
    defaultWidth: 130,
    defaultHeight: 208,
    description: 'Traditional multi-wick brass stand lamp',
    tags: ['royal', 'brass', 'luxury', 'tall'],
  },
  {
    id: 'urli_bowl_candle',
    name: 'Floating Diya Urli',
    category: 'diyas',
    image: '/assets/decorations/urli_bowl.svg',
    defaultWidth: 180,
    defaultHeight: 135,
    description: 'Carved brass urli with water, tea light & rose petals',
    tags: ['traditional', 'floating', 'urli', 'water'],
  },

  // Fairy Lights
  {
    id: 'fairy_curtain_gold',
    name: 'Golden Fairy Curtain',
    category: 'fairy_lights',
    image: '/assets/decorations/fairy_lights_curtain.svg',
    defaultWidth: 260,
    defaultHeight: 208,
    description: 'Cascading vertical warm LED fairy light strands',
    tags: ['lighting', 'modern', 'led', 'curtain'],
  },
  {
    id: 'fairy_swag_string',
    name: 'Scalloped Festive Lights',
    category: 'fairy_lights',
    image: '/assets/decorations/fairy_swag.svg',
    defaultWidth: 280,
    defaultHeight: 82,
    description: 'Draped festoon string with warm amber glow',
    tags: ['lighting', 'drape', 'balcony', 'wall'],
  },

  // Rangoli
  {
    id: 'rangoli_mandala_festive',
    name: 'Sacred Mandala Rangoli',
    category: 'rangoli',
    image: '/assets/decorations/mandala_rangoli.svg',
    defaultWidth: 210,
    defaultHeight: 210,
    description: 'Intricate radial floral geometry in auspicious saffron & crimson',
    tags: ['floor', 'mandala', 'traditional', 'sacred'],
  },

  // Flowers
  {
    id: 'marigold_swag_drape',
    name: 'Marigold Flower Swag',
    category: 'flowers',
    image: '/assets/decorations/marigold_swag.svg',
    defaultWidth: 260,
    defaultHeight: 98,
    description: 'Curved garland of golden and saffron marigold blossoms',
    tags: ['marigold', 'floral', 'swag', 'entrance'],
  },
  {
    id: 'vertical_garland_bell',
    name: 'Hanging Marigold Garland',
    category: 'flowers',
    image: '/assets/decorations/vertical_garland.svg',
    defaultWidth: 60,
    defaultHeight: 270,
    description: 'Vertical door hanging with marigolds and brass bell',
    tags: ['garland', 'hanging', 'entrance', 'door'],
  },

  // Torans
  {
    id: 'toran_mango_leaves',
    name: 'Auspicious Mango Toran',
    category: 'torans',
    image: '/assets/decorations/toran_leaves.svg',
    defaultWidth: 280,
    defaultHeight: 82,
    description: 'Auspicious fresh mango leaf door border with blossoms',
    tags: ['toran', 'entrance', 'mango', 'doorway'],
  },

  // Lanterns
  {
    id: 'akash_kandil_festive',
    name: 'Diwali Akash Kandil',
    category: 'lanterns',
    image: '/assets/decorations/akash_kandil.svg',
    defaultWidth: 140,
    defaultHeight: 233,
    description: 'Traditional paper prismatic sky lantern with festive streamers',
    tags: ['lantern', 'kandil', 'balcony', 'hanging'],
  },
  {
    id: 'brass_lantern_hanging',
    name: 'Heritage Filigree Lantern',
    category: 'lanterns',
    image: '/assets/decorations/brass_lantern.svg',
    defaultWidth: 120,
    defaultHeight: 210,
    description: 'Carved Moroccan brass pendant lantern with interior glow',
    tags: ['royal', 'lantern', 'brass', 'ceiling'],
  },

  // Candles
  {
    id: 'candle_pillar_trio',
    name: 'Warm Pillar Candle Trio',
    category: 'candles',
    image: '/assets/decorations/candle_pillar.svg',
    defaultWidth: 150,
    defaultHeight: 166,
    description: 'Serene wax pillar candles with steady amber radiance',
    tags: ['candle', 'modern', 'minimal', 'table'],
  },

  // Pooja Decor
  {
    id: 'pooja_thali_auspicious',
    name: 'Auspicious Pooja Thali',
    category: 'pooja',
    image: '/assets/decorations/pooja_thali.svg',
    defaultWidth: 180,
    defaultHeight: 180,
    description: 'Decorated brass plate with kumkum, haldi and lit diya',
    tags: ['pooja', 'sacred', 'thali', 'diya'],
  },
];
