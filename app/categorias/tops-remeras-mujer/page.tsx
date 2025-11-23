import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TopsRemerasMujerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8">Tops & Remeras</h1>
        <p className="text-muted-foreground">Descubre nuestra colección de tops y remeras deportivas para mujer.</p>
      </main>
      <Footer />
    </div>
  )
}
