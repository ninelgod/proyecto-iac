"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface FormData {
  // Cliente
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerAddress: string;
  
  // Mascota
  petName: string;
  petSpecies: string;
  petBreed: string;
  petAge: string;
  petWeight: string;
  petGender: string;
  
  // Cita
  serviceType: string;
  appointmentDate: Date | null;
  appointmentTime: string;
  isEmergency: boolean;
  symptoms: string;
  previousVisit: string;
  
  // Pago
  paymentMethod: string;
}

export default function ReservarPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    ownerAddress: "",
    petName: "",
    petSpecies: "",
    petBreed: "",
    petAge: "",
    petWeight: "",
    petGender: "",
    serviceType: "",
    appointmentDate: null,
    appointmentTime: "",
    isEmergency: false,
    symptoms: "",
    previousVisit: "",
    paymentMethod: ""
  });

  const services = [
    { value: "consulta-general", label: "Consulta General", price: 80 },
    { value: "consulta-especializada", label: "Consulta Especializada", price: 150 },
    { value: "vacunacion", label: "Vacunación", price: 120 },
    { value: "desparasitacion", label: "Desparasitación", price: 65 },
    { value: "cirugia-menor", label: "Cirugía Menor", price: 400 },
    { value: "esterilizacion", label: "Esterilización", price: 400 },
    { value: "emergencia", label: "Emergencia 24h", price: 200 },
    { value: "chequeo-geriatrico", label: "Chequeo Geriátrico", price: 180 }
  ];

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.ownerName && formData.ownerPhone && formData.ownerEmail);
      case 2:
        return !!(formData.petName && formData.petSpecies && formData.petAge);
      case 3:
        return !!(formData.serviceType && formData.appointmentDate && formData.appointmentTime);
      case 4:
        return !!formData.paymentMethod;
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    } else {
      toast.error("Por favor completa todos los campos requeridos");
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    setIsLoading(true);
    
    try {
      // Aquí se conectaría con el backend
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulación
      
      setCurrentStep(5);
      toast.success("¡Cita reservada exitosamente!");
    } catch (error) {
      toast.error("Error al procesar la reserva. Inténtalo nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedService = services.find(s => s.value === formData.serviceType);
  const consultationFee = selectedService?.price || 0;
  const taxes = consultationFee * 0.18;
  const total = consultationFee + taxes;

  useEffect(() => {
    if (formData.paymentMethod === "mercadopago") {
      const mp = new (window as any).MercadoPago("TEST-171cb13d-81e5-49af-ba64-d3f269a9fdc1", {
        locale: "es-PE",
      });

      const bricksBuilder = mp.bricks();

      fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: selectedService?.label,
          amount: Number(total),
          email: formData.ownerEmail,
          petName: formData.petName,
          ownerName: formData.ownerName,
          serviceType: formData.serviceType,
        }),
      })
        .then((res) => res.json())
        .then(async ({ id }) => {
          await bricksBuilder.create("wallet", "paymentBrick_container", {
            initialization: { preferenceId: id },
          });
        });
    }
  }, [formData.paymentMethod, total, formData.ownerEmail]);
  const steps = [
    { number: 1, title: "Datos del Propietario", description: "Información de contacto" },
    { number: 2, title: "Datos de la Mascota", description: "Información del paciente" },
    { number: 3, title: "Detalles de la Cita", description: "Servicio y horario" },
    { number: 4, title: "Método de Pago", description: "Confirmar pago" },
    { number: 5, title: "Confirmación", description: "Reserva completada" }
  ];

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Reservar Cita
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Programa una cita para tu mascota de manera fácil y rápida
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? "bg-green-600 border-green-600 text-white" 
                    : "border-gray-300 text-gray-500"
                }`}>
                  {currentStep > step.number ? "✓" : step.number}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.number ? "text-green-600" : "text-gray-500"
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 sm:w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? "bg-green-600" : "bg-gray-300"
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                {/* Step 1: Owner Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Datos del Propietario
                      </h2>
                      <p className="text-gray-600">
                        Proporciona tu información de contacto
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ownerName">Nombre Completo *</Label>
                        <Input
                          id="ownerName"
                          value={formData.ownerName}
                          onChange={(e) => handleInputChange("ownerName", e.target.value)}
                          placeholder="Tu nombre completo"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="ownerPhone">Teléfono *</Label>
                        <Input
                          id="ownerPhone"
                          value={formData.ownerPhone}
                          onChange={(e) => handleInputChange("ownerPhone", e.target.value)}
                          placeholder="+51 999 999 999"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="ownerEmail">Correo Electrónico *</Label>
                      <Input
                        id="ownerEmail"
                        type="email"
                        value={formData.ownerEmail}
                        onChange={(e) => handleInputChange("ownerEmail", e.target.value)}
                        placeholder="tu@email.com"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="ownerAddress">Dirección</Label>
                      <Input
                        id="ownerAddress"
                        value={formData.ownerAddress}
                        onChange={(e) => handleInputChange("ownerAddress", e.target.value)}
                        placeholder="Tu dirección completa"
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Pet Information */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Datos de la Mascota
                      </h2>
                      <p className="text-gray-600">
                        Información sobre tu mascota
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="petName">Nombre de la Mascota *</Label>
                        <Input
                          id="petName"
                          value={formData.petName}
                          onChange={(e) => handleInputChange("petName", e.target.value)}
                          placeholder="Nombre de tu mascota"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="petSpecies">Especie *</Label>
                        <Select value={formData.petSpecies} onValueChange={(value) => handleInputChange("petSpecies", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecciona especie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="perro">Perro</SelectItem>
                            <SelectItem value="gato">Gato</SelectItem>
                            <SelectItem value="conejo">Conejo</SelectItem>
                            <SelectItem value="hamster">Hámster</SelectItem>
                            <SelectItem value="ave">Ave</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="petBreed">Raza</Label>
                        <Input
                          id="petBreed"
                          value={formData.petBreed}
                          onChange={(e) => handleInputChange("petBreed", e.target.value)}
                          placeholder="Raza de la mascota"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="petAge">Edad *</Label>
                        <Input
                          id="petAge"
                          value={formData.petAge}
                          onChange={(e) => handleInputChange("petAge", e.target.value)}
                          placeholder="Ej: 2 años"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="petWeight">Peso (kg)</Label>
                        <Input
                          id="petWeight"
                          value={formData.petWeight}
                          onChange={(e) => handleInputChange("petWeight", e.target.value)}
                          placeholder="Ej: 15"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="petGender">Sexo</Label>
                      <Select value={formData.petGender} onValueChange={(value) => handleInputChange("petGender", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecciona sexo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="macho">Macho</SelectItem>
                          <SelectItem value="hembra">Hembra</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 3: Appointment Details */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Detalles de la Cita
                      </h2>
                      <p className="text-gray-600">
                        Selecciona el servicio, fecha y hora
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="serviceType">Tipo de Servicio *</Label>
                      <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecciona un servicio" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.value} value={service.value}>
                              <div className="flex justify-between items-center w-full">
                                <span>{service.label}</span>
                                <span className="text-green-600 font-semibold ml-4">S/. {service.price}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Fecha de la Cita *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full mt-1 justify-start text-left font-normal"
                            >
                              {formData.appointmentDate ? (
                                format(formData.appointmentDate, "PPP", { locale: es })
                              ) : (
                                <span>Selecciona una fecha</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.appointmentDate || undefined}
                              onSelect={(date) => handleInputChange("appointmentDate", date)}
                              disabled={(date) => date < new Date() || date.getDay() === 0}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div>
                        <Label htmlFor="appointmentTime">Hora *</Label>
                        <Select value={formData.appointmentTime} onValueChange={(value) => handleInputChange("appointmentTime", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecciona hora" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="symptoms">Síntomas o Motivo de Consulta</Label>
                      <Textarea
                        id="symptoms"
                        value={formData.symptoms}
                        onChange={(e) => handleInputChange("symptoms", e.target.value)}
                        placeholder="Describe los síntomas o el motivo de la consulta"
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="previousVisit">¿Ha visitado antes nuestra clínica?</Label>
                      <Select value={formData.previousVisit} onValueChange={(value) => handleInputChange("previousVisit", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecciona una opción" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="si">Sí, es cliente regular</SelectItem>
                          <SelectItem value="no">No, es la primera vez</SelectItem>
                          <SelectItem value="hace-tiempo">Hace mucho tiempo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 4: Payment */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Método de Pago
                      </h2>
                      <p className="text-gray-600">
                        Selecciona cómo deseas pagar tu consulta
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer" 
                           onClick={() => handleInputChange("paymentMethod", "mercadopago")}>
                        <div className="flex items-center space-x-3">
                          <input 
                            type="radio" 
                            name="payment" 
                            value="mercadopago"
                            checked={formData.paymentMethod === "mercadopago"}
                            onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                            className="text-green-600"
                          />

                          <div>
                            <div className="font-semibold">MercadoPago</div>
                            <div className="text-sm text-gray-500">Tarjetas de crédito, débito y transferencias</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer" 
                           onClick={() => handleInputChange("paymentMethod", "efectivo")}>
                        <div className="flex items-center space-x-3">
                          <input 
                            type="radio" 
                            name="payment" 
                            checked={formData.paymentMethod === "efectivo"}
                            className="text-green-600" 
                            readOnly
                          />
                          <div>
                            <div className="font-semibold">Efectivo en Clínica</div>
                            <div className="text-sm text-gray-500">Paga directamente en nuestra clínica</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer" 
                           onClick={() => handleInputChange("paymentMethod", "transferencia")}>
                        <div className="flex items-center space-x-3">
                          <input 
                            type="radio" 
                            name="payment" 
                            checked={formData.paymentMethod === "transferencia"}
                            className="text-green-600" 
                            readOnly
                          />
                          <div>
                            <div className="font-semibold">Transferencia Bancaria</div>
                            <div className="text-sm text-gray-500">Pago mediante transferencia directa</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {formData.paymentMethod === "mercadopago" && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">
                          Serás redirigido a MercadoPago para completar el pago de forma segura.
                        </p>
                      </div>
                    )}

                    {formData.paymentMethod === "mercadopago" && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div id="paymentBrick_container"></div>
                      </div>
                    )}

                  </div>
                )}

                {/* Step 5: Confirmation */}
                {currentStep === 5 && (
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-green-600 text-3xl">✓</span>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        ¡Cita Reservada Exitosamente!
                      </h2>
                      <p className="text-gray-600 text-lg">
                        Hemos enviado los detalles de tu cita a tu correo electrónico
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg text-left max-w-md mx-auto">
                      <h3 className="font-semibold mb-4">Resumen de tu cita:</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Mascota:</span>
                          <span>{formData.petName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Servicio:</span>
                          <span>{selectedService?.label}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fecha:</span>
                          <span>{formData.appointmentDate ? format(formData.appointmentDate, "PPP", { locale: es }) : ""}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hora:</span>
                          <span>{formData.appointmentTime}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>S/. {total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500">
                      Número de referencia: #VG{Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </p>
                  </div>
                )}

                {/* Navigation Buttons */}
                {currentStep < 5 && (
                  <div className="flex justify-between pt-8 border-t">
                    <Button 
                      variant="outline" 
                      onClick={handlePreviousStep}
                      disabled={currentStep === 1}
                      className="px-8"
                    >
                      Anterior
                    </Button>
                    
                    {currentStep < 4 ? (
                      <Button 
                        onClick={handleNextStep}
                        className="bg-green-600 hover:bg-green-700 px-8"
                      >
                        Siguiente
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="bg-green-600 hover:bg-green-700 px-8"
                      >
                        {isLoading ? "Procesando..." : "Confirmar Reserva"}
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 sticky top-6">
              <CardHeader>
                <CardTitle className="text-xl">Resumen de Reserva</CardTitle>
                <CardDescription>Detalles de tu cita</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.petName && (
                  <div>
                    <div className="text-sm text-gray-500">Mascota</div>
                    <div className="font-semibold">{formData.petName}</div>
                    {formData.petSpecies && (
                      <Badge variant="secondary" className="mt-1">
                        {formData.petSpecies}
                      </Badge>
                    )}
                  </div>
                )}
                
                {selectedService && (
                  <div>
                    <div className="text-sm text-gray-500">Servicio</div>
                    <div className="font-semibold">{selectedService.label}</div>
                    <div className="text-green-600 font-semibold">S/. {selectedService.price}</div>
                  </div>
                )}
                
                {formData.appointmentDate && (
                  <div>
                    <div className="text-sm text-gray-500">Fecha y Hora</div>
                    <div className="font-semibold">
                      {format(formData.appointmentDate, "PPP", { locale: es })}
                    </div>
                    {formData.appointmentTime && (
                      <div className="text-green-600">{formData.appointmentTime}</div>
                    )}
                  </div>
                )}
                
                {selectedService && (
                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Consulta:</span>
                      <span>S/. {consultationFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>IGV (18%):</span>
                      <span>S/. {taxes.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span className="text-green-600">S/. {total.toFixed(2)}</span>
                    </div>
                  </div>
                )}
                
                <div className="pt-4 border-t">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-sm text-green-800">
                      <div className="font-semibold">¿Necesitas ayuda?</div>
                      <div>Llama al: +1-555-123-4567</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}