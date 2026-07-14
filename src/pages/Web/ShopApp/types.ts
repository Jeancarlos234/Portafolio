    export interface Product {
    id: string
    name: string
    description: string
    price: number
    category: string
    image: string
    stock: number
    featured: boolean
    rating: number
    reviews: number
    sku: string
    }

    export interface CartItem {
    productId: string
    name: string
    price: number
    quantity: number
    image: string
    }

    export interface Order {
    id: string
    items: CartItem[]
    subtotal: number
    tax: number
    shipping: number
    total: number
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    customer: {
        name: string
        email: string
        phone: string
        address: string
        city: string
        zip: string
        country: string
    }
    paymentMethod: string
    date: string
    }