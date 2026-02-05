"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, Store, Sparkles, ShieldCheck, Leaf, Lock } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function LoginPage() {
    const router = useRouter()
    const { login } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = (role: "client" | "seller") => {
        setIsLoading(true)
        // Simulate auth delay
        setTimeout(() => {
            setIsLoading(false)
            login(role);
            if (role === "client") {
                router.push("/onboarding")
            } else {
                router.push("/dashboard")
            }
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-[#FAFAF8] flex flex-col overflow-hidden relative">
            {/* Background Blobs - Same as Landing Page */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-emerald-100/40 rounded-full blur-[100px] animate-float opacity-70 mix-blend-multiply" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-orange-100/50 rounded-full blur-[80px] animate-float-delayed opacity-60 mix-blend-multiply" />
            </div>

            {/* Back Button */}
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-emerald-800 font-bold hover:text-emerald-700 transition-all hover:gap-3 z-20 group">
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span>Retour à l'accueil</span>
            </Link>

            <div className="flex-1 flex items-center justify-center p-4 relative z-10">
                <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Branding */}
                    <div className="hidden lg:block space-y-8 animate-fade-in">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/50 backdrop-blur border border-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            Plateforme Sécurisée
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-black tracking-tighter text-emerald-950 leading-[0.95]">
                            Votre espace
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 font-serif italic">
                                bien-être.
                            </span>
                        </h1>

                        <p className="text-xl text-emerald-900/60 font-medium leading-relaxed max-w-md">
                            Accédez à votre compte pour gérer vos préférences, commandes et profiter d'une expérience personnalisée.
                        </p>

                        {/* Trust Indicators */}
                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-emerald-100/50 shadow-sm">
                                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                    <ShieldCheck className="h-6 w-6 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-emerald-950 text-sm">Données Protégées</h3>
                                    <p className="text-xs text-emerald-800/70">Chiffrement SSL et conformité RGPD</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-emerald-100/50 shadow-sm">
                                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                    <Leaf className="h-6 w-6 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-emerald-950 text-sm">Expérience Personnalisée</h3>
                                    <p className="text-xs text-emerald-800/70">Produits adaptés à vos besoins</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="w-full animate-fade-in-up">
                        <div className="text-center lg:text-left mb-8 lg:hidden">
                            <h1 className="text-4xl font-black text-emerald-950 mb-2">Bienvenue</h1>
                            <p className="text-gray-500">Connectez-vous pour accéder à votre espace.</p>
                        </div>

                        <Tabs defaultValue="client" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-8 h-14 bg-white/80 backdrop-blur-sm p-1.5 rounded-2xl shadow-lg border border-emerald-100/50">
                                <TabsTrigger
                                    value="client"
                                    className="rounded-xl h-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-emerald-glow font-bold transition-all"
                                >
                                    <User className="w-4 h-4 mr-2" /> Client
                                </TabsTrigger>
                                <TabsTrigger
                                    value="seller"
                                    className="rounded-xl h-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-warm-glow font-bold transition-all"
                                >
                                    <Store className="w-4 h-4 mr-2" /> Vendeur
                                </TabsTrigger>
                            </TabsList>

                            {/* Client Tab */}
                            <TabsContent value="client">
                                <div className="bg-white/90 backdrop-blur-xl border border-emerald-100/50 shadow-2xl rounded-3xl p-8 space-y-6">
                                    <div className="text-center pb-2">
                                        <div className="inline-flex h-14 w-14 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 items-center justify-center mb-4">
                                            <Sparkles className="h-7 w-7 text-emerald-700" />
                                        </div>
                                        <h2 className="text-2xl font-black text-emerald-950">Espace Client</h2>
                                        <p className="text-sm text-gray-500 mt-1">Accédez à vos préférences et commandes</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email-client" className="text-sm font-bold text-gray-700">Email</Label>
                                            <Input
                                                id="email-client"
                                                type="email"
                                                placeholder="votre@email.com"
                                                className="h-12 rounded-xl border-emerald-100 focus:border-emerald-400 bg-gray-50/50"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password-client" className="text-sm font-bold text-gray-700">Mot de passe</Label>
                                            <Input
                                                id="password-client"
                                                type="password"
                                                className="h-12 rounded-xl border-emerald-100 focus:border-emerald-400 bg-gray-50/50"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full h-14 text-lg font-black rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-emerald-glow hover:shadow-2xl hover:scale-[1.02] transition-all"
                                        onClick={() => handleLogin("client")}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Connexion..." : "Se connecter"}
                                    </Button>

                                    <div className="text-center text-sm pt-2">
                                        Pas encore de compte ? <Link href="/register" className="text-emerald-600 font-bold hover:underline">S'inscrire</Link>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Seller Tab */}
                            <TabsContent value="seller">
                                <div className="bg-white/90 backdrop-blur-xl border border-orange-100/50 shadow-2xl rounded-3xl p-8 space-y-6">
                                    <div className="text-center pb-2">
                                        <div className="inline-flex h-14 w-14 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 items-center justify-center mb-4">
                                            <Store className="h-7 w-7 text-orange-700" />
                                        </div>
                                        <h2 className="text-2xl font-black text-orange-950">Espace Vendeur</h2>
                                        <p className="text-sm text-gray-500 mt-1">Gérez votre boutique et vos produits</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email-seller" className="text-sm font-bold text-gray-700">Email Professionnel</Label>
                                            <Input
                                                id="email-seller"
                                                type="email"
                                                placeholder="pro@exemple.com"
                                                className="h-12 rounded-xl border-orange-100 focus:border-orange-400 bg-gray-50/50"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password-seller" className="text-sm font-bold text-gray-700">Mot de passe</Label>
                                            <Input
                                                id="password-seller"
                                                type="password"
                                                className="h-12 rounded-xl border-orange-100 focus:border-orange-400 bg-gray-50/50"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full h-14 text-lg font-black rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 shadow-warm-glow hover:shadow-2xl hover:scale-[1.02] transition-all"
                                        onClick={() => handleLogin("seller")}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Connexion..." : "Accéder au Dashboard"}
                                    </Button>

                                    <div className="text-center text-sm text-gray-400 pt-2 flex items-center justify-center gap-1">
                                        <Lock className="w-3 h-3" /> Accès sécurisé
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}
