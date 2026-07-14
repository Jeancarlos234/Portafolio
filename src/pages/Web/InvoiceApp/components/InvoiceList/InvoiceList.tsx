    import { useState } from 'react'
    import styles from './InvoiceList.module.css'
    import type { Invoice } from '../../types'

    interface InvoiceListProps {
    invoices: Invoice[]
    onEdit: (invoice: Invoice) => void
    onDelete: (id: string) => void
    onStatusChange: (id: string, status: Invoice['status']) => void
    onPreview: (invoice: Invoice) => void
    onCreateNew: () => void
    }

    const InvoiceList = ({ invoices, onEdit, onDelete, onStatusChange, onPreview, onCreateNew }: InvoiceListProps) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [sortBy, setSortBy] = useState<'date' | 'total'>('date')
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

    const filtered = invoices
        .filter(inv => statusFilter === 'all' || inv.status === statusFilter)
        .filter(inv =>
        inv.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.clientName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
        const multiplier = sortDir === 'asc' ? 1 : -1
        if (sortBy === 'date') return multiplier * (new Date(a.date).getTime() - new Date(b.date).getTime())
        return multiplier * (a.total - b.total)
        })

    const getStatusStyle = (status: string) => {
        switch (status) {
        case 'paid': return styles.statusPaid
        case 'sent': return styles.statusSent
        case 'draft': return styles.statusDraft
        case 'cancelled': return styles.statusCancelled
        default: return ''
        }
    }

    return (
        <div className={styles.list}>
        <div className={styles.header}>
            <div>
            <h1 className={styles.title}>Facturas</h1>
            <p className={styles.count}>{filtered.length} facturas encontradas</p>
            </div>
            <button onClick={onCreateNew} className={styles.createBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Nueva Factura
            </button>
        </div>

        <div className={styles.toolbar}>
            <div className={styles.searchBox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
                type="text"
                placeholder="Buscar por número o cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
            />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={styles.filterSelect}>
            <option value="all">Todos los estados</option>
            <option value="paid">Pagadas</option>
            <option value="sent">Enviadas</option>
            <option value="draft">Borradores</option>
            <option value="cancelled">Canceladas</option>
            </select>
            <button onClick={() => { setSortBy('date'); setSortDir(d => d === 'asc' ? 'desc' : 'asc') }} className={styles.sortBtn}>
            Fecha {sortBy === 'date' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
            </button>
            <button onClick={() => { setSortBy('total'); setSortDir(d => d === 'asc' ? 'desc' : 'asc') }} className={styles.sortBtn}>
            Monto {sortBy === 'total' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
            </button>
        </div>

        {filtered.length === 0 ? (
            <div className={styles.empty}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
            </svg>
            <h3>No se encontraron facturas</h3>
            <p>Crea tu primera factura para empezar</p>
            <button onClick={onCreateNew} className={styles.emptyBtn}>Crear factura</button>
            </div>
        ) : (
            <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Factura</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Vencimiento</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {filtered.map((inv) => (
                    <tr key={inv.id} className={styles.row}>
                    <td className={styles.invoiceNumber}>#{inv.number}</td>
                    <td>
                        <div className={styles.clientCell}>
                        <div className={styles.clientAvatar}>
                            {inv.clientName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <div className={styles.clientName}>{inv.clientName}</div>
                            <div className={styles.clientEmail}>{inv.clientEmail}</div>
                        </div>
                        </div>
                    </td>
                    <td className={styles.date}>{new Date(inv.date).toLocaleDateString('es-ES')}</td>
                    <td className={styles.date}>{new Date(inv.dueDate).toLocaleDateString('es-ES')}</td>
                    <td className={styles.total}>${inv.total.toLocaleString()}</td>
                    <td>
                        <select
                        value={inv.status}
                        onChange={(e) => onStatusChange(inv.id, e.target.value as Invoice['status'])}
                        className={`${styles.statusSelect} ${getStatusStyle(inv.status)}`}
                        >
                        <option value="draft">Borrador</option>
                        <option value="sent">Enviada</option>
                        <option value="paid">Pagada</option>
                        <option value="cancelled">Cancelada</option>
                        </select>
                    </td>
                    <td>
                        <div className={styles.actions}>
                        <button onClick={() => onPreview(inv)} className={styles.actionBtn} title="Ver">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                        <button onClick={() => onEdit(inv)} className={styles.actionBtn} title="Editar">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                        <button onClick={() => onDelete(inv.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Eliminar">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </div>
    )
    }

    export default InvoiceList