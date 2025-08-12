'use client'

import { useState, useEffect } from 'react'
import { Calendar, Menu, MapPin, Phone, Clock, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import Gallery from '@/components/Gallery'

const products = [
  {
    id: 1,
    name: "BAGUETTE TRADITION",
    price: "1,20",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Baguette de tradition française, croustillante à l'extérieur, moelleuse à l'intérieur",
    details: "Notre baguette tradition est pétrie selon les méthodes traditionnelles avec une farine de qualité supérieure. Cuite au four à sole, elle développe une croûte dorée et croustillante qui révèle une mie alvéolée et parfumée.",
    sizes: ["Baguette entière - 1,20€", "Demi-baguette - 0,65€"],
    ingredients: "Farine de blé, eau, levure, sel"
  },
  {
    id: 2,
    name: "PAIN AU LEVAIN",
    price: "2,80",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Pain artisanal au levain naturel, saveur authentique et mie alvéolée",
    details: "Pain élaboré avec notre levain chef entretenu depuis des années. Sa fermentation lente développe des arômes complexes et une digestibilité optimale. Reconnu par les professionnels du bio.",
    sizes: ["Pain entier (500g) - 2,80€", "Demi-pain (250g) - 1,50€"],
    ingredients: "Farine de blé bio, eau, levain naturel, sel de mer"
  },
  {
    id: 3,
    name: "CROISSANT AU BEURRE",
    price: "1,10",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Croissant pur beurre AOP, feuilletage croustillant et fondant",
    details: "Croissant élaboré avec du beurre AOP Charentes-Poitou. Notre pâte feuilletée est travaillée à la main pour obtenir un feuilletage parfait, croustillant à l'extérieur et moelleux à l'intérieur.",
    sizes: ["Croissant classique - 1,10€", "Mini-croissant (lot de 6) - 5,50€"],
    ingredients: "Farine, beurre AOP, lait, œufs, sucre, levure, sel"
  },
  {
    id: 4,
    name: "PAIN AU CHOCOLAT",
    price: "1,20",
    image: "https://images.unsplash.com/photo-1555507036-ab794f4108fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Viennoiserie feuilletée avec deux barres de chocolat noir",
    details: "Pain au chocolat traditionnel garni de deux bâtons de chocolat noir de qualité supérieure. Pâte feuilletée au beurre, dorée au four pour une texture parfaite.",
    sizes: ["Pain au chocolat - 1,20€", "Mini pains au chocolat (lot de 4) - 4,00€"],
    ingredients: "Farine, beurre, chocolat noir 70%, lait, œufs, sucre, levure"
  },
  {
    id: 5,
    name: "TARTE AUX POMMES",
    price: "18,00",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Tarte fine aux pommes sur pâte brisée maison, 6-8 personnes",
    details: "Tarte réalisée avec des pommes locales de saison, disposées en rosace sur une pâte brisée maison. Légèrement caramélisée, elle révèle toute la saveur du fruit.",
    sizes: ["Tarte entière (8 parts) - 18,00€", "Part individuelle - 2,50€"],
    ingredients: "Pommes locales, pâte brisée maison, sucre, beurre, cannelle"
  },
  {
    id: 6,
    name: "ÉCLAIR AU CAFÉ",
    price: "2,50",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Choux garni de crème pâtissière au café, glaçage fondant",
    details: "Éclair traditionnel garni d'une crème pâtissière au café arabica, recouvert d'un glaçage au café. Pâte à choux dorée et croustillante.",
    sizes: ["Éclair classique - 2,50€", "Mini-éclairs (lot de 3) - 6,00€"],
    ingredients: "Pâte à choux, crème pâtissière, café arabica, glaçage fondant"
  },
  {
    id: 7,
    name: "MILLE-FEUILLE",
    price: "3,20",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Feuilletage croustillant, crème pâtissière vanille, glaçage royal",
    details: "Mille-feuille traditionnel composé de trois couches de pâte feuilletée croustillante et de deux couches de crème pâtissière vanille. Décoré d'un glaçage royal traditionnel.",
    sizes: ["Mille-feuille individuel - 3,20€", "Mille-feuille familial (6 parts) - 16,00€"],
    ingredients: "Pâte feuilletée, crème pâtissière, vanille Bourbon, glaçage royal"
  },
  {
    id: 8,
    name: "BRIOCHE PERDUE",
    price: "2,80",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Spécialité locale, brioche moelleuse aux raisins et fruits confits",
    details: "Spécialité de la région, cette brioche artisanale est enrichie de raisins secs et de fruits confits. Sa pâte moelleuse et parfumée en fait une gourmandise appréciée de tous.",
    sizes: ["Brioche individuelle - 2,80€", "Grande brioche (6-8 parts) - 12,00€"],
    ingredients: "Farine, beurre, œufs, raisins secs, fruits confits, lait, sucre"
  },
  {
    id: 9,
    name: "SANDWICH JAMBON BEURRE",
    price: "3,50",
    image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Sandwich traditionnel sur baguette fraîche, jambon de qualité",
    details: "Sandwich préparé sur notre baguette tradition fraîche du jour, garni de jambon blanc de qualité supérieure et de beurre fermier. Simple et authentique.",
    sizes: ["Sandwich entier - 3,50€", "Demi-sandwich - 2,00€"],
    ingredients: "Baguette tradition, jambon blanc, beurre fermier"
  },
  {
    id: 10,
    name: "QUICHE LORRAINE",
    price: "3,80",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Quiche traditionnelle aux lardons et crème fraîche",
    details: "Quiche lorraine authentique préparée avec des lardons fumés, de la crème fraîche et des œufs frais sur une pâte brisée maison. Cuite à point pour une texture fondante.",
    sizes: ["Part individuelle - 3,80€", "Quiche entière (8 parts) - 22,00€"],
    ingredients: "Pâte brisée, lardons fumés, crème fraîche, œufs frais, muscade"
  },
  {
    id: 11,
    name: "PARIS-BREST",
    price: "4,50",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Choux garni de crème mousseline pralinée, amandes effilées",
    details: "Paris-Brest traditionnel en forme de roue, garni d'une crème mousseline au praliné maison. Décoré d'amandes effilées et de sucre glace. Une création pâtissière d'exception.",
    sizes: ["Paris-Brest individuel - 4,50€", "Grand Paris-Brest (6 parts) - 24,00€"],
    ingredients: "Pâte à choux, crème mousseline, praliné maison, amandes effilées"
  },
  {
    id: 12,
    name: "PAIN DE CAMPAGNE",
    price: "3,20",
    image: "https://images.unsplash.com/photo-1574982596727-d6677f45efa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Pain de campagne aux céréales, mie dense et savoureuse",
    details: "Pain de campagne traditionnel aux céréales variées. Sa mie dense et parfumée se conserve plusieurs jours. Idéal pour accompagner fromages et charcuteries.",
    sizes: ["Pain entier (800g) - 3,20€", "Demi-pain (400g) - 1,80€"],
    ingredients: "Farine de blé, céréales variées, levain, eau, sel de mer"
  }
]

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1600&q=80",
    alt: "Étagères de baguettes artisanales",
    caption: "Nos baguettes sorties du four"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1514512364185-4c2b90ca6f16?auto=format&fit=crop&w=1600&q=80",
    alt: "Pains de campagne sur planche",
    caption: "Pains de campagne au levain"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1600&q=80",
    alt: "Viennoiseries et café",
    caption: "Viennoiseries du matin"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1600&q=80",
    alt: "Gâteaux en vitrine",
    caption: "Pâtisseries maison"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=1600&q=80",
    alt: "Miche de pain artisanal",
    caption: "Cuisson au four à sole"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1600&q=80",
    alt: "Baguette tradition détaillée",
    caption: "Le savoir‑faire depuis 2001"
  }
]

const schedule = [
  { day: "Lundi", hours: "7h00 - 13h30 & 15h00 - 19h15" },
  { day: "Mardi", hours: "7h00 - 13h30 & 15h00 - 19h15" },
  { day: "Mercredi", hours: "Fermé" },
  { day: "Jeudi", hours: "7h00 - 13h00" },
  { day: "Vendredi", hours: "7h00 - 13h30 & 15h00 - 19h00" },
  { day: "Samedi", hours: "7h00 - 13h30 & 15h00 - 19h15" },
  { day: "Dimanche", hours: "7h00 - 13h15" }
]

// Function to check if store is currently open
const isStoreOpen = () => {
  const now = new Date()
  const currentDay = now.getDay() // 0 = Sunday, 1 = Monday, etc.
  const currentTime = now.getHours() * 100 + now.getMinutes()

  // Wednesday is closed (index 2)
  if (currentDay === 3) return false

  // Define opening hours for each day
  const openingHours: Record<number, Array<{ start: number; end: number }>> = {
    0: [{ start: 700, end: 1315 }], // Sunday
    1: [{ start: 700, end: 1330 }, { start: 1500, end: 1915 }], // Monday
    2: [{ start: 700, end: 1330 }, { start: 1500, end: 1915 }], // Tuesday
    3: [], // Wednesday - closed
    4: [{ start: 700, end: 1300 }], // Thursday
    5: [{ start: 700, end: 1330 }, { start: 1500, end: 1900 }], // Friday
    6: [{ start: 700, end: 1330 }, { start: 1500, end: 1915 }], // Saturday
  }

  const todayHours = openingHours[currentDay] || []
  return todayHours.some((period: { start: number; end: number }) => currentTime >= period.start && currentTime <= period.end)
}

export default function LaPlaineSurMer() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [storeOpen, setStoreOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
   const todayIndex = (new Date().getDay() + 6) % 7

  useEffect(() => {
    setStoreOpen(isStoreOpen())
  }, [])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const handleCall = () => {
    window.location.href = 'tel:0240215060'
  }

  const openProductModal = (product: typeof products[0]) => {
    setSelectedProduct(product)
  }

  const closeProductModal = () => {
    setSelectedProduct(null)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-16 justify-center">
            {/* Mobile menu button */}
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

            {/* Logo */}
            <div className="md:flex-none md:mr-6">
              <Link href="/" className="grolet-title text-xl font-bold tracking-wider">
                L'ARBRE À PAINS<br />
                <span className="text-sm font-normal">LA PLAINE-SUR-MER</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
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
              <Link href="/saint-michel-chef-chef" className="grolet-nav hover:text-black transition-colors ml-auto font-medium">Tharon-Plage →</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="grolet-hero-bg py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div>
              <h2 className="grolet-title text-4xl md:text-6xl font-bold mb-8">LA PLAINE SUR MER</h2>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Boulangerie-Pâtisserie artisanale</p>
                <h3 className="text-2xl font-medium">Nos spécialités du jour</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>1 Boulevard des Nations Unies, 44770 La Plaine-sur-Mer</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Button
                    onClick={() => document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-black text-white hover:bg-gray-800 px-8 py-3"
                  >
                    Découvrir notre carte
                  </Button>
                </div>
              </div>
            </div>

            {/* Right side - Store Status and Call Button */}
            <div className="bg-black text-white p-8 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <div className={`w-3 h-3 rounded-full animate-pulse ${storeOpen ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-sm font-medium">
                  {storeOpen ? 'BOUTIQUE OUVERTE' : 'BOUTIQUE FERMÉE'}
                </span>
              </div>
              <h3 className="text-2xl font-medium mb-6">
                Boulangerie artisanale
              </h3>
              <Button
                onClick={handleCall}
                className="w-full bg-white text-black hover:bg-gray-100 flex items-center justify-center space-x-2 font-medium"
              >
                <Phone className="h-4 w-4" />
                <span>Nous contacter</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section id="galerie" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="grolet-title text-3xl font-bold text-center mb-12">Galerie Photos</h2>
          <Gallery images={galleryImages} fit="contain" />
        </div>
      </section>

      {/* Notre Histoire Section */}
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
              <img
                src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Équipe boulangerie"
                className="rounded-lg object-cover h-48"
              />
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Savoir-faire artisanal"
                className="rounded-lg object-cover h-48"
              />
              <img
                src="https://images.unsplash.com/photo-1574982596727-d6677f45efa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Four traditionnel"
                className="rounded-lg object-cover h-48"
              />
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Produits frais"
                className="rounded-lg object-cover h-48"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="produits" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="grolet-title text-3xl font-bold text-center mb-12">Nos Produits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group cursor-pointer border-0 shadow-none relative">
                <CardContent className="p-0">
                  <div
                    className="aspect-square overflow-hidden rounded-lg relative cursor-pointer"
                    onClick={() => openProductModal(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Mobile info bar */}
                    <div className="absolute bottom-0 left-0 right-0 md:hidden bg-black/70 text-white px-3 py-2 flex items-center justify-between">
                      <span className="grolet-product-title text-sm font-medium truncate pr-2">{product.name}</span>
                      <span className="text-sm whitespace-nowrap">{product.price} €</span>
                    </div>
                    {/* Hover overlay with minimal info (desktop) */}
                    <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex flex-col justify-center items-center text-center p-6">
                      <h3 className="grolet-product-title text-white text-lg font-medium mb-2">{product.name}</h3>
                      <p className="text-white text-sm">{product.price} €</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Horaires Section */}
      <section id="horaires" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="grolet-title text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Horaires d'ouverture</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-8">
              {schedule.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 md:py-3 border-b border-gray-100 last:border-b-0">
                  <span className="font-medium text-base md:text-lg">{item.day}</span>
                  <span className={(item.hours === "Fermé" ? "text-red-500" : "text-gray-600") + " text-sm md:text-base text-right leading-tight break-words"}>{item.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nous Localiser */}
      <section id="localiser" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h4 className="grolet-title text-lg font-bold text-center mb-6">Nous Localiser</h4>
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <iframe
              src="https://www.google.com/maps?q=47.1384065,-2.1911453%20(Boulangerie%20L%E2%80%99Arbre%20%C3%A0%20Pains)&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="L'Arbre à Pains - La Plaine-sur-Mer"
              className="group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <p>1 Boulevard des Nations Unies, 44770 La Plaine-sur-Mer</p>
                <p>SARL Douaud - Professionnel du Bio</p>
              </div>
            </div>

            {/* Map removed from footer; now above as its own section */}

            <nav className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/" className="text-gray-600 hover:text-black transition-colors duration-200 hover:scale-105 transform">Accueil</Link>
              <Link href="/saint-michel-chef-chef" className="text-gray-600 hover:text-black transition-colors duration-200 hover:scale-105 transform">Tharon-Plage</Link>
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

      {/* Galerie gérée par le composant */}

      {/* Product Modal */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={closeProductModal}>
          <DialogContent className="max-w-6xl w-full h-[80vh] p-0 gap-0">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              {/* Left side - Large image (hidden on mobile) */}
              <div className="hidden md:block relative h-full overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Right side - Product details */}
              <div className="p-8 flex flex-col">
                <DialogHeader className="mb-6">
                  <DialogTitle className="grolet-product-title text-3xl font-normal tracking-wide uppercase">
                    {selectedProduct.name}
                  </DialogTitle>
                </DialogHeader>

                <div className="flex-1 space-y-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {selectedProduct.details}
                  </p>

                  <div className="text-sm text-gray-500">
                    — {selectedProduct.ingredients}
                  </div>

                  {/* Prix sans quantité */}
                  <div className="flex items-center justify-between py-4 border-y border-gray-200">
                    <div className="text-right">
                      <div className="text-2xl font-medium">{selectedProduct.price} €</div>
                      <div className="text-sm text-gray-500">Prix indicatif</div>
                    </div>
                  </div>

                  {/* Sizes */}
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
                </div>

                {/* Call to action */}
                <div className="pt-6 border-t">
                  <Button
                    onClick={handleCall}
                    className="w-full bg-black text-white hover:bg-gray-800 h-12 text-base font-medium tracking-wide"
                  >
                    Nous contacter pour plus d'informations
                  </Button>
                  <p className="text-center text-sm text-gray-500 mt-3">
                    Produit disponible selon nos horaires d'ouverture
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

    </div>
  )
}
