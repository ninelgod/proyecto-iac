import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './User';
import { Appointment } from '../../services/reservations/entities/Appointment';
import { MedicalRecord } from './MedicalRecord';

@Entity('pets')
@Index(['ownerId'])
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({
    type: 'enum',
    enum: ['perro', 'gato', 'conejo', 'hamster', 'ave', 'otro'],
  })
  species: 'perro' | 'gato' | 'conejo' | 'hamster' | 'ave' | 'otro';

  @Column({ type: 'varchar', length: 100, nullable: true })
  breed?: string;

  @Column({ type: 'varchar', length: 50 })
  age: string; // Ej: "2 años", "6 meses"

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight?: number; // Peso en kg

  @Column({
    type: 'enum',
    enum: ['macho', 'hembra'],
    nullable: true,
  })
  gender?: 'macho' | 'hembra';

  @Column({ type: 'text', nullable: true })
  description?: string; // Descripción física o características

  @Column({ type: 'json', nullable: true })
  characteristics?: {
    color?: string;
    size?: 'pequeño' | 'mediano' | 'grande' | 'gigante';
    temperament?: string;
    allergies?: string[];
    medications?: string[];
    specialNeeds?: string;
  };

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'date', nullable: true })
  birthDate?: Date;

  @Column({ type: 'date', nullable: true })
  adoptionDate?: Date;

  @Column({ type: 'boolean', default: false })
  isNeutered: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true })
  microchipId?: string;

  @Column({ type: 'text', nullable: true })
  emergencyNotes?: string; // Notas importantes para emergencias

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Foreign Keys
  @Column({ type: 'uuid' })
  ownerId: string;

  // Relationships
  @ManyToOne(() => User, (user) => user.pets)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @OneToMany(() => Appointment, (appointment) => appointment.pet)
  appointments: Appointment[];

  @OneToMany(() => MedicalRecord, (record) => record.pet)
  medicalRecords: MedicalRecord[];

  // Methods
  getDisplayName(): string {
    return `${this.name} (${this.species})`;
  }

  getAgeInMonths(): number | null {
    if (!this.birthDate) return null;
    
    const now = new Date();
    const birth = new Date(this.birthDate);
    const diffTime = Math.abs(now.getTime() - birth.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44)); // Promedio de días por mes
    
    return diffMonths;
  }

  getAgeString(): string {
    const ageInMonths = this.getAgeInMonths();
    if (!ageInMonths) return this.age;
    
    if (ageInMonths < 12) {
      return `${ageInMonths} ${ageInMonths === 1 ? 'mes' : 'meses'}`;
    } else {
      const years = Math.floor(ageInMonths / 12);
      const remainingMonths = ageInMonths % 12;
      
      if (remainingMonths === 0) {
        return `${years} ${years === 1 ? 'año' : 'años'}`;
      } else {
        return `${years} ${years === 1 ? 'año' : 'años'} y ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
      }
    }
  }

  isAdult(): boolean {
    const ageInMonths = this.getAgeInMonths();
    if (!ageInMonths) return true; // Asumir adulto si no hay fecha de nacimiento
    
    // Criterios generales por especie
    switch (this.species) {
      case 'perro':
        return ageInMonths >= 12; // 1 año
      case 'gato':
        return ageInMonths >= 12; // 1 año
      case 'conejo':
        return ageInMonths >= 6; // 6 meses
      case 'hamster':
        return ageInMonths >= 2; // 2 meses
      case 'ave':
        return ageInMonths >= 3; // 3 meses (varía mucho por especie)
      default:
        return ageInMonths >= 12;
    }
  }

  isSenior(): boolean {
    const ageInMonths = this.getAgeInMonths();
    if (!ageInMonths) return false;
    
    // Criterios generales por especie para mascotas senior
    switch (this.species) {
      case 'perro':
        // Varía por tamaño, pero promedio 7-8 años
        return ageInMonths >= 84; // 7 años
      case 'gato':
        return ageInMonths >= 84; // 7 años
      case 'conejo':
        return ageInMonths >= 60; // 5 años
      case 'hamster':
        return ageInMonths >= 18; // 1.5 años
      case 'ave':
        return ageInMonths >= 60; // 5 años (muy variable)
      default:
        return ageInMonths >= 84;
    }
  }

  needsSpecialCare(): boolean {
    return !! (this.isSenior() || 
           (this.characteristics?.specialNeeds ? true : false) ||
           (this.characteristics?.allergies && this.characteristics.allergies.length > 0) ||
           (this.characteristics?.medications && this.characteristics.medications.length > 0));
  }

  hasAllergies(): boolean {
    return this.characteristics?.allergies && this.characteristics.allergies.length > 0 || false;
  }

  isOnMedication(): boolean {
    return this.characteristics?.medications && this.characteristics.medications.length > 0 || false;
  }

  getWeightCategory(): string {
    if (!this.weight) return 'No especificado';
    
    switch (this.species) {
      case 'perro':
        if (this.weight < 10) return 'Pequeño';
        if (this.weight < 25) return 'Mediano';
        if (this.weight < 45) return 'Grande';
        return 'Gigante';
      case 'gato':
        if (this.weight < 3) return 'Pequeño';
        if (this.weight < 5) return 'Normal';
        return 'Grande';
      default:
        return 'Normal';
    }
  }

  // Validate pet data
  validate(): string[] {
    const errors: string[] = [];
    
    if (!this.name?.trim()) {
      errors.push('El nombre es requerido');
    }
    
    if (!this.species) {
      errors.push('La especie es requerida');
    }
    
    if (!this.age?.trim()) {
      errors.push('La edad es requerida');
    }
    
    if (this.weight && (this.weight <= 0 || this.weight > 200)) {
      errors.push('El peso debe ser un valor válido');
    }
    
    if (this.birthDate && this.birthDate > new Date()) {
      errors.push('La fecha de nacimiento no puede ser futura');
    }
    
    return errors;
  }

  // Summary for display
  getSummary(): string {
    const parts = [this.name];
    
    if (this.breed) {
      parts.push(`${this.breed}`);
    }
    
    parts.push(`${this.species}`);
    parts.push(`${this.getAgeString()}`);
    
    if (this.weight) {
      parts.push(`${this.weight}kg`);
    }
    
    return parts.join(' - ');
  }
}