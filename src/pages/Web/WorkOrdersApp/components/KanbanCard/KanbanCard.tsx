    import styles from './KanbanCard.module.css'
    import type { WorkOrder } from '../../types'

    interface KanbanCardProps {
    order: WorkOrder
    onDragStart: (id: string) => void
    onEdit: (order: WorkOrder) => void
    onDelete: (id: string) => void
    }

    const KanbanCard = ({ order, onDragStart, onEdit, onDelete }: KanbanCardProps) => {
    const getPriorityColor = (p: string) => {
        switch (p) { case 'urgent': return '#dc2626'; case 'high': return '#ea580c'; case 'medium': return '#f59e0b'; case 'low': return '#22c55e'; default: return '#94a3b8' }
    }

    return (
        <div className={styles.card} draggable onDragStart={() => onDragStart(order.id)}>
        <div className={styles.priorityLine} style={{ backgroundColor: getPriorityColor(order.priority) }} />
        <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
            <span className={styles.number}>{order.number}</span>
            <div className={styles.actions}>
                <button onClick={() => onEdit(order)} className={styles.actionBtn} title="Editar">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button onClick={() => onDelete(order.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Eliminar">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
            </div>
            </div>
            <h4 className={styles.title}>{order.title}</h4>
            <div className={styles.meta}>
            <span>{order.clientName}</span>
            {order.assignedTo && <span className={styles.assigned}>{order.assignedTo}</span>}
            </div>
            <div className={styles.footer}>
            <span className={styles.date}>{new Date(order.scheduledDate).toLocaleDateString('es-ES')}</span>
            <span className={styles.hours}>{order.estimatedHours}h</span>
            </div>
        </div>
        </div>
    )
    }

    export default KanbanCard