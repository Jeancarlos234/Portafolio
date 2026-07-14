    import { useState } from 'react'
    import styles from './ProductDetail.module.css'
    import type { Product } from '../../types'

    interface ProductDetailProps {
    product: Product
    onAddToCart: (product: Product, quantity: number) => void
    onBack: () => void
    onGoToCart: () => void
    }

    const ProductDetail = ({ product, onAddToCart, onBack, onGoToCart }: ProductDetailProps) => {
    const [quantity, setQuantity] = useState(1)
    const [addedToCart, setAddedToCart] = useState(false)

    const handleAddToCart = () => {
        onAddToCart(product, quantity)
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
    }

    return (
        <div className={styles.detail}>
        <button onClick={onBack} className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Volver a la tienda
        </button>

        <div className={styles.productLayout}>
            <div className={styles.imageSection}>
            <img src={product.image} alt={product.name} className={styles.image} />
            </div>

            <div className={styles.infoSection}>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.name}>{product.name}</h1>
            
            <div className={styles.rating}>
                {[...Array(5)].map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i < Math.round(product.rating) ? '#f59e0b' : '#e5e5e5'}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                ))}
                <span className={styles.ratingText}>{product.rating} ({product.reviews} reseñas)</span>
            </div>

            <p className={styles.price}>${product.price.toLocaleString()}</p>
            <p className={styles.description}>{product.description}</p>

            <div className={styles.stockInfo}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                {product.stock > 0 ? (
                <span className={styles.inStock}>{product.stock} en stock</span>
                ) : (
                <span className={styles.outStock}>Agotado</span>
                )}
            </div>

            <div className={styles.sku}>
                <span>SKU: {product.sku}</span>
            </div>

            <div className={styles.actions}>
                <div className={styles.quantity}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className={styles.qtyBtn}>-</button>
                <span className={styles.qtyValue}>{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className={styles.qtyBtn}>+</button>
                </div>
                <button onClick={handleAddToCart} className={styles.addToCartBtn} disabled={product.stock === 0}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                {addedToCart ? 'Agregado' : 'Agregar al carrito'}
                </button>
            </div>

            {addedToCart && (
                <button onClick={onGoToCart} className={styles.goToCartBtn}>
                Ver carrito y pagar
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
                </button>
            )}
            </div>
        </div>
        </div>
    )
    }

    export default ProductDetail