import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">VG</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">Veterinaria Goicochea</span>
                <span className="text-sm text-green-600 font-medium">Cuidado profesional</span>
              </div>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Más de 20 años brindando atención veterinaria profesional y cariñosa. 
              Tu mascota es parte de nuestra familia.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-semibold">Emergencias 24h:</span> +1 (555) 123-4567</p>
              <p><span className="font-semibold">Email:</span> info@veterinariagoicochea.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/servicios" className="text-gray-600 hover:text-green-600 transition-colors">
                  Nuestros Servicios
                </Link>
              </li>
              <li>
                <Link href="/equipo" className="text-gray-600 hover:text-green-600 transition-colors">
                  Conoce al Equipo
                </Link>
              </li>
              <li>
                <Link href="/reservar" className="text-gray-600 hover:text-green-600 transition-colors">
                  Reservar Cita
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-600 hover:text-green-600 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Horarios</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">Lun - Vie:</span> 8:00 AM - 7:00 PM</p>
              <p><span className="font-medium">Sábado:</span> 8:00 AM - 5:00 PM</p>
              <p><span className="font-medium">Domingo:</span> 9:00 AM - 2:00 PM</p>
              <p className="text-green-600 font-medium mt-3">🚨 Emergencias 24/7</p>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-2">Ubicación</h4>
              <p className="text-sm text-gray-600">
                Av. Principal 123<br />
                Lima, Perú 15001
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2024 Veterinaria Goicochea. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacidad" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="text-sm text-gray-500 hover:text-green-600 transition-colors">
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}