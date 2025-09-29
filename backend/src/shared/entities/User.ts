import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { Pet } from './Pet';
import { Appointment } from '../../services/reservations/entities/Appointment';
import { Payment } from '../../services/payments/entities/Payment';

@Entity('users')
@Index(['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Index()
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address?: string;

  @Column({
    type: 'enum',
    enum: ['client', 'admin', 'veterinarian'],
    default: 'client',
  })
  role: 'client' | 'admin' | 'veterinarian';

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  resetPasswordToken?: string;

  @Column({ type: 'timestamp', nullable: true })
  resetPasswordExpires?: Date;

  @Column({ type: 'timestamp', nullable: true })
  emailVerifiedAt?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  emailVerificationToken?: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @OneToMany(() => Pet, (pet) => pet.owner)
  pets: Pet[];

  @OneToMany(() => Appointment, (appointment) => appointment.owner)
  appointments: Appointment[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  // Methods
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2a$')) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }

  // Remove password from JSON serialization
  toJSON() {
    const { password, resetPasswordToken, emailVerificationToken, ...user } = this;
    return user;
  }

  // Check if user is admin
  isAdmin(): boolean {
    return this.role === 'admin';
  }

  // Check if user is veterinarian
  isVeterinarian(): boolean {
    return this.role === 'veterinarian';
  }

  // Check if user is client
  isClient(): boolean {
    return this.role === 'client';
  }

  // Get full name (in case we add first/last name later)
  getFullName(): string {
    return this.name;
  }

  // Format phone number
  getFormattedPhone(): string {
    // Simple phone formatting - can be enhanced
    const phone = this.phone.replace(/\D/g, '');
    if (phone.length === 9) {
      return `${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;
    }
    return this.phone;
  }

  // Check if email is verified
  isEmailVerified(): boolean {
    return !!this.emailVerifiedAt;
  }

  // Generate email verification token
  generateEmailVerificationToken(): string {
    const token = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
    this.emailVerificationToken = token;
    return token;
  }

  // Generate password reset token
  generatePasswordResetToken(): string {
    const token = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
    this.resetPasswordToken = token;
    this.resetPasswordExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    return token;
  }

  // Check if password reset token is valid
  isPasswordResetTokenValid(): boolean {
    return !!(
      this.resetPasswordToken &&
      this.resetPasswordExpires &&
      this.resetPasswordExpires > new Date()
    );
  }
}