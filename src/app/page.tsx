'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Home() {
  const [hovered, setHovered] = useState<null | 'plaine' | 'saint'>(null)
  const [showOverlay, setShowOverlay] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const threshold = Math.min(window.innerHeight * 0.15, 160) // cache dès qu'on descend un peu
      if (y > threshold) {
        if (showOverlay) setShowOverlay(false)
        if (hovered !== null) setHovered(null)
      } else {
        if (!showOverlay) setShowOverlay(true)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [showOverlay, hovered])

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      {/* Fullscreen hover overlay image (only when at top of page) */}
      <div className={`fixed inset-0 z-20 pointer-events-none transition-opacity duration-300 ${showOverlay ? 'opacity-100' : 'opacity-0'} hidden md:block`} aria-hidden style={{ mixBlendMode: 'multiply' }}>
        {/* Cross-fade overlays */}
        <div
          className={cn(
            'absolute inset-0 bg-cover bg-center transition-all duration-700 will-change-transform',
            hovered === 'plaine' ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          )}
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')",
          }}
        />
        <div
          className={cn(
            'absolute inset-0 bg-cover bg-center transition-all duration-700 will-change-transform',
            hovered === 'saint' ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          )}
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('https://images.unsplash.com/photo-1562788869-4ed32648eb72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')",
          }}
        />
        {/* Dimming layer for better legibility */}
        <div className={cn('absolute inset-0 transition-opacity duration-700', hovered && showOverlay ? 'opacity-30 bg-black' : 'opacity-0')} />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-6">
        <h1 className="grolet-title text-2xl font-bold tracking-wider text-black md:text-white">
          L'ARBRE À PAINS
        </h1>
      </header>

      {/* Scroll hint (mobile only) */}
      {showOverlay && (
        <div className="fixed bottom-4 inset-x-0 z-30 flex justify-center pointer-events-none">
          <div className="rounded-full bg-white/10 backdrop-blur px-3 py-1">
            <ChevronDown className="h-5 w-5 text-white animate-bounce" />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main
        className="flex flex-col justify-center min-h-screen px-0 md:px-12 relative z-30 w-screen overflow-x-hidden"
                 onMouseLeave={() => setHovered(null)}
       >
        {/* Mobile-friendly chooser (desktop unchanged below) */}
        <div className="md:hidden w-full px-5 pt-12 pb-10">
          <div className="max-w-md mx-auto text-center">
            <div className="w-12 h-12 rounded-full overflow-hidden mx-auto mb-4">
              <img src="/logo/logorond.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <h2 className="grolet-title text-2xl font-bold mb-6">Choisissez une boulangerie</h2>
          </div>
          <div className="max-w-md mx-auto space-y-4">
            <Link href="/la-plaine-sur-mer" className="block rounded-xl bg-white text-black p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="grolet-title text-lg font-semibold">La Plaine sur Mer</div>
                  <div className="text-sm text-gray-600">44770 • 02 40 21 50 60</div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </div>
            </Link>
            <Link href="/saint-michel-chef-chef" className="block rounded-xl bg-white text-black p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="grolet-title text-lg font-semibold">Tharon Plage</div>
                  <div className="text-sm text-gray-600">44730 • 02 40 39 68 73</div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </div>
            </Link>
          </div>
        </div>
        {/* hint for touch devices: default to first image briefly */}
        <div className="pointer-events-none md:hidden h-0 w-0">
          {/* trigger plaine overlay initially */}
          {/* state remains null for desktop until hover */}
          {hovered === null && null}
        </div>
        {/* La Plaine-sur-Mer */}
        <Link
          href="/la-plaine-sur-mer"
          className={cn(
            'hidden md:block relative mb-6 md:mb-8 transition-all duration-700 will-change-transform min-h-[42vh] md:min-h-[45vh] w-full',
            hovered === 'saint' ? 'md:opacity-40' : 'md:opacity-100',
          )}
          onMouseEnter={() => setHovered('plaine')}
          onPointerEnter={() => setHovered('plaine')}
          onFocus={() => setHovered('plaine')}
        >
          {/* mobile preview image */}
          {/* Mobile: pas d'image de fond */}
          <div className="absolute inset-0 md:hidden bg-black" />
          {/* hidden base image to keep initial black; overlay handles full image */}
          <div className="absolute inset-0 opacity-0 md:opacity-0" />
          <div className="relative z-10 py-16 md:py-24">
            <h2 className="grolet-title text-4xl md:text-6xl lg:text-8xl font-bold mb-2 md:mb-4 transition-all duration-500 md:group-hover:text-white md:group-hover:tracking-[0.25em] md:group-hover:scale-105 text-white">
              LA PLAiNE SUR MER
            </h2>
            <p className={cn('text-base md:text-xl max-w-2xl transition-all duration-500 ease-out text-white drop-shadow md:opacity-0 md:-translate-y-1 md:group-hover:opacity-90 md:group-hover:translate-y-0')}>
              44770 • 02 40 21 50 60
            </p>
          </div>
        </Link>

        {/* Tharon-Plage */}
        <Link
          href="/saint-michel-chef-chef"
          className={cn(
            'hidden md:block relative transition-all duration-700 will-change-transform min-h-[42vh] md:min-h-[45vh] w-full',
            hovered === 'plaine' ? 'md:opacity-40' : 'md:opacity-100',
          )}
          onMouseEnter={() => setHovered('saint')}
          onPointerEnter={() => setHovered('saint')}
          onFocus={() => setHovered('saint')}
        >
          {/* mobile preview image */}
          {/* Mobile: pas d'image de fond */}
          <div className="absolute inset-0 md:hidden bg-black" />
          {/* hidden base image to keep initial black; overlay handles full image */}
          <div className="absolute inset-0 opacity-0 md:opacity-0" />
          <div className="relative z-10 py-16 md:py-24">
            <h2 className="grolet-title text-4xl md:text-6xl lg:text-8xl font-bold mb-2 md:mb-4 transition-all duration-500 md:group-hover:text-white md:group-hover:tracking-[0.25em] md:group-hover:scale-105 text-white">
              THARON PLAGE
            </h2>
            <p className={cn('text-base md:text-xl max-w-2xl transition-all duration-500 ease-out text-white drop-shadow md:opacity-0 md:-translate-y-1 md:group-hover:opacity-90 md:group-hover:translate-y-0')}>
              44730 • 02 40 39 68 73
            </p>
          </div>
        </Link>
      </main>

      {/* Section Carte - Nos deux boulangeries */}
      <section className="relative z-10 bg-white text-black py-20 md:py-24 min-h-[80vh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 -translate-y-6 md:-translate-y-8">
              <img src="/logo/logorond.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <h2 className="grolet-title text-3xl md:text-4xl font-bold mb-4">
              Nos Deux Boulangeries
            </h2>
          </div>

          {/* Carte interactive retirée */}

          {/* Informations des deux boulangeries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* La Plaine-sur-Mer */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="grolet-title text-xl font-bold mb-4">La Plaine-sur-Mer</h3>
              <div className="space-y-2 text-gray-700">
                <p>1 Boulevard des Nations Unies</p>
                <p>44770 La Plaine-sur-Mer</p>
                <p className="font-medium text-black mt-4">02 40 21 50 60</p>
              </div>
              <Link href="/la-plaine-sur-mer">
                <Button className="mt-4 bg-black text-white hover:bg-gray-800">
                  Découvrir cette boulangerie
                </Button>
              </Link>
            </div>

            {/* Tharon-Plage */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="grolet-title text-xl font-bold mb-4">Tharon-Plage</h3>
              <div className="space-y-2 text-gray-700">
                <p>42 Avenue du Maréchal Foch</p>
                <p>44730 Tharon-Plage</p>
                <p className="font-medium text-black mt-4">02 40 39 68 73</p>
              </div>
              <Link href="/saint-michel-chef-chef">
                <Button className="mt-4 bg-black text-white hover:bg-gray-800">
                  Découvrir cette boulangerie
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black p-6 flex justify-center items-center text-sm border-t border-gray-100">
        <p className="text-gray-500">© 2025 L'Arbre à Pains - SARL Douaud</p>
      </footer>

    </div>
  )
}
