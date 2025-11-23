import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function VitaminasPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Vitaminas</h1>
        <p className="text-muted-foreground mb-8">
          Complementa tu nutrición con nuestras vitaminas y suplementos esenciales para tu bienestar.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Los productos se agregarán aquí */}
          <p className="col-span-full text-center text-muted-foreground py-12">Próximamente productos disponibles</p>
        </div>
      </div>
      <Footer />
    </>
  )
}
