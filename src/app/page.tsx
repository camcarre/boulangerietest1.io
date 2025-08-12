'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Home() {
  const [hovered, setHovered] = useState<null | 'plaine' | 'saint'>(null)

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Fullscreen hover overlay image */}
      <div className="fixed inset-0 z-20 pointer-events-none" aria-hidden>
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
        <div className={cn('absolute inset-0 transition-opacity duration-700', hovered ? 'opacity-30 bg-black' : 'opacity-0')} />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-6">
        <h1 className="grolet-title text-2xl font-bold tracking-wider text-white">
          L'ARBRE À PAINS
        </h1>
      </header>

      {/* Main Content */}
      <main
        className="flex flex-col justify-center min-h-screen px-6 md:px-12 relative z-30"
                 onMouseLeave={() => setHovered(null)}
       >
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
            'group block relative mb-8 transition-all duration-700 will-change-transform min-h-[40vh] md:min-h-[50vh] flex items-center',
            hovered === 'saint' ? 'md:opacity-40' : 'md:opacity-100',
          )}
          onMouseEnter={() => setHovered('plaine')}
          onPointerEnter={() => setHovered('plaine')}
          onFocus={() => setHovered('plaine')}
        >
          {/* mobile preview image */}
          <div
            className="absolute inset-0 block md:hidden bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')",
            }}
          />
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
            'group block relative transition-all duration-700 will-change-transform min-h-[40vh] md:min-h-[50vh] flex items-center',
            hovered === 'plaine' ? 'md:opacity-40' : 'md:opacity-100',
          )}
          onMouseEnter={() => setHovered('saint')}
          onPointerEnter={() => setHovered('saint')}
          onFocus={() => setHovered('saint')}
        >
          {/* mobile preview image */}
          <div
            className="absolute inset-0 block md:hidden bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('https://images.unsplash.com/photo-1562788869-4ed32648eb72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')",
            }}
          />
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
      <section className="bg-white text-black py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-black font-bold text-2xl">🌳</span>
            </div>
            <h2 className="grolet-title text-3xl md:text-4xl font-bold mb-4">
              Nos Deux Boulangeries
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Depuis 2001, nous vous accueillons dans nos deux établissements artisanaux
              sur la côte de Loire-Atlantique
            </p>
          </div>

          {/* Carte interactive */}
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d174562.67688352287!2d-2.397654568359375!3d47.16831440507654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4805ee81f3f4c8d7%3A0x8b1b1b1b1b1b1b1b!2sLa%20Plaine-sur-Mer%2C%20France!5e0!3m2!1sfr!2sfr!4v1234567890123!5m2!1sfr!2sfr"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="L'Arbre à Pains - Nos deux boulangeries"
              className="w-full"
            />
          </div>

          {/* Informations des deux boulangeries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* La Plaine-sur-Mer */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="grolet-title text-xl font-bold mb-4">La Plaine-sur-Mer</h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-medium">Siège social</p>
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
                <p className="font-medium">Tharon-Plage</p>
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
      <footer className="bg-black text-white p-6 flex justify-between items-center text-sm">
        <div className="flex space-x-4">
          <Button variant="link" className="text-white hover:text-yellow-300 p-0">fr</Button>
          <span className="text-gray-400">|</span>
          <Button variant="link" className="text-white hover:text-yellow-300 p-0">en</Button>
        </div>
        <p className="text-gray-400">© 2025 L'Arbre à Pains - SARL Douaud</p>
      </footer>

    </div>
  )
}
