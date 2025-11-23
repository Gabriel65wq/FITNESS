"use client"

import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  rating: number
  reviewCount: number
  category: string
}

export default function ProductCard({ id, name, price, image, rating, reviewCount, category }: ProductCardProps) {
  return (
    <Link href={`/productos/${category}/${id}`} className="group">
      <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {rating.toFixed(1)} — {reviewCount} reseñas
            </span>
          </div>
          <p className="text-2xl font-bold">${price}</p>
        </div>
      </div>
    </Link>
  )
}
