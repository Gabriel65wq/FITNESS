"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const categories = [
  {
    name: "REMERAS DE COMPRESIÓN",
    slug: "remeras-compresion",
    image: "/compression-shirt-gym-dark-fitness.jpg",
  },
  {
    name: "REMERAS OVERSIZE",
    slug: "remeras-oversize",
    image: "/oversize-tshirt-gym-aesthetic-dark.jpg",
  },
  {
    name: "TOPS & REMERAS",
    slug: "tops-remeras-mujer",
    image: "/womens-tops-fitness-dark-gym.jpg",
  },
  {
    name: "SHORTS & CALZAS",
    slug: "shorts-calzas-mujer",
    image: "/womens-shorts-leggings-dark-gym.jpg",
  },
  {
    name: "CONJUNTOS DE MUJER",
    slug: "conjuntos-mujer",
    image: "/womens-sets-fitness-dark-gym.jpg",
  },
  {
    name: "YOGA / PILATES",
    slug: "yoga-pilates",
    image: "/yoga-pilates-clothing-dark-studio.jpg",
  },
  {
    name: "TREN SUPERIOR",
    slug: "tren-superior",
    image: "/upper-body-hoodie-gym-dark.jpg",
  },
  {
    name: "TREN INFERIOR",
    slug: "tren-inferior",
    image: "/joggers-sweatpants-fitness-dark-gym.jpg",
  },
  {
    name: "ACCESORIOS",
    slug: "accesorios",
    image: "/gym-accessories-fitness-gear-dark.jpg",
  },
  {
    name: "PROTEÍNAS",
    slug: "proteinas",
    image: "/protein-powder-supplement-dark-gym.jpg",
  },
  {
    name: "CREATINAS",
    slug: "creatinas",
    image: "/creatine-supplement-powder-dark-fitness.jpg",
  },
  {
    name: "VITAMINAS",
    slug: "vitaminas",
    image: "/vitamins-supplements-pills-dark-fitness.jpg",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categorias/${category.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-bold text-lg mb-3 text-balance">{category.name}</h3>
                <Button
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all"
                >
                  IR A LA CATEGORÍA
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid
