
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#FDFDFD]">
            <div className="container px-4 py-12 md:py-24 mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Contact Info */}
                    <div className="space-y-10">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">Parlons <br /><span className="text-emerald-600">Santé.</span></h1>
                            <p className="text-xl text-gray-500 leading-relaxed max-w-md">
                                Vous avez une question sur un produit ou besoin de conseils ? Notre équipe d'experts est là pour vous guider.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4 p-6 bg-white rounded-3xl shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors">
                                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Téléphone</h3>
                                    <p className="text-emerald-900 font-medium text-lg">+216 71 123 456</p>
                                    <p className="text-sm text-gray-400">Lun-Ven, 9h à 18h</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-6 bg-white rounded-3xl shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors">
                                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Email</h3>
                                    <p className="text-emerald-900 font-medium text-lg">contact@allergysafe.tn</p>
                                    <p className="text-sm text-gray-400">Réponse sous 24h</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-6 bg-white rounded-3xl shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors">
                                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Siège</h3>
                                    <p className="text-gray-600">Les Berges du Lac 2,<br />Tunis, Tunisie</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-emerald-900/5 border border-gray-100">
                        <h2 className="text-2xl font-bold mb-8">Envoyez-nous un message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="first-name" className="text-sm font-bold text-gray-700 ml-1">Prénom</label>
                                    <Input id="first-name" placeholder="Sarra" className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="last-name" className="text-sm font-bold text-gray-700 ml-1">Nom</label>
                                    <Input id="last-name" placeholder="Ben Ali" className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">Email</label>
                                <Input id="email" placeholder="sarra@example.com" type="email" className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-bold text-gray-700 ml-1">Message</label>
                                <Textarea id="message" placeholder="Comment pouvons-nous vous aider ?" className="min-h-[150px] rounded-2xl bg-gray-50 border-gray-200 focus:bg-white transition-colors resize-none p-4" />
                            </div>
                            <Button className="w-full h-14 text-lg font-bold rounded-xl bg-emerald-800 hover:bg-emerald-900 shadow-xl shadow-emerald-900/10">
                                Envoyer le message <Send className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
