import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"

const products = [
  {
    id: "compression-tee-black",
    name: "Compression Tee",
    price: 0,
    image: "/compression-shirt-gym-dark-fitness.jpg",
    rating: 4.8,
    reviewCount: 32,
    category: "remeras-compresion",
  },
]

export default function RemerasCompresionPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Remeras de Compresión</h1>
        <p className="text-muted-foreground mb-8">
          Remeras técnicas de compresión diseñadas para maximizar tu rendimiento y resaltar tu físico.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
