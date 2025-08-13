/*
  Fix missing _key fields in array items for existing Sanity documents
  - Requires env: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_API_VERSION, SANITY_WRITE_TOKEN
  - Run: SANITY_WRITE_TOKEN=xxxx node scripts/fixKeysSanity.js
*/

const { createClient } = require('@sanity/client')
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

async function fixProducts() {
  const products = await client.fetch(`*[_type == "product"]{_id, allergens, shops, variants}`)
  let fixed = 0
  for (const p of products) {
    const patch = {}
    if (Array.isArray(p.allergens)) {
      const newAll = p.allergens.map((it) => (it && it._key ? it : { ...it, _key: randomUUID() }))
      const changed = newAll.some((it, idx) => p.allergens[idx]?._key !== it._key)
      if (changed) patch.allergens = newAll
    }
    if (Array.isArray(p.shops)) {
      const newShops = p.shops.map((it) => (it && it._key ? it : { ...it, _key: randomUUID() }))
      const changed = newShops.some((it, idx) => p.shops[idx]?._key !== it._key)
      if (changed) patch.shops = newShops
    }
    if (Array.isArray(p.variants)) {
      const newVars = p.variants.map((it) => (it && it._key ? it : { ...it, _key: randomUUID() }))
      const changed = newVars.some((it, idx) => p.variants[idx]?._key !== it._key)
      if (changed) patch.variants = newVars
    }
    if (Object.keys(patch).length) {
      await client.patch(p._id).set(patch).commit()
      fixed++
    }
  }
  return fixed
}

async function fixShops() {
  const shops = await client.fetch(`*[_type == "shop"]{_id, hours, hoursExceptions}`)
  let fixed = 0
  const days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
  for (const s of shops) {
    let changed = false
    const setPatch = {}
    if (s.hours) {
      const newHours = { ...s.hours }
      for (const d of days) {
        const arr = Array.isArray(newHours[d]) ? newHours[d] : []
        const newArr = arr.map((it) => (it && it._key ? it : { ...it, _key: randomUUID() }))
        if (newArr.length && newArr.some((it, idx) => arr[idx]?._key !== it._key)) {
          newHours[d] = newArr
          changed = true
        }
      }
      if (changed) setPatch.hours = newHours
    }
    if (Array.isArray(s.hoursExceptions)) {
      const newEx = s.hoursExceptions.map((it) => (it && it._key ? it : { ...it, _key: randomUUID() }))
      const changedEx = newEx.some((it, idx) => s.hoursExceptions[idx]?._key !== it._key)
      if (changedEx) {
        setPatch.hoursExceptions = newEx
        changed = true
      }
    }
    if (changed) {
      await client.patch(s._id).set(setPatch).commit()
      fixed++
    }
  }
  return fixed
}

async function main() {
  console.log('Fixing missing _key for array items in products and shops...')
  const p = await fixProducts()
  const s = await fixShops()
  console.log(`Done. Patched products: ${p}, shops: ${s}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
