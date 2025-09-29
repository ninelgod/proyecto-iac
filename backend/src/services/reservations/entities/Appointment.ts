import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Index,
  BeforeInsert,
} from 'typeorm';
import { User } from '../../../shared/entities/User';
import { Pet } from '../../../shared/entities/Pet';
import { Payment } from '../../payments/entities/Payment';

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

@Entity('appointments')
@Index(['ownerId'])
@Index(['petId'])
@Index(['appointmentDate'])
@Index(['status'])
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  appointmentNumber: string; // VG-20240101-001

  @Column({
    type: 'enum',
    enum: [
      'consulta-general',
      'consulta-especializada',
      'vacunacion',
      'desparasitacion',
      'cirugia-menor',
      'esterilizacion',
      'emergencia',
      'chequeo-geriatrico',
      'analisis-clinicos',
      'hospitalizacion',
      'radiografias'
    ],
  })
  serviceType: ServiceType;

  @Column({ type: 'date' })
  appointmentDate: Date;

  @Column({ type: 'time' })
  appointmentTime: string; // HH:MM format

  @Column({
    type: 'enum',
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'],
    default: 'pending',
  })
  status: AppointmentStatus;

  @Column({
    type: 'enum',
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal',
  })
  priority: AppointmentPriority;

  @Column({ type: 'text', nullable: true })
  symptoms?: string; // Síntomas o motivo de la consulta

  @Column({
    type: 'enum',
    enum: ['si', 'no', 'hace-tiempo'],
    nullable: true,
  })
  previousVisit?: 'si' | 'no' | 'hace-tiempo';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number; // Monto total incluyendo impuestos

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  baseAmount?: number; // Monto base sin impuestos

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  taxAmount?: number; // Monto de impuestos

  @Column({ type: 'text', nullable: true })
  notes?: string; // Notas adicionales

  @Column({ type: 'text', nullable: true })
  adminNotes?: string; // Notas del administrador

  @Column({ type: 'json', nullable: true })
  metadata?: {
    source?: string; // web, phone, walk-in
    referredBy?: string;
    specialRequests?: string;
    remindersSent?: Date[];
  };

  @Column({ type: 'timestamp', nullable: true })
  confirmedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  startedAt?: Date; // Cuando comenzó la cita

  @Column({ type: 'timestamp', nullable: true })
  completedAt?: Date; // Cuando terminó la cita

  @Column({ type: 'timestamp', nullable: true })
  cancelledAt?: Date;

  @Column({ type: 'varchar', length: 500, nullable: true })
  cancellationReason?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Foreign Keys
  @Column({ type: 'uuid' })
  ownerId: string;

  @Column({ type: 'uuid' })
  petId: string;

  @Column({ type: 'uuid', nullable: true })
  veterinarianId?: string;

  // Relationships
  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @ManyToOne(() => Pet, (pet) => pet.appointments)
  @JoinColumn({ name: 'petId' })
  pet: Pet;

  @OneToOne(() => Payment, (payment) => payment.appointment)
  payment: Payment;

  // Hooks
  @BeforeInsert()
  generateAppointmentNumber() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    this.appointmentNumber = `VG-${year}${month}${day}-${random}`;
  }

  // Methods
  getFullDateTime(): Date {
    const [hours, minutes] = this.appointmentTime.split(':').map(Number);
    const dateTime = new Date(this.appointmentDate);
    dateTime.setHours(hours, minutes, 0, 0);
    return dateTime;
  }

  isUpcoming(): boolean {
    return this.getFullDateTime() > new Date() && 
           ['pending', 'confirmed'].includes(this.status);
  }

  isPast(): boolean {
    return this.getFullDateTime() < new Date();
  }

  isToday(): boolean {
    const today = new Date();
    const appointmentDate = new Date(this.appointmentDate);
    
    return appointmentDate.toDateString() === today.toDateString();
  }

  canBeCancelled(): boolean {
    const now = new Date();
    const appointmentDateTime = this.getFullDateTime();
    const hoursUntilAppointment = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    return ['pending', 'confirmed'].includes(this.status) && 
           hoursUntilAppointment > 2; // Minimum 2 hours notice
  }

  canBeRescheduled(): boolean {
    return this.canBeCancelled();
  }

  isEmergency(): boolean {
    return this.serviceType === 'emergencia' || this.priority === 'urgent';
  }

  getStatusDisplay(): string {
    const statusMap = {
      pending: 'Pendiente',
      confirmed: 'Confirmada',
      'in-progress': 'En Progreso',
      completed: 'Completada',
      cancelled: 'Cancelada',
      'no-show': 'No se presentó'
    };
    
    return statusMap[this.status] || this.status;
  }

  getPriorityDisplay(): string {
    const priorityMap = {
      low: 'Baja',
      normal: 'Normal',
      high: 'Alta',
      urgent: 'Urgente'
    };
    
    return priorityMap[this.priority] || this.priority;
  }

  getServiceTypeDisplay(): string {
    const serviceMap = {
      'consulta-general': 'Consulta General',
      'consulta-especializada': 'Consulta Especializada',
      'vacunacion': 'Vacunación',
      'desparasitacion': 'Desparasitación',
      'cirugia-menor': 'Cirugía Menor',
      'esterilizacion': 'Esterilización',
      'emergencia': 'Emergencia',
      'chequeo-geriatrico': 'Chequeo Geriátrico',
      'analisis-clinicos': 'Análisis Clínicos',
      'hospitalizacion': 'Hospitalización',
      'radiografias': 'Radiografías'
    };
    
    return serviceMap[this.serviceType] || this.serviceType;
  }

  getDuration(): number {
    // Duración estimada en minutos por tipo de servicio
    const durationMap: Record<ServiceType, number> = {
      'consulta-general': 30,
      'consulta-especializada': 45,
      'vacunacion': 15,
      'desparasitacion': 15,
      'cirugia-menor': 90,
      'esterilizacion': 120,
      'emergencia': 60,
      'chequeo-geriatrico': 60,
      'analisis-clinicos': 30,
      'hospitalizacion': 0, // Variable
      'radiografias': 30
    };
    
    return durationMap[this.serviceType] || 30;
  }

  getEstimatedEndTime(): string {
    const [hours, minutes] = this.appointmentTime.split(':').map(Number);
    const endMinutes = minutes + this.getDuration();
    const endHours = hours + Math.floor(endMinutes / 60);
    const finalMinutes = endMinutes % 60;
    
    return `${String(endHours).padStart(2, '0')}:${String(finalMinutes).padStart(2, '0')}`;
  }

  // Validation
  validate(): string[] {
    const errors: string[] = [];
    
    if (!this.serviceType) {
      errors.push('El tipo de servicio es requerido');
    }
    
    if (!this.appointmentDate) {
      errors.push('La fecha de la cita es requerida');
    }
    
    if (!this.appointmentTime) {
      errors.push('La hora de la cita es requerida');
    }
    
    if (this.totalAmount <= 0) {
      errors.push('El monto total debe ser mayor a 0');
    }
    
    // Validar que la cita no sea en el pasado (excepto emergencias)
    if (this.appointmentDate && this.appointmentTime && this.serviceType !== 'emergencia') {
      const appointmentDateTime = this.getFullDateTime();
      if (appointmentDateTime < new Date()) {
        errors.push('La fecha y hora de la cita no puede ser en el pasado');
      }
    }
    
    // Validar horarios de trabajo
    if (this.appointmentTime) {
      const [hours] = this.appointmentTime.split(':').map(Number);
      if (hours < 8 || hours >= 19) {
        if (this.serviceType !== 'emergencia') {
          errors.push('La hora debe estar dentro del horario de atención (8:00 AM - 7:00 PM)');
        }
      }
    }
    
    return errors;
  }

  // Business logic
  confirm(): void {
    if (this.status !== 'pending') {
      throw new Error('Solo se pueden confirmar citas pendientes');
    }
    
    this.status = 'confirmed';
    this.confirmedAt = new Date();
  }

  start(): void {
    if (this.status !== 'confirmed') {
      throw new Error('Solo se pueden iniciar citas confirmadas');
    }
    
    this.status = 'in-progress';
    this.startedAt = new Date();
  }

  complete(): void {
    if (this.status !== 'in-progress') {
      throw new Error('Solo se pueden completar citas en progreso');
    }
    
    this.status = 'completed';
    this.completedAt = new Date();
  }

  cancel(reason?: string): void {
    if (!['pending', 'confirmed'].includes(this.status)) {
      throw new Error('Solo se pueden cancelar citas pendientes o confirmadas');
    }
    
    this.status = 'cancelled';
    this.cancelledAt = new Date();
    this.cancellationReason = reason;
  }

  markAsNoShow(): void {
    if (this.status !== 'confirmed') {
      throw new Error('Solo se pueden marcar como no-show las citas confirmadas');
    }
    
    this.status = 'no-show';
  }
}