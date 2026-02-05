
import { Button } from "@/components/ui/button"
import { Check, Star, Users, BriefcaseMedical, ArrowRight } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#FDFDFD]">
            {/* Header */}
            <section className="relative py-20 bg-emerald-900 text-white overflow-hidden rounded-b-[3rem]">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
                    <div className="absolute top-1/2 right-0 w-64 h-64 bg-emerald-400 rounded-full blur-3xl" />
                </div>
                <div className="container px-4 relative z-10 text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Notre Mission</h1>
                    <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
                        Créer un monde plus sûr pour les hypersensibles, un produit à la fois.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 container px-4 mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-wider text-sm">
                            <Users className="h-4 w-4" /> Qui sommes nous ?
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                            Né d'une allergie, <br /> grandi par la passion.
                        </h2>
                        <div className="prose text-gray-600 space-y-4 text-lg leading-relaxed">
                            <p>
                                AllergySafe a été fondé en 2024 après une simple constatation : trouver des vêtements sans étiquettes irritantes ou de la literie certifiée anti-acariens en Tunisie était un parcours du combattant.
                            </p>
                            <p>
                                Nous comprenons la frustration de vérifier chaque étiquette, la peur des allergènes cachés et la difficulté de trouver des produits de haute qualité qui ne compromettent ni la sécurité ni le style.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <h4 className="font-bold text-2xl text-emerald-800">2000+</h4>
                                <p className="text-sm text-emerald-600">Clients Aidés</p>
                            </div>
                            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                                <h4 className="font-bold text-2xl text-orange-800">50+</h4>
                                <p className="text-sm text-orange-600">Produits Certifiés</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2">
                            <img
                                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop"
                                alt="Team working"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-gray-50">
                <div className="container px-4 mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Nos engagements</h2>
                        <p className="text-gray-500">Nous ne faisons aucun compromis sur votre santé.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Check, title: "Transparence Totale", desc: "Chaque ingrédient et matériau est listé. Pas de cachettes." },
                            { icon: BriefcaseMedical, title: "Validé Médicalement", desc: "Nous collaborons avec des allergologues pour valider notre catalogue." },
                            { icon: Star, title: "Qualité Premium", desc: "Des matériaux durables qui résistent au temps et aux lavages." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
                                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
