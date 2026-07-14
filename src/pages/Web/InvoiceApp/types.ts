    export interface Client {
    id: string
    name: string
    email: string
    phone: string
    address: string
    taxId: string
    }

    export interface Product {
    id: string
    name: string
    description: string
    price: number
    taxRate: number
    category: string
    }

    export interface InvoiceItem {
    id: string
    productId: string
    productName: string
    quantity: number
    price: number
    taxRate: number
    discount: number
    }

    export interface Invoice {
    id: string
    number: string
    clientId: string
    clientName: string
    clientEmail: string
    clientAddress: string
    clientTaxId: string
    items: InvoiceItem[]
    subtotal: number
    taxTotal: number
    discountTotal: number
    total: number
    status: 'draft' | 'sent' | 'paid' | 'cancelled'
    date: string
    dueDate: string
    notes: string
    }