import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function QuienesSomosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Quiénes Somos</h1>
        <p className="text-muted-foreground">Información sobre la empresa próximamente.</p>
      </main>
      <Footer />
    </div>
  )
}
