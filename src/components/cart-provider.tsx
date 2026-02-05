
"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Product } from '@/lib/data'

interface CartItem extends Product {
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addItem: (product: Product) => void
    removeItem: (productId: string) => void
    clearCart: () => void
    totalItems: number
    totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    // Load cart from local storage
    useEffect(() => {
        const savedCart = localStorage.getItem('allergySafeCart')
        if (savedCart) {
            setItems(JSON.parse(savedCart))
        }
    }, [])

    // Save cart to local storage
    useEffect(() => {
        localStorage.setItem('allergySafeCart', JSON.stringify(items))
    }, [items])

    const addItem = (product: Product) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id)
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prevItems, { ...product, quantity: 1 }]
        })
    }

    const removeItem = (productId: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== productId))
    }

    const clearCart = () => {
        setItems([])
    }

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
