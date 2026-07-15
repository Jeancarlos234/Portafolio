    export interface FinanceRecord {
    id: string
    type: 'income' | 'expense'
    category: string
    amount: number
    description: string
    date: string
    status: 'pending' | 'completed' | 'cancelled'
    }

    export interface Project {
    id: string
    name: string
    description: string
    client: string
    status: 'planning' | 'active' | 'completed' | 'on_hold'
    progress: number
    budget: number
    spent: number
    startDate: string
    endDate: string
    team: string[]
    }

    export interface Contact {
    id: string
    name: string
    type: 'client' | 'supplier' | 'partner'
    email: string
    phone: string
    company: string
    category: string
    notes: string
    }

    export interface CalendarEvent {
    id: string
    title: string
    date: string
    time: string
    type: 'meeting' | 'deadline' | 'reminder' | 'call'
    attendees: string[]
    }

    export interface ChatMessage {
    id: string
    sender: string
    content: string
    time: string
    room: string
    }

    export interface Document {
    id: string
    name: string
    type: string
    size: string
    uploadedBy: string
    date: string
    category: string
    }

    export interface EnterpriseStats {
    totalRevenue: number
    totalExpenses: number
    activeProjects: number
    totalClients: number
    pendingTasks: number
    profitMargin: number
    }