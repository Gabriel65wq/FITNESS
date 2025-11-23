import { Truck, CreditCard, RefreshCw } from "lucide-react"

export function BenefitsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-12">
          {/* Envíos a todo el país */}
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 flex items-center justify-center">
              <Truck className="w-12 h-12 stroke-[1]" />
            </div>
            <h3 className="font-bold text-lg tracking-wide">ENVÍOS A TODO EL PAÍS</h3>
          </div>

          {/* Cuotas sin interés */}
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 flex items-center justify-center">
              <CreditCard className="w-12 h-12 stroke-[1]" />
            </div>
            <h3 className="font-bold text-lg tracking-wide">CUOTAS SIN INTERÉS</h3>
          </div>

          {/* Cambios y devoluciones */}
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 flex items-center justify-center">
              <RefreshCw className="w-12 h-12 stroke-[1]" />
            </div>
            <h3 className="font-bold text-lg tracking-wide">CAMBIOS Y DEVOLUCIONES</h3>
          </div>
        </div>
      </div>
    </section>
  )
}
