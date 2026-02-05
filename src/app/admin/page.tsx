"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BarChart3, Users, Package, ShieldCheck, Activity, ArrowUpRight, Sparkles } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { products } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const kpis = [
    { label: "Ventes (30j)", value: "124.8k TND", trend: "+12.4%", icon: BarChart3 },
    { label: "Nouveaux clients", value: "1,482", trend: "+8.2%", icon: Users },
    { label: "Produits actifs", value: "286", trend: "+3.1%", icon: Package },
    { label: "Conformite", value: "98.7%", trend: "+0.6%", icon: ShieldCheck },
]

const alerts = [
    { title: "3 produits en rupture", detail: "Prioriser le re-stock sur Literie." },
    { title: "2 vendeurs a valider", detail: "Nouveaux comptes en attente." },
    { title: "Taux de retours 1.2%", detail: "En baisse vs. mois precedent." },
]

const recentOrders = [
    { id: "CMD-1842", client: "H. Ben Salem", total: "189.000 TND", status: "Prepare" },
    { id: "CMD-1841", client: "M. Hachicha", total: "68.500 TND", status: "Livre" },
    { id: "CMD-1840", client: "A. Kefi", total: "240.000 TND", status: "En cours" },
    { id: "CMD-1839", client: "S. Mdhaffar", total: "35.000 TND", status: "Prepare" },
]

export default function AdminDashboard() {
    const router = useRouter()
    const { user, isLoggedIn } = useAuth()

    useEffect(() => {
        if (!isLoggedIn || user?.role !== "admin") {
            router.push("/login")
        }
    }, [isLoggedIn, user, router])

    if (!isLoggedIn || user?.role !== "admin") {
        return (
            <div className="min-h-screen bg-[#F7F7FB] flex items-center justify-center text-gray-500">
                Chargement de l'espace admin...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F7F7FB]">
            <section className="relative overflow-hidden bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-900 text-white">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,#6d28d9,transparent_45%),radial-gradient(circle_at_bottom_left,#22d3ee,transparent_40%)]" />
                <div className="container mx-auto px-6 py-16 relative">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest">
                                <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
                                Centre de Pilotage
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                                Admin Dashboard
                            </h1>
                            <p className="text-indigo-100/80 text-base max-w-xl">
                                Supervisez la plateforme en temps reel, surveillez la qualite des produits et accompagnez les vendeurs.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/products">
                                <Button className="h-12 rounded-full bg-white text-indigo-950 font-bold hover:bg-indigo-50">
                                    Catalogue
                                </Button>
                            </Link>
                            <Link href="/dashboard">
                                <Button variant="outline" className="h-12 rounded-full border-white/30 text-white hover:bg-white/10">
                                    Espace Vendeur
                                </Button>
                            </Link>
                            <Button variant="outline" className="h-12 rounded-full border-cyan-200/50 text-cyan-100 hover:bg-cyan-200/10">
                                Exporter
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 -mt-14">
                    {kpis.map(({ label, value, trend, icon: Icon }) => (
                        <div key={label} className="rounded-3xl bg-white shadow-lg border border-indigo-100/40 p-6">
                            <div className="flex items-center justify-between">
                                <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                    {trend}
                                </span>
                            </div>
                            <div className="mt-5">
                                <p className="text-sm text-gray-500">{label}</p>
                                <p className="text-2xl font-black text-indigo-950">{value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-10">
                    <div className="xl:col-span-2 rounded-3xl bg-white border border-indigo-100/40 shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-black text-indigo-950">Activite recente</h2>
                                <p className="text-sm text-gray-500">Flux de commandes et performance boutique.</p>
                            </div>
                            <Button variant="outline" className="rounded-full border-indigo-200 text-indigo-700">
                                Details
                            </Button>
                        </div>
                        <div className="mt-6 space-y-4">
                            {recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50/60 px-4 py-3">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                                            {order.id.slice(-2)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{order.id}</p>
                                            <p className="text-xs text-gray-500">{order.client}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-semibold text-gray-700">{order.total}</span>
                                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white border border-indigo-100/40 shadow-lg p-6 space-y-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black text-indigo-950">Alertes rapides</h2>
                            <Activity className="h-5 w-5 text-indigo-500" />
                        </div>
                        <div className="space-y-3">
                            {alerts.map((alert) => (
                                <div key={alert.title} className="rounded-2xl border border-indigo-100/60 bg-indigo-50/50 p-4">
                                    <p className="text-sm font-bold text-indigo-900">{alert.title}</p>
                                    <p className="text-xs text-indigo-700/80 mt-1">{alert.detail}</p>
                                </div>
                            ))}
                        </div>
                        <Separator className="bg-indigo-100/70" />
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Satisfaction client</span>
                                <span className="font-bold text-emerald-600">4.8 / 5</span>
                            </div>
                            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                                <div className="h-full w-[92%] bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" />
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Delai moyen</span>
                                <span className="font-bold text-indigo-700">1.6 jours</span>
                            </div>
                            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                                <div className="h-full w-[78%] bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl bg-white border border-indigo-100/40 shadow-lg p-6 mt-10">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-black text-indigo-950">Top produits surveilles</h2>
                            <p className="text-sm text-gray-500">Controle qualite et tendances du moment.</p>
                        </div>
                        <Button variant="outline" className="rounded-full border-indigo-200 text-indigo-700">
                            Gerer les produits
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
                        {products.slice(0, 6).map((product) => (
                            <div key={product.id} className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
                                <div className="h-14 w-14 rounded-xl overflow-hidden border border-gray-100 bg-white">
                                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-900 line-clamp-1">{product.name}</p>
                                    <p className="text-xs text-gray-500">{product.category}</p>
                                </div>
                                <span className="text-sm font-black text-indigo-700">{product.price.toFixed(3)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
