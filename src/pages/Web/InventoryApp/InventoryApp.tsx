    import { useState, useEffect, useCallback } from 'react'
    import Header from './components/Header/Header'
    import Dashboard from './components/Dashboard/Dashboard'
    import ProductList from './components/ProductList/ProductList'
    import ProductForm from './components/ProductForm/ProductForm'
    import StockMovement from './components/StockMovement/StockMovement'
    import MovementHistory from './components/MovementHistory/MovementHistory'
    import styles from './InventoryApp.module.css'
    import type { Product, StockMovement as StockMovementType, InventoryStats } from './types'

    const initialProducts: Product[] = [
    { id: '1', name: 'MacBook Pro 14"', sku: 'MBP14-M3-512', category: 'Laptops', description: 'Chip M3 Pro, 18GB RAM, 512GB SSD', price: 2499, cost: 1800, stock: 15, minStock: 5, supplier: 'Apple Inc.', location: 'Almacén A-12', lastUpdated: '2024-12-15' },
    { id: '2', name: 'iPhone 15 Pro', sku: 'IP15P-256', category: 'Teléfonos', description: 'Titanio, 256GB, Cámara 48MP', price: 1299, cost: 900, stock: 25, minStock: 8, supplier: 'Apple Inc.', location: 'Almacén B-03', lastUpdated: '2024-12-14' },
    { id: '3', name: 'iPad Air 11"', sku: 'IPA-M2-128', category: 'Tablets', description: 'Chip M2, 128GB, WiFi 6E', price: 799, cost: 520, stock: 3, minStock: 10, supplier: 'Apple Inc.', location: 'Almacén A-08', lastUpdated: '2024-12-13' },
    { id: '4', name: 'AirPods Pro 2', sku: 'APP2-USB', category: 'Audio', description: 'Cancelación de ruido activa, USB-C', price: 249, cost: 150, stock: 50, minStock: 15, supplier: 'Apple Inc.', location: 'Almacén C-01', lastUpdated: '2024-12-12' },
    { id: '5', name: 'Samsung Galaxy S24', sku: 'SGS24U-256', category: 'Teléfonos', description: '256GB, S Pen, cámara 200MP', price: 1199, cost: 800, stock: 2, minStock: 10, supplier: 'Samsung Electronics', location: 'Almacén B-05', lastUpdated: '2024-12-11' },
    { id: '6', name: 'Monitor Studio Display', sku: 'SD-27-5K', category: 'Monitores', description: '27" 5K Retina, 12MP cámara', price: 1799, cost: 1300, stock: 8, minStock: 4, supplier: 'Apple Inc.', location: 'Almacén A-15', lastUpdated: '2024-12-10' },
    ]

    const initialMovements: StockMovementType[] = [
    { id: 'm1', productId: '1', productName: 'MacBook Pro 14"', type: 'entrada', quantity: 10, reason: 'Compra inicial', date: '2024-12-15', previousStock: 5, newStock: 15 },
    { id: 'm2', productId: '4', productName: 'AirPods Pro 2', type: 'entrada', quantity: 50, reason: 'Compra mayorista', date: '2024-12-12', previousStock: 0, newStock: 50 },
    { id: 'm3', productId: '3', productName: 'iPad Air 11"', type: 'salida', quantity: 2, reason: 'Venta online', date: '2024-12-11', previousStock: 5, newStock: 3 },
    ]

    const InventoryApp = () => {
    const [activeView, setActiveView] = useState<'dashboard' | 'products' | 'add' | 'movement' | 'history'>('dashboard')
    const [products, setProducts] = useState<Product[]>(() => {
        const saved = localStorage.getItem('inventory-products')
        return saved ? JSON.parse(saved) : initialProducts
    })
    const [movements, setMovements] = useState<StockMovementType[]>(() => {
        const saved = localStorage.getItem('inventory-movements')
        return saved ? JSON.parse(saved) : initialMovements
    })
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    useEffect(() => { localStorage.setItem('inventory-products', JSON.stringify(products)) }, [products])
    useEffect(() => { localStorage.setItem('inventory-movements', JSON.stringify(movements)) }, [movements])

    const stats: InventoryStats = {
        totalProducts: products.length,
        totalValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
        totalCost: products.reduce((sum, p) => sum + p.cost * p.stock, 0),
        lowStockCount: products.filter(p => p.stock <= p.minStock).length,
        totalMovements: movements.length,
    }

    const addProduct = useCallback((product: Omit<Product, 'id' | 'lastUpdated'>) => {
        const newProduct: Product = { ...product, id: Date.now().toString(), lastUpdated: new Date().toISOString().split('T')[0] }
        setProducts(prev => [...prev, newProduct])
        setActiveView('products')
    }, [])

    const updateProduct = useCallback((id: string, product: Partial<Product>) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...product, lastUpdated: new Date().toISOString().split('T')[0] } : p))
        setEditingProduct(null)
        setActiveView('products')
    }, [])

    const deleteProduct = useCallback((id: string) => {
        setProducts(prev => prev.filter(p => p.id !== id))
    }, [])

    const addMovement = useCallback((movement: Omit<StockMovementType, 'id' | 'date' | 'previousStock' | 'newStock'>) => {
        const product = products.find(p => p.id === movement.productId)
        if (!product) return

        const previousStock = product.stock
        const newStock = movement.type === 'entrada' ? previousStock + movement.quantity : previousStock - movement.quantity

        const newMovement: StockMovementType = {
        ...movement,
        id: `mov-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        previousStock,
        newStock,
        }

        setMovements(prev => [newMovement, ...prev])
        setProducts(prev => prev.map(p => p.id === movement.productId ? { ...p, stock: newStock } : p))
        setActiveView('history')
    }, [products])

    return (
        <div className={styles.app}>
        <Header activeView={activeView} onViewChange={(view) => { setActiveView(view); setEditingProduct(null) }} />
        <div className={styles.container}>
            {activeView === 'dashboard' && (
            <Dashboard stats={stats} products={products} onViewAll={() => setActiveView('products')} />
            )}
            {activeView === 'products' && (
            <ProductList 
                products={products} 
                onAdd={() => setActiveView('add')}
                onEdit={(product) => { setEditingProduct(product); setActiveView('add') }}
                onDelete={deleteProduct}
                onStockMovement={(product) => { setSelectedProduct(product); setActiveView('movement') }}
            />
            )}
            {activeView === 'add' && (
            <ProductForm 
                product={editingProduct}
                onSave={(product) => editingProduct ? updateProduct(editingProduct.id, product) : addProduct(product as Omit<Product, 'id' | 'lastUpdated'>)}
                onCancel={() => { setEditingProduct(null); setActiveView('products') }}
            />
            )}
            {activeView === 'movement' && selectedProduct && (
            <StockMovement 
                product={selectedProduct}
                onSave={addMovement}
                onCancel={() => setActiveView('products')}
            />
            )}
            {activeView === 'history' && (
            <MovementHistory movements={movements} products={products} />
            )}
        </div>
        </div>
    )
    }

    export default InventoryApp