import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import entities
import { User } from '../shared/entities/User';
import { Pet } from '../shared/entities/Pet';
import { Appointment } from '../services/reservations/entities/Appointment';
import { Payment } from '../services/payments/entities/Payment';
import { Service } from '../shared/entities/Service';
import { MedicalRecord } from '../shared/entities/MedicalRecord';
import { Veterinarian } from '../shared/entities/Veterinarian';

export const AppDataSource = new DataSource({
  type: 'postgres', // Cambiar a 'mysql' si se prefiere MySQL
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'veterinaria_goicochea',
  
  // SSL configuration for production (AWS RDS)
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false,
  
  synchronize: process.env.NODE_ENV === 'development', // Solo en desarrollo
  logging: process.env.NODE_ENV === 'development',
  
  entities: [
    User,
    Pet,
    Appointment,
    Payment,
    Service,
    MedicalRecord,
    Veterinarian,
  ],
  
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
  
  // Connection pool settings
  extra: {
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
  },
});

// Alternative MySQL configuration
export const MySQLDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'veterinaria_goicochea',
  
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  
  entities: [
    User,
    Pet,
    Appointment,
    Payment,
    Service,
    MedicalRecord,
    Veterinarian,
  ],
  
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
  
  extra: {
    connectionLimit: 10,
  },
});

// Database connection helper
export async function connectDatabase() {
  try {
    const dataSource = process.env.DB_TYPE === 'mysql' ? MySQLDataSource : AppDataSource;
    await dataSource.initialize();
    console.log('✅ Database connection established successfully');
    return dataSource;
  } catch (error) {
    console.error('❌ Error during Data Source initialization:', error);
    throw error;
  }
}

// Database disconnection helper
export async function disconnectDatabase() {
  try {
    const dataSource = process.env.DB_TYPE === 'mysql' ? MySQLDataSource : AppDataSource;
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('✅ Database connection closed successfully');
    }
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
    throw error;
  }
}

// Get repository helper
export function getRepository<T>(entity: any) {
  const dataSource = process.env.DB_TYPE === 'mysql' ? MySQLDataSource : AppDataSource;
  return dataSource.getRepository(entity);
}

// Transaction helper
export async function runInTransaction<T>(
  operation: (entityManager: any) => Promise<T>
): Promise<T> {
  const dataSource = process.env.DB_TYPE === 'mysql' ? MySQLDataSource : AppDataSource;
  return await dataSource.transaction(operation);
}

export default AppDataSource;