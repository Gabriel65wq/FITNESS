import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ProductosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Productos</h1>
        <p className="text-muted-foreground">Aquí se mostrarán todos los productos próximamente.</p>
      </main>
      <Footer />
    </div>
  )
}
