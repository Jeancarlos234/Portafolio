    import { useState } from 'react'
    import styles from './AdminPanel.module.css'
    import type { Service } from '../../types'

    interface AdminPanelProps {
    services: Service[]
    onAdd: (service: Omit<Service, 'id'>) => void
    onDelete: (id: string) => void
    }

    const AdminPanel = ({ services, onAdd, onDelete }: AdminPanelProps) => {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        name: '', description: '', longDescription: '', category: 'Desarrollo', price: 0,
        duration: '', features: '', image: '', featured: false, active: true
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name) return
        onAdd({ ...formData, features: formData.features.split(',').map(f => f.trim()).filter(Boolean) })
        setFormData({ name: '', description: '', longDescription: '', category: 'Desarrollo', price: 0, duration: '', features: '', image: '', featured: false, active: true })
        setShowForm(false)
    }

    return (
        <div className={styles.admin}>
        <div className={styles.header}>
            <h1 className={styles.title}>Administrar Servicios</h1>
            <button onClick={() => setShowForm(!showForm)} className={styles.addBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            {showForm ? 'Cancelar' : 'Nuevo Servicio'}
            </button>
        </div>

        {showForm && (
            <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
                <input type="text" name="name" placeholder="Nombre *" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} required className={styles.input} />
                <input type="text" name="category" placeholder="Categoría" value={formData.category} onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))} className={styles.input} />
                <input type="number" name="price" placeholder="Precio" value={formData.price || ''} onChange={(e) => setFormData(p => ({ ...p, price: Number(e.target.value) }))} className={styles.input} />
                <input type="text" name="duration" placeholder="Duración" value={formData.duration} onChange={(e) => setFormData(p => ({ ...p, duration: e.target.value }))} className={styles.input} />
                <input type="text" name="image" placeholder="URL imagen" value={formData.image} onChange={(e) => setFormData(p => ({ ...p, image: e.target.value }))} className={styles.input} />
                <input type="text" name="features" placeholder="Características (separadas por coma)" value={formData.features} onChange={(e) => setFormData(p => ({ ...p, features: e.target.value }))} className={styles.input} />
            </div>
            <textarea name="description" placeholder="Descripción corta" value={formData.description} onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))} className={styles.textarea} rows={2} />
            <textarea name="longDescription" placeholder="Descripción larga" value={formData.longDescription} onChange={(e) => setFormData(p => ({ ...p, longDescription: e.target.value }))} className={styles.textarea} rows={3} />
            <label className={styles.checkbox}><input type="checkbox" checked={formData.featured} onChange={(e) => setFormData(p => ({ ...p, featured: e.target.checked }))} /> Destacado</label>
            <button type="submit" className={styles.submitBtn}>Guardar</button>
            </form>
        )}

        <div className={styles.list}>
            {services.map(s => (
            <div key={s.id} className={styles.card}>
                <img src={s.image} alt={s.name} className={styles.cardImg} />
                <div className={styles.cardInfo}>
                <span className={styles.cardName}>{s.name}</span>
                <span className={styles.cardCat}>{s.category} · ${s.price}</span>
                </div>
                <button onClick={() => onDelete(s.id)} className={styles.deleteBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
            </div>
            ))}
        </div>
        </div>
    )
    }

    export default AdminPanel