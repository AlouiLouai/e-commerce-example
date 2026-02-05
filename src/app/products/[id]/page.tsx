
import Link from "next/link"
import { notFound } from "next/navigation"
import { products } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Check, ShieldCheck, Truck, ArrowLeft, Phone, Info } from "lucide-react"

import { ProductActions } from "@/components/product-actions"

interface ProductPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    return (
        <div className="bg-[#FAFAFA] min-h-screen">
            <div className="container py-8 px-4 md:px-6 mx-auto">
                <div className="mb-6">
                    <Link href="/products">
                        <Button variant="ghost" size="sm" className="gap-2 pl-0 hover:bg-transparent hover:text-emerald-600 text-muted-foreground">
                            <ArrowLeft className="h-4 w-4" /> Retour à la boutique
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
                    {/* Product Image */}
                    <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl border border-white/50 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">Certifications</p>
                                <div className="flex flex-wrap gap-2">
                                    {product.allergyTags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-100">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col space-y-8 py-4">
                        <div className="text-center lg:text-left">
                            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                                <Badge variant="outline" className="text-emerald-600 border-emerald-200">En Stock</Badge>
                                <span className="text-xs text-gray-500">Livraison 24h-48h</span>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 mb-4">{product.name}</h1>
                            <p className="text-gray-500 text-lg leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <ProductActions product={product} />

                        {/* Trust Blocks */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                                <ShieldCheck className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-blue-900 text-sm">Garantie Santé</h4>
                                    <p className="text-xs text-blue-700/80 mt-1">Produit testé dermatologiquement et hypoallergénique.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-orange-50/50 border border-orange-100">
                                <Truck className="h-6 w-6 text-orange-600 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-orange-900 text-sm">Paiement à la livraison</h4>
                                    <p className="text-xs text-orange-700/80 mt-1">Vérifiez votre commande à l'arrivée avant de payer.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
