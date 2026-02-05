
"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Phone, Check, Sparkles, ShieldCheck } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"
import { Product } from "@/lib/data"
import { useState } from "react"

interface ProductActionsProps {
    product: Product
}

export function ProductActions({ product }: ProductActionsProps) {
    const { isLoggedIn, user, openLoginModal } = useAuth()
    const { addItem } = useCart()
    const [added, setAdded] = useState(false)

    const isSeller = user?.role === 'seller'
    const isAdmin = user?.role === 'admin'

    const handleAdd = () => {
        if (!isLoggedIn) {
            openLoginModal()
            return
        }
        addItem(product)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    if (isSeller || isAdmin) {
        return (
            <div className="p-8 bg-gradient-to-br from-white to-gray-50/50 rounded-3xl border border-gray-100 shadow-xl space-y-6 animate-fade-in">
                <div className="flex items-end gap-2 justify-center lg:justify-start">
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-emerald-600">{product.price.toFixed(3)}</span>
                    <span className="text-lg font-medium text-gray-400 mb-1.5">TND</span>
                </div>
                <Separator className="bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
                <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl text-center border border-orange-200/50 shadow-inner">
                    <div className="flex justify-center mb-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md">
                            <ShieldCheck className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <p className="text-sm text-orange-900 font-bold mb-1">{isAdmin ? "Mode Admin Actif" : "Mode Vendeur Actif"}</p>
                    <p className="text-xs text-orange-700/80 leading-relaxed">
                        {isAdmin
                            ? "Accès complet pour superviser les produits, commandes et comptes."
                            : "Gérez vos produits depuis votre espace dédié pour modifier les prix, stocks et descriptions."}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-8 bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl border border-emerald-100/50 shadow-xl space-y-6 animate-fade-in hover:shadow-2xl transition-shadow duration-500">
            <div className="flex items-end gap-2 justify-center lg:justify-start">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-emerald-600">{product.price.toFixed(3)}</span>
                <span className="text-lg font-medium text-gray-400 mb-1.5">TND</span>
            </div>

            <Separator className="bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />

            <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                        <div className="h-1 w-1 rounded-full bg-emerald-500"></div>
                        Composition
                    </span>
                    {product.materials.map((m) => (
                        <span key={m} className="text-sm font-semibold text-gray-700 leading-relaxed">{m}</span>
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                        <div className="h-1 w-1 rounded-full bg-emerald-500"></div>
                        Caractéristiques
                    </span>
                    {product.features.slice(0, 2).map((f) => (
                        <span key={f} className="text-sm font-semibold text-gray-700 leading-relaxed">{f}</span>
                    ))}
                </div>
            </div>

            <div className="pt-4 flex flex-col gap-4">
                <Button
                    size="lg"
                    className={`w-full h-16 text-lg font-black transition-all duration-300 rounded-2xl shadow-xl relative overflow-hidden group ${added
                            ? 'bg-gradient-to-r from-green-500 to-green-600 scale-95'
                            : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-emerald-glow hover:shadow-2xl hover:scale-105'
                        }`}
                    onClick={handleAdd}
                    disabled={added}
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span className="relative flex items-center justify-center gap-2">
                        {added ? (
                            <>
                                <Check className="h-5 w-5 animate-in zoom-in" />
                                Ajouté au panier !
                            </>
                        ) : (
                            <>
                                <Sparkles className="h-5 w-5" />
                                Ajouter au Panier
                            </>
                        )}
                    </span>
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-xl py-3 px-4 border border-gray-100">
                    <Phone className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="font-medium">Besoin d'aide?</span>
                    <span className="font-bold text-emerald-700">71 123 456</span>
                </div>
            </div>
        </div>
    )
}
