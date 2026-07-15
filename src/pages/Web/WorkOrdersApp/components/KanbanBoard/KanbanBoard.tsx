    import { useState } from 'react'
    import KanbanCard from '../KanbanCard/KanbanCard'
    import styles from './KanbanBoard.module.css'
    import type { WorkOrder } from '../../types'

    interface KanbanBoardProps {
    orders: WorkOrder[]
    onUpdate: (id: string, updates: Partial<WorkOrder>) => void
    onEdit: (order: WorkOrder) => void
    onDelete: (id: string) => void
    }

    const columns = [
    { status: 'pending' as const, title: 'Pendientes', color: '#f59e0b' },
    { status: 'assigned' as const, title: 'Asignadas', color: '#3b82f6' },
    { status: 'in_progress' as const, title: 'En Progreso', color: '#ea580c' },
    { status: 'completed' as const, title: 'Completadas', color: '#22c55e' },
    { status: 'cancelled' as const, title: 'Canceladas', color: '#94a3b8' },
    ]

    const KanbanBoard = ({ orders, onUpdate, onEdit, onDelete }: KanbanBoardProps) => {
    const [draggedOrder, setDraggedOrder] = useState<string | null>(null)

    const handleDragStart = (id: string) => setDraggedOrder(id)
    const handleDragOver = (e: React.DragEvent) => e.preventDefault()

    const handleDrop = (status: WorkOrder['status']) => {
        if (draggedOrder) {
        onUpdate(draggedOrder, { status })
        setDraggedOrder(null)
        }
    }

    return (
        <div className={styles.board}>
        {columns.map(col => (
            <div key={col.status} className={styles.column} onDragOver={handleDragOver} onDrop={() => handleDrop(col.status)}>
            <div className={styles.columnHeader}>
                <div className={styles.columnDot} style={{ backgroundColor: col.color }} />
                <h3 className={styles.columnTitle}>{col.title}</h3>
                <span className={styles.columnCount}>{orders.filter(o => o.status === col.status).length}</span>
            </div>
            <div className={styles.columnBody}>
                {orders.filter(o => o.status === col.status).map(o => (
                <KanbanCard key={o.id} order={o} onDragStart={handleDragStart} onEdit={onEdit} onDelete={onDelete} />
                ))}
                {orders.filter(o => o.status === col.status).length === 0 && (
                <div className={styles.emptyColumn}>Sin órdenes</div>
                )}
            </div>
            </div>
        ))}
        </div>
    )
    }

    export default KanbanBoard