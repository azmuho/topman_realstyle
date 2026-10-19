import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const outputDirectory = resolve('public/data');

const categoryDefinitions = [
  {
    slug: 'suits',
    name: 'Suits',
    prefix: 'SU',
    description: 'Modern tailoring for business, celebrations and formal occasions.',
    image: '/images/categories/suits-960.webp',
    thumbnail: '/images/categories/suits-480.webp',
    basePrice: 6990,
    priceStep: 500,
    filters: [],
    names: [
      'Regent Tailored Suit',
      'Kensington Slim Suit',
      'Mayfair Classic Suit',
      'Oxford Check Suit',
      'Savile Double-Breasted Suit',
      'Chelsea Evening Suit',
      'Windsor Wool-Blend Suit',
      'Soho Modern Suit',
      'Knightsbridge Tuxedo',
      'Camden Travel Suit',
      'Belgrave Three-Piece Suit',
      'Richmond Textured Suit',
    ],
    sizes: ['46', '48', '50', '52', '54', '56'],
    variants: [
      ['Grey', '#84878b', 'suit-01'],
      ['Navy', '#172d51', 'suit-02'],
      ['Black', '#181818', 'suit-03'],
    ],
  },
  {
    slug: 'shirts',
    name: 'Shirts',
    prefix: 'SH',
    description: 'Crisp formal shirts and versatile smart-casual staples.',
    image: '/images/categories/shirts-960.webp',
    thumbnail: '/images/categories/shirts-480.webp',
    basePrice: 1290,
    priceStep: 200,
    filters: [
      { key: 'material', label: 'Material', options: ['Linen', 'Cotton'] },
      { key: 'design', label: 'Design', options: ['Plain', 'Designed'] },
      { key: 'style', label: 'Style', options: ['Formal', 'Smart-casual'] },
    ],
    productAttributes: [
      { material: 'Cotton', design: 'Plain', style: 'Formal' },
      { material: 'Cotton', design: 'Plain', style: 'Formal' },
      { material: 'Cotton', design: 'Plain', style: 'Smart-casual' },
      { material: 'Cotton', design: 'Plain', style: 'Formal' },
      { material: 'Cotton', design: 'Plain', style: 'Smart-casual' },
      { material: 'Cotton', design: 'Designed', style: 'Smart-casual' },
      { material: 'Linen', design: 'Plain', style: 'Smart-casual' },
      { material: 'Cotton', design: 'Plain', style: 'Formal' },
      { material: 'Cotton', design: 'Designed', style: 'Smart-casual' },
      { material: 'Cotton', design: 'Plain', style: 'Formal' },
      { material: 'Linen', design: 'Plain', style: 'Smart-casual' },
      { material: 'Cotton', design: 'Plain', style: 'Formal' },
    ],
    names: [
      'Hampton Oxford Shirt',
      'Albion Poplin Shirt',
      'Mercer Slim Shirt',
      'Carlton Twill Shirt',
      'Kingston Easy-Care Shirt',
      'Brompton Check Shirt',
      'Portland Linen Shirt',
      'York Spread-Collar Shirt',
      'Greenwich Stripe Shirt',
      'Westminster Formal Shirt',
      'Notting Hill Casual Shirt',
      'Regent Cutaway Shirt',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      ['Blue', '#7089a6', 'shirt-01'],
      ['Assorted', '#725a5d', 'shirt-02'],
      ['White', '#f1f1ed', 'shirt-03'],
      ['Burgundy', '#71323a', 'shirt-04'],
    ],
  },
  {
    slug: 'pants',
    name: 'Pants',
    prefix: 'PT',
    description: 'Tailored trousers, chinos and denim with an easy modern fit.',
    image: '/images/categories/pants-960.webp',
    thumbnail: '/images/categories/pants-480.webp',
    basePrice: 1990,
    priceStep: 250,
    filters: [
      {
        key: 'type',
        label: 'Type',
        options: ['Formal', 'Jeans', 'Gabardine', 'Linen', 'Joggers'],
      },
    ],
    productAttributes: [
      { type: 'Gabardine' },
      { type: 'Formal' },
      { type: 'Gabardine' },
      { type: 'Formal' },
      { type: 'Jeans' },
      { type: 'Joggers' },
      { type: 'Formal' },
      { type: 'Jeans' },
      { type: 'Formal' },
      { type: 'Gabardine' },
      { type: 'Linen' },
      { type: 'Formal' },
    ],
    names: [
      'Avenue Slim Chino',
      'City Tailored Trouser',
      'Harbour Stretch Chino',
      'Studio Tapered Pant',
      'Classic Five-Pocket',
      'Weekend Drawstring Trouser',
      'Metro Performance Pant',
      'Riverside Denim',
      'Oxford Pleated Trouser',
      'Camden Straight Chino',
      'Soho Cropped Trouser',
      'Regent Formal Trouser',
    ],
    sizes: ['30', '32', '34', '36', '38', '40'],
    variants: [
      ['Beige', '#c2aa7d', 'pants-01'],
      ['Black', '#202124', 'pants-02'],
      ['Denim', '#42617d', 'pants-03'],
    ],
  },
  {
    slug: 'sport-blazers',
    name: 'Sport Blazers',
    prefix: 'SB',
    description: 'Relaxed jackets that sharpen everyday combinations.',
    image: '/images/categories/sport-blazers-960.webp',
    thumbnail: '/images/categories/sport-blazers-480.webp',
    basePrice: 3990,
    priceStep: 400,
    filters: [],
    names: [
      'Milan Unstructured Blazer',
      'Chelsea Knit Blazer',
      'Monaco Travel Jacket',
      'Soho Jersey Blazer',
      'Regent Herringbone Blazer',
      'Camden Cotton Blazer',
      'Mayfair Textured Jacket',
      'Harbour Linen Blazer',
      'Windsor Check Jacket',
      'Kensington Slim Blazer',
      'Oxford Casual Jacket',
      'Belgrave Evening Blazer',
    ],
    sizes: ['46', '48', '50', '52', '54', '56'],
    variants: [
      ['Navy', '#172d51', 'suit-02'],
      ['Black', '#181818', 'suit-03'],
      ['Grey', '#84878b', 'suit-01'],
    ],
  },
  {
    slug: 'tshirts-polos',
    name: 'T-shirts & Polos',
    prefix: 'TP',
    description: 'Clean everyday essentials in comfortable, versatile fabrics.',
    image: '/images/categories/tshirts-polos-960.webp',
    thumbnail: '/images/categories/tshirts-polos-480.webp',
    basePrice: 790,
    priceStep: 150,
    filters: [
      { key: 'type', label: 'Style', options: ['T-shirt', 'Polo'] },
      { key: 'design', label: 'Design', options: ['Plain', 'Designed'] },
    ],
    productAttributes: [
      { type: 'T-shirt', design: 'Plain' },
      { type: 'Polo', design: 'Plain' },
      { type: 'T-shirt', design: 'Designed' },
      { type: 'Polo', design: 'Plain' },
      { type: 'T-shirt', design: 'Plain' },
      { type: 'Polo', design: 'Designed' },
      { type: 'T-shirt', design: 'Plain' },
      { type: 'Polo', design: 'Designed' },
      { type: 'T-shirt', design: 'Plain' },
      { type: 'Polo', design: 'Plain' },
      { type: 'T-shirt', design: 'Designed' },
      { type: 'Polo', design: 'Designed' },
    ],
    names: [
      'Essential Crew T-shirt',
      'Signature Pique Polo',
      'Weekend Pocket Tee',
      'Mercer Long-Sleeve Polo',
      'Studio Heavyweight Tee',
      'Harbour Stripe Polo',
      'Core V-Neck T-shirt',
      'Avenue Tipped Polo',
      'Relaxed Jersey Tee',
      'City Mercerised Polo',
      'Classic Logo T-shirt',
      'Resort Open-Collar Polo',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      ['White', '#f1f1ed', 'tshirt-01'],
      ['Navy', '#172d51', 'tshirt-02'],
      ['Red', '#a5222d', 'tshirt-02'],
    ],
  },
  {
    slug: 'outerwear-knitwear',
    name: 'Outerwear & Knitwear',
    prefix: 'OK',
    description: 'Layering pieces designed for changing weather and polished comfort.',
    image: '/images/categories/outerwear-knitwear-960.webp',
    thumbnail: '/images/categories/outerwear-knitwear-480.webp',
    basePrice: 2990,
    priceStep: 300,
    filters: [],
    names: [
      'Chelsea Wool Coat',
      'Harbour Zip Cardigan',
      'Regent Merino Crew',
      'Camden Field Jacket',
      'Soho Funnel-Neck Knit',
      'Oxford Quilted Jacket',
      'Mayfair Half-Zip',
      'Weekend Overshirt',
      'City Lightweight Parka',
      'Kensington Roll Neck',
      'Riverside Bomber Jacket',
      'Belgrave Shawl Cardigan',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      ['Black', '#181818', 'suit-03'],
      ['Navy', '#172d51', 'shirt-01'],
      ['Stone', '#aa9f8b', 'pants-01'],
    ],
  },
  {
    slug: 'shoes',
    name: 'Shoes',
    prefix: 'FW',
    description: 'Formal shoes, smart boots and refined everyday footwear.',
    image: '/images/categories/shoes-960.webp',
    thumbnail: '/images/categories/shoes-480.webp',
    basePrice: 2490,
    priceStep: 250,
    filters: [{ key: 'type', label: 'Type', options: ['Classic', 'Casual', 'Loafers'] }],
    productAttributes: [
      { type: 'Classic' },
      { type: 'Casual' },
      { type: 'Classic' },
      { type: 'Casual' },
      { type: 'Classic' },
      { type: 'Loafers' },
      { type: 'Classic' },
      { type: 'Casual' },
      { type: 'Casual' },
      { type: 'Classic' },
      { type: 'Casual' },
      { type: 'Loafers' },
    ],
    names: [
      'Mayfair Oxford Shoe',
      'Chelsea Leather Boot',
      'Regent Derby Shoe',
      'Camden Suede Boot',
      'Belgrave Monk Strap',
      'City Leather Loafer',
      'Kensington Brogue',
      'Harbour Casual Derby',
      'Soho Dress Sneaker',
      'Windsor Cap-Toe Oxford',
      'Oxford Chukka Boot',
      'Portland Penny Loafer',
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    variants: [
      ['Black', '#1c1c1c', 'shoes-01'],
      ['Tan', '#a46f3f', 'shoes-02'],
      ['Brown', '#67452f', 'shoes-03'],
    ],
  },
  {
    slug: 'ties-belts',
    name: 'Ties & Belts',
    prefix: 'AC',
    description: 'Finishing touches for formal looks and everyday refinement.',
    image: '/images/categories/ties-belts-960.webp',
    thumbnail: '/images/categories/ties-belts-480.webp',
    basePrice: 890,
    priceStep: 150,
    filters: [],
    names: [
      'Regent Silk Tie',
      'Mayfair Leather Belt',
      'Oxford Textured Tie',
      'Chelsea Reversible Belt',
      'Windsor Pattern Tie',
      'City Formal Belt',
      'Belgrave Woven Tie',
      'Camden Suede Belt',
      'Soho Slim Tie',
      'Kensington Buckle Belt',
      'Harbour Knitted Tie',
      'Classic Occasion Set',
    ],
    sizes: ['One size', '32', '34', '36', '38', '40'],
    variants: [
      ['Black', '#1b1b1b', 'tie-01'],
      ['Navy', '#172d51', 'tie-02'],
      ['Brown', '#67452f', 'tie-01'],
    ],
  },
];

const categories = categoryDefinitions.map(
  (
    { prefix, names, sizes, variants, basePrice, priceStep, productAttributes, ...category },
    index,
  ) => ({
    id: index + 1,
    ...category,
    imageAlt: `${category.name} collection`,
  }),
);

const products = categoryDefinitions.flatMap((category) =>
  category.names.map((_, index) => {
    const rotatedVariants = category.variants.map((_, variantIndex) => {
      const [colour, hex, imageKey] =
        category.variants[(index + variantIndex) % category.variants.length];
      return {
        colour,
        hex,
        image: `/images/products/${category.slug}/${imageKey}-960.webp`,
        thumbnail: `/images/products/${category.slug}/${imageKey}-480.webp`,
        alt: `${category.name} item ${index + 1} in ${colour.toLowerCase()}`,
      };
    });

    const availableSizes = category.sizes.filter((_, sizeIndex) => (sizeIndex + index) % 4 !== 0);
    const attributes =
      category.productAttributes?.[index] ??
      Object.fromEntries(
        category.filters.map((filter, filterIndex) => [
          filter.key,
          filter.options[Math.floor(index / 2 ** filterIndex) % filter.options.length],
        ]),
      );

    return {
      id: `${category.slug}-${index + 1}`,
      categorySlug: category.slug,
      ...(category.slug === 'suits' || category.slug === 'shoes'
        ? { code: `${category.prefix}-${String(index + 1).padStart(3, '0')}` }
        : {}),
      price: category.basePrice + (index % 4) * category.priceStep,
      newArrival: index < 3,
      sizes: availableSizes.length >= 3 ? availableSizes : category.sizes.slice(0, 4),
      attributes,
      variants: rotatedVariants,
    };
  }),
);

const locations = [
  {
    id: 1,
    slug: 'tribeca-mall',
    name: 'Tribeca Mall',
    address: ['Tribeca Mall'],
    hours: [
      'Monday - Thursday: 10:00 - 20:30',
      'Friday - Saturday: 10:00 - 22:00',
      'Sunday & public holidays: 10:00 - 17:00',
    ],
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Topman+Realstyle+Tribeca+Mall+Mauritius',
    confirmed: true,
  },
  {
    id: 2,
    slug: 'bagatelle-mall',
    name: 'Bagatelle Mall',
    address: ['Bagatelle Mall'],
    hours: [
      'Monday - Thursday: 10:00 - 20:30',
      'Friday - Saturday: 10:00 - 22:00',
      'Sunday & public holidays: 10:00 - 17:00',
    ],
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Topman+Realstyle+Bagatelle+Mall+Mauritius',
    confirmed: true,
  },
  {
    id: 3,
    slug: 'plaisance-shopping-village',
    name: 'Plaisance Shopping Village',
    address: ['Plaisance Shopping Village'],
    hours: [
      'Monday - Thursday: 10:00 - 20:30',
      'Friday - Saturday: 10:00 - 22:00',
      'Sunday & public holidays: 10:00 - 14:30',
    ],
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Topman+Realstyle+Plaisance+Shopping+Village+Mauritius',
    confirmed: true,
  },
  {
    id: 4,
    slug: 'coeur-de-ville-goodlands',
    name: 'Coeur de Ville - Goodlands',
    address: ['Coeur de Ville', 'Goodlands'],
    hours: [
      'Monday - Thursday: 10:00 - 20:30',
      'Friday - Saturday: 10:00 - 22:00',
      'Sunday & public holidays: 10:00 - 14:30',
    ],
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Topman+Realstyle+Coeur+de+Ville+Goodlands+Mauritius',
    confirmed: true,
  },
  {
    id: 5,
    slug: 'rose-hill',
    name: 'Rose-Hill',
    address: ['Rose-Hill'],
    hours: [
      'Monday - Wednesday: 10:00 - 17:00',
      'Thursday: 10:00 - 13:00',
      'Friday - Saturday: 10:00 - 17:00',
      'Sunday & public holidays: 10:00 - 13:00',
    ],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Topman+Realstyle+Rose+Hill+Mauritius',
    confirmed: true,
  },
];

const productsOutputDirectory = resolve(outputDirectory, 'products');
await Promise.all([
  mkdir(outputDirectory, { recursive: true }),
  mkdir(productsOutputDirectory, { recursive: true }),
]);
await Promise.all([
  writeFile(
    resolve(outputDirectory, 'categories.json'),
    `${JSON.stringify(categories, null, 2)}\n`,
  ),
  writeFile(resolve(outputDirectory, 'locations.json'), `${JSON.stringify(locations, null, 2)}\n`),
  ...categories.map((category) =>
    writeFile(
      resolve(productsOutputDirectory, `${category.slug}.json`),
      `${JSON.stringify(
        products.filter((product) => product.categorySlug === category.slug),
        null,
        2,
      )}\n`,
    ),
  ),
]);

console.log(
  `Generated ${categories.length} categories, ${products.length} products and ${locations.length} locations.`,
);
