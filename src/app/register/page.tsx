
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, User, Store } from "lucide-react"

import { useAuth } from "@/components/auth-provider"

export default function RegisterPage() {
    const router = useRouter()
    const { login } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = (role: "client" | "seller") => {
        setIsLoading(true)
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
        <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-emerald-800 font-bold hover:text-emerald-700 transition-colors z-10">
                &larr; Retour à l'accueil
            </Link>

            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md animate-fade-in-up">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-emerald-950 mb-2">Créer un compte</h1>
                        <p className="text-gray-500">Rejoignez la communauté AllergySafe.</p>
                    </div>

                    <Tabs defaultValue="client" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6 h-14 bg-gray-100/50 p-1 rounded-full">
                            <TabsTrigger value="client" className="rounded-full h-full data-[state=active]:bg-white data-[state=active]:text-emerald-800 data-[state=active]:shadow-sm">
                                <User className="w-4 h-4 mr-2" /> Client
                            </TabsTrigger>
                            <TabsTrigger value="seller" className="rounded-full h-full data-[state=active]:bg-white data-[state=active]:text-emerald-800 data-[state=active]:shadow-sm">
                                <Store className="w-4 h-4 mr-2" /> Vendeur
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="client">
                            <Card className="border-emerald-100 shadow-xl shadow-emerald-900/5">
                                <CardHeader>
                                    <CardTitle>Nouveau Client</CardTitle>
                                    <CardDescription>Créez votre profil santé personnalisé.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstname">Prénom</Label>
                                            <Input id="firstname" className="bg-gray-50 h-12" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastname">Nom</Label>
                                            <Input id="lastname" className="bg-gray-50 h-12" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email-client">Email</Label>
                                        <Input id="email-client" type="email" placeholder="client@exemple.com" className="bg-gray-50 h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password-client">Mot de passe</Label>
                                        <Input id="password-client" type="password" className="bg-gray-50 h-12" />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col gap-4">
                                    <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-lg" onClick={() => handleRegister("client")} disabled={isLoading}>
                                        {isLoading ? "Création..." : "S'inscrire"}
                                    </Button>
                                    <div className="text-center text-sm">
                                        Déjà un compte ? <Link href="/login" className="text-emerald-600 font-bold hover:underline">Se connecter</Link>
                                    </div>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="seller">
                            <Card className="border-orange-100 shadow-xl shadow-orange-900/5">
                                <CardHeader>
                                    <CardTitle className="text-orange-900">Devenir Vendeur</CardTitle>
                                    <CardDescription>Commencez à vendre vos produits certifiés.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="store-name">Nom de la Boutique</Label>
                                        <Input id="store-name" className="bg-gray-50 h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email-seller">Email Professionnel</Label>
                                        <Input id="email-seller" type="email" placeholder="pro@exemple.com" className="bg-gray-50 h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password-seller">Mot de passe</Label>
                                        <Input id="password-seller" type="password" className="bg-gray-50 h-12" />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col gap-4">
                                    <Button className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-lg" onClick={() => handleRegister("seller")} disabled={isLoading}>
                                        {isLoading ? "Création..." : "Créer ma boutique"}
                                    </Button>
                                    <div className="text-center text-sm text-gray-400">
                                        <Lock className="w-3 h-3 inline mr-1" /> Données vérifiées
                                    </div>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
