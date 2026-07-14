    import { useState } from 'react'
    import styles from './VacationManager.module.css'
    import type { Employee, VacationRequest } from '../../types'

    interface VacationManagerProps {
    vacations: VacationRequest[]
    employees: Employee[]
    onAdd: (request: Omit<VacationRequest, 'id' | 'createdAt' | 'status'>) => void
    onUpdateStatus: (id: string, status: VacationRequest['status']) => void
    }

    const VacationManager = ({ vacations, employees, onAdd, onUpdateStatus }: VacationManagerProps) => {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        employeeId: '', type: 'vacation' as const, startDate: '', endDate: '', days: 1, reason: ''
    })
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')

    const filtered = vacations.filter(v => filter === 'all' || v.status === filter)
    const activeEmployees = employees.filter(e => e.status === 'active')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.employeeId || !formData.startDate || !formData.endDate) return
        const emp = employees.find(e => e.id === formData.employeeId)
        const days = Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1
        onAdd({ ...formData, days, employeeName: emp ? `${emp.firstName} ${emp.lastName}` : '' })
        setFormData({ employeeId: '', type: 'vacation', startDate: '', endDate: '', days: 1, reason: '' })
        setShowForm(false)
    }

    const getStatusStyle = (status: string) => {
        switch (status) {
        case 'approved': return styles.statusApproved
        case 'pending': return styles.statusPending
        case 'rejected': return styles.statusRejected
        default: return ''
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
        case 'approved': return 'Aprobada'
        case 'pending': return 'Pendiente'
        case 'rejected': return 'Rechazada'
        default: return status
        }
    }

    return (
        <div className={styles.manager}>
        <div className={styles.header}>
            <div>
            <h1 className={styles.title}>Gestión de Vacaciones</h1>
            <p className={styles.count}>{filtered.length} solicitudes</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className={styles.addBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            {showForm ? 'Cancelar' : 'Nueva Solicitud'}
            </button>
        </div>

        {showForm && (
            <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Nueva Solicitud</h3>
            <div className={styles.formGrid}>
                <select value={formData.employeeId} onChange={(e) => setFormData(p => ({ ...p, employeeId: e.target.value }))} required className={styles.input}>
                <option value="">Seleccionar empleado</option>
                {activeEmployees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>)}
                </select>
                <select value={formData.type} onChange={(e) => setFormData(p => ({ ...p, type: e.target.value as typeof formData.type }))} className={styles.input}>
                <option value="vacation">Vacaciones</option>
                <option value="sick">Enfermedad</option>
                <option value="personal">Personal</option>
                <option value="other">Otro</option>
                </select>
                <input type="date" value={formData.startDate} onChange={(e) => setFormData(p => ({ ...p, startDate: e.target.value }))} required className={styles.input} />
                <input type="date" value={formData.endDate} onChange={(e) => setFormData(p => ({ ...p, endDate: e.target.value }))} required className={styles.input} />
            </div>
            <textarea value={formData.reason} onChange={(e) => setFormData(p => ({ ...p, reason: e.target.value }))} placeholder="Motivo..." className={styles.textarea} rows={2} />
            <button type="submit" className={styles.submitBtn}>Enviar Solicitud</button>
            </form>
        )}

        <div className={styles.filters}>
            {(['all', 'pending', 'approved', 'rejected'] as const).map(f => (
            <button key={f} className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? 'Todas' : getStatusLabel(f)}
            </button>
            ))}
        </div>

        <div className={styles.list}>
            {filtered.map(v => (
            <div key={v.id} className={styles.card}>
                <div className={styles.cardHeader}>
                <div>
                    <span className={styles.empName}>{v.employeeName}</span>
                    <span className={styles.type}>
                    {v.type === 'vacation' ? 'Vacaciones' : v.type === 'sick' ? 'Enfermedad' : v.type}
                    </span>
                </div>
                <span className={`${styles.status} ${getStatusStyle(v.status)}`}>{getStatusLabel(v.status)}</span>
                </div>
                <div className={styles.cardBody}>
                <span>{v.startDate} → {v.endDate} ({v.days} días)</span>
                {v.reason && <span className={styles.reason}>{v.reason}</span>}
                </div>
                {v.status === 'pending' && (
                <div className={styles.cardActions}>
                    <button onClick={() => onUpdateStatus(v.id, 'approved')} className={styles.approveBtn}>Aprobar</button>
                    <button onClick={() => onUpdateStatus(v.id, 'rejected')} className={styles.rejectBtn}>Rechazar</button>
                </div>
                )}
            </div>
            ))}
            {filtered.length === 0 && <div className={styles.empty}><p>No hay solicitudes</p></div>}
        </div>
        </div>
    )
    }

    export default VacationManager