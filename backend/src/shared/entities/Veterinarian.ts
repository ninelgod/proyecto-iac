import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './User';

@Entity('veterinarians')
@Index(['userId'], { unique: true })
@Index(['licenseNumber'], { unique: true })
export class Veterinarian {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  licenseNumber: string; // Número de colegiatura

  @Column({ type: 'json' })
  specialties: string[]; // Especialidades

  @Column({ type: 'int' })
  experience: number; // Años de experiencia

  @Column({ type: 'varchar', length: 255 })
  education: string; // Formación académica

  @Column({ type: 'text', nullable: true })
  biography?: string; // Biografía

  @Column({ type: 'json', nullable: true })
  workSchedule?: {
    dayOfWeek: number; // 0-6 (domingo-sábado)
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }[];

  @Column({ type: 'json', nullable: true })
  certifications?: {
    name: string;
    institution: string;
    year: number;
    expirationDate?: Date;
  }[];

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: true })
  acceptsEmergencies: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Foreign Keys
  @Column({ type: 'uuid' })
  userId: string;

  // Relationships
  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  // Methods
  getFullName(): string {
    return this.user?.name || '';
  }

  getYearsOfExperience(): string {
    return `${this.experience} ${this.experience === 1 ? 'año' : 'años'}`;
  }

  getSpecialtiesDisplay(): string {
    return this.specialties.join(', ');
  }

  isAvailableOnDay(dayOfWeek: number): boolean {
    if (!this.workSchedule) return false;
    
    const schedule = this.workSchedule.find(s => s.dayOfWeek === dayOfWeek);
    return schedule?.isAvailable || false;
  }

  getWorkingHours(dayOfWeek: number): string | null {
    if (!this.workSchedule) return null;
    
    const schedule = this.workSchedule.find(s => s.dayOfWeek === dayOfWeek);
    if (!schedule || !schedule.isAvailable) return null;
    
    return `${schedule.startTime} - ${schedule.endTime}`;
  }
}