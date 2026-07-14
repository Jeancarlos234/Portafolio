    import { useState } from 'react'
    import styles from './OrdersList.module.css'
    import type { Order } from '../../types'

    interface OrdersListProps {
    orders: Order[]
    onUpdateStatus: (id: string, status: Order['status']) => void
    }

    const OrdersList = ({ orders, onUpdateStatus }: OrdersListProps) => {
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const [statusFilter, setStatusFilter] = useState('all')

    const filtered = orders.filter(o => statusFilter === 'all' || o.status === statusFilter)

    const getStatusStyle = (status: string) => {
        switch (status) {
        case 'pending': return styles.statusPending
        case 'processing': return styles.statusProcessing
        case 'shipped': return styles.statusShipped
        case 'delivered': return styles.statusDelivered
        case 'cancelled': return styles.statusCancelled
        default: return ''
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
        case 'pending': return 'Pendiente'
        case 'processing': return 'Procesando'
        case 'shipped': return 'Enviado'
        case 'delivered': return 'Entregado'
        case 'cancelled': return 'Cancelado'
        default: return status
        }
    }

    return (
        <div className={styles.orders}>
        <div className={styles.header}>
            <div>
            <h1 className={styles.title}>Pedidos</h1>
            <p className={styles.count}>{filtered.length} pedidos</p>
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={styles.filterSelect}>
            <option value="all">Todos</option>
            <option value="pending">Pendientes</option>
            <option value="processing">Procesando</option>
            <option value="shipped">Enviados</option>
            <option value="delivered">Entregados</option>
            <option value="cancelled">Cancelados</option>
            </select>
        </div>

        <div className={styles.list}>
            {filtered.map(order => (
            <div key={order.id} className={styles.card}>
                <div className={styles.cardHeader} onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}>
                <div className={styles.cardInfo}>
                    <span className={styles.orderId}>#{order.id}</span>
                    <span className={styles.orderDate}>{new Date(order.date).toLocaleDateString('es-ES')}</span>
                    <span className={styles.orderTotal}>${order.total.toLocaleString()}</span>
                </div>
                <div className={styles.cardActions}>
                    <span className={`${styles.orderStatus} ${getStatusStyle(order.status)}`}>{getStatusLabel(order.status)}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${styles.chevron} ${expandedId === order.id ? styles.rotated : ''}`}>
                    <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </div>
                </div>

                {expandedId === order.id && (
                <div className={styles.cardBody}>
                    <div className={styles.customerInfo}>
                    <h4>Cliente</h4>
                    <p>{order.customer.name}</p>
                    <p>{order.customer.email}</p>
                    <p>{order.customer.address}, {order.customer.city}</p>
                    </div>

                    <div className={styles.itemsList}>
                    <h4>Productos</h4>
                    {order.items.map((item, i) => (
                        <div key={i} className={styles.item}>
                        <img src={item.image} alt={item.name} />
                        <span>{item.name} x{item.quantity}</span>
                        <span>${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    ))}
                    </div>

                    <div className={styles.statusUpdate}>
                    <h4>Actualizar estado</h4>
                    <div className={styles.statusButtons}>
                        {(['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map(s => (
                        <button
                            key={s}
                            className={`${styles.statusBtn} ${order.status === s ? styles.activeStatus : ''} ${getStatusStyle(s)}`}
                            onClick={() => onUpdateStatus(order.id, s)}
                        >
                            {getStatusLabel(s)}
                        </button>
                        ))}
                    </div>
                    </div>
                </div>
                )}
            </div>
            ))}
            {filtered.length === 0 && (
            <div className={styles.empty}><p>No hay pedidos</p></div>
            )}
        </div>
        </div>
    )
    }

    export default OrdersList