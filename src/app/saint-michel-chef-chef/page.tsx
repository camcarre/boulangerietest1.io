import ClientShopPage from '../la-plaine-sur-mer/ClientShopPage'
import { getShopByTitle, getProductsForShop, getPhotosForShop, getAllCategories } from '@/lib/queries'
import { mapHoursToSchedule, mapPhotosToUi, mapProductsToUi, buildOpeningHoursMap } from '@/lib/mappers'

export const revalidate = 60

export default async function Page() {
  const shop = await getShopByTitle('Tharon Plage')
  let products = [] as any
  let galleryImages = [] as any
  let schedule = [] as any
  let openingMap: Record<number, Array<{ start: number; end: number }>> = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] }
  let categories: string[] = []

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
    categories = cats.map((c: any) => c.title)
  }

  return (
    <ClientShopPage
      products={products}
      galleryImages={galleryImages}
      schedule={schedule}
      openingMap={openingMap}
      shopTitleHeading="THARON PLAGE"
      addressLine="42 Avenue du Maréchal Foch, 44730 Tharon-Plage"
      switchLinkHref="/la-plaine-sur-mer"
      switchLinkLabel="La Plaine sur Mer →"
      allCategories={categories}
    />
  )
}
