import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function YogaPilatesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8">Yoga / Pilates</h1>
        <p className="text-muted-foreground">
          Ropa especializada para yoga y pilates con máxima flexibilidad y confort.
        </p>
      </main>
      <Footer />
    </div>
  )
}
