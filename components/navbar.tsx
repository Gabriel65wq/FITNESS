"use client"

import Link from "next/link"
import { Search, ShoppingBag, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import AuthModal from "@/components/auth-modal"
import { useAuth } from "@/contexts/auth-context"

export function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto">
          <div className="flex h-16 items-center justify-between px-4">
            {/* Izquierda - Búsqueda */}
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>

            {/* Centro - Logo/Marca */}
            <Link href="/" className="text-xl font-bold tracking-wider">
              FITNESS
            </Link>

            {/* Derecha - Carrito y Usuario */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Carrito</span>
              </Button>

              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium hidden md:inline-block">Hola, {user?.username}</span>
                  <Button variant="ghost" size="icon" onClick={logout} title="Cerrar sesión">
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">Cerrar sesión</span>
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setIsAuthModalOpen(true)}>
                  <User className="h-5 w-5 mr-2" />
                  <span className="hidden md:inline">Ingresar / Registrarse</span>
                </Button>
              )}
            </div>
          </div>

          {/* Submenú */}
          <nav className="border-t border-border">
            <ul className="flex items-center justify-center gap-8 py-3 text-sm">
              <li>
                <Link href="/" className="hover:text-muted-foreground transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-muted-foreground transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-muted-foreground transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/quienes-somos" className="hover:text-muted-foreground transition-colors">
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link href="/preguntas-frecuentes" className="hover:text-muted-foreground transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Modal de autenticación */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}

export default Navbar
