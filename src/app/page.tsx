"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { ProductModal } from "@/components/product-modal"
import { products, allergyFilters, Product } from "@/lib/data"
import { ArrowRight, ShieldCheck, Truck, Leaf, Star, HeartHandshake } from "lucide-react"

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8] overflow-hidden selection:bg-emerald-200">

      {/* 2026 Immersive Hero Section */}
      <section className="relative w-full min-h-[92vh] flex items-center pt-24 pb-12 overflow-hidden">
        {/* Organic gradient blobs background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-emerald-100/40 rounded-full blur-[100px] animate-float opacity-70 mix-blend-multiply" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-orange-100/50 rounded-full blur-[80px] animate-float-delayed opacity-60 mix-blend-multiply" />
        </div>

        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Left Content */}
            <div className="flex-1 space-y-10 text-center lg:text-left animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/50 backdrop-blur border border-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm transition-transform hover:scale-105 cursor-default">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                Innovation Santé 2026
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-emerald-950 leading-[0.95]">
                Le confort <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 font-serif italic pr-4">
                  réinventé.
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-emerald-900/60 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Une boutique conçue pour les hypersensibles. <br />
                <span className="text-emerald-800">0% Allergènes. 100% Sérénité.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
                <Link href="/products" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-16 px-12 text-lg rounded-full bg-emerald-900 hover:bg-emerald-800 text-white shadow-xl shadow-emerald-900/20 transition-all hover:-translate-y-1">
                    Explorer la Collection
                  </Button>
                </Link>
                <Link href="/about" className="w-full sm:w-auto">
                  <div className="group flex items-center justify-center gap-3 h-16 px-8 rounded-full border-2 border-emerald-900/10 hover:bg-white hover:border-emerald-200 transition-all cursor-pointer">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-emerald-700 border-b-[6px] border-b-transparent ml-1" />
                    </div>
                    <span className="font-bold text-emerald-900">Notre Histoire</span>
                  </div>
                </Link>
              </div>

              {/* Trust Metrics */}
              <div className="pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-12 gap-y-4 text-emerald-900/70 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  <span>Certifié ISO 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="h-5 w-5" />
                  <span>Recommandé par 50+ Dermatos</span>
                </div>
              </div>
            </div>

            {/* Right Visual - Modern 'Portal' Shape */}
            <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
              <div className="relative aspect-[3/4] md:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-900/10 group">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                  alt="Calm Environment"
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent" />

                {/* Floating Glass Card */}
                <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-3xl animate-float">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-700">
                      <Leaf className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-emerald-950">Pureté Garantie</h3>
                      <p className="text-sm text-emerald-800/80 leading-snug mt-1">Tous nos produits sont testés en laboratoire indépendant à Tunis.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 top-10 -right-10 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl animate-float-delayed" />
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Marquee - Brand Values */}
      <div className="bg-emerald-900 py-6 overflow-hidden relative">
        <div className="animate-scroll flex whitespace-nowrap gap-16 text-emerald-100/80 font-bold uppercase tracking-[0.2em] text-sm">
          <span>•</span><span>0% Produits Chimiques</span>
          <span>•</span><span>Livraison 48H</span>
          <span>•</span><span>Service Client 7J/7</span>
          <span>•</span><span>Hypoallergénique</span>
          <span>•</span><span>Satisfait ou Remboursé</span>
          <span>•</span><span>0% Produits Chimiques</span>
          <span>•</span><span>Livraison 48H</span>
          <span>•</span><span>Service Client 7J/7</span>
          <span>•</span><span>Hypoallergénique</span>
          <span>•</span><span>Satisfait ou Remboursé</span>
        </div>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-emerald-900 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-emerald-900 to-transparent pointer-events-none" />
      </div>

      {/* Categories - Interactive Pills */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-emerald-950">
            Trouvez votre <span className="text-emerald-600 font-serif italic">solution</span>
          </h2>
          <p className="text-emerald-800/60 max-w-2xl mx-auto text-lg">
            Sélectionnez ce qui vous concerne pour filtrer notre catalogue intelligent.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {allergyFilters.map((filter, i) => (
            <Link key={filter} href={`/products?allergy=${filter}`}>
              <div className="group relative px-8 py-6 bg-white border border-emerald-100/50 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-3 text-lg font-bold text-emerald-900">
                  {i % 2 === 0 ? <ShieldCheck className="h-5 w-5 text-emerald-500" /> : <Leaf className="h-5 w-5 text-emerald-500" />}
                  {filter}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Products Grid - Magazine Style */}
      <section className="py-12 bg-white rounded-t-[4rem] shadow-[0_-20px_60px_rgba(0,0,0,0.02)]">
        <div className="container px-4 md:px-6 mx-auto pt-16">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-2 block">Collection Été 2026</span>
              <h2 className="text-4xl md:text-5xl font-bold text-emerald-950">Nouveautés</h2>
            </div>
            <Link href="/products">
              <Button variant="ghost" className="hidden md:flex gap-2 text-emerald-800 hover:bg-emerald-50 rounded-full px-6">
                Voir tout le catalogue <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onProductClick={handleProductClick} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/products">
              <Button className="md:hidden w-full h-14 rounded-full bg-emerald-900 text-white font-bold">
                Voir tout le catalogue
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer / Newsletter - Dark Mode Feel */}
      <section className="bg-emerald-950 text-white py-24 rounded-b-[3rem] mt-[-3rem] relative z-0">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-emerald-800 rounded-full flex items-center justify-center mx-auto mb-8">
            <Star className="h-8 w-8 text-emerald-200 fill-emerald-200 animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Rejoignez le mouvement.</h2>
          <p className="text-emerald-300/60 text-xl max-w-2xl mx-auto mb-10">
            La santé commence chez soi. Inscrivez-vous pour des conseils d'experts et des exclusivités.
          </p>

          <form className="max-w-md mx-auto relative flex items-center">
            <input
              type="email"
              placeholder="votre@email.com"
              className="w-full h-16 rounded-full bg-emerald-900/50 border border-emerald-800 pl-8 pr-32 text-white placeholder:text-emerald-600 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <Button className="absolute right-2 h-12 rounded-full px-6 bg-emerald-100 text-emerald-900 font-bold hover:bg-white transition-colors">
              Go
            </Button>
          </form>
          <div className="mt-20 pt-10 border-t border-emerald-900 flex flex-col md:flex-row justify-between items-center text-emerald-700 text-sm">
            <p>© 2026 AllergySafe TN. Tous droits réservés.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-emerald-400">Instagram</a>
              <a href="#" className="hover:text-emerald-400">Facebook</a>
              <a href="#" className="hover:text-emerald-400">TikTok</a>
            </div>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}
