"use client" // Since we use ProductCard which now uses Context

import { useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductModal } from "@/components/product-modal"
import { products, categories, allergyFilters, Product } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Check, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const PRODUCTS_PER_PAGE = 8;

function ProductsPageContent() {
    const searchParams = useSearchParams()
    const filterAllergy = searchParams.get("allergy")
    const filterCategory = searchParams.get("category")
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    // Filter Logic
    const filteredProducts = products.filter((p) => {
        const matchAllergy = filterAllergy ? p.allergyTags.includes(filterAllergy) : true;
        const matchCategory = filterCategory && filterCategory !== "Tout" ? p.category === filterCategory : true;
        return matchAllergy && matchCategory;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
    }

    return (
        <div className="min-h-screen bg-[#FDFDFD]">
            <div className="container px-4 md:px-6 py-12 mx-auto">
                <div className="flex flex-col space-y-2 mb-8 text-center">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-emerald-950">
                        La Boutique <span className="text-emerald-600 italic font-serif">Safe</span>
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Parcourez notre catalogue certifié sans allergènes.
                    </p>
                </div>

                {/* Filters and Layout */}
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 space-y-8 flex-shrink-0">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
                                <h3 className="font-bold text-gray-900">Catégories</h3>
                            </div>
                            <div className="space-y-2">
                                {categories.map((cat) => (
                                    <a
                                        key={cat}
                                        href={`/products?category=${cat}`}
                                        className={`block text-sm py-2 px-3 rounded-lg transition-colors ${(filterCategory === cat || (!filterCategory && cat === "Tout"))
                                            ? 'bg-emerald-50 text-emerald-700 font-bold'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                                            }`}
                                    >
                                        {cat}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="font-bold text-gray-900 mb-4">Par Allergie</h3>
                            <div className="flex flex-wrap gap-2">
                                {allergyFilters.map((allergy) => (
                                    <a key={allergy} href={`/products?allergy=${allergy}`}>
                                        <Badge
                                            variant="outline"
                                            className={`cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors py-1.5 px-3 ${filterAllergy === allergy ? 'bg-emerald-100 border-emerald-200 text-emerald-800' : 'text-gray-500 border-gray-200'
                                                }`}
                                        >
                                            {filterAllergy === allergy && <Check className="w-3 h-3 mr-1" />}
                                            {allergy}
                                        </Badge>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {currentProducts.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                                    {currentProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} onProductClick={handleProductClick} />
                                    ))}
                                </div>

                                {/* Pagination Controls */}
                                {totalPages > 1 && (
                                    <div className="mt-24 flex justify-center">
                                        <Pagination className="mx-auto">
                                            <PaginationContent>
                                                <PaginationItem>
                                                    <PaginationPrevious
                                                        onClick={() => handlePageChange(currentPage - 1)}
                                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                                    />
                                                </PaginationItem>

                                                {[...Array(totalPages)].map((_, i) => {
                                                    const page = i + 1;
                                                    if (
                                                        page === 1 ||
                                                        page === totalPages ||
                                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                                    ) {
                                                        return (
                                                            <PaginationItem key={page}>
                                                                <PaginationLink
                                                                    onClick={() => handlePageChange(page)}
                                                                    isActive={currentPage === page}
                                                                    className="cursor-pointer"
                                                                >
                                                                    {page}
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        );
                                                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                                                        return (
                                                            <PaginationItem key={page}>
                                                                <PaginationEllipsis />
                                                            </PaginationItem>
                                                        );
                                                    }
                                                    return null;
                                                })}

                                                <PaginationItem>
                                                    <PaginationNext
                                                        onClick={() => handlePageChange(currentPage + 1)}
                                                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                                    />
                                                </PaginationItem>
                                            </PaginationContent>
                                        </Pagination>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                                <p className="text-gray-500 text-lg">Aucun produit trouvé pour ces critères.</p>
                                <Button variant="link" className="text-emerald-600 mt-2" onClick={() => window.location.href = '/products'}>
                                    Effacer les filtres
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Product Modal */}
            <ProductModal
                product={selectedProduct}
                open={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    )
}

export default function ProductsPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center text-gray-500">
                    Chargement de la boutique...
                </div>
            }
        >
            <ProductsPageContent />
        </Suspense>
    )
}
