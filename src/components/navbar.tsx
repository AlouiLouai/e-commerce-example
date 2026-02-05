"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, ShoppingCart, Search, Phone, Truck, Trash2, LogIn, User as UserIcon, LogOut, X, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
    const { isLoggedIn, user, logout, isLoginModalOpen, openLoginModal, closeLoginModal } = useAuth();
    const { items, removeItem, clearCart, totalItems, totalPrice } = useCart();

    const isSeller = user?.role === 'seller';

    return (
        <div className="flex flex-col w-full">
            {/* Premium Trust Bar with Gradient */}
            <div className="w-full bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white text-xs py-2.5 px-4 shadow-lg z-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
                <div className="container mx-auto flex justify-between items-center px-0 relative z-10">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1.5 font-medium"><Phone className="h-3.5 w-3.5 text-emerald-300" /> <span className="text-emerald-50">71 123 456</span> <span className="text-emerald-300/70 text-[10px]">(9h - 19h)</span></span>
                        <span className="hidden sm:inline opacity-40">•</span>
                        <span className="hidden sm:flex items-center gap-1.5 text-emerald-100"><Truck className="h-3.5 w-3.5 text-emerald-300" /> Livraison gratuite sur toute la Tunisie</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-emerald-200">
                        <Sparkles className="h-3.5 w-3.5 text-yellow-300 animate-pulse" />
                        Paiement à la livraison
                    </div>
                </div>
            </div>

            <header className="sticky top-0 z-40 w-full border-b border-emerald-100/50 bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 shadow-sm">
                <div className="container flex h-20 items-center justify-between mx-auto px-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden mr-2 hover:bg-emerald-50 transition-colors">
                                <Menu className="h-5 w-5 text-emerald-900" />
                                <span className="sr-only">Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                            <nav className="flex flex-col gap-6 mt-8">
                                <Link href="/" className="text-xl font-bold text-emerald-800 hover:text-emerald-600 transition-colors">Accueil</Link>
                                <Link href="/products" className="text-xl font-medium hover:text-emerald-600 transition-colors">Boutique</Link>
                                <Link href="/about" className="text-xl font-medium hover:text-emerald-600 transition-colors">Notre Mission</Link>
                                <Link href="/contact" className="text-xl font-medium hover:text-emerald-600 transition-colors">Contact</Link>
                                {!isLoggedIn ? (
                                    <Link href="/login" className="mt-4">
                                        <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-emerald-glow">Se connecter</Button>
                                    </Link>
                                ) : (
                                    <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/50 flex items-center gap-3 shadow-sm">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-md">
                                            <UserIcon className="h-6 w-6" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm text-emerald-950">{user?.name}</span>
                                            <span className="text-xs uppercase text-emerald-600 font-semibold tracking-wide">{user?.role === 'seller' ? 'Vendeur Pro' : 'Client Premium'}</span>
                                        </div>
                                    </div>
                                )}
                            </nav>
                        </SheetContent>
                    </Sheet>

                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                            <span className="text-2xl font-black tracking-tight text-emerald-900 relative">
                                Allergy<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600">Safe</span><span className="text-xs align-top text-gray-400 font-normal ml-1">TN</span>
                            </span>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <Link href="/" className="relative text-gray-700 hover:text-emerald-600 transition-colors group">
                            Accueil
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link href="/products" className="relative text-gray-700 hover:text-emerald-600 transition-colors group">
                            Boutique
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link href="/about" className="relative text-gray-700 hover:text-emerald-600 transition-colors group">
                            À Propos
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link href="/contact" className="relative text-gray-700 hover:text-emerald-600 transition-colors group">
                            Contact
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </nav>

                    <div className="flex items-center justify-end space-x-3">
                        <div className="hidden lg:block">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600/50 group-focus-within:text-emerald-600 transition-colors" />
                                <Input
                                    type="search"
                                    placeholder="Rechercher..."
                                    className="pl-10 w-[250px] bg-gray-50/50 border-emerald-100 focus-visible:ring-emerald-500 focus-visible:border-emerald-400 rounded-full h-10 transition-all"
                                />
                            </div>
                        </div>

                        {!isLoggedIn ? (
                            <div className="flex items-center gap-2">
                                <Link href="/login">
                                    <Button variant="ghost" size="sm" className="hidden md:flex gap-2 text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900 font-bold rounded-full px-6 transition-all">
                                        <LogIn className="h-4 w-4" />
                                        S'identifier
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <div className="hidden md:flex flex-col items-end leading-tight mr-1">
                                    <span className="text-xs font-bold text-emerald-900">{user?.name}</span>
                                    <span className="text-[10px] uppercase text-emerald-500 font-semibold tracking-wider">{user?.role === 'seller' ? 'Vendeur' : 'Client'}</span>
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 border border-emerald-200/50 hover:shadow-md transition-all">
                                            <UserIcon className="h-5 w-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl shadow-xl border-emerald-100/50">
                                        <DropdownMenuLabel className="text-xs uppercase tracking-wider text-gray-500">Mon Compte</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {user?.role === 'seller' && (
                                            <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
                                                <Link href="/dashboard" className="flex items-center gap-2">
                                                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                                    Espace Vendeur
                                                </Link>
                                            </DropdownMenuItem>
                                        )}
                                        {user?.role === 'client' && (
                                            <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
                                                <Link href="/onboarding" className="flex items-center gap-2">
                                                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                                    Profil Santé
                                                </Link>
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={logout} className="text-red-600 font-medium cursor-pointer rounded-lg hover:bg-red-50">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Déconnexion
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {!isSeller && (
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button variant="outline" size="icon" className="relative border-emerald-200 hover:bg-emerald-50 text-emerald-700 h-10 w-10 rounded-full transition-all hover:shadow-md">
                                                <ShoppingCart className="h-5 w-5" />
                                                {totalItems > 0 && (
                                                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-600 text-[10px] animate-in zoom-in shadow-md border-2 border-white">
                                                        {totalItems}
                                                    </Badge>
                                                )}
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent className="w-full sm:max-w-md flex flex-col p-0 bg-gradient-to-b from-white to-gray-50/30">
                                            <div className="p-6 border-b border-emerald-100/50 flex justify-between items-center bg-white">
                                                <SheetHeader>
                                                    <SheetTitle className="text-2xl font-black flex items-center gap-2">
                                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md">
                                                            <ShoppingCart className="h-5 w-5 text-white" />
                                                        </div>
                                                        Mon Panier
                                                    </SheetTitle>
                                                </SheetHeader>
                                                {items.length > 0 && (
                                                    <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-500 hover:text-red-600 hover:bg-red-50 text-xs gap-1 rounded-full px-3">
                                                        <Trash2 className="h-3 w-3" /> Vider
                                                    </Button>
                                                )}
                                            </div>

                                            <div className="flex-1 overflow-auto p-6">
                                                {items.length === 0 ? (
                                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                                                        <div className="relative">
                                                            <div className="absolute inset-0 bg-emerald-200 blur-2xl opacity-20 animate-pulse"></div>
                                                            <div className="relative w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center text-gray-300 shadow-inner">
                                                                <ShoppingCart className="h-10 w-10" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-900 font-bold mb-1">Votre panier est vide</p>
                                                            <p className="text-gray-500 text-sm">Découvrez nos produits hypoallergéniques</p>
                                                        </div>
                                                        <Link href="/products">
                                                            <Button className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-emerald-glow rounded-full px-6">
                                                                Explorer la boutique
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col gap-4">
                                                        {items.map((item, index) => (
                                                            <div key={item.id} className="flex gap-4 group p-3 rounded-2xl hover:bg-white transition-all animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                                                                <div className="h-20 w-20 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                                                                    <img src={item.image} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" alt={item.name} />
                                                                </div>
                                                                <div className="flex flex-col justify-between flex-1 py-1">
                                                                    <div className="flex justify-between items-start gap-2">
                                                                        <div className="flex-1">
                                                                            <h4 className="font-bold text-sm text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-1">{item.name}</h4>
                                                                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mt-0.5">{item.category}</p>
                                                                        </div>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-7 w-7 text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all rounded-full"
                                                                            onClick={() => removeItem(item.id)}
                                                                        >
                                                                            <X className="h-3.5 w-3.5" />
                                                                        </Button>
                                                                    </div>
                                                                    <div className="flex justify-between items-end mt-2">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">Qté: {item.quantity}</span>
                                                                        </div>
                                                                        <span className="font-black text-emerald-800 text-sm">{(item.price * item.quantity).toFixed(3)} <span className="text-[10px] text-gray-400 font-medium">TND</span></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {items.length > 0 && (
                                                <div className="p-6 border-t border-emerald-100/50 bg-white shadow-2xl">
                                                    <div className="space-y-3 mb-6">
                                                        <div className="flex justify-between items-center text-sm">
                                                            <span className="text-gray-600">Sous-total</span>
                                                            <span className="font-bold text-gray-900">{totalPrice.toFixed(3)} TND</span>
                                                        </div>
                                                        <div className="flex justify-between items-center text-sm">
                                                            <span className="text-gray-600">Livraison</span>
                                                            <span className="text-emerald-600 font-bold uppercase text-[10px] px-2 py-1 bg-emerald-50 rounded-full">Gratuite</span>
                                                        </div>
                                                        <Separator className="bg-emerald-100/50" />
                                                        <div className="flex justify-between items-center pt-2">
                                                            <span className="text-lg font-bold text-gray-900">Total</span>
                                                            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500">{totalPrice.toFixed(3)} TND</span>
                                                        </div>
                                                    </div>
                                                    <Button size="lg" className="w-full h-14 text-lg font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 rounded-2xl shadow-xl shadow-emerald-900/20 hover:shadow-2xl transition-all">
                                                        Commander maintenant
                                                    </Button>
                                                </div>
                                            )}
                                        </SheetContent>
                                    </Sheet>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Enhanced Login Modal */}
                <Dialog open={isLoginModalOpen} onOpenChange={closeLoginModal}>
                    <DialogContent className="sm:max-w-[450px] rounded-[2rem] border-emerald-100/50 shadow-2xl">
                        <DialogHeader className="text-center items-center">
                            <div className="relative mb-4">
                                <div className="absolute inset-0 bg-emerald-400 blur-2xl opacity-30 animate-pulse"></div>
                                <div className="relative w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                                    <LogIn className="h-8 w-8 text-emerald-600" />
                                </div>
                            </div>
                            <DialogTitle className="text-2xl font-black text-gray-900">Rejoignez-nous</DialogTitle>
                            <DialogDescription className="text-center pt-2 text-base text-gray-600 leading-relaxed">
                                Connectez-vous pour gérer votre panier et bénéficier de nos conseils experts personnalisés.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-3 py-4">
                            <Link href="/login" onClick={closeLoginModal}>
                                <Button className="w-full h-12 text-base font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 rounded-xl shadow-emerald-glow hover:shadow-xl transition-all">
                                    Se connecter
                                </Button>
                            </Link>
                            <Link href="/register" onClick={closeLoginModal}>
                                <Button variant="outline" className="w-full h-12 text-base font-medium rounded-xl border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all">
                                    Créer un compte
                                </Button>
                            </Link>
                        </div>
                    </DialogContent>
                </Dialog>
            </header>
        </div>
    )
}
