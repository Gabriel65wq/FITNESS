import { type NextRequest, NextResponse } from "next/server"

// TODO: Importar desde una fuente compartida o base de datos
// Este es el mismo array simulado que en register
const users: Array<{
  id: string
  username: string
  email: string
  password: string
}> = []

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validaciones
    if (!email || !password) {
      return NextResponse.json({ message: "Email y contraseña son requeridos" }, { status: 400 })
    }

    // Buscar usuario
    const user = users.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json({ message: "Credenciales inválidas" }, { status: 401 })
    }

    // TODO: En producción, comparar con bcrypt
    if (user.password !== password) {
      return NextResponse.json({ message: "Credenciales inválidas" }, { status: 401 })
    }

    // Crear sesión
    const response = NextResponse.json({
      message: "Login exitoso",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    })

    // TODO: En producción, usar JWT o cookies seguras
    response.cookies.set("session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    })

    return response
  } catch (error) {
    console.error("Error en login:", error)
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 })
  }
}
