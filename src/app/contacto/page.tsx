"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    contactReason: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      title: "Teléfono Principal",
      value: "+51 (01) 234-5678",
      description: "Lunes a Viernes: 8:00 AM - 7:00 PM",
      icon: "📞"
    },
    {
      title: "Emergencias 24h",
      value: "+51 999 888 777",
      description: "Atención de emergencias las 24 horas",
      icon: "🚨"
    },
    {
      title: "Email",
      value: "info@veterinariagoicochea.com",
      description: "Respuesta en menos de 24 horas",
      icon: "✉️"
    },
    {
      title: "WhatsApp",
      value: "+51 999 123 456",
      description: "Consultas rápidas y coordinación",
      icon: "💬"
    }
  ];

  const schedules = [
    { day: "Lunes - Viernes", hours: "8:00 AM - 7:00 PM", status: "Abierto" },
    { day: "Sábados", hours: "8:00 AM - 5:00 PM", status: "Abierto" },
    { day: "Domingos", hours: "9:00 AM - 2:00 PM", status: "Abierto" },
    { day: "Emergencias", hours: "24 horas", status: "Disponible" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Aquí se conectaría con el backend
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulación
      
      toast.success("Mensaje enviado correctamente. Te contactaremos pronto.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        contactReason: ""
      });
    } catch (error) {
      toast.error("Error al enviar el mensaje. Inténtalo nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Contáctanos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos aquí para ayudarte. Ponte en contacto con nosotros para cualquier 
            consulta, emergencia o para programar una cita.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Envíanos un Mensaje</CardTitle>
                <p className="text-gray-600">
                  Completa el formulario y nos pondremos en contacto contigo lo antes posible.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nombre Completo *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Tu nombre completo"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="tu@email.com"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+51 999 999 999"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactReason">Motivo de Contacto</Label>
                      <Select value={formData.contactReason} onValueChange={(value) => handleInputChange("contactReason", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecciona un motivo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consulta">Consulta General</SelectItem>
                          <SelectItem value="emergencia">Emergencia</SelectItem>
                          <SelectItem value="cita">Agendar Cita</SelectItem>
                          <SelectItem value="presupuesto">Solicitar Presupuesto</SelectItem>
                          <SelectItem value="reclamo">Reclamo o Sugerencia</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Asunto</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Breve descripción del asunto"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Mensaje *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Describe tu consulta o mensaje..."
                      className="mt-1"
                      rows={6}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Methods */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-2xl">{info.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{info.title}</h3>
                      <p className="text-green-600 font-semibold">{info.value}</p>
                      <p className="text-sm text-gray-500">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Horarios de Atención</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {schedules.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <div>
                      <div className="font-medium text-gray-900">{schedule.day}</div>
                      <div className="text-sm text-gray-600">{schedule.hours}</div>
                    </div>
                    <Badge 
                      variant={schedule.status === "Disponible" ? "default" : "secondary"}
                      className={schedule.status === "Disponible" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}
                    >
                      {schedule.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/reservar">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Reservar Cita Online
                  </Button>
                </Link>
                <a href="tel:+51999888777">
                  <Button variant="outline" className="w-full border-red-500 text-red-600 hover:bg-red-50">
                    🚨 Emergencia: +51 999 888 777
                  </Button>
                </a>
                <a href="https://wa.me/51999123456" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
                    💬 WhatsApp: +51 999 123 456
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Location & Map */}
        <section className="mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nuestra Ubicación
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-green-600 text-xl">📍</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Dirección</h3>
                    <p className="text-gray-600">
                      Av. José Larco 1234<br />
                      Miraflores, Lima 15074<br />
                      Perú
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-green-600 text-xl">🚗</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Cómo llegar</h3>
                    <p className="text-gray-600">
                      Estamos ubicados en pleno corazón de Miraflores, cerca del parque Kennedy. 
                      Contamos with estacionamiento gratuito para nuestros clientes.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-green-600 text-xl">🚌</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Transporte Público</h3>
                    <p className="text-gray-600">
                      Accesible por Metropolitano (Estación Central) y diversas líneas de 
                      transporte público. A 2 cuadras del Ovalo Gutiérrez.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5bb26797-bd0b-4a13-bb9b-195d38120e6e.png"
                alt="Ubicación de Veterinaria Goicochea en Miraflores"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Emergency Banner */}
        <section className="mt-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">¿Es una emergencia?</h2>
          <p className="text-xl mb-6 opacity-90">
            No esperes. Contáctanos inmediatamente para recibir atención de emergencia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+51999888777">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 font-semibold">
                Llamar Ahora: +51 999 888 777
              </Button>
            </a>
            <Link href="/reservar?tipo=emergencia">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 font-semibold">
                Emergencia Online
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}