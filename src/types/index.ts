// ================================
// VETERINARIA GOICOCHEA - TYPES
// ================================

// User & Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  role: 'client' | 'admin' | 'veterinarian';
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
}

// Pet Types
export interface Pet {
  id: string;
  name: string;
  species: 'perro' | 'gato' | 'conejo' | 'hamster' | 'ave' | 'otro';
  breed?: string;
  age: string;
  weight?: number;
  gender?: 'macho' | 'hembra';
  ownerId: string;
  medicalHistory?: MedicalRecord[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicalRecord {
  id: string;
  petId: string;
  veterinarianId: string;
  appointmentId?: string;
  type: 'consultation' | 'surgery' | 'vaccination' | 'treatment' | 'emergency';
  diagnosis?: string;
  treatment?: string;
  medications?: Medication[];
  notes?: string;
  files?: string[];
  createdAt: Date;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

// Appointment Types
export interface Appointment {
  id: string;
  ownerId: string;
  petId: string;
  veterinarianId?: string;
  serviceType: ServiceType;
  appointmentDate: Date;
  appointmentTime: string;
  status: AppointmentStatus;
  priority: AppointmentPriority;
  symptoms?: string;
  previousVisit: 'si' | 'no' | 'hace-tiempo';
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  totalAmount: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ServiceType = 
  | 'consulta-general'
  | 'consulta-especializada' 
  | 'vacunacion'
  | 'desparasitacion'
  | 'cirugia-menor'
  | 'esterilizacion'
  | 'emergencia'
  | 'chequeo-geriatrico'
  | 'analisis-clinicos'
  | 'hospitalizacion'
  | 'radiografias';

export type AppointmentStatus = 
  | 'pending'     // Pendiente de confirmación
  | 'confirmed'   // Confirmada
  | 'in-progress' // En progreso
  | 'completed'   // Completada
  | 'cancelled'   // Cancelada
  | 'no-show';    // No se presentó

export type AppointmentPriority = 
  | 'low'         // Baja prioridad
  | 'normal'      // Prioridad normal
  | 'high'        // Alta prioridad
  | 'urgent';     // Urgente/Emergencia

// Service Types
export interface VeterinaryService {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  price: number;
  duration: number; // en minutos
  requiresAppointment: boolean;
  isEmergencyService: boolean;
  isActive: boolean;
}

export type ServiceCategory = 
  | 'consultation'    // Consultas y Diagnóstico
  | 'surgery'        // Cirugías y Procedimientos
  | 'prevention'     // Prevención y Bienestar
  | 'emergency'      // Servicios de Emergencia
  | 'laboratory'     // Análisis y Laboratorio
  | 'imaging';       // Diagnóstico por Imágenes

// Payment Types
export interface Payment {
  id: string;
  appointmentId: string;
  userId: string;
  amount: number;
  currency: 'PEN' | 'USD';
  method: PaymentMethod;
  status: PaymentStatus;
  mercadoPagoId?: string;
  mercadoPagoStatus?: string;
  transactionId?: string;
  paymentDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type PaymentMethod = 
  | 'mercadopago'
  | 'efectivo'
  | 'transferencia'
  | 'tarjeta';

export type PaymentStatus = 
  | 'pending'        // Pendiente
  | 'processing'     // Procesando
  | 'approved'       // Aprobado
  | 'rejected'       // Rechazado
  | 'cancelled'      // Cancelado
  | 'refunded';      // Reembolsado

// MercadoPago Types
export interface MercadoPagoPreference {
  title: string;
  quantity: number;
  unit_price: number;
  currency_id: 'PEN' | 'USD';
  description?: string;
}

export interface MercadoPagoWebhook {
  action: string;
  api_version: string;
  data: {
    id: string;
  };
  date_created: string;
  id: number;
  live_mode: boolean;
  type: string;
  user_id: string;
}

// Veterinarian Types
export interface Veterinarian {
  id: string;
  userId: string;
  licenseNumber: string;
  specialties: string[];
  experience: number; // años
  education: string;
  isActive: boolean;
  workSchedule?: WorkSchedule[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkSchedule {
  dayOfWeek: number; // 0-6 (domingo-sábado)
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Form Types
export interface AppointmentFormData {
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

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  contactReason: string;
}

// Dashboard & Admin Types
export interface DashboardStats {
  totalAppointments: number;
  todayAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalPets: number;
  totalClients: number;
}

export interface AdminUser extends User {
  permissions: Permission[];
  lastLogin?: Date;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  data?: Record<string, any>;
  createdAt: Date;
}

export type NotificationType = 
  | 'appointment_reminder'
  | 'appointment_confirmed'
  | 'payment_approved'
  | 'payment_rejected'
  | 'emergency_alert'
  | 'system_notification';

// Error Types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: ValidationError[];
  timestamp: Date;
}

// Environment & Config Types
export interface AppConfig {
  apiUrl: string;
  mercadoPagoPublicKey: string;
  environment: 'development' | 'production' | 'staging';
  version: string;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Export all types
export type {
  // Re-export common types for convenience
  User as VetUser,
  Pet as VetPet,
  Appointment as VetAppointment,
  Payment as VetPayment,
  Veterinarian as VetDoctor
};