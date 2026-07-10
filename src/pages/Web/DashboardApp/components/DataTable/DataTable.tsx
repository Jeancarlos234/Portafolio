    import { useState, useMemo } from 'react'
    import styles from './DataTable.module.css'

    interface Order {
    id: string
    customer: string
    email: string
    product: string
    amount: number
    date: string
    status: 'completed' | 'pending' | 'cancelled' | 'processing'
    paymentMethod: string
    }

    const DataTable = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [sortField, setSortField] = useState<'date' | 'amount'>('date')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const orders: Order[] = [
        { id: '#ORD-7841', customer: 'Carlos García', email: 'carlos@email.com', product: 'MacBook Pro 14"', amount: 2499, date: '2024-12-15', status: 'completed', paymentMethod: 'Tarjeta' },
        { id: '#ORD-7842', customer: 'María López', email: 'maria@email.com', product: 'iPhone 15 Pro', amount: 1299, date: '2024-12-14', status: 'processing', paymentMethod: 'PayPal' },
        { id: '#ORD-7843', customer: 'Ana Martínez', email: 'ana@email.com', product: 'AirPods Pro', amount: 249, date: '2024-12-14', status: 'completed', paymentMethod: 'Tarjeta' },
        { id: '#ORD-7844', customer: 'Roberto Sánchez', email: 'roberto@email.com', product: 'iPad Air', amount: 799, date: '2024-12-13', status: 'pending', paymentMethod: 'Transferencia' },
        { id: '#ORD-7845', customer: 'Laura Fernández', email: 'laura@email.com', product: 'Apple Watch', amount: 499, date: '2024-12-13', status: 'completed', paymentMethod: 'Tarjeta' },
        { id: '#ORD-7846', customer: 'Diego Ramírez', email: 'diego@email.com', product: 'Mac Mini', amount: 699, date: '2024-12-12', status: 'cancelled', paymentMethod: 'PayPal' },
        { id: '#ORD-7847', customer: 'Patricia Herrera', email: 'patricia@email.com', product: 'iMac 24"', amount: 1499, date: '2024-12-12', status: 'completed', paymentMethod: 'Tarjeta' },
        { id: '#ORD-7848', customer: 'Javier Morales', email: 'javier@email.com', product: 'Magic Keyboard', amount: 149, date: '2024-12-11', status: 'processing', paymentMethod: 'Tarjeta' },
        { id: '#ORD-7849', customer: 'Sofía Castro', email: 'sofia@email.com', product: 'MacBook Air', amount: 1199, date: '2024-12-11', status: 'completed', paymentMethod: 'Transferencia' },
        { id: '#ORD-7850', customer: 'Andrés Ruiz', email: 'andres@email.com', product: 'Studio Display', amount: 1799, date: '2024-12-10', status: 'completed', paymentMethod: 'Tarjeta' },
        { id: '#ORD-7851', customer: 'Gabriela Torres', email: 'gabriela@email.com', product: 'AirTag 4-pack', amount: 99, date: '2024-12-10', status: 'pending', paymentMethod: 'PayPal' },
        { id: '#ORD-7852', customer: 'Fernando Vega', email: 'fernando@email.com', product: 'HomePod mini', amount: 99, date: '2024-12-09', status: 'completed', paymentMethod: 'Tarjeta' },
    ]

    const filteredOrders = useMemo(() => {
        return orders
        .filter(order => {
            const matchesSearch = 
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.product.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesStatus = statusFilter === 'all' || order.status === statusFilter
            return matchesSearch && matchesStatus
        })
        .sort((a, b) => {
            const multiplier = sortDirection === 'asc' ? 1 : -1
            if (sortField === 'date') return multiplier * (new Date(a.date).getTime() - new Date(b.date).getTime())
            return multiplier * (a.amount - b.amount)
        })
    }, [orders, searchTerm, statusFilter, sortField, sortDirection])

    const totalPages = Math.ceil(filteredOrders.length / rowsPerPage)
    const paginatedOrders = filteredOrders.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

    const handleSort = (field: 'date' | 'amount') => {
        if (sortField === field) {
        setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
        } else {
        setSortField(field)
        setSortDirection('desc')
        }
    }

    const getStatusStyle = (status: string) => {
        switch (status) {
        case 'completed': return styles.statusCompleted
        case 'pending': return styles.statusPending
        case 'cancelled': return styles.statusCancelled
        case 'processing': return styles.statusProcessing
        default: return ''
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
        case 'completed': return 'Completado'
        case 'pending': return 'Pendiente'
        case 'cancelled': return 'Cancelado'
        case 'processing': return 'Procesando'
        default: return status
        }
    }

    return (
        <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
            <div className={styles.tableActions}>
            <div className={styles.searchBox}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                type="text"
                placeholder="Buscar órdenes..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
                className={styles.searchInput}
                />
            </div>
            <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1) }}
                className={styles.statusSelect}
            >
                <option value="all">Todos los estados</option>
                <option value="completed">Completados</option>
                <option value="pending">Pendientes</option>
                <option value="processing">Procesando</option>
                <option value="cancelled">Cancelados</option>
            </select>
            <select
                value={rowsPerPage}
                onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1) }}
                className={styles.rowsSelect}
            >
                <option value={5}>5 por página</option>
                <option value={10}>10 por página</option>
                <option value={25}>25 por página</option>
            </select>
            </div>
            <button className={styles.exportBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Exportar CSV
            </button>
        </div>

        <div className={styles.tableWrapper}>
            <table className={styles.table}>
            <thead>
                <tr>
                <th>Orden ID</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th onClick={() => handleSort('amount')} className={styles.sortable}>
                    Monto {sortField === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('date')} className={styles.sortable}>
                    Fecha {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th>Estado</th>
                <th>Pago</th>
                </tr>
            </thead>
            <tbody>
                {paginatedOrders.map((order) => (
                <tr key={order.id} className={styles.tableRow}>
                    <td className={styles.orderId}>{order.id}</td>
                    <td>
                    <div className={styles.customerCell}>
                        <div className={styles.customerAvatar}>
                        {order.customer.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                        <div className={styles.customerName}>{order.customer}</div>
                        <div className={styles.customerEmail}>{order.email}</div>
                        </div>
                    </div>
                    </td>
                    <td>{order.product}</td>
                    <td className={styles.amount}>${order.amount.toLocaleString()}</td>
                    <td className={styles.date}>{new Date(order.date).toLocaleDateString('es-ES')}</td>
                    <td>
                    <span className={`${styles.status} ${getStatusStyle(order.status)}`}>
                        {getStatusLabel(order.status)}
                    </span>
                    </td>
                    <td>{order.paymentMethod}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        <div className={styles.tableFooter}>
            <span className={styles.showingResults}>
            Mostrando {((currentPage - 1) * rowsPerPage) + 1}-
            {Math.min(currentPage * rowsPerPage, filteredOrders.length)} de {filteredOrders.length} resultados
            </span>
            <div className={styles.pagination}>
            <button
                className={styles.pageBtn}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
                </svg>
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number
                if (totalPages <= 5) {
                pageNum = i + 1
                } else if (currentPage <= 3) {
                pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
                } else {
                pageNum = currentPage - 2 + i
                }
                return (
                <button
                    key={pageNum}
                    className={`${styles.pageBtn} ${currentPage === pageNum ? styles.activePage : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                >
                    {pageNum}
                </button>
                )
            })}
            <button
                className={styles.pageBtn}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
                </svg>
            </button>
            </div>
        </div>
        </div>
    )
    }

    export default DataTable