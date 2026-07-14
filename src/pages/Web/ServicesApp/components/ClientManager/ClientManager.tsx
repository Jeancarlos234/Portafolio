    import { useState } from 'react'
    import styles from './ClientManager.module.css'
    import type { Client } from '../../types'

    interface ClientManagerProps {
    clients: Client[]
    onAdd: (client: Omit<Client, 'id'>) => void
    onDelete: (id: string) => void
    }

    const ClientManager = ({ clients, onAdd, onDelete }: ClientManagerProps) => {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', address: '' })
    const [searchTerm, setSearchTerm] = useState('')

    const filtered = clients.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.company.toLowerCase().includes(searchTerm.toLowerCase()))

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.email) return
        onAdd(formData)
        setFormData({ name: '', email: '', phone: '', company: '', address: '' })
        setShowForm(false)
    }

    return (
        <div className={styles.manager}>
        <div className={styles.header}>
            <h1 className={styles.title}>Clientes</h1>
            <button onClick={() => setShowForm(!showForm)} className={styles.addBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            {showForm ? 'Cancelar' : 'Nuevo Cliente'}
            </button>
        </div>

        {showForm && (
            <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
                <input type="text" placeholder="Nombre *" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} required className={styles.input} />
                <input type="email" placeholder="Email *" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} required className={styles.input} />
                <input type="text" placeholder="Teléfono" value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))} className={styles.input} />
                <input type="text" placeholder="Empresa" value={formData.company} onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))} className={styles.input} />
                <input type="text" placeholder="Dirección" value={formData.address} onChange={(e) => setFormData(p => ({ ...p, address: e.target.value }))} className={styles.input} />
            </div>
            <button type="submit" className={styles.submitBtn}>Guardar</button>
            </form>
        )}

        <div className={styles.searchBox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Buscar clientes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
        </div>

        <div className={styles.grid}>
            {filtered.map(c => (
            <div key={c.id} className={styles.card}>
                <div className={styles.avatar}>{c.name.split(' ').map(n => n[0]).join('')}</div>
                <div className={styles.info}>
                <span className={styles.clientName}>{c.name}</span>
                <span className={styles.clientCompany}>{c.company}</span>
                <span className={styles.clientEmail}>{c.email}</span>
                </div>
                <button onClick={() => onDelete(c.id)} className={styles.deleteBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
            </div>
            ))}
        </div>
        </div>
    )
    }

    export default ClientManager