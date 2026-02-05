"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, ShieldCheck, Truck, Sparkles, Leaf, Check } from "lucide-react"
import { Product } from "@/lib/data"
import { ProductActions } from "@/components/product-actions"
import { Button } from "@/components/ui/button"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface ProductModalProps {
    product: Product | null
    open: boolean
    onClose: () => void
}

export function ProductModal({ product, open, onClose }: ProductModalProps) {
    if (!product) return null

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-[96vw] max-w-[96vw] sm:max-w-[96vw] max-h-[92vh] overflow-y-auto p-0 gap-0 rounded-[2.5rem] border-2 border-emerald-200/70 bg-white shadow-2xl">
                {/* Accessibility Headers */}
                <VisuallyHidden>
                    <DialogHeader>
                        <DialogTitle>{product.name}</DialogTitle>
                        <DialogDescription>{product.description}</DialogDescription>
                    </DialogHeader>
                </VisuallyHidden>

                <div className="relative">
                    {/* Close Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg border border-emerald-200 backdrop-blur"
                        onClick={onClose}
                    >
                        <X className="h-5 w-5 text-gray-700" />
                    </Button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Product Image */}
                        <div className="relative h-[34vh] lg:min-h-[60vh] bg-gradient-to-br from-emerald-50 via-white to-emerald-100 lg:rounded-l-[2.5rem] overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />

                            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                                <Badge variant="outline" className="bg-white/90 text-emerald-700 border-emerald-200 font-semibold px-2.5 py-1 text-[11px]">
                                    {product.category}
                                </Badge>
                                <Badge className={`px-2.5 py-1 text-[11px] ${product.inStock ? "bg-emerald-600 text-white" : "bg-gray-300 text-gray-700"}`}>
                                    {product.inStock ? "En Stock" : "Rupture"}
                                </Badge>
                            </div>

                            <div className="absolute bottom-4 left-4 right-4">
                                <div className="bg-white/95 p-4 rounded-2xl border border-emerald-200 shadow-xl backdrop-blur">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4" />
                                        Tolérance +++
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {product.allergyTags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold px-2.5 py-1 text-[11px]">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col p-5 sm:p-6 lg:p-7 space-y-5 bg-white lg:rounded-r-[2.5rem]">
                            <div className="space-y-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    <div className="flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
                                        <Truck className="h-3 w-3" />
                                        Livraison 24h-48h
                                    </div>
                                    <div className="flex items-center gap-2 rounded-full bg-orange-50 border border-orange-100 px-2.5 py-1 text-[11px] font-semibold text-orange-800">
                                        <ShieldCheck className="h-3 w-3" />
                                        Testé dermatologiquement
                                    </div>
                                    <div className="flex items-center gap-2 rounded-full bg-teal-50 border border-teal-100 px-2.5 py-1 text-[11px] font-semibold text-teal-800">
                                        <Leaf className="h-3 w-3" />
                                        Formule clean
                                    </div>
                                </div>
                                <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-gray-900 leading-tight">{product.name}</h2>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3">
                                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-[11px] uppercase tracking-wider">
                                        <Sparkles className="h-3.5 w-3.5" />
                                        Effet doux
                                    </div>
                                    <p className="text-[11px] text-emerald-700/80 mt-2">Toucher ultra-soyeux, pensé pour peaux réactives.</p>
                                </div>
                                <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-3">
                                    <div className="flex items-center gap-2 text-blue-800 font-bold text-[11px] uppercase tracking-wider">
                                        <Check className="h-3.5 w-3.5" />
                                        Qualité vérifiée
                                    </div>
                                    <p className="text-[11px] text-blue-700/80 mt-2">Contrôle qualité rigoureux sur chaque lot.</p>
                                </div>
                                <div className="rounded-2xl border border-orange-100 bg-orange-50/60 p-3">
                                    <div className="flex items-center gap-2 text-orange-800 font-bold text-[11px] uppercase tracking-wider">
                                        <Truck className="h-3.5 w-3.5" />
                                        Livraison rapide
                                    </div>
                                    <p className="text-[11px] text-orange-700/80 mt-2">Préparation express et support 7j/7.</p>
                                </div>
                            </div>

                            <ProductActions product={product} />

                            <Separator className="bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />

                            {/* Trust Blocks */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-sm">
                                    <div className="h-9 w-9 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                                        <ShieldCheck className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-emerald-900 text-[13px] mb-1">Garantie Santé</h4>
                                        <p className="text-[11px] text-emerald-800 leading-relaxed">Hypoallergénique et pensé pour les peaux les plus sensibles.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 rounded-2xl bg-orange-50 border border-orange-100 shadow-sm">
                                    <div className="h-9 w-9 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                                        <Truck className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-orange-900 text-[13px] mb-1">Paiement à la livraison</h4>
                                        <p className="text-[11px] text-orange-800 leading-relaxed">Contrôlez votre commande à l'arrivée avant de payer.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
