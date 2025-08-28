'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Menu, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Gallery from '@/components/Gallery'
import type { UiGalleryImage, UiProduct, UiScheduleItem } from '@/lib/types'

type Props = {
  products: UiProduct[]
  galleryImages: UiGalleryImage[]
  schedule: UiScheduleItem[]
  openingMap: Record<number, Array<{ start: number; end: number }>>
  shopTitleHeading?: string
  addressLine?: string
  switchLinkHref?: string
  switchLinkLabel?: string
  allCategories?: string[]
}

const isOpenNow = (openingMap: Props['openingMap']) => {
  const now = new Date()
  const currentDay = now.getDay()
  const currentTime = now.getHours() * 100 + now.getMinutes()
  const today = openingMap[currentDay] || []
  return today.some((p) => currentTime >= p.start && currentTime <= p.end)
}

export default function ClientShopPage({
  products,
  galleryImages,
  schedule,
  openingMap,
  shopTitleHeading = 'LA PLAINE SUR MER',
  addressLine = "1 Boulevard des Nations Unies, 44770 La Plaine-sur-Mer",
  switchLinkHref = '/saint-michel-chef-chef',
  switchLinkLabel = 'Tharon-Plage →',
  allCategories,
}: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<UiProduct | null>(null)
  const [activeCat, setActiveCat] = useState<string>('Toutes')
  const hasProductImage = Boolean(selectedProduct?.image)

  // Auto-hide navbar on scroll
  const [isNavHidden, setIsNavHidden] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const downEnough = delta > 6
          const upEnough = delta < -6
          const pastHeader = currentY > 80
          if (downEnough && pastHeader) {
            setIsNavHidden(true)
          } else if (upEnough) {
            setIsNavHidden(false)
          }
          lastScrollY.current = currentY
          ticking.current = false
        })
        ticking.current = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const categories = useMemo(() => {
    const fromSanity = (allCategories && allCategories.length) ? allCategories : []
    if (fromSanity.length) return ['Toutes', ...fromSanity]
    const set = new Set<string>(['Toutes'])
    products.forEach((p) => (p.categories || []).forEach((c) => set.add(c)))
    return Array.from(set)
  }, [products, allCategories])

  const filtered = useMemo(() => {
    if (activeCat === 'Toutes') return products
    return products.filter((p) => (p.categories || []).includes(activeCat))
  }, [products, activeCat])

  return (
    <div className="min-h-screen bg-white">
      <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-transform duration-300 ${isNavHidden ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-16 justify-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden absolute left-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="grolet-title text-left">Navigation</SheetTitle>
                </SheetHeader>
                <nav className="mt-8 space-y-4">
                  <Link href="/" className="block grolet-nav hover:text-gray-600 transition-colors">Accueil</Link>
                  <Link href="/saint-michel-chef-chef" className="block grolet-nav hover:text-gray-600 transition-colors">Tharon-Plage</Link>
                  <a href="#produits" className="block grolet-nav hover:text-gray-600 transition-colors">Notre Carte</a>
                  <a href="#galerie" className="block grolet-nav hover:text-gray-600 transition-colors">Galerie</a>
                  <a href="#histoire" className="block grolet-nav hover:text-gray-600 transition-colors">Notre histoire</a>
                  <a href="#horaires" className="block grolet-nav hover:text-gray-600 transition-colors">Horaires</a>
                  <a href="#contact" className="block grolet-nav hover:text-gray-600 transition-colors">Contact</a>
                </nav>
              </SheetContent>
            </Sheet>

            <div className="md:flex-none md:mr-6 md:w-[240px]">
              <Link href="/" className="grolet-title text-xl font-bold tracking-wider">
                L'ARBRE À PAINS<br />
                <span className="text-sm font-normal">{shopTitleHeading}</span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center flex-1">
              <div className="flex-1 flex justify-center">
                <div className="flex space-x-8 flex-nowrap">
                  <Link href="/" className="grolet-nav hover:text-gray-600 transition-colors">Accueil</Link>
                  <a href="#produits" className="grolet-nav hover:text-gray-600 transition-colors">Notre Carte</a>
                  <a href="#galerie" className="grolet-nav hover:text-gray-600 transition-colors">Galerie</a>
                  <a href="#histoire" className="grolet-nav hover:text-gray-600 transition-colors">Notre histoire</a>
                  <a href="#horaires" className="grolet-nav hover:text-gray-600 transition-colors">Horaires</a>
                  <a href="#contact" className="grolet-nav hover:text-gray-600 transition-colors">Contact</a>
                </div>
              </div>
              <div className="md:w-[240px] md:flex-none md:flex md:justify-end">
                <Link href={switchLinkHref} className="grolet-nav hover:text-black transition-colors font-medium text-right block">{switchLinkLabel}</Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <section className="grolet-hero-bg py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="grolet-title text-4xl md:text-6xl font-bold mb-8">{shopTitleHeading}</h2>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Boulangerie-Pâtisserie artisanale</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{addressLine}</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Button onClick={() => document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' })} className="bg-black text-white hover:bg-gray-800 px-8 py-3">Découvrir nos produits</Button>
                </div>
              </div>
            </div>

            <div className="bg-black text-white p-8 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <div className={`w-3 h-3 rounded-full animate-pulse ${isOpenNow(openingMap) ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-sm font-medium">{isOpenNow(openingMap) ? 'BOUTIQUE OUVERTE' : 'BOUTIQUE FERMÉE'}</span>
              </div>
              <h3 className="text-2xl font-medium mb-6">Boulangerie artisanale</h3>
              <Button onClick={() => (window.location.href = 'tel:0240215060')} className="w-full bg-white text-black hover:bg-gray-100 flex items-center justify-center space-x-2 font-medium">
                <Phone className="h-4 w-4" />
                <span>Nous contacter</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="galerie" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="grolet-title text-3xl font-bold text-center mb-12">Galerie Photos</h2>
          <Gallery images={galleryImages} fit="contain" />
        </div>
      </section>

      {/* Notre Histoire Section (hard-coded) */}
      <section id="histoire" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="grolet-title text-3xl font-bold mb-8">Notre Histoire</h2>
              <div className="space-y-6 text-gray-700">
                <p className="text-lg">
                  Maison artisanale, nous façonnons chaque jour pains, viennoiseries et pâtisseries avec
                  des ingrédients simples et un savoir‑faire transmis. Notre équipe partage la même
                  exigence: proposer des produits généreux, réguliers et gourmands.
                </p>
                <p>
                  Au fil des saisons, nous mettons en avant les recettes qui nous ressemblent: levains,
                  farines choisies, beurre de qualité, fruits du moment. Une approche sincère, sans
                  artifices, centrée sur le goût et la fraîcheur.
                </p>
                <p>
                  Merci à nos clients fidèles et à ceux qui nous découvrent: votre confiance guide nos
                  journées et nous donne l’énergie de faire toujours mieux.
                </p>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Équipe boulangerie" className="rounded-lg object-cover h-48" />
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Savoir-faire artisanal" className="rounded-lg object-cover h-48" />
              <img src="https://images.unsplash.com/photo-1574982596727-d6677f45efa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Four traditionnel" className="rounded-lg object-cover h-48" />
              <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Produits frais" className="rounded-lg object-cover h-48" />
            </div>
          </div>
        </div>
      </section>

      <section id="produits" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="grolet-title text-3xl font-bold text-center mb-8">Nos Produits</h2>

          {/* Category navbar */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`px-4 py-2 text-sm rounded-full border transition-colors ${activeCat === c ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:bg-gray-50'}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <Card key={product.id} className="group cursor-pointer border-0 shadow-none relative">
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden rounded-lg relative cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <img
                      src={product.image || '/logo/logorond.png'}
                      alt={product.name}
                      className={`w-full h-full ${product.image ? 'object-cover group-hover:scale-105 transition-transform duration-300' : 'object-contain p-16 md:p-20 bg-white'}`}
                    />
                    <div className="absolute bottom-0 left-0 right-0 md:hidden bg-black/70 text-white px-3 py-2 flex items-center justify-between">
                      <span className="grolet-product-title text-sm font-medium truncate pr-2">{product.name}</span>
                      {/* pas de prix indicatif */}
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex flex-col justify-center items-center text-center p-6">
                      <h3 className="grolet-product-title text-white text-lg font-medium mb-2">{product.name}</h3>
                      {/* pas de prix indicatif */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="horaires" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="grolet-title text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Horaires d'ouverture</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-8">
              {schedule.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 md:py-3 border-b border-gray-100 last:border-b-0">
                  <span className="font-medium text-base md:text-lg">{item.day}</span>
                  <span className={(item.hours === 'Fermé' ? 'text-red-500' : 'text-gray-600') + ' text-sm md:text-base text-right leading-tight break-words'}>{item.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-8">
            <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-white">
              <img src="/logo/logorond.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <h3 className="grolet-title text-xl font-bold mb-2">L'ARBRE À PAINS</h3>
              <p className="text-gray-600 mb-4">Boulangerie-Pâtisserie artisanale</p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>{addressLine}</p>
                <p>SARL Douaud - Professionnel du Bio</p>
                <p>
                  La Plaine-sur-Mer:
                  {' '}
                  <a href="tel:0240215060" className="text-black hover:underline">02 40 21 50 60</a>
                </p>
                <p>
                  Tharon-Plage:
                  {' '}
                  <a href="tel:0240396873" className="text-black hover:underline">02 40 39 68 73</a>
                </p>
              </div>
            </div>
            <nav className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/" className="text-gray-600 hover:text-black transition-colors duration-200 hover:scale-105 transform">Accueil</Link>
              <Link href={switchLinkHref} className="text-gray-600 hover:text-black transition-colors duration-200 hover:scale-105 transform">{switchLinkLabel.replace(' →','')}</Link>
              <a href="#galerie" className="text-gray-600 hover:text-black transition-colors duration-200 hover:scale-105 transform">Galerie</a>
              <a href="#histoire" className="text-gray-600 hover:text-black transition-colors duration-200 hover:scale-105 transform">Notre histoire</a>
              <a href="#horaires" className="text-gray-600 hover:text-black transition-colors duration-200 hover:scale-105 transform">Horaires</a>
              <a href="#contact" className="text-gray-600 hover:text-black transition-colors duration-200 hover:scale-105 transform">Contact</a>
            </nav>
            <div className="text-center text-xs text-gray-500">
              <p>© 2025 L'Arbre à Pains - SARL Douaud</p>
            </div>
          </div>
        </div>
      </footer>

      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-6xl w-full h-[80vh] p-0 gap-0">
            <div className={`grid grid-cols-1 ${hasProductImage ? 'md:grid-cols-2' : ''} h-full`}>
              {hasProductImage && (
                <div className="hidden md:block relative h-full overflow-hidden bg-white">
                  <img
                    src={selectedProduct!.image as string}
                    alt={selectedProduct!.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-8 flex flex-col">
                <DialogHeader className="mb-6">
                  <DialogTitle className="grolet-product-title text-3xl font-normal tracking-wide uppercase">{selectedProduct.name}</DialogTitle>
                </DialogHeader>
                <div className="flex-1 space-y-6">
                  {selectedProduct.description && (
                    <p className="text-gray-700 text-lg leading-relaxed">{selectedProduct.description}</p>
                  )}
                  {selectedProduct.ingredients && (
                    <div className="text-sm text-gray-500">— {selectedProduct.ingredients}</div>
                  )}
                  {/* Pas de bloc prix indicatif; on affiche uniquement les tailles ci-dessous */}
                  {selectedProduct.sizes?.length ? (
                    <div>
                      <h4 className="font-medium mb-3 text-sm uppercase tracking-wide">Tailles disponibles :</h4>
                      <ul className="space-y-2">
                        {selectedProduct.sizes.map((size, index) => (
                          <li key={index} className="text-sm text-gray-600 pl-4 relative">
                            <span className="absolute left-0">•</span>
                            {size}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
                <div className="pt-6 border-t">
                  <Button onClick={() => (window.location.href = 'tel:0240215060')} className="w-full bg-black text-white hover:bg-gray-800 h-12 text-base font-medium tracking-wide">Nous contacter pour plus d'informations</Button>
                  <p className="text-center text-sm text-gray-500 mt-3">Produit disponible selon nos horaires d'ouverture</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
