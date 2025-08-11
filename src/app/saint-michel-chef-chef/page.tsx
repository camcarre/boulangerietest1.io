'use client'

import { useState, useEffect } from 'react'
import { Calendar, Menu, MapPin, Phone, Clock, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

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
    name: "PAIN DE MER",
    price: "3,50",
    image: "https://images.unsplash.com/photo-1574982596727-d6677f45efa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Pain spécial aux algues et sel de mer, spécialité locale de Tharon-Plage",
    details: "Spécialité unique de notre boulangerie côtière, ce pain incorpore des algues marines locales et du sel de mer de Guérande. Sa saveur iodée évoque les embruns de l'océan.",
    sizes: ["Pain entier (600g) - 3,50€", "Demi-pain (300g) - 1,90€"],
    ingredients: "Farine de blé, algues marines, sel de mer de Guérande, levain"
  },
  {
    id: 3,
    name: "KOUIGN-AMANN",
    price: "2,20",
    image: "https://images.unsplash.com/photo-1571854123771-fe4d7cce30cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Spécialité bretonne, pâte feuilletée au beurre salé et sucre caramélisé",
    details: "Véritable kouign-amann breton préparé selon la tradition finistérienne. Pâte feuilletée au beurre demi-sel, caramélisée à la perfection. Croustillant à l'extérieur, fondant à l'intérieur.",
    sizes: ["Kouign-amann individuel - 2,20€", "Grand kouign-amann (6 parts) - 11,00€"],
    ingredients: "Farine, beurre demi-sel AOP, sucre, levure, fleur de sel"
  },
  {
    id: 4,
    name: "FAR BRETON",
    price: "3,80",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Flan traditionnel breton aux pruneaux, texture moelleuse",
    details: "Far breton authentique aux pruneaux d'Agen, préparé selon la recette traditionnelle. Sa texture crémeuse et ses arômes de vanille en font un dessert incontournable de la Bretagne.",
    sizes: ["Part individuelle - 3,80€", "Far entier (8 parts) - 24,00€"],
    ingredients: "Lait entier, œufs frais, farine, sucre, pruneaux d'Agen, vanille"
  },
  {
    id: 5,
    name: "TARTE AUX FRAISES",
    price: "20,00",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Tarte aux fraises de saison sur crème pâtissière, 6-8 personnes",
    details: "Tarte réalisée avec les fraises de Plougastel, disposées sur une crème pâtissière vanille et une pâte sablée maison. Glacée au nappage neutre pour préserver la fraîcheur des fruits.",
    sizes: ["Tarte entière (8 parts) - 20,00€", "Part individuelle - 2,80€"],
    ingredients: "Fraises de Plougastel, pâte sablée, crème pâtissière, vanille Bourbon"
  },
  {
    id: 6,
    name: "RELIGIEUSE AU CHOCOLAT",
    price: "3,50",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Double choux garni de crème pâtissière chocolat, glaçage fondant",
    details: "Religieuse traditionnelle composée de deux choux superposés, garnis de crème pâtissière au chocolat noir 70%. Recouverte d'un glaçage chocolat et décorée à la crème au beurre.",
    sizes: ["Religieuse classique - 3,50€", "Mini-religieuses (lot de 4) - 12,00€"],
    ingredients: "Pâte à choux, crème pâtissière, chocolat noir 70%, beurre, glaçage"
  },
  {
    id: 7,
    name: "GALETTE DES ROIS",
    price: "16,00",
    image: "https://images.unsplash.com/photo-1580835565730-4e3b1d79d668?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Galette feuilletée à la frangipane, 6 personnes",
    details: "Galette des rois artisanale à la frangipane maison, préparée avec des amandes de Provence. Pâte feuilletée dorée, fève et couronne incluses. Disponible de janvier à février.",
    sizes: ["Galette 6 personnes - 16,00€", "Grande galette 8 personnes - 22,00€"],
    ingredients: "Pâte feuilletée, amandes de Provence, beurre, œufs, sucre"
  },
  {
    id: 8,
    name: "CHOUQUETTES",
    price: "4,50",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Petits choux sucrés aux grains de sucre, sachet de 100g",
    details: "Chouquettes traditionnelles préparées avec une pâte à choux légère et aérée, parsemées de sucre perlé. Idéales pour le goûter ou accompagner un café.",
    sizes: ["Sachet 100g - 4,50€", "Sachet 200g - 8,50€"],
    ingredients: "Farine, beurre, œufs, sucre perlé, sel"
  },
  {
    id: 9,
    name: "SANDWICH CRABE-AVOCAT",
    price: "4,80",
    image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Sandwich estival au crabe et avocat, pain de mer maison",
    details: "Sandwich gourmand préparé sur notre pain de mer, garni de chair de crabe des côtes atlantiques et d'avocat frais. Agrémenté de mayonnaise maison et de ciboulette.",
    sizes: ["Sandwich entier - 4,80€", "Demi-sandwich - 2,80€"],
    ingredients: "Pain de mer, chair de crabe, avocat, mayonnaise maison, ciboulette"
  },
  {
    id: 10,
    name: "FOUGASSE AUX OLIVES",
    price: "2,90",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Pain provençal aux olives noires et huile d'olive",
    details: "Fougasse traditionnelle du Midi, pétrie avec de l'huile d'olive vierge extra et garnie d'olives noires de Nyons. Sa pâte parfumée aux herbes de Provence ravira les amateurs de saveurs méditerranéennes.",
    sizes: ["Fougasse individuelle - 2,90€", "Grande fougasse - 5,50€"],
    ingredients: "Farine, olives noires de Nyons, huile d'olive vierge, herbes de Provence"
  },
  {
    id: 11,
    name: "SAINT-HONORÉ",
    price: "5,50",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Pâtisserie festive, choux caramélisés et crème Chiboust",
    details: "Saint-Honoré traditionnel composé d'une base de pâte brisée surmontée de choux caramélisés et de crème Chiboust vanille. Pièce montée d'exception, idéale pour les grandes occasions.",
    sizes: ["Saint-Honoré individuel - 5,50€", "Grand Saint-Honoré (8 parts) - 38,00€"],
    ingredients: "Pâte brisée, choux, crème Chiboust, caramel, vanille Bourbon"
  },
  {
    id: 12,
    name: "PAIN COMPLET BIO",
    price: "2,80",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Pain complet certifié agriculture biologique",
    details: "Pain complet élaboré avec de la farine de blé bio française. Riche en fibres et en saveur, il accompagne parfaitement tous vos repas. Certifié agriculture biologique.",
    sizes: ["Pain entier (500g) - 2,80€", "Demi-pain (250g) - 1,50€"],
    ingredients: "Farine de blé complet bio, eau, levain naturel, sel de mer"
  }
]

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1514512364185-4c2b90ca6f16?auto=format&fit=crop&w=1600&q=80",
    alt: "Pains de campagne sur planche",
    caption: "Pains de campagne au levain"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1600&q=80",
    alt: "Étagères de baguettes artisanales",
    caption: "Nos baguettes sorties du four"
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
  { day: "Lundi", hours: "Fermé" },
  { day: "Mardi", hours: "7h00 - 13h00 & 15h00 - 19h15" },
  { day: "Mercredi", hours: "7h00 - 13h15 & 15h00 - 19h15" },
  { day: "Jeudi", hours: "7h00 - 13h15 & 15h00 - 19h15" },
  { day: "Vendredi", hours: "7h00 - 13h15 & 15h00 - 19h15" },
  { day: "Samedi", hours: "7h00 - 13h15 & 15h00 - 19h15" },
  { day: "Dimanche", hours: "7h00 - 13h00" }
]

// Function to check if store is currently open
const isStoreOpen = () => {
  const now = new Date()
  const currentDay = now.getDay() // 0 = Sunday, 1 = Monday, etc.
  const currentTime = now.getHours() * 100 + now.getMinutes()

  // Monday is closed (index 1)
  if (currentDay === 1) return false

  // Define opening hours for each day
  const openingHours: Record<number, Array<{ start: number; end: number }>> = {
    0: [{ start: 700, end: 1300 }], // Sunday
    1: [], // Monday - closed
    2: [{ start: 700, end: 1300 }, { start: 1500, end: 1915 }], // Tuesday
    3: [{ start: 700, end: 1315 }, { start: 1500, end: 1915 }], // Wednesday
    4: [{ start: 700, end: 1315 }, { start: 1500, end: 1915 }], // Thursday
    5: [{ start: 700, end: 1315 }, { start: 1500, end: 1915 }], // Friday
    6: [{ start: 700, end: 1315 }, { start: 1500, end: 1915 }], // Saturday
  }

  const todayHours = openingHours[currentDay] || []
  return todayHours.some((period: { start: number; end: number }) => currentTime >= period.start && currentTime <= period.end)
}

export default function SaintMichelChefChef() {
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
    window.location.href = 'tel:0240396873'
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
          <div className="flex items-center h-16">
            {/* Mobile menu button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="grolet-title text-left">Navigation</SheetTitle>
                </SheetHeader>
                <nav className="mt-8 space-y-4">
                  <Link href="/" className="block grolet-nav hover:text-gray-600 transition-colors">Accueil</Link>
                  <Link href="/la-plaine-sur-mer" className="block grolet-nav hover:text-gray-600 transition-colors">La Plaine-sur-Mer</Link>
                  <a href="#produits" className="block grolet-nav hover:text-gray-600 transition-colors">Notre Carte</a>
                  <a href="#galerie" className="block grolet-nav hover:text-gray-600 transition-colors">Galerie</a>
                  <a href="#histoire" className="block grolet-nav hover:text-gray-600 transition-colors">Notre histoire</a>
                  <a href="#horaires" className="block grolet-nav hover:text-gray-600 transition-colors">Horaires</a>
                  <a href="#contact" className="block grolet-nav hover:text-gray-600 transition-colors">Contact</a>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <div className="md:flex-none mr-6">
              <Link href="/" className="grolet-title text-xl font-bold tracking-wider">
                L'ARBRE À PAINS<br />
                <span className="text-sm font-normal">THARON PLAGE</span>
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
              <Link href="/la-plaine-sur-mer" className="grolet-nav hover:text-black transition-colors ml-auto font-medium">La Plaine-sur-Mer →</Link>
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
              <h2 className="grolet-title text-4xl md:text-6xl font-bold mb-8">THARON PLAGE</h2>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Boulangerie-Pâtisserie artisanale</p>
                <h3 className="text-2xl font-medium">Nos spécialités de bord de mer</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>42 Avenue du Maréchal Foch, 44730 Saint-Michel-Chef-Chef</span>
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

      {/* Gallery Section */}
      <section id="galerie" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="grolet-title text-3xl font-bold text-center mb-12">Galerie Photos</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-lg h-[60vh] md:h-[65vh]">
              <button
                type="button"
                onClick={() => setIsGalleryOpen(true)}
                className="w-full h-full"
                aria-label="Ouvrir l'image en grand"
              >
                <img
                  src={galleryImages[currentImageIndex].src}
                  alt={galleryImages[currentImageIndex].alt}
                  className="w-full h-full object-cover object-center"
                />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="text-white text-lg font-medium">{galleryImages[currentImageIndex].caption}</p>
              </div>
            </div>
            <Button
              onClick={prevImage}
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              onClick={nextImage}
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <div className="flex justify-center mt-6 space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-black' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
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
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1562788869-4ed32648eb72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Vue sur mer"
                className="rounded-lg object-cover h-48"
              />
              <img
                src="https://images.unsplash.com/photo-1571854123771-fe4d7cce30cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Spécialités bretonnes"
                className="rounded-lg object-cover h-48"
              />
              <img
                src="https://images.unsplash.com/photo-1580835565730-4e3b1d79d668?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Pièces montées"
                className="rounded-lg object-cover h-48"
              />
              <img
                src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Créations artisanales"
                className="rounded-lg object-cover h-48"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="produits" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="grolet-title text-3xl font-bold text-center mb-12">Nos Spécialités</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group cursor-pointer border-0 shadow-none relative">
                <CardContent className="p-0">
                  <div
                                        className="aspect-square overflow-hidden rounded-lg relative cursor-pointer outline-none focus:outline-none ring-0 focus:ring-0 [-webkit-tap-highlight-color:transparent]"
                     onClick={() => openProductModal(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Hover overlay with minimal info */}
                    <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6">
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
          <h2 className="grolet-title text-3xl font-bold text-center mb-12">Horaires d'ouverture</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0 rounded-md ${index === todayIndex ? 'bg-gray-100' : ''}`}
                >
                  <span className="font-medium flex items-center gap-2">
                    {index === todayIndex && (
                      <span className={`inline-block w-2.5 h-2.5 rounded-full ${storeOpen ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                    )}
                    {item.day}
                    {index === todayIndex && <span className="ml-2 text-xs text-gray-500">(Aujourd'hui)</span>}
                  </span>
                  <span className={item.hours === "Fermé" ? "text-red-500" : "text-gray-600"}>{item.hours}</span>
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
              src="https://www.google.com/maps?q=47.1661254,-2.1637326%20(Boulangerie%20L%E2%80%99arbre%20%C3%A0%20Pains)&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="L'Arbre à Pains - Saint-Michel-Chef-Chef"
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
                <p>42 Avenue du Maréchal Foch, 44730 Saint-Michel-Chef-Chef</p>
                <p>SARL Douaud - Spécialiste pièces montées</p>
              </div>
            </div>

            {/* Map removed from footer; now above as its own section */}

            <nav className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/" className="text-gray-600 hover:text-black transition-colors duration-200 hover:scale-105 transform">Accueil</Link>
              <Link href="/la-plaine-sur-mer" className="text-gray-600 hover:text-black transition-colors duration-200 hover:scale-105 transform">La Plaine-sur-Mer</Link>
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

      {/* Gallery Modal */}
      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-w-5xl w-full h-[85vh] p-0 gap-0">
          <div className="relative w-full h-full bg-black/90 flex items-center justify-center">
            <img
              src={galleryImages[currentImageIndex].src}
              alt={galleryImages[currentImageIndex].alt}
              className="max-w-full max-h-full object-contain"
            />
            <button
              type="button"
              onClick={() => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full px-3 py-2 hover:bg-black/80 focus:outline-none z-10"
              aria-label="Image précédente"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full px-3 py-2 hover:bg-black/80 focus:outline-none z-10"
              aria-label="Image suivante"
            >
              ›
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Product Modal - Style Cédric Grolet */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={closeProductModal}>
          <DialogContent className="max-w-6xl w-full h-[80vh] p-0 gap-0">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              {/* Left side - Large image */}
              <div className="relative h-full overflow-hidden">
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
