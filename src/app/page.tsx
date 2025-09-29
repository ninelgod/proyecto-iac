import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  const services = [
    {
      title: "Consultas Generales",
      description: "Revisiones completas y diagnósticos profesionales para mantener la salud de tu mascota.",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e8d696cc-362f-4cdc-b0a1-a67be73e0de1.png"
    },
    {
      title: "Cirugías",
      description: "Procedimientos quirúrgicos con tecnología avanzada y cuidado post-operatorio especializado.",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/348f4418-28fe-48cb-ab88-2802f17cbea6.png"
    },
    {
      title: "Emergencias 24h",
      description: "Atención de emergencia las 24 horas para cuando tu mascota más lo necesita.",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7ab49db4-0483-485c-bbb9-232922b41382.png"
    },
    {
      title: "Vacunación",
      description: "Programas completos de vacunación para proteger a tu mascota de enfermedades.",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/798df4c3-995a-468d-8e9a-adbdf0a217eb.png"
    }
  ];

  const stats = [
    { number: "20+", label: "Años de Experiencia" },
    { number: "5000+", label: "Mascotas Atendidas" },
    { number: "24/7", label: "Emergencias" },
    { number: "98%", label: "Clientes Satisfechos" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-white py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Cuidado
                  <span className="text-green-600 block">Profesional</span>
                  para tu Mascota
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Más de 20 años brindando atención veterinaria de calidad con amor, 
                  dedicación y la más moderna tecnología médica.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/reservar">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                    Reservar Cita Ahora
                  </Button>
                </Link>
                <Link href="/servicios">
                  <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200">
                    Ver Servicios
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">24/7</div>
                  <div className="text-sm text-gray-500">Emergencias</div>
                </div>
                <div className="h-12 w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">+1-555-123-4567</div>
                  <div className="text-sm text-gray-500">Línea Directa</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/20d7e3e0-1268-4ff5-b8ee-d743b3cafc41.png"
                alt="Veterinario profesional con perro y gato en clínica moderna"
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xl">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Dr. Goicochea</div>
                    <div className="text-sm text-gray-500">20+ años de experiencia</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos atención integral para tu mascota con los más altos estándares 
              de calidad y cuidado profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/servicios">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 font-semibold rounded-lg">
                Ver Todos los Servicios
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cbdd35d0-3d1b-4f15-85ee-b45df3c3a2ea.png"
                alt="Familia feliz con mascotas saludables"
                className="rounded-2xl shadow-xl w-full object-cover"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  ¿Por qué elegir Veterinaria Goicochea?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Somos más que una clínica veterinaria, somos una familia que ama 
                  y cuida a las mascotas como si fueran nuestras.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Experiencia Comprobada",
                    description: "Más de 20 años cuidando mascotas con los más altos estándares profesionales."
                  },
                  {
                    title: "Tecnología Avanzada",
                    description: "Equipos médicos de última generación para diagnósticos precisos y tratamientos efectivos."
                  },
                  {
                    title: "Atención 24/7",
                    description: "Servicio de emergencias disponible las 24 horas para cuando más lo necesitas."
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="h-6 w-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              ¿Tu mascota necesita atención?
            </h2>
            <p className="text-xl text-green-100">
              No esperes más. Reserva una cita hoy y dale a tu mascota el cuidado que se merece.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/reservar">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg">
                  Reservar Cita Ahora
                </Button>
              </Link>
              <Link href="tel:+15551234567">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 text-lg font-semibold rounded-lg">
                  Llamar: +1-555-123-4567
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}