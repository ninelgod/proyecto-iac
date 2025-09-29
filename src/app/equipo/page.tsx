import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function EquipoPage() {
  const team = [
    {
      name: "Dr. Carlos Goicochea",
      role: "Director Médico",
      specialties: ["Cirugía General", "Medicina Interna", "Emergencias"],
      experience: "25 años",
      education: "Universidad Nacional Mayor de San Marcos",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/720058d3-865d-4fed-8a20-7e077f1fb03f.png"
    },
    {
      name: "Dra. María Elena Vásquez",
      role: "Veterinaria Senior",
      specialties: ["Dermatología", "Oncología", "Geriatría"],
      experience: "18 años",
      education: "Universidad Cayetano Heredia",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7a80bf04-de2c-49e6-a9cd-f6029ba0eebc.png"
    },
    {
      name: "Dr. Luis Rodriguez",
      role: "Cirujano Especialista",
      specialties: ["Cirugía Ortopédica", "Traumatología", "Neurocirugía"],
      experience: "15 años",
      education: "Universidad Nacional de Trujillo",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3a981eb0-0114-44f2-854e-22f8c899e16a.png"
    },
    {
      name: "Dra. Ana Sofía Morales",
      role: "Veterinaria de Pequeños Animales",
      specialties: ["Pediatría Veterinaria", "Vacunación", "Medicina Preventiva"],
      experience: "12 años",
      education: "Universidad Ricardo Palma",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5a5ff7f1-b0ac-41f2-944b-a5f72f35fe68.png"
    },
    {
      name: "Dr. Miguel Ángel Torres",
      role: "Especialista en Emergencias",
      specialties: ["Cuidados Intensivos", "Emergencias 24h", "Anestesiología"],
      experience: "10 años",
      education: "Universidad Científica del Sur",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/97075501-b28c-4ff8-ac6b-3ac89336809e.png"
    },
    {
      name: "Dra. Carmen Rosa Silva",
      role: "Especialista en Comportamiento",
      specialties: ["Etología", "Comportamiento Animal", "Terapia Conductual"],
      experience: "8 años",
      education: "Universidad Alas Peruanas",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/08b602f6-b117-4487-b2c8-d89175857315.png"
    }
  ];

  const support = [
    {
      name: "Técnico Luis Mendoza",
      role: "Técnico Veterinario Senior",
      specialties: ["Laboratorio", "Radiología", "Anestesia"],
      experience: "12 años"
    },
    {
      name: "Técnico Rosa Delgado",
      role: "Técnica en Cirugía",
      specialties: ["Instrumentación", "Cuidados Post-operatorios"],
      experience: "8 años"
    },
    {
      name: "Andrea Castillo",
      role: "Recepcionista y Atención al Cliente",
      specialties: ["Atención al Cliente", "Administración"],
      experience: "5 años"
    }
  ];

  const achievements = [
    "Clínica certificada por el Colegio Médico Veterinario del Perú",
    "Más de 5,000 cirugías exitosas realizadas",
    "Reconocimiento a la Excelencia Veterinaria 2023",
    "Único centro con tecnología de diagnóstico por imágenes en la zona",
    "Programa de educación continua con universidades internacionales",
    "Certificación en Bienestar Animal"
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Nuestro Equipo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Profesionales altamente capacitados y comprometidos con el bienestar 
            de tu mascota. Conoce a los especialistas que cuidarán de tu mejor amigo.
          </p>
        </div>

        {/* Main Team */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Equipo Médico Veterinario
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-600 hover:bg-green-700 text-white">
                      {member.experience}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-green-600 font-semibold">
                      {member.role}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Especialidades:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Formación:</span> {member.education}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Support Team */}
        <section className="mb-20 bg-gray-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Equipo de Apoyo
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Nuestro equipo técnico y administrativo trabaja en conjunto para brindar 
            una atención integral y de calidad.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {support.map((member, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-2xl font-bold">
                      {member.name.split(' ')[0][0]}{member.name.split(' ')[1] ? member.name.split(' ')[1][0] : ''}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-green-600 font-semibold text-sm">
                      {member.role}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    {member.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs mr-1">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">{member.experience}</span> de experiencia
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Achievements & Certifications */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Reconocimientos y Certificaciones
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 text-lg">🏆</span>
                </div>
                <div>
                  <p className="text-gray-800 font-medium leading-relaxed">
                    {achievement}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Philosophy */}
        <section className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Nuestra Filosofía
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed">
              En Veterinaria Goicochea creemos que cada mascota merece recibir atención 
              médica de la más alta calidad, combinada con el amor y cuidado que se brinda 
              a un miembro de la familia.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Nuestro equipo se mantiene constantemente actualizado con las últimas técnicas 
              y avances en medicina veterinaria, participando regularmente en congresos, 
              seminarios y programas de educación continua.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">25+</div>
                <div className="text-gray-600">Años de Experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">6</div>
                <div className="text-gray-600">Veterinarios Especialistas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">5000+</div>
                <div className="text-gray-600">Mascotas Atendidas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-gray-600">Satisfacción</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            ¿Quieres conocer más sobre nuestro equipo?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ven a visitarnos y conoce personalmente a los profesionales que cuidarán de tu mascota.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contacto"
              className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
            >
              Visítanos
            </a>
            <a 
              href="/reservar"
              className="inline-flex items-center px-8 py-3 border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold rounded-lg transition-all duration-200"
            >
              Reservar Cita
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}