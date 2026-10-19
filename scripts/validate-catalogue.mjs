import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const publicDirectory = resolve('public');
const readJson = async (name) =>
  JSON.parse(await readFile(resolve(publicDirectory, 'data', name), 'utf8'));

const [categories, locations] = await Promise.all([
  readJson('categories.json'),
  readJson('locations.json'),
]);
const productCollections = await Promise.all(
  categories.map((category) => readJson(`products/${category.slug}.json`)),
);
const products = productCollections.flat();

const errors = [];
const categorySlugs = new Set(categories.map((category) => category.slug));
const productCodes = new Set();
const imagePaths = new Set();

for (const category of categories) {
  imagePaths.add(category.image);
  imagePaths.add(category.thumbnail);
  const categoryProducts = products.filter((product) => product.categorySlug === category.slug);
  if (categoryProducts.length < 10) {
    errors.push(
      `${category.name} has only ${categoryProducts.length} products; at least 10 are required.`,
    );
  }
}

for (const product of products) {
  const reference = product.code ?? product.id;
  if (!categorySlugs.has(product.categorySlug))
    errors.push(`${reference} references an unknown category.`);
  const requiresCode = product.categorySlug === 'suits' || product.categorySlug === 'shoes';
  if (requiresCode && !product.code) errors.push(`${product.id} requires a product code.`);
  if (!requiresCode && product.code) errors.push(`${product.id} should not have a product code.`);
  if (product.code) {
    if (productCodes.has(product.code)) errors.push(`Duplicate product code: ${product.code}`);
    productCodes.add(product.code);
  }
  if (!Number.isFinite(product.price) || product.price <= 0) {
    errors.push(`${reference} has an invalid price.`);
  }
  if (product.variants.length === 0) errors.push(`${reference} has no colour variants.`);
  const category = categories.find((item) => item.slug === product.categorySlug);
  for (const filter of category?.filters ?? []) {
    const value = product.attributes?.[filter.key];
    if (!filter.options.includes(value)) {
      errors.push(`${reference} has an invalid ${filter.label.toLowerCase()} value.`);
    }
  }
  for (const variant of product.variants) {
    imagePaths.add(variant.image);
    imagePaths.add(variant.thumbnail);
  }
}

for (const imagePath of imagePaths) {
  try {
    await access(resolve(publicDirectory, imagePath.replace(/^\//, '')));
  } catch {
    errors.push(`Missing image: ${imagePath}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    `Catalogue valid: ${categories.length} categories, ${products.length} products, ${locations.length} location.`,
  );
}
