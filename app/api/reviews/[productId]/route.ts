import { type NextRequest, NextResponse } from "next/server"

// TODO: Reemplazar con base de datos real
interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment: string
  image?: string
  date: string
}

const reviews: Review[] = []

// TODO: Importar users desde una fuente compartida
const users: Array<{
  id: string
  username: string
  email: string
  password: string
}> = []

// GET - Obtener reseñas de un producto
export async function GET(request: NextRequest, { params }: { params: { productId: string } }) {
  const productId = params.productId
  const productReviews = reviews.filter((r) => r.productId === productId)

  // Calcular promedio y total
  const totalReviews = productReviews.length
  const averageRating = totalReviews > 0 ? productReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews : 0

  return NextResponse.json({
    reviews: productReviews,
    stats: {
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews,
    },
  })
}

// POST - Crear una nueva reseña
export async function POST(request: NextRequest, { params }: { params: { productId: string } }) {
  try {
    const sessionId = request.cookies.get("session")?.value

    if (!sessionId) {
      return NextResponse.json({ message: "Debes iniciar sesión para dejar una reseña" }, { status: 401 })
    }

    // TODO: En producción, buscar usuario en base de datos
    const user = users.find((u) => u.id === sessionId)
    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 401 })
    }

    const { rating, comment, image } = await request.json()

    // Validaciones
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ message: "La calificación debe ser entre 1 y 5" }, { status: 400 })
    }

    if (!comment || comment.trim().length < 10) {
      return NextResponse.json({ message: "El comentario debe tener al menos 10 caracteres" }, { status: 400 })
    }

    // Crear nueva reseña
    const newReview: Review = {
      id: Date.now().toString(),
      productId: params.productId,
      userId: user.id,
      userName: user.username,
      rating,
      comment: comment.trim(),
      image,
      date: new Date().toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" }),
    }

    reviews.push(newReview)

    // Recalcular stats
    const productReviews = reviews.filter((r) => r.productId === params.productId)
    const totalReviews = productReviews.length
    const averageRating = productReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews

    return NextResponse.json(
      {
        message: "Reseña creada exitosamente",
        review: newReview,
        stats: {
          averageRating: Number(averageRating.toFixed(1)),
          totalReviews,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creando reseña:", error)
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 })
  }
}
