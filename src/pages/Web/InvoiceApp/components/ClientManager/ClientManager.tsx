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
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', address: '', taxId: ''
    })
    const [searchTerm, setSearchTerm] = useState('')

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.taxId.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.email) return
        onAdd(formData)
        setFormData({ name: '', email: '', phone: '', address: '', taxId: '' })
        setShowForm(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className={styles.manager}>
        <div className={styles.header}>
            <div>
            <h1 className={styles.title}>Clientes</h1>
            <p className={styles.count}>{clients.length} clientes registrados</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className={styles.addBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            {showForm ? 'Cancelar' : 'Nuevo Cliente'}
            </button>
        </div>

        {showForm && (
            <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.formTitle}>Nuevo Cliente</h3>
            <div className={styles.formGrid}>
                <input type="text" name="name" placeholder="Nombre completo *" value={formData.name} onChange={handleChange} required className={styles.input} />
                <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required className={styles.input} />
                <input type="text" name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} className={styles.input} />
                <input type="text" name="address" placeholder="Dirección" value={formData.address} onChange={handleChange} className={styles.input} />
                <input type="text" name="taxId" placeholder="ID Fiscal (CIF/NIF)" value={formData.taxId} onChange={handleChange} className={styles.input} />
            </div>
            <button type="submit" className={styles.submitBtn}>Guardar Cliente</button>
            </form>
        )}

        <div className={styles.searchBox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Buscar clientes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
        </div>

        <div className={styles.grid}>
            {filteredClients.map(client => (
            <div key={client.id} className={styles.card}>
                <div className={styles.cardHeader}>
                <div className={styles.avatar}>
                    {client.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className={styles.cardInfo}>
                    <h3 className={styles.clientName}>{client.name}</h3>
                    <span className={styles.clientTaxId}>{client.taxId}</span>
                </div>
                <button onClick={() => onDelete(client.id)} className={styles.deleteBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
                </div>
                <div className={styles.cardDetails}>
                <div className={styles.detail}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                    {client.email}
                </div>
                <div className={styles.detail}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    {client.phone || 'Sin teléfono'}
                </div>
                <div className={styles.detail}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {client.address || 'Sin dirección'}
                </div>
                </div>
            </div>
            ))}
            {filteredClients.length === 0 && (
            <div className={styles.empty}>
                <p>No se encontraron clientes</p>
            </div>
            )}
        </div>
        </div>
    )
    }

    export default ClientManager