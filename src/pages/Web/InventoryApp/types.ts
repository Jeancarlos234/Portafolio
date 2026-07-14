    export interface Product {
    id: string
    name: string
    sku: string
    category: string
    description: string
    price: number
    cost: number
    stock: number
    minStock: number
    supplier: string
    location: string
    lastUpdated: string
    }

    export interface StockMovement {
    id: string
    productId: string
    productName: string
    type: 'entrada' | 'salida'
    quantity: number
    reason: string
    date: string
    previousStock: number
    newStock: number
    }

    export interface InventoryStats {
    totalProducts: number
    totalValue: number
    totalCost: number
    lowStockCount: number
    totalMovements: number
    }