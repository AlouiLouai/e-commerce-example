"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Product } from "@/lib/data"
import { useState, useEffect } from "react"

interface ProductEditModalProps {
    product: Product | null
    open: boolean
    onClose: () => void
    onSave: (product: Product) => void
}

export function ProductEditModal({ product, open, onClose, onSave }: ProductEditModalProps) {
    const [formData, setFormData] = useState<Partial<Product>>({})

    useEffect(() => {
        if (product) {
            setFormData(product)
        }
    }, [product])

    if (!product) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData as Product)
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border-2 border-emerald-200 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black text-emerald-900">Modifier le produit</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Product Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-bold text-gray-700">Nom du produit</Label>
                            <Input
                                id="name"
                                value={formData.name || ''}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="rounded-xl border-emerald-100 focus:border-emerald-400"
                                required
                            />
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <Label htmlFor="price" className="text-sm font-bold text-gray-700">Prix (TND)</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.001"
                                value={formData.price || ''}
                                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                className="rounded-xl border-emerald-100 focus:border-emerald-400"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-sm font-bold text-gray-700">Catégorie</Label>
                            <Input
                                id="category"
                                value={formData.category || ''}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="rounded-xl border-emerald-100 focus:border-emerald-400"
                                required
                            />
                        </div>

                        {/* Stock Status */}
                        <div className="space-y-2">
                            <Label htmlFor="inStock" className="text-sm font-bold text-gray-700">Statut</Label>
                            <select
                                id="inStock"
                                value={formData.inStock ? 'true' : 'false'}
                                onChange={(e) => setFormData({ ...formData, inStock: e.target.value === 'true' })}
                                className="flex h-10 w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                            >
                                <option value="true">En stock</option>
                                <option value="false">Rupture de stock</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-bold text-gray-700">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description || ''}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="rounded-xl border-emerald-100 focus:border-emerald-400 min-h-[100px]"
                            required
                        />
                    </div>

                    {/* Image URL */}
                    <div className="space-y-2">
                        <Label htmlFor="image" className="text-sm font-bold text-gray-700">URL de l'image</Label>
                        <Input
                            id="image"
                            type="url"
                            value={formData.image || ''}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="rounded-xl border-emerald-100 focus:border-emerald-400"
                            required
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="rounded-xl border-gray-200 hover:bg-gray-50"
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-emerald-glow"
                        >
                            Enregistrer les modifications
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
