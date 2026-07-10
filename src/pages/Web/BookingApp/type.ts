    export interface Service {
    id: string
    name: string
    description: string
    duration: number // minutos
    price: number
    icon: string
    color: string
    }

    export interface TimeSlot {
    time: string
    available: boolean
    }

    export interface Booking {
    id: string
    serviceId: string
    serviceName: string
    date: string
    time: string
    name: string
    email: string
    phone: string
    notes: string
    status: 'confirmed' | 'pending' | 'cancelled'
    createdAt: string
    }