
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Package, Plus, Settings, LogOut, Search, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { products as initialProducts, Product } from "@/lib/data"
import { ProductEditModal } from "@/components/product-edit-modal"

export default function Dashboard() {
    const router = useRouter()
    const { logout, user, isLoggedIn } = useAuth()
    const [products, setProducts] = useState(initialProducts)
    const [searchTerm, setSearchTerm] = useState("")
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)

    const handleDelete = (id: string) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
            setProducts(products.filter(p => p.id !== id))
        }
    }

    const handleEdit = (product: Product) => {
        setEditingProduct(product)
    }

    const handleSave = (updatedProduct: Product) => {
        setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p))
        setEditingProduct(null) // Close modal after saving
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

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-gray-100 flex-shrink-0">
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <span className="font-bold text-lg text-emerald-800">Seller<span className="text-gray-900">Desk</span></span>
                </div>
                <nav className="p-4 space-y-2">
                    <Button variant="secondary" className="w-full justify-start bg-emerald-50 text-emerald-900 font-bold">
                        <Package className="mr-2 h-4 w-4" /> Produits
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-gray-500">
                        <Settings className="mr-2 h-4 w-4" /> Paramètres
                    </Button>
                    <div className="pt-8">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => {
                                logout()
                            }}
                        >
                            <LogOut className="mr-2 h-4 w-4" /> Déconnexion
                        </Button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Vos Produits</h1>
                        <p className="text-gray-500">Gérez votre inventaire et ajoutez de nouveaux articles.</p>
                    </div>
                    <Link href="/dashboard/add">
                        <Button className="h-10 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg shadow-sm">
                            <Plus className="mr-2 h-4 w-4" /> Ajouter un produit
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-gray-100 flex gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                placeholder="Rechercher un produit..."
                                className="flex h-10 w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9 border-gray-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-gray-50/50 text-[11px] uppercase tracking-wider font-bold">
                                <TableRow>
                                    <TableHead className="w-[100px]">Image</TableHead>
                                    <TableHead>Nom du Produit</TableHead>
                                    <TableHead className="hidden md:table-cell">Catégorie</TableHead>
                                    <TableHead>Prix (TND)</TableHead>
                                    <TableHead className="hidden md:table-cell">Allergies</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProducts.map((product) => (
                                    <TableRow key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <TableCell>
                                            <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-100">
                                                <img src={product.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-bold text-gray-900">{product.name}</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <Badge variant="secondary" className="font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-none">{product.category}</Badge>
                                        </TableCell>
                                        <TableCell className="font-black text-emerald-800">{product.price.toFixed(3)}</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <div className="flex flex-wrap gap-1">
                                                {product.allergyTags.slice(0, 2).map(tag => (
                                                    <span key={tag} className="text-[10px] bg-white text-gray-500 px-2 py-0.5 rounded-full border border-gray-200 truncate max-w-[100px]">{tag}</span>
                                                ))}
                                                {product.allergyTags.length > 2 && <span className="text-[10px] text-gray-300 font-bold">+{product.allergyTags.length - 2}</span>}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48 rounded-xl p-1">
                                                    <DropdownMenuLabel className="text-[10px] uppercase text-gray-400 px-2 py-1.5">Options du produit</DropdownMenuLabel>
                                                    <DropdownMenuItem className="rounded-lg cursor-pointer gap-2" onClick={() => handleEdit(product)}>
                                                        <Pencil className="h-3.5 w-3.5" /> Modifier
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600 rounded-lg cursor-pointer gap-2 focus:bg-red-50 focus:text-red-700" onClick={() => handleDelete(product.id)}>
                                                        <Trash2 className="h-3.5 w-3.5" /> Supprimer
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="py-20 text-center text-gray-400">
                            <Package className="h-12 w-12 mx-auto mb-4 opacity-10" />
                            aucun produit trouvé
                        </div>
                    )}
                </div>
            </main>

            {/* Product Edit Modal */}
            <ProductEditModal
                product={editingProduct}
                open={!!editingProduct}
                onClose={() => setEditingProduct(null)}
                onSave={handleSave}
            />
        </div>
    )
}
