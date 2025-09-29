import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Pet } from './Pet';
import { User } from './User';

@Entity('medical_records')
@Index(['petId'])
@Index(['veterinarianId'])
@Index(['type'])
export class MedicalRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ['consultation', 'surgery', 'vaccination', 'treatment', 'emergency', 'laboratory', 'imaging'],
  })
  type: 'consultation' | 'surgery' | 'vaccination' | 'treatment' | 'emergency' | 'laboratory' | 'imaging';

  @Column({ type: 'varchar', length: 500, nullable: true })
  diagnosis?: string;

  @Column({ type: 'text', nullable: true })
  treatment?: string;

  @Column({ type: 'json', nullable: true })
  medications?: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions?: string;
  }[];

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ type: 'json', nullable: true })
  vitals?: {
    temperature?: number;
    weight?: number;
    heartRate?: number;
    respiratoryRate?: number;
    bloodPressure?: string;
  };

  @Column({ type: 'json', nullable: true })
  files?: string[]; // URLs de archivos adjuntos

  @Column({ type: 'date', nullable: true })
  followUpDate?: Date;

  @Column({ type: 'boolean', default: false })
  isFollowUpRequired: boolean;

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Foreign Keys
  @Column({ type: 'uuid' })
  petId: string;

  @Column({ type: 'uuid' })
  veterinarianId: string;

  @Column({ type: 'uuid', nullable: true })
  appointmentId?: string;

  // Relationships
  @ManyToOne(() => Pet, (pet) => pet.medicalRecords)
  @JoinColumn({ name: 'petId' })
  pet: Pet;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'veterinarianId' })
  veterinarian: User;
}