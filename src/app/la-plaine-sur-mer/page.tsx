import ClientShopPage from './ClientShopPage'
import { getShopByTitle, getProductsForShop, getPhotosForShop, getAllCategories } from '@/lib/queries'
import { mapHoursToSchedule, mapPhotosToUi, mapProductsToUi, buildOpeningHoursMap } from '@/lib/mappers'

export const revalidate = 60

export default async function Page() {
  let shop = null;
  let products: ReturnType<typeof mapProductsToUi> = []
  let galleryImages: ReturnType<typeof mapPhotosToUi> = []
  let schedule: ReturnType<typeof mapHoursToSchedule> = []
  let openingMap: Record<number, Array<{ start: number; end: number }>> = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] }
  let categories: string[] = []

  try {
    shop = await getShopByTitle('La Plaine-sur-Mer')
    
    if (shop?._id) {
      const [ps, photos, cats] = await Promise.all([
        getProductsForShop(shop._id),
        getPhotosForShop(shop._id),
        getAllCategories(),
      ])
      products = mapProductsToUi(ps)
      galleryImages = mapPhotosToUi(photos)
      schedule = mapHoursToSchedule(shop.hours)
      openingMap = buildOpeningHoursMap(shop.hours)
      categories = cats.map((c) => c.title)
    }
  } catch (error) {
    console.error('Error fetching data for La Plaine-sur-Mer page:', error)
    // Continue with empty data - the page will render with no content
  }

  return (
    <ClientShopPage products={products} galleryImages={galleryImages} schedule={schedule} openingMap={openingMap} allCategories={categories} />
  )
}
