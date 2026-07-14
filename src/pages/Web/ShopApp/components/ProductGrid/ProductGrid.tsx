    import { useState } from 'react'
    import ProductCard from '../ProductCard/ProductCard'
    import styles from './ProductGrid.module.css'
    import type { Product } from '../../types'

    interface ProductGridProps {
    products: Product[]
    onSelectProduct: (product: Product) => void
    onAddToCart: (product: Product) => void
    }

    const ProductGrid = ({ products, onSelectProduct, onAddToCart }: ProductGridProps) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc'>('name')

    const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))]

    const filtered = products
        .filter(p => categoryFilter === 'all' || p.category === categoryFilter)
        .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        return a.name.localeCompare(b.name)
        })

    return (
        <div className={styles.grid}>
        <div className={styles.header}>
            <div>
            <h1 className={styles.title}>Productos</h1>
            <p className={styles.count}>{filtered.length} productos encontrados</p>
            </div>
        </div>

        <div className={styles.toolbar}>
            <div className={styles.searchBox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Buscar productos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
            </div>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={styles.select}>
            <option value="all">Todas las categorías</option>
            {categories.filter(c => c !== 'all').map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className={styles.select}>
            <option value="name">Nombre</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            </select>
        </div>

        <div className={styles.productsGrid}>
            {filtered.map(product => (
            <ProductCard key={product.id} product={product} onSelect={onSelectProduct} onAddToCart={onAddToCart} />
            ))}
            {filtered.length === 0 && (
            <div className={styles.empty}><p>No se encontraron productos</p></div>
            )}
        </div>
        </div>
    )
    }

    export default ProductGrid