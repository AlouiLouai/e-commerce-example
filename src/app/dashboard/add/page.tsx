
"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ArrowLeft, Save, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { allergyFilters, categories } from "@/lib/data"
import { useAuth } from "@/components/auth-provider"

export default function AddProductPage() {
    const router = useRouter()
    const { user, isLoggedIn } = useAuth()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Mock save
        setTimeout(() => {
            router.push("/dashboard")
        }, 1000)
    }

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/login")
            return
        }
        if (user?.role === "admin") {
            router.push("/admin")
            return
        }
        if (user?.role !== "seller") {
            router.push("/")
        }
    }, [isLoggedIn, user, router])

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <h1 className="font-bold text-lg text-gray-900">Ajouter un nouveau produit</h1>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="text-gray-500">Annuler</Button>
                        <Button className="bg-emerald-700 hover:bg-emerald-800" onClick={handleSubmit}>
                            <Save className="mr-2 h-4 w-4" /> Enregistrer le produit
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
                <form className="space-y-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Left Column: Main Info */}
                        <div className="md:col-span-2 space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informations Générales</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nom du Produit</Label>
                                        <Input id="name" placeholder="Ex: Housse Matelas..." />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="desc">Description Complète</Label>
                                        <Textarea id="desc" placeholder="Décrivez les bénéfices et matériaux..." className="min-h-[150px]" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Médias</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                                        <div className="h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                                            <Upload className="h-6 w-6" />
                                        </div>
                                        <p className="font-medium text-gray-900">Glissez-déposez une image ici</p>
                                        <p className="text-sm text-gray-500 mt-1">ou cliquez pour parcourir (JPG, PNG)</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Inventaire & Tarifs</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="price">Prix (TND)</Label>
                                        <Input id="price" type="number" placeholder="0.000" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="stock">Stock</Label>
                                        <Input id="stock" type="number" placeholder="100" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column: Settings */}
                        <div className="space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm uppercase text-gray-500 font-bold tracking-wider">Organisation</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Statut</Label>
                                        <Select defaultValue="active">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selectionner" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Actif</SelectItem>
                                                <SelectItem value="draft">Brouillon</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Catégorie</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choisir..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.filter(c => c !== "Tout").map(c => (
                                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-emerald-100 bg-emerald-50/30">
                                <CardHeader>
                                    <CardTitle className="text-sm uppercase text-emerald-800 font-bold tracking-wider">Allergènes Ciblés</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {allergyFilters.map(tag => (
                                        <div key={tag} className="flex items-center space-x-2">
                                            <Checkbox id={tag} />
                                            <Label htmlFor={tag} className="text-sm font-medium">{tag}</Label>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
