    import { useState } from 'react'
    import styles from './ProductManager.module.css'
    import type { Product } from '../../types'

    interface ProductManagerProps {
    products: Product[]
    onAdd: (product: Omit<Product, 'id'>) => void
    onDelete: (id: string) => void
    }

    const ProductManager = ({ products, onAdd, onDelete }: ProductManagerProps) => {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        name: '', description: '', price: 0, taxRate: 21, category: 'Desarrollo'
    })
    const [searchTerm, setSearchTerm] = useState('')

    const categories = ['Desarrollo', 'Diseño', 'Consultoría', 'Servicios', 'Otros']

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || formData.price <= 0) return
        onAdd(formData)
        setFormData({ name: '', description: '', price: 0, taxRate: 21, category: 'Desarrollo' })
        setShowForm(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'taxRate' ? Number(value) : value }))
    }

    return (
        <div className={styles.manager}>
        <div className={styles.header}>
            <div>
            <h1 className={styles.title}>Productos / Servicios</h1>
            <p className={styles.count}>{products.length} productos registrados</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className={styles.addBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            {showForm ? 'Cancelar' : 'Nuevo Producto'}
            </button>
        </div>

        {showForm && (
            <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.formTitle}>Nuevo Producto</h3>
            <div className={styles.formGrid}>
                <input type="text" name="name" placeholder="Nombre *" value={formData.name} onChange={handleChange} required className={styles.input} />
                <input type="text" name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} className={styles.input} />
                <input type="number" name="price" placeholder="Precio *" value={formData.price || ''} onChange={handleChange} required min="0" className={styles.input} />
                <input type="number" name="taxRate" placeholder="IVA %" value={formData.taxRate} onChange={handleChange} min="0" max="100" className={styles.input} />
                <select name="category" value={formData.category} onChange={handleChange} className={styles.input}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <button type="submit" className={styles.submitBtn}>Guardar Producto</button>
            </form>
        )}

        <div className={styles.searchBox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Buscar productos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
        </div>

        <div className={styles.tableWrapper}>
            <table className={styles.table}>
            <thead>
                <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>IVA</th>
                <th>Precio + IVA</th>
                <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                {filteredProducts.map(product => (
                <tr key={product.id} className={styles.row}>
                    <td>
                    <div className={styles.productCell}>
                        <span className={styles.productName}>{product.name}</span>
                        <span className={styles.productDesc}>{product.description}</span>
                    </div>
                    </td>
                    <td><span className={styles.category}>{product.category}</span></td>
                    <td className={styles.price}>${product.price.toLocaleString()}</td>
                    <td>{product.taxRate}%</td>
                    <td className={styles.priceTotal}>${(product.price * (1 + product.taxRate / 100)).toLocaleString()}</td>
                    <td>
                    <button onClick={() => onDelete(product.id)} className={styles.deleteBtn}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            {filteredProducts.length === 0 && (
            <div className={styles.empty}><p>No se encontraron productos</p></div>
            )}
        </div>
        </div>
    )
    }

    export default ProductManager