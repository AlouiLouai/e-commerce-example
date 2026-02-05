
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ShieldCheck, ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

const formSchema = z.object({
    allergies: z.array(z.string()).refine((value) => value.length > 0, {
        message: "Veuillez sélectionner au moins une allergie.",
    }),
    severity: z.enum(["mild", "moderate", "severe"], {
        message: "Veuillez indiquer la sévérité.",
    }),
    skinType: z.enum(["normal", "dry", "oily", "sensitive"], {
        message: "Veuillez sélectionner votre type de peau.",
    }),
    additionalInfo: z.string().optional(),
})

export default function OnboardingPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            allergies: [],
            additionalInfo: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        // Here we would save to backend
        router.push("/products") // Redirect to filtered products
    }

    const nextStep = () => setStep(step + 1)
    const prevStep = () => setStep(step - 1)

    return (
        <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Blobs - Same as Landing Page */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-emerald-100/40 rounded-full blur-[100px] animate-float opacity-70 mix-blend-multiply" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-orange-100/50 rounded-full blur-[80px] animate-float-delayed opacity-60 mix-blend-multiply" />
            </div>

            <div className="w-full max-w-2xl relative z-10">
                {/* Progress Bar */}
                <div className="mb-8 animate-fade-in">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-emerald-800 mb-3">
                        <span>Profil Santé</span>
                        <span>Étape {step} / 3</span>
                    </div>
                    <div className="h-3 bg-white/80 backdrop-blur-sm rounded-full overflow-hidden shadow-sm border border-emerald-100/50">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500 transition-all duration-500 ease-out shadow-emerald-glow"
                            style={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>
                </div>

                <Card className="border-emerald-100/50 shadow-2xl shadow-emerald-900/10 rounded-3xl overflow-hidden backdrop-blur-sm bg-white/95 animate-fade-in-up">
                    <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white p-10 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-float" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-300/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 animate-float-delayed" />
                        <div className="relative z-10">
                            <div className="inline-flex h-16 w-16 rounded-full bg-emerald-700/50 backdrop-blur-sm items-center justify-center mb-4 border-2 border-emerald-400/30">
                                <ShieldCheck className="w-8 h-8 text-emerald-200" />
                            </div>
                            <h1 className="text-3xl font-black mb-3 tracking-tight">Configurez votre profil de sécurité</h1>
                            <p className="text-emerald-100 text-base max-w-md mx-auto leading-relaxed">Nous filtrerons automatiquement les produits dangereux pour vous.</p>
                        </div>
                    </div>

                    <CardContent className="p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                {/* STEP 1: Allergies */}
                                {step === 1 && (
                                    <div className="space-y-6 animate-fade-in-up">
                                        <FormField
                                            control={form.control}
                                            name="allergies"
                                            render={() => (
                                                <FormItem>
                                                    <div className="mb-4">
                                                        <FormLabel className="text-xl font-bold text-gray-900">À quoi êtes-vous allergique ?</FormLabel>
                                                        <FormDescription>Sélectionnez toutes les options qui s'appliquent.</FormDescription>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        {[
                                                            { id: "dust", label: "Acariens / Poussière" },
                                                            { id: "wool", label: "Laine / Fibres Animales" },
                                                            { id: "latex", label: "Latex / Caoutchouc" },
                                                            { id: "nickel", label: "Nickel / Métaux" },
                                                            { id: "perfume", label: "Parfums / Fragrances" },
                                                            { id: "pollen", label: "Pollen / Graminées" },
                                                        ].map((item) => (
                                                            <FormField
                                                                key={item.id}
                                                                control={form.control}
                                                                name="allergies"
                                                                render={({ field }) => {
                                                                    return (
                                                                        <FormItem
                                                                            key={item.id}
                                                                            className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border p-4 hover:bg-emerald-50 hover:border-emerald-200 transition-colors cursor-pointer"
                                                                        >
                                                                            <FormControl>
                                                                                <Checkbox
                                                                                    checked={field.value?.includes(item.id)}
                                                                                    onCheckedChange={(checked) => {
                                                                                        return checked
                                                                                            ? field.onChange([...field.value, item.id])
                                                                                            : field.onChange(
                                                                                                field.value?.filter(
                                                                                                    (value) => value !== item.id
                                                                                                )
                                                                                            )
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                            <FormLabel className="font-medium cursor-pointer w-full">
                                                                                {item.label}
                                                                            </FormLabel>
                                                                        </FormItem>
                                                                    )
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="button" onClick={nextStep} className="w-full h-12 bg-emerald-700 hover:bg-emerald-800 rounded-xl text-lg">
                                            Suivant <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </div>
                                )}

                                {/* STEP 2: Severity & Skin Type */}
                                {step === 2 && (
                                    <div className="space-y-6 animate-fade-in-up">
                                        <FormField
                                            control={form.control}
                                            name="severity"
                                            render={({ field }) => (
                                                <FormItem className="space-y-3">
                                                    <FormLabel className="text-xl font-bold">Quelle est la sévérité de vos réactions ?</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                            className="flex flex-col space-y-1"
                                                        >
                                                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-xl border p-4 has-[[data-state=checked]]:border-emerald-500 has-[[data-state=checked]]:bg-emerald-50">
                                                                <FormControl>
                                                                    <RadioGroupItem value="mild" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal w-full cursor-pointer">
                                                                    <span className="font-bold block text-emerald-900">Légère</span>
                                                                    <span className="text-sm text-gray-500">Rougeurs occasionnelles, démangeaisons supportables.</span>
                                                                </FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-xl border p-4 has-[[data-state=checked]]:border-orange-500 has-[[data-state=checked]]:bg-orange-50">
                                                                <FormControl>
                                                                    <RadioGroupItem value="moderate" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal w-full cursor-pointer">
                                                                    <span className="font-bold block text-orange-900">Modérée</span>
                                                                    <span className="text-sm text-gray-500">Inconfort notable, nécessite parfois un traitement.</span>
                                                                </FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-xl border p-4 has-[[data-state=checked]]:border-red-500 has-[[data-state=checked]]:bg-red-50">
                                                                <FormControl>
                                                                    <RadioGroupItem value="severe" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal w-full cursor-pointer">
                                                                    <span className="font-bold block text-red-900">Sévère</span>
                                                                    <span className="text-sm text-gray-500">Réactions immédiates fortes, risque de choc anaphylactique.</span>
                                                                </FormLabel>
                                                            </FormItem>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex gap-4">
                                            <Button type="button" variant="outline" onClick={prevStep} className="w-1/3 h-12 rounded-xl">Retour</Button>
                                            <Button type="button" onClick={nextStep} className="w-2/3 h-12 bg-emerald-700 hover:bg-emerald-800 rounded-xl text-lg">Suivant</Button>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 3: Details */}
                                {step === 3 && (
                                    <div className="space-y-6 animate-fade-in-up">
                                        <FormField
                                            control={form.control}
                                            name="skinType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xl font-bold">Votre type de peau</FormLabel>
                                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                                        {["normal", "dry", "oily", "sensitive"].map((type) => (
                                                            <div
                                                                key={type}
                                                                className={`text-center p-4 rounded-xl border cursor-pointer capitalize font-medium ${field.value === type ? 'bg-emerald-600 text-white border-emerald-600' : 'hover:bg-gray-50'}`}
                                                                onClick={() => field.onChange(type)}
                                                            >
                                                                {type === 'normal' ? 'Normale' : type === 'dry' ? 'Sèche' : type === 'oily' ? 'Grasse' : 'Sensible'}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="additionalInfo"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-bold">Détails supplémentaires (Optionnel)</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Ex: J'ai aussi de l'asthme quand il y a trop de poussière..."
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <div className="flex gap-4 pt-4">
                                            <Button type="button" variant="outline" onClick={prevStep} className="w-1/3 h-12 rounded-xl">Retour</Button>
                                            <Button type="submit" className="w-2/3 h-12 bg-emerald-800 hover:bg-emerald-900 rounded-xl text-lg font-bold shadow-lg shadow-emerald-900/20">
                                                Terminer <Check className="ml-2 w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
