import { type NextRequest, NextResponse } from "next/server"

// TODO: Importar desde una fuente compartida o base de datos
const users: Array<{
  id: string
  username: string
  email: string
  password: string
}> = []

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get("session")?.value

    if (!sessionId) {
      return NextResponse.json({ user: null })
    }

    // TODO: En producción, validar JWT o buscar en base de datos
    const user = users.find((u) => u.id === sessionId)

    if (!user) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Error verificando sesión:", error)
    return NextResponse.json({ user: null })
  }
}
