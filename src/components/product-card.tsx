"use client"

import * as React from "react"
import { Product } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Sparkles } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"

interface ProductCardProps {
    product: Product
    onProductClick?: (product: Product) => void
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
    const { isLoggedIn, user, openLoginModal } = useAuth();
    const { addItem } = useCart();

    const isSeller = user?.role === 'seller';
    const isAdmin = user?.role === 'admin';

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isLoggedIn) {
            openLoginModal();
        } else {
            addItem(product);
        }
    }

    const handleClick = () => {
        if (onProductClick) {
            onProductClick(product);
        }
    }

    return (
        <div onClick={handleClick} className="group block cursor-pointer">
            <div className="relative flex flex-col gap-4 animate-fade-in">
                {/* Enhanced Image Container with Gradient Overlay */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 group-hover:scale-[1.02]">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                    />

                    {/* Multi-layer Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Premium Badge with Glow Effect */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {product.allergyTags.slice(0, 1).map((tag) => (
                            <div key={tag} className="relative group/badge">
                                <div className="absolute inset-0 bg-emerald-400 blur-md opacity-0 group-hover/badge:opacity-50 transition-opacity"></div>
                                <span className="relative px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[9px] font-black uppercase tracking-wider text-emerald-900 shadow-lg border border-emerald-100/50 flex items-center gap-1">
                                    <Sparkles className="h-2.5 w-2.5 text-emerald-500" />
                                    {tag}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Stock Status Indicator */}
                    {product.inStock && (
                        <div className="absolute top-3 right-3">
                            <div className="px-2.5 py-1 rounded-full bg-green-500/90 backdrop-blur-sm text-[9px] font-bold text-white shadow-md flex items-center gap-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></div>
                                En Stock
                            </div>
                        </div>
                    )}

                    {/* Enhanced Quick Add Button - Hidden for Sellers */}
                    {isLoggedIn && !isSeller && !isAdmin && (
                        <button
                            onClick={handleAddToCart}
                            className="absolute bottom-3 right-3 h-11 w-11 rounded-full bg-white shadow-xl flex items-center justify-center text-emerald-900 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gradient-to-br hover:from-emerald-600 hover:to-emerald-500 hover:text-white hover:scale-110 z-10 cursor-pointer border-2 border-emerald-100 hover:border-emerald-400"
                        >
                            <ShoppingCart className="h-4.5 w-4.5" />
                        </button>
                    )}

                    {/* Seller Badge */}
                    {isSeller && (
                        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-orange-500/90 backdrop-blur-sm text-[9px] font-bold text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Mode Vendeur
                        </div>
                    )}
                </div>

                {/* Enhanced Product Info */}
                <div className="flex justify-between items-start px-1 gap-3">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-emerald-950 leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors mb-1">
                            {product.name}
                        </h3>
                        <div className="flex items-center gap-2">
                            <p className="text-[10px] text-emerald-600/70 font-semibold uppercase tracking-wider">{product.category}</p>
                            {product.allergyTags.length > 1 && (
                                <span className="text-[9px] text-gray-400 font-medium">+{product.allergyTags.length - 1} tags</span>
                            )}
                        </div>
                    </div>
                    <div className="text-right shrink-0">
                        <span className="block text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-emerald-600">
                            {product.price.toFixed(3)}
                        </span>
                        <span className="text-[9px] text-gray-400 font-medium uppercase tracking-wide">TND</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
