/*
  Seed Sanity dataset with initial content
  - Requires env: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_API_VERSION, SANITY_WRITE_TOKEN
  - Run: SANITY_WRITE_TOKEN=xxxx npm run seed:sanity
*/

const { createClient } = require('@sanity/client')
const https = require('https')
const { PassThrough } = require('stream')
const { randomUUID } = require('crypto')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-10-01'
const token = process.env.SANITY_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing env: set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_WRITE_TOKEN')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token })

function streamFromUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch ${url} → ${res.statusCode}`))
        res.resume()
        return
      }
      const pass = new PassThrough()
      res.pipe(pass)
      resolve(pass)
    }).on('error', reject)
  })
}

async function uploadImage(url, filename) {
  try {
    const stream = await streamFromUrl(url)
    const asset = await client.assets.upload('image', stream, { filename })
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  } catch (e) {
    console.warn('Skip image (upload failed):', filename, e.message)
    return null
  }
}

async function upsert(doc) {
  if (!doc._id) throw new Error('Doc must have a stable _id for createIfNotExists')
  return client.createIfNotExists(doc)
}

async function main() {
  console.log('Seeding Sanity →', { projectId, dataset })

  // Shops
  const shopLaPlaineId = 'shop-la-plaine'
  const shopTharonId = 'shop-tharon'
  const laPlaine = {
    _id: shopLaPlaineId,
    _type: 'shop',
    title: 'La Plaine-sur-Mer',
    hours: {
      monday: [{ _key: randomUUID(), start: '0700', end: '1330' }, { _key: randomUUID(), start: '1500', end: '1915' }],
      tuesday: [{ _key: randomUUID(), start: '0700', end: '1330' }, { _key: randomUUID(), start: '1500', end: '1915' }],
      wednesday: [],
      thursday: [{ _key: randomUUID(), start: '0700', end: '1300' }],
      friday: [{ _key: randomUUID(), start: '0700', end: '1330' }, { _key: randomUUID(), start: '1500', end: '1900' }],
      saturday: [{ _key: randomUUID(), start: '0700', end: '1330' }, { _key: randomUUID(), start: '1500', end: '1915' }],
      sunday: [{ _key: randomUUID(), start: '0700', end: '1315' }],
    },
  }
  const tharon = {
    _id: shopTharonId,
    _type: 'shop',
    title: 'Tharon Plage',
    hours: {
      monday: [],
      tuesday: [{ _key: randomUUID(), start: '0700', end: '1300' }, { _key: randomUUID(), start: '1500', end: '1915' }],
      wednesday: [{ _key: randomUUID(), start: '0700', end: '1315' }, { _key: randomUUID(), start: '1500', end: '1915' }],
      thursday: [{ _key: randomUUID(), start: '0700', end: '1315' }, { _key: randomUUID(), start: '1500', end: '1915' }],
      friday: [{ _key: randomUUID(), start: '0700', end: '1315' }, { _key: randomUUID(), start: '1500', end: '1915' }],
      saturday: [{ _key: randomUUID(), start: '0700', end: '1315' }, { _key: randomUUID(), start: '1500', end: '1915' }],
      sunday: [{ _key: randomUUID(), start: '0700', end: '1300' }],
    },
  }
  await upsert(laPlaine)
  await upsert(tharon)
  console.log('Shops upserted')

  // Categories
  const categories = [
    { _id: 'cat-patisserie', _type: 'category', title: 'Pâtisserie' },
    { _id: 'cat-viennoiserie', _type: 'category', title: 'Viennoiserie' },
    { _id: 'cat-pain', _type: 'category', title: 'Pain' },
    { _id: 'cat-snacking', _type: 'category', title: 'Snacking' },
  ]
  await Promise.all(categories.map(upsert))
  console.log('Categories upserted')

  // Allergens (EU list, FR)
  const allergenTitles = [
    'Gluten',
    'Crustacés',
    'Œufs',
    'Poisson',
    'Arachides',
    'Soja',
    'Lait',
    'Fruits à coque (amande, noisette, noix, cajou, pécan, Brésil, pistache, macadamia)',
    'Céleri',
    'Moutarde',
    'Graines de sésame',
    'Anhydride sulfureux et sulfites',
    'Lupin',
    'Mollusques',
  ]
  const allergens = allergenTitles.map((t, i) => ({ _id: `allergen-${i + 1}`, _type: 'allergen', title: t }))
  await Promise.all(allergens.map(upsert))
  console.log('Allergens upserted')

  // Products (samples) — no variants (sizes) per request
  const parisBrestImg = await uploadImage(
    'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?auto=format&fit=crop&w=1200&q=60',
    'paris-brest.jpg'
  )
  const baguetteImg = await uploadImage(
    'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1200&q=60',
    'baguette.jpg'
  )
  const croissantImg = await uploadImage(
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=60',
    'croissant.jpg'
  )

  const products = [
    {
      _id: 'prod-paris-brest',
      _type: 'product',
      title: 'Paris-Brest',
      category: { _type: 'reference', _ref: 'cat-patisserie' },
      image: parisBrestImg || undefined,
      description: "Choux garni de crème mousseline pralinée, amandes effilées.",
      allergens: [
        { _key: randomUUID(), _type: 'reference', _ref: 'allergen-1' },
        { _key: randomUUID(), _type: 'reference', _ref: 'allergen-3' },
        { _key: randomUUID(), _type: 'reference', _ref: 'allergen-7' },
        { _key: randomUUID(), _type: 'reference', _ref: 'allergen-8' },
      ],
      variants: [],
      shops: [
        { _key: randomUUID(), shop: { _type: 'reference', _ref: shopLaPlaineId }, available: true },
        { _key: randomUUID(), shop: { _type: 'reference', _ref: shopTharonId }, available: true },
      ],
    },
    {
      _id: 'prod-baguette-tradition',
      _type: 'product',
      title: 'Baguette tradition',
      category: { _type: 'reference', _ref: 'cat-pain' },
      image: baguetteImg || undefined,
      description: "Baguette de tradition française, croustillante et moelleuse.",
      allergens: [{ _key: randomUUID(), _type: 'reference', _ref: 'allergen-1' }],
      variants: [],
      shops: [
        { _key: randomUUID(), shop: { _type: 'reference', _ref: shopLaPlaineId }, available: true },
        { _key: randomUUID(), shop: { _type: 'reference', _ref: shopTharonId }, available: true },
      ],
    },
    {
      _id: 'prod-croissant-beurre',
      _type: 'product',
      title: 'Croissant pur beurre',
      category: { _type: 'reference', _ref: 'cat-viennoiserie' },
      image: croissantImg || undefined,
      description: "Feuilletage croustillant, beurre AOP.",
      allergens: [
        { _key: randomUUID(), _type: 'reference', _ref: 'allergen-1' },
        { _key: randomUUID(), _type: 'reference', _ref: 'allergen-3' },
        { _key: randomUUID(), _type: 'reference', _ref: 'allergen-7' },
      ],
      variants: [],
      shops: [
        { _key: randomUUID(), shop: { _type: 'reference', _ref: shopLaPlaineId }, available: true },
        { _key: randomUUID(), shop: { _type: 'reference', _ref: shopTharonId }, available: true },
      ],
    },
  ]
  await Promise.all(products.map(upsert))
  console.log('Products upserted')

  // Photos per shop — skip entries whose image fails
  const photoUrlsLaPlaine = [
    'https://images.unsplash.com/photo-1514512364185-4c2b90ca6f16?auto=format&fit=crop&w=1600&q=60',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1600&q=60',
    'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1600&q=60',
  ]
  const photoUrlsTharon = [
    'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1600&q=60',
    'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=1600&q=60',
    'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1600&q=60',
  ]

  let photoIndex = 1
  for (const url of photoUrlsLaPlaine) {
    const img = await uploadImage(url, `la-plaine-${photoIndex}.jpg`)
    if (img) {
      await upsert({
        _id: `photo-la-plaine-${photoIndex}`,
        _type: 'photo',
        title: `Photo ${photoIndex}`,
        image: img,
        shop: { _type: 'reference', _ref: shopLaPlaineId },
      })
    }
    photoIndex++
  }
  photoIndex = 1
  for (const url of photoUrlsTharon) {
    const img = await uploadImage(url, `tharon-${photoIndex}.jpg`)
    if (img) {
      await upsert({
        _id: `photo-tharon-${photoIndex}`,
        _type: 'photo',
        title: `Photo ${photoIndex}`,
        image: img,
        shop: { _type: 'reference', _ref: shopTharonId },
      })
    }
    photoIndex++
  }
  console.log('Photos upserted')

  console.log('Seed completed ✅')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
