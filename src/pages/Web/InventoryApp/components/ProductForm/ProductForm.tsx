    import { useState } from 'react'
    import styles from './ProductForm.module.css'
    import type { Product } from '../../types'

    interface ProductFormProps {
    product: Product | null
    onSave: (product: Omit<Product, 'id' | 'lastUpdated'> | Partial<Product>) => void
    onCancel: () => void
    }

    const ProductForm = ({ product, onSave, onCancel }: ProductFormProps) => {
    // ✅ Valores iniciales desde product (sin useEffect)
    const [formData, setFormData] = useState({
        name: product?.name || '',
        sku: product?.sku || '',
        category: product?.category || 'Laptops',
        description: product?.description || '',
        price: product?.price || 0,
        cost: product?.cost || 0,
        stock: product?.stock || 0,
        minStock: product?.minStock || 5,
        supplier: product?.supplier || '',
        location: product?.location || '',
    })

    const categories = ['Laptops', 'Teléfonos', 'Tablets', 'Audio', 'Wearables', 'Monitores', 'Accesorios']

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || formData.price <= 0) return
        onSave(formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'cost' || name === 'stock' || name === 'minStock' ? Number(value) : value }))
    }

    return (
        <div className={styles.formContainer}>
        <div className={styles.header}>
            <h2 className={styles.title}>{product ? 'Editar Producto' : 'Nuevo Producto'}</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Nombre *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className={styles.input} placeholder="Nombre del producto" />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>SKU</label>
                <input type="text" name="sku" value={formData.sku} onChange={handleChange} className={styles.input} placeholder="Código único" />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Categoría</label>
                <select name="category" value={formData.category} onChange={handleChange} className={styles.input}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Proveedor</label>
                <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} className={styles.input} placeholder="Proveedor" />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Precio de venta *</label>
                <input type="number" name="price" value={formData.price || ''} onChange={handleChange} required className={styles.input} placeholder="0" min="0" />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Costo</label>
                <input type="number" name="cost" value={formData.cost || ''} onChange={handleChange} className={styles.input} placeholder="0" min="0" />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Stock actual</label>
                <input type="number" name="stock" value={formData.stock || ''} onChange={handleChange} className={styles.input} placeholder="0" min="0" />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Stock mínimo</label>
                <input type="number" name="minStock" value={formData.minStock || ''} onChange={handleChange} className={styles.input} placeholder="5" min="0" />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Ubicación</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className={styles.input} placeholder="Ej: Almacén A-12" />
            </div>
            </div>
            <div className={styles.formGroup}>
            <label className={styles.label}>Descripción</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className={styles.textarea} rows={3} placeholder="Descripción del producto" />
            </div>
            <div className={styles.buttons}>
            <button type="button" onClick={onCancel} className={styles.cancelBtn}>Cancelar</button>
            <button type="submit" className={styles.saveBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
                </svg>
                {product ? 'Actualizar' : 'Guardar'}
            </button>
            </div>
        </form>
        </div>
    )
    }

    export default ProductForm