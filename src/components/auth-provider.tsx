
"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from "next/navigation"

interface User {
    role: "client" | "seller" | "admin"
    name: string
}

interface AuthContextType {
    isLoggedIn: boolean
    user: User | null
    login: (role: "client" | "seller" | "admin") => void
    logout: () => void
    isLoginModalOpen: boolean
    openLoginModal: () => void
    closeLoginModal: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

    // Load auth state from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("allergySafeUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
    }, [])

    const login = (role: "client" | "seller" | "admin") => {
        const fakeUser = {
            role,
            name: role === "client" ? "Sarra Client" : role === "seller" ? "Vendeur Pro" : "Admin Principal",
        };
        setUser(fakeUser)
        setIsLoggedIn(true)
        localStorage.setItem("allergySafeUser", JSON.stringify(fakeUser));
        setIsLoginModalOpen(false)
    }

    const logout = () => {
        setUser(null)
        setIsLoggedIn(false)
        localStorage.removeItem("allergySafeUser");
        router.push("/")
    }

    const openLoginModal = () => setIsLoginModalOpen(true)
    const closeLoginModal = () => setIsLoginModalOpen(false)

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isLoginModalOpen, openLoginModal, closeLoginModal }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
