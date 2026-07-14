    import { useState } from 'react'
    import QRCode from '../QRCode/QRCode'
    import QRScanner from '../QRScanner/QRScanner'
    import styles from './ProductList.module.css'
    import type { Product } from '../../types'

    interface ProductListProps {
    products: Product[]
    onAdd: () => void
    onEdit: (product: Product) => void
    onDelete: (id: string) => void
    onStockMovement: (product: Product) => void
    }

    const ProductList = ({ products, onAdd, onEdit, onDelete, onStockMovement }: ProductListProps) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [highlightedProduct, setHighlightedProduct] = useState<string | null>(null)

    const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))]

    const filtered = products
        .filter(p => categoryFilter === 'all' || p.category === categoryFilter)
        .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase()))

    const handleProductFound = (product: Product) => {
        setHighlightedProduct(product.id)
        setSearchTerm(product.sku)
        setTimeout(() => setHighlightedProduct(null), 3000)
    }

    return (
        <div className={styles.list}>
        {/* Escáner QR */}
        <QRScanner products={products} onProductFound={handleProductFound} />

        <div className={styles.header}>
            <div>
            <h1 className={styles.title}>Productos</h1>
            <p className={styles.count}>{filtered.length} productos</p>
            </div>
            <button onClick={onAdd} className={styles.addBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Nuevo Producto
            </button>
        </div>

        <div className={styles.toolbar}>
            <div className={styles.searchBox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Buscar por nombre o SKU..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
            </div>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={styles.select}>
            <option value="all">Todas las categorías</option>
            {categories.filter(c => c !== 'all').map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </div>

        <div className={styles.tableWrapper}>
            <table className={styles.table}>
            <thead>
                <tr>
                <th>QR</th>
                <th>Producto</th>
                <th>SKU</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Costo</th>
                <th>Stock</th>
                <th>Ubicación</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {filtered.map(p => (
                <tr key={p.id} className={`${styles.row} ${highlightedProduct === p.id ? styles.highlighted : ''}`}>
                    <td>
                    <QRCode product={{ id: p.id, name: p.name, sku: p.sku, location: p.location }} size={36} />
                    </td>
                    <td className={styles.productName}>{p.name}</td>
                    <td className={styles.sku}>{p.sku}</td>
                    <td><span className={styles.category}>{p.category}</span></td>
                    <td className={styles.price}>${p.price.toLocaleString()}</td>
                    <td className={styles.cost}>${p.cost.toLocaleString()}</td>
                    <td className={`${styles.stock} ${p.stock <= p.minStock ? styles.lowStock : ''}`}>{p.stock}</td>
                    <td>{p.location}</td>
                    <td>
                    <div className={styles.actions}>
                        <button onClick={() => onStockMovement(p)} className={styles.actionBtn} title="Movimiento">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/></svg>
                        </button>
                        <button onClick={() => onEdit(p)} className={styles.actionBtn} title="Editar">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button onClick={() => onDelete(p.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Eliminar">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            {filtered.length === 0 && <div className={styles.empty}><p>No se encontraron productos</p></div>}
        </div>
        </div>
    )
    }

    export default ProductList