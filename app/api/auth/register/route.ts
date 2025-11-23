import { type NextRequest, NextResponse } from "next/server"

// TODO: Reemplazar con base de datos real
// Esta estructura simula un almacenamiento temporal
const users: Array<{
  id: string
  username: string
  email: string
  password: string
}> = []

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json()

    // Validaciones
    if (!username || !email || !password) {
      return NextResponse.json({ message: "Todos los campos son requeridos" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "La contraseña debe tener al menos 6 caracteres" }, { status: 400 })
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: "Email inválido" }, { status: 400 })
    }

    // Verificar si el email ya existe
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ message: "El email ya está registrado" }, { status: 409 })
    }

    // Crear nuevo usuario
    // TODO: En producción, hashear la contraseña con bcrypt
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password, // TODO: Hashear contraseña
    }

    users.push(newUser)

    // Crear sesión
    const response = NextResponse.json(
      {
        message: "Usuario registrado exitosamente",
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
      },
      { status: 201 },
    )

    // TODO: En producción, usar JWT o cookies seguras
    response.cookies.set("session", newUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    })

    return response
  } catch (error) {
    console.error("Error en registro:", error)
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 })
  }
}
