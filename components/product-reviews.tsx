"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Review {
  id: string
  userName: string
  userAvatar?: string
  rating: number
  date: string
  comment: string
  image?: string
}

const mockReviews: Review[] = [
  {
    id: "1",
    userName: "Carlos M.",
    rating: 5,
    date: "15 Feb 2025",
    comment: "Excelente calidad, el fit es perfecto y el material es muy cómodo. Ideal para entrenar.",
  },
  {
    id: "2",
    userName: "Martín G.",
    rating: 5,
    date: "10 Feb 2025",
    comment: "La mejor remera de compresión que probé. Realmente marca la diferencia en el gym.",
  },
  {
    id: "3",
    userName: "Lucas R.",
    rating: 4,
    date: "5 Feb 2025",
    comment: "Muy buena, solo que el talle me quedó un poco más grande de lo esperado.",
  },
]

export default function ProductReviews({ productId }: { productId: string }) {
  const [showAll, setShowAll] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isAuthenticated] = useState(false) // TODO: Conectar con sistema de autenticación

  const displayedReviews = showAll ? mockReviews : mockReviews.slice(0, 3)

  const handleSubmitReview = () => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para dejar una reseña")
      return
    }
    // TODO: Implementar submit de reseña
    console.log("[v0] Submitting review:", { rating, comment })
  }

  return (
    <div className="space-y-8">
      {/* Formulario de nueva reseña */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Dejá tu reseña</h3>
        {!isAuthenticated ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Necesitás iniciar sesión para dejar una reseña</p>
            <Button>Iniciar sesión</Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tu calificación</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tu comentario</label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Contanos tu experiencia con el producto..."
                rows={4}
              />
            </div>
            <Button onClick={handleSubmitReview} className="w-full">
              Publicar reseña
            </Button>
          </div>
        )}
      </div>

      {/* Lista de reseñas */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Reseñas de clientes</h3>
        {displayedReviews.map((review) => (
          <div key={review.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={review.userAvatar || "/placeholder.svg"} />
                <AvatarFallback>{review.userName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{review.userName}</h4>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
                {review.image && (
                  <div className="mt-4">
                    <img src={review.image || "/placeholder.svg"} alt="Review" className="rounded-lg max-w-xs" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {mockReviews.length > 3 && !showAll && (
          <Button variant="outline" onClick={() => setShowAll(true)} className="w-full">
            Ver más reseñas
          </Button>
        )}
      </div>
    </div>
  )
}
