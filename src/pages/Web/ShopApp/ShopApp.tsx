    import { useState, useEffect, useCallback } from 'react'
    import Header from './components/Header/Header'
    import ProductGrid from './components/ProductGrid/ProductGrid'
    import ProductDetail from './components/ProductDetail/ProductDetail'
    import Cart from './components/Cart/Cart'
    import Checkout from './components/Checkout/Checkout'
    import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation'
    import AdminPanel from './components/AdminPanel/AdminPanel'
    import OrdersList from './components/OrdersList/OrdersList'
    import styles from './ShopApp.module.css'
    import type { Product, CartItem, Order } from './types'

    const initialProducts: Product[] = [
    { id: '1', name: 'MacBook Pro 14"', description: 'Chip M3 Pro, 18GB RAM, 512GB SSD. Pantalla Liquid Retina XDR.', price: 2499, category: 'Laptops', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', stock: 15, featured: true, rating: 4.9, reviews: 128, sku: 'MBP14-M3-512' },
    { id: '2', name: 'iPhone 15 Pro', description: 'Titanio, 256GB, Cámara 48MP, Chip A17 Pro.', price: 1299, category: 'Teléfonos', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400', stock: 25, featured: true, rating: 4.8, reviews: 256, sku: 'IP15P-256' },
    { id: '3', name: 'iPad Air 11"', description: 'Chip M2, 128GB, WiFi 6E, compatible con Apple Pencil Pro.', price: 799, category: 'Tablets', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', stock: 20, featured: true, rating: 4.7, reviews: 89, sku: 'IPA-M2-128' },
    { id: '4', name: 'AirPods Pro 2', description: 'Cancelación de ruido activa, USB-C, audio espacial.', price: 249, category: 'Audio', image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400', stock: 50, featured: false, rating: 4.9, reviews: 340, sku: 'APP2-USB' },
    { id: '5', name: 'Apple Watch Series 9', description: '45mm, GPS, sensor de temperatura, pantalla siempre activa.', price: 499, category: 'Wearables', image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400', stock: 30, featured: false, rating: 4.6, reviews: 112, sku: 'AWS9-45' },
    { id: '6', name: 'Monitor Studio Display', description: '27" 5K Retina, 12MP cámara, 6 altavoces.', price: 1799, category: 'Monitores', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400', stock: 10, featured: true, rating: 4.8, reviews: 67, sku: 'SD-27-5K' },
    { id: '7', name: 'Magic Keyboard', description: 'Teclado inalámbrico recargable, diseño compacto.', price: 149, category: 'Accesorios', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', stock: 40, featured: false, rating: 4.5, reviews: 198, sku: 'MK-2024' },
    { id: '8', name: 'Samsung Galaxy S24 Ultra', description: '256GB, S Pen, cámara 200MP, pantalla Dynamic AMOLED.', price: 1199, category: 'Teléfonos', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400', stock: 18, featured: false, rating: 4.7, reviews: 145, sku: 'SGS24U-256' },
    ]

    const ShopApp = () => {
    const [activeView, setActiveView] = useState<'shop' | 'product' | 'cart' | 'checkout' | 'confirmation' | 'admin' | 'orders'>('shop')
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [products, setProducts] = useState<Product[]>(() => {
        const saved = localStorage.getItem('shop-products')
        return saved ? JSON.parse(saved) : initialProducts
    })
    const [cart, setCart] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('shop-cart')
        return saved ? JSON.parse(saved) : []
    })
    const [orders, setOrders] = useState<Order[]>(() => {
        const saved = localStorage.getItem('shop-orders')
        return saved ? JSON.parse(saved) : []
    })
    const [lastOrder, setLastOrder] = useState<Order | null>(null)

    useEffect(() => { localStorage.setItem('shop-products', JSON.stringify(products)) }, [products])
    useEffect(() => { localStorage.setItem('shop-cart', JSON.stringify(cart)) }, [cart])
    useEffect(() => { localStorage.setItem('shop-orders', JSON.stringify(orders)) }, [orders])

    const addToCart = useCallback((product: Product, quantity: number = 1) => {
        setCart(prev => {
        const existing = prev.find(item => item.productId === product.id)
        if (existing) {
            return prev.map(item => item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        }
        return [...prev, { productId: product.id, name: product.name, price: product.price, quantity, image: product.image }]
        })
    }, [])

    const removeFromCart = useCallback((productId: string) => {
        setCart(prev => prev.filter(item => item.productId !== productId))
    }, [])

    const updateCartQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) { removeFromCart(productId); return }
        setCart(prev => prev.map(item => item.productId === productId ? { ...item, quantity } : item))
    }, [removeFromCart])

    const clearCart = useCallback(() => setCart([]), [])

    const placeOrder = useCallback((orderData: Omit<Order, 'id' | 'date' | 'items' | 'subtotal' | 'tax' | 'shipping' | 'total' | 'status'>) => {
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const tax = subtotal * 0.15
        const shipping = subtotal > 100 ? 0 : 15
        const total = subtotal + tax + shipping

        const newOrder: Order = {
        id: `ORD-${Date.now().toString().slice(-6)}`,
        items: [...cart],
        subtotal,
        tax,
        shipping,
        total,
        status: 'pending',
        customer: orderData.customer,
        paymentMethod: orderData.paymentMethod,
        date: new Date().toISOString(),
        }

        setOrders(prev => [newOrder, ...prev])
        setLastOrder(newOrder)
        clearCart()
        setActiveView('confirmation')
    }, [cart, clearCart])

    const addProduct = useCallback((product: Omit<Product, 'id'>) => {
        setProducts(prev => [...prev, { ...product, id: Date.now().toString() }])
    }, [])

    const deleteProduct = useCallback((id: string) => {
        setProducts(prev => prev.filter(p => p.id !== id))
    }, [])

    const updateOrderStatus = useCallback((id: string, status: Order['status']) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
    }, [])

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <div className={styles.app}>
        <Header 
            activeView={activeView}
            cartCount={cartCount}
            onViewChange={(view) => { setActiveView(view); if (view !== 'product') setSelectedProduct(null) }}
        />
        <div className={styles.container}>
            {activeView === 'shop' && (
            <ProductGrid 
                products={products}
                onSelectProduct={(product) => { setSelectedProduct(product); setActiveView('product') }}
                onAddToCart={addToCart}
            />
            )}
            {activeView === 'product' && selectedProduct && (
            <ProductDetail 
                product={selectedProduct}
                onAddToCart={addToCart}
                onBack={() => { setSelectedProduct(null); setActiveView('shop') }}
                onGoToCart={() => setActiveView('cart')}
            />
            )}
            {activeView === 'cart' && (
            <Cart 
                cart={cart}
                onUpdateQuantity={updateCartQuantity}
                onRemove={removeFromCart}
                onClear={clearCart}
                onCheckout={() => setActiveView('checkout')}
                onContinueShopping={() => setActiveView('shop')}
            />
            )}
            {activeView === 'checkout' && (
            <Checkout 
                cart={cart}
                onPlaceOrder={placeOrder}
                onBack={() => setActiveView('cart')}
            />
            )}
            {activeView === 'confirmation' && lastOrder && (
            <OrderConfirmation 
                order={lastOrder}
                onContinueShopping={() => { setActiveView('shop'); setLastOrder(null) }}
            />
            )}
            {activeView === 'admin' && (
            <AdminPanel 
                products={products}
                onAdd={addProduct}
                onDelete={deleteProduct}
            />
            )}
            {activeView === 'orders' && (
            <OrdersList 
                orders={orders}
                onUpdateStatus={updateOrderStatus}
            />
            )}
        </div>
        </div>
    )
    }

    export default ShopApp