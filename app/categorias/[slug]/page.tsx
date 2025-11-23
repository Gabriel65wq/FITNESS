import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const categoryNames: Record<string, string> = {
  "remeras-compresion": "Remeras de Compresión",
  "remeras-oversize": "Remeras Oversize",
  proteinas: "Proteínas",
  creatinas: "Creatinas",
  accesorios: "Accesorios",
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const categoryName = categoryNames[slug] || "Categoría"

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">{categoryName}</h1>
        <p className="text-muted-foreground mb-8">Aquí se mostrarán los productos de esta categoría próximamente.</p>
        <div className="grid grid-cols-4 gap-6 min-h-[400px]">
          {/* Espacio preparado para futura grilla de productos */}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  return [
    { slug: "remeras-compresion" },
    { slug: "remeras-oversize" },
    { slug: "proteinas" },
    { slug: "creatinas" },
    { slug: "accesorios" },
  ]
}
