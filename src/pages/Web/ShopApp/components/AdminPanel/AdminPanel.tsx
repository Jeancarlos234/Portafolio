    import { useState } from 'react'
    import styles from './AdminPanel.module.css'
    import type { Product } from '../../types'

    interface AdminPanelProps {
    products: Product[]
    onAdd: (product: Omit<Product, 'id'>) => void
    onDelete: (id: string) => void
    }

    const AdminPanel = ({ products, onAdd, onDelete }: AdminPanelProps) => {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        name: '', description: '', price: 0, category: 'Laptops',
        image: '', stock: 0, featured: false, rating: 0, reviews: 0, sku: ''
    })

    const categories = ['Laptops', 'Teléfonos', 'Tablets', 'Audio', 'Wearables', 'Monitores', 'Accesorios']

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || formData.price <= 0) return
        onAdd(formData)
        setFormData({ name: '', description: '', price: 0, category: 'Laptops', image: '', stock: 0, featured: false, rating: 0, reviews: 0, sku: '' })
        setShowForm(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        const checked = (e.target as HTMLInputElement).checked
        setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : (name === 'price' || name === 'stock' || name === 'rating' || name === 'reviews' ? Number(value) : value)
        }))
    }

    return (
        <div className={styles.admin}>
        <div className={styles.header}>
            <div>
            <h1 className={styles.title}>Panel de Administración</h1>
            <p className={styles.count}>{products.length} productos</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className={styles.addBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <input type="text" name="sku" placeholder="SKU" value={formData.sku} onChange={handleChange} className={styles.input} />
                <input type="number" name="price" placeholder="Precio *" value={formData.price || ''} onChange={handleChange} required className={styles.input} />
                <input type="number" name="stock" placeholder="Stock" value={formData.stock || ''} onChange={handleChange} className={styles.input} />
                <input type="text" name="image" placeholder="URL de imagen" value={formData.image} onChange={handleChange} className={styles.input} />
                <select name="category" value={formData.category} onChange={handleChange} className={styles.input}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} className={styles.textarea} rows={3} />
            <div className={styles.formRow}>
                <label className={styles.checkbox}>
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
                Producto destacado
                </label>
            </div>
            <button type="submit" className={styles.submitBtn}>Guardar Producto</button>
            </form>
        )}

        <div className={styles.tableWrapper}>
            <table className={styles.table}>
            <thead>
                <tr>
                <th>Producto</th>
                <th>SKU</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                <tr key={product.id} className={styles.row}>
                    <td>
                    <div className={styles.productCell}>
                        {product.image && <img src={product.image} alt="" className={styles.productImg} />}
                        <span className={styles.productName}>{product.name}</span>
                    </div>
                    </td>
                    <td className={styles.sku}>{product.sku}</td>
                    <td><span className={styles.category}>{product.category}</span></td>
                    <td className={styles.price}>${product.price.toLocaleString()}</td>
                    <td className={product.stock < 5 ? styles.lowStock : ''}>{product.stock}</td>
                    <td>
                    <button onClick={() => onDelete(product.id)} className={styles.deleteBtn}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    )
    }

    export default AdminPanel