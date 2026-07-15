    import { useState } from 'react'
    import styles from './ClientPanel.module.css'
    import type { Client } from '../../types'

    interface ClientPanelProps {
    clients: Client[]
    onAdd: (client: Omit<Client, 'id'>) => void
    onDelete: (id: string) => void
    }

    const ClientPanel = ({ clients, onAdd, onDelete }: ClientPanelProps) => {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', address: '' })
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedClient, setSelectedClient] = useState<Client | null>(null)

    const filtered = clients.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.company.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.email) return
        onAdd(formData)
        setFormData({ name: '', email: '', phone: '', company: '', address: '' })
        setShowForm(false)
    }

    return (
        <div className={styles.panel}>
        <div className={styles.grid}>
            <div className={styles.listCard}>
            <div className={styles.listHeader}>
                <h2>Clientes ({clients.length})</h2>
                <button onClick={() => { setShowForm(!showForm); setSelectedClient(null) }} className={styles.addBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                {showForm ? 'Cancelar' : 'Nuevo'}
                </button>
            </div>

            <div className={styles.searchBox}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" placeholder="Buscar clientes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
            </div>

            <div className={styles.clientList}>
                {filtered.map(c => (
                <div key={c.id} className={`${styles.clientItem} ${selectedClient?.id === c.id ? styles.selected : ''}`} onClick={() => setSelectedClient(c)}>
                    <div className={styles.clientAvatar}>{c.name.split(' ').map(n => n[0]).join('')}</div>
                    <div className={styles.clientInfo}>
                    <span className={styles.clientName}>{c.name}</span>
                    <span className={styles.clientCompany}>{c.company}</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); onDelete(c.id) }} className={styles.deleteBtn}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                </div>
                ))}
            </div>
            </div>

            <div className={styles.detailCard}>
            {showForm ? (
                <form onSubmit={handleSubmit} className={styles.form}>
                <h3>Nuevo Cliente</h3>
                <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                    <label className={styles.label}>Nombre *</label>
                    <input type="text" placeholder="Nombre completo" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} required className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                    <label className={styles.label}>Email *</label>
                    <input type="email" placeholder="correo@ejemplo.com" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} required className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                    <label className={styles.label}>Teléfono</label>
                    <input type="text" placeholder="+34 600 000 000" value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))} className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                    <label className={styles.label}>Empresa</label>
                    <input type="text" placeholder="Nombre de la empresa" value={formData.company} onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))} className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                    <label className={styles.label}>Dirección</label>
                    <input type="text" placeholder="Dirección completa" value={formData.address} onChange={(e) => setFormData(p => ({ ...p, address: e.target.value }))} className={styles.input} />
                    </div>
                </div>
                <button type="submit" className={styles.submitBtn}>Guardar Cliente</button>
                </form>
            ) : selectedClient ? (
                <div className={styles.detail}>
                <div className={styles.detailAvatar}>{selectedClient.name.split(' ').map(n => n[0]).join('')}</div>
                <h3>{selectedClient.name}</h3>
                <div className={styles.detailInfo}>
                    <div className={styles.detailRow}><span>Empresa</span><strong>{selectedClient.company}</strong></div>
                    <div className={styles.detailRow}><span>Email</span><strong>{selectedClient.email}</strong></div>
                    <div className={styles.detailRow}><span>Teléfono</span><strong>{selectedClient.phone}</strong></div>
                    <div className={styles.detailRow}><span>Dirección</span><strong>{selectedClient.address}</strong></div>
                </div>
                </div>
            ) : (
                <div className={styles.empty}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                <p>Selecciona un cliente para ver detalles</p>
                </div>
            )}
            </div>
        </div>
        </div>
    )
    }

    export default ClientPanel