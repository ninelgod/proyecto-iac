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
import { Appointment } from '../../reservations/entities/Appointment';

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

@Entity('payments')
@Index(['userId'])
@Index(['appointmentId'])
@Index(['status'])
@Index(['mercadoPagoId'])
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  paymentNumber: string; // PAY-20240101-001

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 3, default: 'PEN' })
  currency: string; // PEN, USD

  @Column({
    type: 'enum',
    enum: ['mercadopago', 'efectivo', 'transferencia', 'tarjeta'],
  })
  method: PaymentMethod;

  @Column({
    type: 'enum',
    enum: ['pending', 'processing', 'approved', 'rejected', 'cancelled', 'refunded'],
    default: 'pending',
  })
  status: PaymentStatus;

  // MercadoPago specific fields
  @Column({ type: 'varchar', length: 255, nullable: true })
  @Index()
  mercadoPagoId?: string; // ID del pago en MercadoPago

  @Column({ type: 'varchar', length: 50, nullable: true })
  mercadoPagoStatus?: string; // Estado en MercadoPago

  @Column({ type: 'varchar', length: 255, nullable: true })
  mercadoPagoPaymentType?: string; // Tipo de pago en MercadoPago

  @Column({ type: 'varchar', length: 255, nullable: true })
  mercadoPagoPaymentMethodId?: string; // ID del método de pago

  @Column({ type: 'varchar', length: 500, nullable: true })
  mercadoPagoDescription?: string; // Descripción del pago

  @Column({ type: 'json', nullable: true })
  mercadoPagoResponse?: any; // Respuesta completa de MercadoPago

  // Transaction details
  @Column({ type: 'varchar', length: 255, nullable: true })
  transactionId?: string; // ID de transacción del método de pago

  @Column({ type: 'varchar', length: 500, nullable: true })
  paymentReference?: string; // Referencia del pago (útil para transferencias)

  @Column({ type: 'decimal', precision: 5, scale: 4, nullable: true })
  exchangeRate?: number; // Tipo de cambio si aplica

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  fees?: number; // Comisiones aplicadas

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  taxes?: number; // Impuestos

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  netAmount?: number; // Monto neto recibido

  // Payment metadata
  @Column({ type: 'json', nullable: true })
  metadata?: {
    ipAddress?: string;
    userAgent?: string;
    source?: string;
    attempts?: number;
    lastAttemptAt?: Date;
    refundAmount?: number;
    isPartialRefund?: boolean;
  };


  @Column({ type: 'text', nullable: true })
  notes?: string; // Notas del pago

  @Column({ type: 'text', nullable: true })
  rejectionReason?: string; // Razón del rechazo

  @Column({ type: 'text', nullable: true })
  refundReason?: string; // Razón del reembolso

  // Important dates
  @Column({ type: 'timestamp', nullable: true })
  paymentDate?: Date; // Fecha real del pago

  @Column({ type: 'timestamp', nullable: true })
  approvedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  rejectedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  refundedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt?: Date; // Fecha de expiración del pago

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Foreign Keys
  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  appointmentId: string;

  // Relationships
  @ManyToOne(() => User, (user) => user.payments)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToOne(() => Appointment, (appointment) => appointment.payment)
  @JoinColumn({ name: 'appointmentId' })
  appointment: Appointment;

  // Hooks
  @BeforeInsert()
  generatePaymentNumber() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    this.paymentNumber = `PAY-${year}${month}${day}-${random}`;
  }

  // Methods
  isCompleted(): boolean {
    return this.status === 'approved';
  }

  isFailed(): boolean {
    return ['rejected', 'cancelled'].includes(this.status);
  }

  isPending(): boolean {
    return ['pending', 'processing'].includes(this.status);
  }

  canBeRefunded(): boolean {
    if (!this.paymentDate) return false; // si no hay fecha, no puede reembolsarse
    return this.status === 'approved' &&
          this.method !== 'efectivo' &&
          (Date.now() - this.paymentDate.getTime()) < (30 * 24 * 60 * 60 * 1000); // 30 días
  }


  canBeCancelled(): boolean {
    return ['pending', 'processing'].includes(this.status);
  }

  isExpired(): boolean {
    return this.expiresAt && this.expiresAt < new Date() || false;
  }

  getStatusDisplay(): string {
    const statusMap = {
      pending: 'Pendiente',
      processing: 'Procesando',
      approved: 'Aprobado',
      rejected: 'Rechazado',
      cancelled: 'Cancelado',
      refunded: 'Reembolsado'
    };
    
    return statusMap[this.status] || this.status;
  }

  getMethodDisplay(): string {
    const methodMap = {
      mercadopago: 'MercadoPago',
      efectivo: 'Efectivo',
      transferencia: 'Transferencia Bancaria',
      tarjeta: 'Tarjeta de Crédito/Débito'
    };
    
    return methodMap[this.method] || this.method;
  }

  getFormattedAmount(): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: this.currency,
    }).format(this.amount);
  }

  getNetAmountFormatted(): string {
    const amount = this.netAmount || this.amount;
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: this.currency,
    }).format(amount);
  }

  getFeesFormatted(): string {
    if (!this.fees) return 'S/. 0.00';
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: this.currency,
    }).format(this.fees);
  }

  // Calculate fees and taxes
  calculateFees(): number {
    if (this.method === 'mercadopago') {
      // MercadoPago fees (approximately 3.99% + fixed fee)
      return this.amount * 0.0399 + 0.59;
    }
    if (this.method === 'tarjeta') {
      // Card processing fees
      return this.amount * 0.025; // 2.5%
    }
    return 0;
  }

  calculateTaxes(): number {
    // IGV 18%
    return this.amount * 0.18;
  }

  calculateNetAmount(): number {
    const fees = this.fees || this.calculateFees();
    return this.amount - fees;
  }

  // Business logic methods
  approve(transactionId?: string, mercadoPagoResponse?: any): void {
    if (this.status !== 'processing' && this.status !== 'pending') {
      throw new Error('Solo se pueden aprobar pagos pendientes o en procesamiento');
    }

    this.status = 'approved';
    this.approvedAt = new Date();
    this.paymentDate = new Date();
    
    if (transactionId) {
      this.transactionId = transactionId;
    }
    
    if (mercadoPagoResponse) {
      this.mercadoPagoResponse = mercadoPagoResponse;
      this.mercadoPagoStatus = mercadoPagoResponse.status;
      this.mercadoPagoPaymentType = mercadoPagoResponse.payment_type_id;
      this.mercadoPagoPaymentMethodId = mercadoPagoResponse.payment_method_id;
    }

    // Calculate actual fees and net amount
    this.fees = this.calculateFees();
    this.netAmount = this.calculateNetAmount();
  }

  reject(reason?: string, mercadoPagoResponse?: any): void {
    if (!['pending', 'processing'].includes(this.status)) {
      throw new Error('Solo se pueden rechazar pagos pendientes o en procesamiento');
    }

    this.status = 'rejected';
    this.rejectedAt = new Date();
    this.rejectionReason = reason;
    
    if (mercadoPagoResponse) {
      this.mercadoPagoResponse = mercadoPagoResponse;
      this.mercadoPagoStatus = mercadoPagoResponse.status;
    }
  }

  cancel(reason?: string): void {
    if (!this.canBeCancelled()) {
      throw new Error('Este pago no puede ser cancelado');
    }

    this.status = 'cancelled';
    this.rejectionReason = reason;
  }

  refund(reason?: string, refundAmount?: number): void {
    if (!this.canBeRefunded()) {
      throw new Error('Este pago no puede ser reembolsado');
    }

    this.status = 'refunded';
    this.refundedAt = new Date();
    this.refundReason = reason;
    
    // If partial refund, record the amount
    if (refundAmount && refundAmount < this.amount) {
      this.metadata = {
        ...this.metadata,
        refundAmount,
        isPartialRefund: true
      };
    }
  }

  markAsProcessing(mercadoPagoId?: string): void {
    if (this.status !== 'pending') {
      throw new Error('Solo se pueden procesar pagos pendientes');
    }

    this.status = 'processing';
    
    if (mercadoPagoId) {
      this.mercadoPagoId = mercadoPagoId;
    }
  }

  // Validation
  validate(): string[] {
    const errors: string[] = [];
    
    if (this.amount <= 0) {
      errors.push('El monto debe ser mayor a 0');
    }
    
    if (!this.method) {
      errors.push('El método de pago es requerido');
    }
    
    if (!['PEN', 'USD'].includes(this.currency)) {
      errors.push('La moneda debe ser PEN o USD');
    }
    
    if (this.method === 'mercadopago' && !this.mercadoPagoId && this.status !== 'pending') {
      errors.push('Se requiere el ID de MercadoPago para pagos procesados');
    }
    
    if (this.expiresAt && this.expiresAt < new Date()) {
      errors.push('La fecha de expiración no puede ser en el pasado');
    }
    
    return errors;
  }

  // Generate payment summary
  getSummary(): any {
    return {
      paymentNumber: this.paymentNumber,
      amount: this.getFormattedAmount(),
      method: this.getMethodDisplay(),
      status: this.getStatusDisplay(),
      currency: this.currency,
      paymentDate: this.paymentDate,
      fees: this.getFeesFormatted(),
      netAmount: this.getNetAmountFormatted(),
      transactionId: this.transactionId,
      mercadoPagoId: this.mercadoPagoId
    };
  }

  // For audit trail
  getAuditData(): any {
    return {
      id: this.id,
      paymentNumber: this.paymentNumber,
      amount: this.amount,
      status: this.status,
      method: this.method,
      userId: this.userId,
      appointmentId: this.appointmentId,
      transactionId: this.transactionId,
      mercadoPagoId: this.mercadoPagoId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      approvedAt: this.approvedAt,
      rejectedAt: this.rejectedAt,
      refundedAt: this.refundedAt
    };
  }
}