import Link from "next/link"
import { Search, ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
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
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Usuario</span>
            </Button>
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
  )
}

export default Navbar
