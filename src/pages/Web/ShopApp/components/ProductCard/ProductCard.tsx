    import styles from './ProductCard.module.css'
    import type { Product } from '../../types'

    interface ProductCardProps {
    product: Product
    onSelect: (product: Product) => void
    onAddToCart: (product: Product) => void
    }

    const ProductCard = ({ product, onSelect, onAddToCart }: ProductCardProps) => {
    return (
        <div className={styles.card}>
        <div className={styles.imageWrapper} onClick={() => onSelect(product)}>
            <img src={product.image} alt={product.name} className={styles.image} />
            {product.featured && <span className={styles.featuredBadge}>Destacado</span>}
        </div>
        <div className={styles.content}>
            <span className={styles.category}>{product.category}</span>
            <h3 className={styles.name} onClick={() => onSelect(product)}>{product.name}</h3>
            <p className={styles.desc}>{product.description.slice(0, 80)}...</p>
            <div className={styles.rating}>
            {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.round(product.rating) ? '#f59e0b' : '#e5e5e5'}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
            ))}
            <span className={styles.reviews}>({product.reviews})</span>
            </div>
            <div className={styles.bottom}>
            <span className={styles.price}>${product.price.toLocaleString()}</span>
            <button onClick={(e) => { e.stopPropagation(); onAddToCart(product) }} className={styles.addBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
            </button>
            </div>
        </div>
        </div>
    )
    }

    export default ProductCard