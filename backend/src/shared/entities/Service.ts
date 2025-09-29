import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export type ServiceCategory = 
  | 'consultation'    // Consultas y Diagnóstico
  | 'surgery'        // Cirugías y Procedimientos
  | 'prevention'     // Prevención y Bienestar
  | 'emergency'      // Servicios de Emergencia
  | 'laboratory'     // Análisis y Laboratorio
  | 'imaging';       // Diagnóstico por Imágenes

@Entity('services')
@Index(['category'])
@Index(['isActive'])
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  code: string; // Código único del servicio

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: ['consultation', 'surgery', 'prevention', 'emergency', 'laboratory', 'imaging'],
  })
  category: ServiceCategory;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  duration: number; // Duración en minutos

  @Column({ type: 'boolean', default: true })
  requiresAppointment: boolean;

  @Column({ type: 'boolean', default: false })
  isEmergencyService: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'text', nullable: true })
  preparationInstructions?: string;

  @Column({ type: 'json', nullable: true })
  metadata?: {
    tags?: string[];
    specialRequirements?: string[];
    contraindications?: string[];
    followUpRequired?: boolean;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Methods
  getFormattedPrice(): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
    }).format(this.price);
  }

  getDurationDisplay(): string {
    if (this.duration < 60) {
      return `${this.duration} min`;
    }
    
    const hours = Math.floor(this.duration / 60);
    const minutes = this.duration % 60;
    
    if (minutes === 0) {
      return `${hours} h`;
    }
    
    return `${hours}h ${minutes}min`;
  }

  getCategoryDisplay(): string {
    const categoryMap = {
      consultation: 'Consultas y Diagnóstico',
      surgery: 'Cirugías y Procedimientos',
      prevention: 'Prevención y Bienestar',
      emergency: 'Servicios de Emergencia',
      laboratory: 'Análisis y Laboratorio',
      imaging: 'Diagnóstico por Imágenes'
    };
    
    return categoryMap[this.category] || this.category;
  }
}