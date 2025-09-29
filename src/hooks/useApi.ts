"use client";

import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import type { ApiResponse, PaginatedResponse } from '@/types';

// Configuración base de axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    // Agregar token de autenticación si existe
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Manejar errores globalmente
    if (error.response?.status === 401) {
      // Token expirado o inválido
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Hook genérico para llamadas a la API
interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useApi<T>(
  endpoint: string,
  options: UseApiOptions = {}
) {
  const { immediate = false, onSuccess, onError } = options;
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = async (config: any = {}) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response: AxiosResponse<ApiResponse<T>> = await api({
        url: endpoint,
        ...config,
      });
      
      if (response.data.success) {
        setState({
          data: response.data.data || null,
          loading: false,
          error: null,
        });
        onSuccess?.(response.data.data);
      } else {
        const error = response.data.error || 'Error desconocido';
        setState(prev => ({ ...prev, loading: false, error }));
        onError?.(error);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Error de conexión';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      onError?.(errorMessage);
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate]);

  return {
    ...state,
    execute,
    refetch: () => execute(),
  };
}

// Hook específico para citas
export function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAppointment = async (appointmentData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/appointments', appointmentData);
      if (response.data.success) {
        return { success: true, data: response.data.data };
      } else {
        throw new Error(response.data.error || 'Error al crear la cita');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Error de conexión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getAppointments = async (params?: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/appointments', { params });
      if (response.data.success) {
        setAppointments(response.data.data || []);
        return { success: true, data: response.data.data };
      } else {
        throw new Error(response.data.error || 'Error al obtener las citas');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Error de conexión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateAppointment = async (id: string, updates: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.put(`/appointments/${id}`, updates);
      if (response.data.success) {
        return { success: true, data: response.data.data };
      } else {
        throw new Error(response.data.error || 'Error al actualizar la cita');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Error de conexión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id: string, reason?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post(`/appointments/${id}/cancel`, { reason });
      if (response.data.success) {
        return { success: true, data: response.data.data };
      } else {
        throw new Error(response.data.error || 'Error al cancelar la cita');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Error de conexión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    appointments,
    loading,
    error,
    createAppointment,
    getAppointments,
    updateAppointment,
    cancelAppointment,
  };
}

// Hook para pagos con MercadoPago
export function usePayments() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPayment = async (paymentData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/payments/create', paymentData);
      if (response.data.success) {
        return { success: true, data: response.data.data };
      } else {
        throw new Error(response.data.error || 'Error al procesar el pago');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Error de conexión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getPaymentStatus = async (paymentId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get(`/payments/${paymentId}/status`);
      if (response.data.success) {
        return { success: true, data: response.data.data };
      } else {
        throw new Error(response.data.error || 'Error al verificar el pago');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Error de conexión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const processWebhook = async (webhookData: any) => {
    try {
      const response = await api.post('/payments/webhook', webhookData);
      return { success: response.data.success, data: response.data };
    } catch (error: any) {
      console.error('Webhook processing error:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    loading,
    error,
    createPayment,
    getPaymentStatus,
    processWebhook,
  };
}

// Hook para servicios
export function useServices() {
  const { data: services, loading, error, refetch } = useApi('/services', { 
    immediate: true 
  });

  const getServiceByType = (serviceType: string) => {
    if (!services || !Array.isArray(services)) return null;
    return services.find((service: any) => service.value === serviceType);
  };

  return {
    services: services || [],
    loading,
    error,
    refetch,
    getServiceByType,
  };
}

// Hook para contacto
export function useContact() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (contactData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/contact', contactData);
      if (response.data.success) {
        return { success: true, data: response.data.data };
      } else {
        throw new Error(response.data.error || 'Error al enviar el mensaje');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Error de conexión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    sendMessage,
  };
}

// Hook para autenticación
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.success) {
        const { user, token } = response.data.data;
        localStorage.setItem('auth_token', token);
        setUser(user);
        return { success: true, data: { user, token } };
      } else {
        throw new Error(response.data.error || 'Error al iniciar sesión');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Error de conexión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.success) {
        return { success: true, data: response.data.data };
      } else {
        throw new Error(response.data.error || 'Error al registrarse');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Error de conexión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const getCurrentUser = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return { success: false, error: 'No hay token' };

    setLoading(true);
    try {
      const response = await api.get('/auth/me');
      if (response.data.success) {
        setUser(response.data.data);
        return { success: true, data: response.data.data };
      } else {
        throw new Error(response.data.error || 'Error al obtener usuario');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Error de conexión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Verificar si hay token almacenado al cargar
    const token = localStorage.getItem('auth_token');
    if (token) {
      getCurrentUser();
    }
  }, []);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    getCurrentUser,
    isAuthenticated: !!user,
  };
}

// Exportar la instancia de axios configurada
export { api };

// Exportar tipos de utilidad
export type { UseApiState, UseApiOptions };