import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ServiciosPage() {
  const services = [
    {
      category: "Consultas y Diagnóstico",
      services: [
        {
          name: "Consulta General",
          description: "Examen físico completo, diagnóstico y plan de tratamiento personalizado",
          price: "S/. 80",
          duration: "30-45 min",
          image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/93eed76b-6f8b-4ba9-b505-73ce4c6fd544.png"
        },
        {
          name: "Consulta Especializada",
          description: "Evaluación especializada en dermatología, cardiología u oftalmología",
          price: "S/. 150",
          duration: "45-60 min",
          image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2354f7bc-362c-4790-99fb-2ddc78b0f2b4.png"
        },
        {
          name: "Análisis Clínicos",
          description: "Hemograma, perfil bioquímico, análisis de orina y heces",
          price: "S/. 120",
          duration: "Resultados en 24h",
          image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/47cff28a-1349-4ba3-9b53-baac9ec7632a.png"
        }
      ]
    },
    {
      category: "Cirugías y Procedimientos",
      services: [
        {
          name: "Esterilización",
          description: "Procedimiento quirúrgico seguro con anestesia especializada",
          price: "S/. 350-450",
          duration: "2-3 horas",
          image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6c3f2692-74be-4eb2-8846-1c59b79890b2.png"
        },
        {
          name: "Cirugías Menores",
          description: "Extracción de tumores, reparación de heridas, limpiezas dentales",
          price: "S/. 200-800",
          duration: "1-3 horas",
          image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/775d1ca9-3217-4718-8119-5481404f0081.png"
        },
        {
          name: "Cirugías Mayores",
          description: "Procedimientos complejos con monitoreo intensivo post-operatorio",
          price: "Consultar",
          duration: "3-6 horas",
          image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e2982b62-1903-40f4-a717-6f4b14df0746.png"
        }
      ]
    },
    {
      category: "Prevención y Bienestar",
      services: [
        {
          name: "Vacunación Completa",
          description: "Esquema completo de vacunas según edad y especies",
          price: "S/. 120-180",
          duration: "15-20 min",
          image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2725004f-8cae-4ce5-a4c4-9016c9182941.png"
        },
        {
          name: "Desparasitación",
          description: "Tratamiento integral contra parásitos internos y externos",
          price: "S/. 45-80",
          duration: "10-15 min",
          image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2a6f1017-2366-4aca-960e-d07967b22228.png"
        },
        {
          name: "Chequeo Geriátrico",
          description: "Evaluación completa para mascotas mayores de 7 años",
          price: "S/. 180",
          duration: "60 min",
          image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8e5f75e5-270e-4cca-9ffd-8a8823b32637.png"
        }
      ]
    },
    {
      category: "Servicios de Emergencia",
      services: [
        {
          name: "Emergencia 24h",
          description: "Atención inmediata para situaciones críticas",
          price: "S/. 200 + tratamiento",
          duration: "Variable",
          image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4f2457ed-2354-45f4-82c6-83722fe7db83.png"
        },
        {
          name: "Hospitalización",
          description: "Cuidado intensivo con monitoreo continuo",
          price: "S/. 150/día",
          duration: "24h",
          image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b49a75a1-0b91-411a-ad31-b656a92d61f4.png"
        },
        {
          name: "Radiografías",
          description: "Diagnóstico por imágenes digital de alta resolución",
          price: "S/. 120-180",
          duration: "30 min",
          image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f8d1b0ba-98ef-40f4-aaed-63b07d2533e7.png"
        }
      ]
    }
  ];

  const features = [
    "Tecnología médica avanzada",
    "Profesionales certificados",
    "Atención personalizada",
    "Seguimiento post-tratamiento",
    "Planes de pago flexibles",
    "Emergencias 24/7"
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Nuestros Servicios
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Ofrecemos una amplia gama de servicios veterinarios con los más altos 
            estándares de calidad y atención personalizada para tu mascota.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Services by Category */}
        <div className="space-y-16">
          {services.map((category, categoryIndex) => (
            <section key={categoryIndex}>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-green-600 pl-4">
                {category.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, serviceIndex) => (
                  <Card key={serviceIndex} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-green-600 hover:bg-green-700 text-white">
                            {service.price}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                          {service.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600 leading-relaxed">
                          {service.description}
                        </CardDescription>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>⏱️ {service.duration}</span>
                        <Link href="/reservar">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            Reservar
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Emergency Banner */}
        <section className="mt-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">¿Es una emergencia?</h2>
          <p className="text-xl mb-6 opacity-90">
            Atendemos emergencias las 24 horas, los 365 días del año
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="tel:+15551234567">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 font-semibold">
                Llamar Emergencia: +1-555-123-4567
              </Button>
            </Link>
            <Link href="/reservar?tipo=emergencia">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 font-semibold">
                Reservar Emergencia
              </Button>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 bg-gray-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            ¿Tienes dudas sobre nuestros servicios?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Nuestro equipo de profesionales está listo para asesorarte y resolver 
            todas tus preguntas sobre el cuidado de tu mascota.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 font-semibold">
                Contactar Ahora
              </Button>
            </Link>
            <Link href="/reservar">
              <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 font-semibold">
                Agendar Consulta
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}