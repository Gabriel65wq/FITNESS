export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">FITNESS</h3>
            <p className="text-sm text-muted-foreground">Tu tienda de fitness y estilo de vida saludable</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Inicio</li>
              <li>Productos</li>
              <li>Contacto</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Información</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Quiénes Somos</li>
              <li>Preguntas Frecuentes</li>
              <li>Términos y Condiciones</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@fursten.com</li>
              <li>Redes Sociales</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FITNESS. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
