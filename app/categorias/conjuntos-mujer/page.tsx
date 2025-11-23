import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ConjuntosMujerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8">Conjuntos de Mujer</h1>
        <p className="text-muted-foreground">Conjuntos completos diseñados para máximo estilo y comodidad.</p>
      </main>
      <Footer />
    </div>
  )
}
