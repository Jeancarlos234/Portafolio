    export interface Service {
    id: string
    name: string
    description: string
    longDescription: string
    category: string
    price: number
    duration: string
    features: string[]
    image: string
    featured: boolean
    active: boolean
    }

    export interface Client {
    id: string
    name: string
    email: string
    phone: string
    company: string
    address: string
    }

    export interface ServiceRequest {
    id: string
    serviceId: string
    serviceName: string
    clientId: string
    clientName: string
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
    priority: 'low' | 'medium' | 'high'
    notes: string
    date: string
    completedDate: string
    }

    export interface ServiceStats {
    totalServices: number
    activeServices: number
    totalClients: number
    pendingRequests: number
    completedRequests: number
    totalRevenue: number
    }