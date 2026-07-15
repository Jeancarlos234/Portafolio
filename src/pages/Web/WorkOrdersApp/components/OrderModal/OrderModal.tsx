    import { useState } from 'react'
    import styles from './OrderModal.module.css'
    import type { WorkOrder, Client, Technician } from '../../types'

    interface OrderModalProps {
    order: WorkOrder | null
    clients: Client[]
    technicians: Technician[]
    onSave: (order: Partial<WorkOrder>) => void
    onClose: () => void
    }

    const OrderModal = ({ order, clients, technicians, onSave, onClose }: OrderModalProps) => {
    // ✅ Valores iniciales desde order (sin useEffect)
    const [formData, setFormData] = useState({
        title: order?.title || '',
        description: order?.description || '',
        clientId: order?.clientId || '',
        clientName: order?.clientName || '',
        clientContact: order?.clientContact || '',
        assignedTo: order?.assignedTo || '',
        priority: (order?.priority || 'medium') as WorkOrder['priority'],
        category: order?.category || 'Soporte Técnico',
        location: order?.location || '',
        scheduledDate: order?.scheduledDate || new Date().toISOString().split('T')[0],
        startTime: order?.startTime || '09:00',
        endTime: order?.endTime || '14:00',
        estimatedHours: order?.estimatedHours || 5,
        actualHours: order?.actualHours || 0,
        materials: order?.materials || '',
        notes: order?.notes || '',
        status: (order?.status || 'pending') as WorkOrder['status']
    })

    const categories = ['Soporte Técnico', 'Instalación', 'Mantenimiento', 'Reparación', 'Consultoría', 'Emergencia', 'Seguridad']
    const priorities = ['low', 'medium', 'high', 'urgent'] as const
    const statuses = ['pending', 'assigned', 'in_progress', 'completed', 'cancelled'] as const

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.title || !formData.clientId) return
        const client = clients.find(c => c.id === formData.clientId)
        onSave({ ...formData, clientName: client?.name || '', clientContact: client?.phone || '' })
        onClose()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: name === 'estimatedHours' || name === 'actualHours' ? Number(value) : value }))
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
            <h2>{order ? 'Editar Orden' : 'Nueva Orden de Trabajo'}</h2>
            <button onClick={onClose} className={styles.closeBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                <label className={styles.label}>Título *</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className={styles.input} placeholder="Título de la orden" />
                </div>
                <div className={styles.formGroup}>
                <label className={styles.label}>Categoría</label>
                <select name="category" value={formData.category} onChange={handleChange} className={styles.input}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                </div>
                <div className={styles.formGroup}>
                <label className={styles.label}>Cliente *</label>
                <select name="clientId" value={formData.clientId} onChange={handleChange} required className={styles.input}>
                    <option value="">Seleccionar cliente...</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name} - {c.company}</option>)}
                </select>
                </div>
                <div className={styles.formGroup}>
                <label className={styles.label}>Asignar a</label>
                <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} className={styles.input}>
                    <option value="">Sin asignar</option>
                    {technicians.filter(t => t.active).map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                </select>
                </div>
                <div className={styles.formGroup}>
                <label className={styles.label}>Prioridad</label>
                <select name="priority" value={formData.priority} onChange={handleChange} className={styles.input}>
                    {priorities.map(p => <option key={p} value={p}>{p === 'urgent' ? 'Urgente' : p === 'high' ? 'Alta' : p === 'medium' ? 'Media' : 'Baja'}</option>)}
                </select>
                </div>
                {order && (
                <div className={styles.formGroup}>
                    <label className={styles.label}>Estado</label>
                    <select name="status" value={formData.status} onChange={handleChange} className={styles.input}>
                    {statuses.map(s => <option key={s} value={s}>{s === 'pending' ? 'Pendiente' : s === 'assigned' ? 'Asignado' : s === 'in_progress' ? 'En Progreso' : s === 'completed' ? 'Completado' : 'Cancelado'}</option>)}
                    </select>
                </div>
                )}
                <div className={styles.formGroup}>
                <label className={styles.label}>Ubicación</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className={styles.input} placeholder="Dirección" />
                </div>
                <div className={styles.formGroup}>
                <label className={styles.label}>Fecha programada</label>
                <input type="date" name="scheduledDate" value={formData.scheduledDate} onChange={handleChange} className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                <label className={styles.label}>Hora inicio</label>
                <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                <label className={styles.label}>Hora fin</label>
                <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                <label className={styles.label}>Horas estimadas</label>
                <input type="number" name="estimatedHours" value={formData.estimatedHours || ''} onChange={handleChange} className={styles.input} min="0" />
                </div>
                <div className={styles.formGroup}>
                <label className={styles.label}>Horas reales</label>
                <input type="number" name="actualHours" value={formData.actualHours || ''} onChange={handleChange} className={styles.input} min="0" />
                </div>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Descripción</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className={styles.textarea} rows={3} placeholder="Descripción detallada" />
            </div>
            <div className={styles.formRow}>
                <div className={styles.formGroup} style={{ flex: 1 }}>
                <label className={styles.label}>Materiales</label>
                <input type="text" name="materials" value={formData.materials} onChange={handleChange} className={styles.input} placeholder="Materiales necesarios" />
                </div>
                <div className={styles.formGroup} style={{ flex: 1 }}>
                <label className={styles.label}>Notas</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} className={styles.textarea} rows={2} placeholder="Notas adicionales" />
                </div>
            </div>
            <div className={styles.buttons}>
                <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancelar</button>
                <button type="submit" className={styles.saveBtn}>{order ? 'Actualizar' : 'Crear Orden'}</button>
            </div>
            </form>
        </div>
        </div>
    )
    }

    export default OrderModal