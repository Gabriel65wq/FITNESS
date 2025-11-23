import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CategoryGrid } from "@/components/category-grid"
import { BenefitsSection } from "@/components/benefits-section"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full">
          <div className="relative aspect-[21/9] w-full overflow-hidden bg-secondary flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Espacio para tu imagen hero (proporción 21:9)</p>
          </div>
          <div className="border-b border-border" />
        </section>

        {/* Categorías */}
        <CategoryGrid />

        {/* Beneficios */}
        <BenefitsSection />
      </main>

      <Footer />
    </div>
  )
}
