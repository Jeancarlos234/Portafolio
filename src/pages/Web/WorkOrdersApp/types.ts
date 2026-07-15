    export interface WorkOrder {
    id: string
    number: string
    title: string
    description: string
    clientId: string
    clientName: string
    clientContact: string
    assignedTo: string
    priority: 'low' | 'medium' | 'high' | 'urgent'
    status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'
    category: string
    location: string
    scheduledDate: string
    startTime: string
    endTime: string
    estimatedHours: number
    actualHours: number
    materials: string
    notes: string
    createdAt: string
    updatedAt: string
    completedAt: string
    }

    export interface Client {
    id: string
    name: string
    email: string
    phone: string
    company: string
    address: string
    }

    export interface Technician {
    id: string
    name: string
    role: string
    email: string
    phone: string
    active: boolean
    }

    export interface OrderStats {
    totalOrders: number
    pendingOrders: number
    inProgressOrders: number
    completedOrders: number
    urgentOrders: number
    todayOrders: number
    avgCompletionTime: number
    completionRate: number
    }