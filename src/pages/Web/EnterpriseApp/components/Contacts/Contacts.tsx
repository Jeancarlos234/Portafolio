    import { useState } from 'react'
    import styles from './Contacts.module.css'
    import type { Contact } from '../../types'

    interface ContactsProps {
    contacts: Contact[]
    onAdd: (contact: Omit<Contact, 'id'>) => void
    }

    const Contacts = ({ contacts, onAdd }: ContactsProps) => {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState<{
        name: string
        type: Contact['type']
        email: string
        phone: string
        company: string
        category: string
        notes: string
    }>({ 
        name: '', type: 'client', email: '', phone: '', company: '', category: '', notes: '' 
    })
    const [searchTerm, setSearchTerm] = useState('')
    const [typeFilter, setTypeFilter] = useState<'all' | 'client' | 'supplier' | 'partner'>('all')

    const filtered = contacts
        .filter(c => typeFilter === 'all' || c.type === typeFilter)
        .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.company.toLowerCase().includes(searchTerm.toLowerCase()))

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.email) return
        onAdd({
        name: formData.name,
        type: formData.type,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        category: formData.category,
        notes: formData.notes,
        })
        setFormData({ name: '', type: 'client', email: '', phone: '', company: '', category: '', notes: '' })
        setShowForm(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className={styles.contacts}>
        <div className={styles.header}>
            <h1 className={styles.title}>Contactos</h1>
            <button onClick={() => setShowForm(!showForm)} className={styles.addBtn}>
            {showForm ? 'Cancelar' : '+ Nuevo Contacto'}
            </button>
        </div>

        {showForm && (
            <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
                <input type="text" name="name" placeholder="Nombre *" value={formData.name} onChange={handleChange} required className={styles.input} />
                <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required className={styles.input} />
                <input type="text" name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} className={styles.input} />
                <input type="text" name="company" placeholder="Empresa" value={formData.company} onChange={handleChange} className={styles.input} />
                <select name="type" value={formData.type} onChange={handleChange} className={styles.input}>
                <option value="client">Cliente</option>
                <option value="supplier">Proveedor</option>
                <option value="partner">Socio</option>
                </select>
                <input type="text" name="category" placeholder="Categoría" value={formData.category} onChange={handleChange} className={styles.input} />
            </div>
            <textarea name="notes" placeholder="Notas" value={formData.notes} onChange={handleChange} className={styles.textarea} rows={2} />
            <button type="submit" className={styles.submitBtn}>Guardar</button>
            </form>
        )}

        <div className={styles.toolbar}>
            <div className={styles.searchBox}>
            <span>⌕</span>
            <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
            </div>
            <div className={styles.filters}>
            {(['all', 'client', 'supplier', 'partner'] as const).map(f => (
                <button key={f} className={`${styles.filterBtn} ${typeFilter === f ? styles.active : ''}`} onClick={() => setTypeFilter(f)}>
                {f === 'all' ? 'Todos' : f === 'client' ? 'Clientes' : f === 'supplier' ? 'Proveedores' : 'Socios'}
                </button>
            ))}
            </div>
        </div>

        <div className={styles.grid}>
            {filtered.map(c => (
            <div key={c.id} className={styles.card}>
                <div className={styles.cardAvatar}>{c.name.split(' ').map(n => n[0]).join('')}</div>
                <div className={styles.cardInfo}>
                <span className={styles.cardName}>{c.name}</span>
                <span className={styles.cardCompany}>{c.company}</span>
                <span className={styles.cardEmail}>{c.email}</span>
                </div>
                <span className={`${styles.cardType} ${c.type === 'client' ? styles.typeClient : c.type === 'supplier' ? styles.typeSupplier : styles.typePartner}`}>
                {c.type === 'client' ? 'Cliente' : c.type === 'supplier' ? 'Proveedor' : 'Socio'}
                </span>
            </div>
            ))}
            {filtered.length === 0 && <p className={styles.empty}>Sin contactos</p>}
        </div>
        </div>
    )
    }

    export default Contacts