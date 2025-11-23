"use client"

import { useState } from "react"
import { Star, ChevronLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductReviews from "@/components/product-reviews"

// Mock data - esto se reemplazará con datos reales
const products: Record<string, any> = {
  "compression-tee-black": {
    id: "compression-tee-black",
    name: "Compression Tee",
    price: 0,
    rating: 4.8,
    reviewCount: 32,
    image: "/compression-shirt-gym-dark-fitness.jpg",
    colors: [
      { name: "Negro", value: "black", available: true },
      { name: "Blanco", value: "white", available: true },
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "remeras-compresion",
  },
}

export default function ProductPage({ params }: { params: { category: string; id: string } }) {
  const product = products[params.id] || products["compression-tee-black"]
  const [selectedColor, setSelectedColor] = useState(product.colors[0].value)
  const [selectedSize, setSelectedSize] = useState("")

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor seleccioná un talle")
      return
    }
    console.log("[v0] Adding to cart:", { product: product.id, color: selectedColor, size: selectedSize })
    alert("Producto agregado al carrito")
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <Link
            href={`/categorias/${params.category}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver a la categoría
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Imagen del producto */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
            </div>

            {/* Información del producto */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">
                    {product.rating} — {product.reviewCount} reseñas
                  </span>
                </div>
                <hr className="border-border" />
              </div>

              {/* Precio */}
              <div>
                <p className="text-4xl font-bold">${product.price}</p>
              </div>

              {/* Selección de color */}
              <div>
                <h3 className="font-semibold mb-3">Color</h3>
                <div className="flex gap-3">
                  {product.colors.map((color: any) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor === color.value ? "border-primary scale-110" : "border-border"
                      } ${color.value === "black" ? "bg-black" : "bg-white"}`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Selección de talle */}
              <div>
                <h3 className="font-semibold mb-3">Talles</h3>
                <div className="flex gap-3">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-lg border-2 font-semibold transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botón agregar al carrito */}
              <Button onClick={handleAddToCart} size="lg" className="w-full text-lg py-6">
                Agregar al carrito
              </Button>
            </div>
          </div>

          {/* Descripción del producto */}
          <div className="max-w-4xl mx-auto space-y-8 mb-16">
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Descripción</h2>
              <div className="prose prose-invert max-w-none space-y-4">
                <p className="text-lg leading-relaxed">
                  La <strong>Compression Tee</strong> no es solo una remera: es una herramienta de rendimiento. Después
                  de meses de pruebas encontramos un fit que realmente transforma cómo te ves y cómo entrenás. Ajusta
                  donde tiene que ajustar, realza tu físico y acompaña cada repetición sin molestarte.
                </p>
                <p className="text-sm text-yellow-400 font-semibold">
                  Atención: el calce es apenas más grande que el de una remera de compresión clásica.
                </p>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Beneficios</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span>
                        <strong>Compresión inteligente</strong> que potencia tu entrenamiento: estabilidad muscular,
                        menos fatiga, sensación de firmeza.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span>
                        <strong>Diseño fachero y estético:</strong> cortes pensados para resaltar tu físico mientras
                        entrenás.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span>
                        <strong>Tejido técnico premium:</strong> fresco, cómodo, duradero y resistente a lavados.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span>
                        <strong>Comodidad real:</strong> sin roces, sin distracciones.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Fit y modelo</h3>
                  <ul className="space-y-2">
                    <li>
                      <strong>Fit:</strong> compresión que realza y define la silueta.
                    </li>
                    <li>
                      <strong>Modelo:</strong> usa talle M — 178 cm — 71 kg.
                    </li>
                  </ul>
                </div>

                <div className="mt-8 bg-muted p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Dudas sobre el talle</h3>
                  <p>
                    Si no sabés qué talle elegir, podés escribirnos por WhatsApp o Instagram. Te ayudamos a elegir el
                    ideal.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sistema de reseñas */}
          <div className="max-w-4xl mx-auto">
            <ProductReviews productId={product.id} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
