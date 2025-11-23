"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"

interface Review {
  id: string
  userName: string
  userAvatar?: string
  rating: number
  date: string
  comment: string
  image?: string
}

// Reseñas de ejemplo (placeholders)
const mockReviews: Review[] = [
  {
    id: "mock-1",
    userName: "Carlos M.",
    rating: 5,
    date: "15 Feb 2025",
    comment: "Excelente calidad, el fit es perfecto y el material es muy cómodo. Ideal para entrenar.",
  },
  {
    id: "mock-2",
    userName: "Martín G.",
    rating: 5,
    date: "10 Feb 2025",
    comment: "La mejor remera de compresión que probé. Realmente marca la diferencia en el gym.",
  },
  {
    id: "mock-3",
    userName: "Lucas R.",
    rating: 4,
    date: "5 Feb 2025",
    comment: "Muy buena, solo que el talle me quedó un poco más grande de lo esperado.",
  },
]

export default function ProductReviews({ productId }: { productId: string }) {
  const { user, isAuthenticated } = useAuth()
  const [showAll, setShowAll] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Estado para reseñas reales
  const [realReviews, setRealReviews] = useState<Review[]>([])
  const [stats, setStats] = useState({ averageRating: 4.8, totalReviews: 32 })
  const [isLoading, setIsLoading] = useState(true)

  // Cargar reseñas al montar el componente
  useEffect(() => {
    loadReviews()
  }, [productId])

  const loadReviews = async () => {
    try {
      const response = await fetch(`/api/reviews/${productId}`)
      if (response.ok) {
        const data = await response.json()
        setRealReviews(data.reviews)

        // Si hay reseñas reales, usar sus stats
        if (data.reviews.length > 0) {
          setStats(data.stats)
        }
      }
    } catch (error) {
      console.error("Error cargando reseñas:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Decidir qué reseñas mostrar
  const hasRealReviews = realReviews.length > 0
  const reviewsToDisplay = hasRealReviews ? realReviews : mockReviews
  const displayedReviews = showAll ? reviewsToDisplay : reviewsToDisplay.slice(0, 3)

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      setError("Debes iniciar sesión para dejar una reseña")
      return
    }

    if (rating === 0) {
      setError("Por favor seleccioná una calificación")
      return
    }

    if (comment.trim().length < 10) {
      setError("El comentario debe tener al menos 10 caracteres")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch(`/api/reviews/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          comment,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message)
      }

      const data = await response.json()

      // Actualizar estado con la nueva reseña y stats
      setRealReviews([data.review, ...realReviews])
      setStats(data.stats)

      // Limpiar formulario
      setRating(0)
      setComment("")

      // Mostrar mensaje de éxito
      alert("¡Reseña publicada exitosamente!")
    } catch (err: any) {
      setError(err.message || "Error al publicar la reseña")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Stats de reseñas */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-5xl font-bold">{stats.averageRating}</div>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(stats.averageRating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="text-muted-foreground">
            <p className="text-lg">{stats.totalReviews} reseñas</p>
            {!hasRealReviews && <p className="text-xs mt-1">(Mostrando ejemplos)</p>}
          </div>
        </div>
      </div>

      {/* Formulario de nueva reseña */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Dejá tu reseña</h3>
        {!isAuthenticated ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Necesitás iniciar sesión para dejar una reseña</p>
            <p className="text-sm text-muted-foreground">Hacé click en "Ingresar / Registrarse" en la navbar</p>
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
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground mt-1">Mínimo 10 caracteres</p>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/50 text-destructive text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button onClick={handleSubmitReview} className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Publicando..." : "Publicar reseña"}
            </Button>
          </div>
        )}
      </div>

      {/* Lista de reseñas */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">
          Reseñas de clientes {!hasRealReviews && <span className="text-sm text-muted-foreground">(Ejemplos)</span>}
        </h3>

        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Cargando reseñas...</div>
        ) : (
          <>
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
            {reviewsToDisplay.length > 3 && !showAll && (
              <Button variant="outline" onClick={() => setShowAll(true)} className="w-full">
                Ver más reseñas
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
