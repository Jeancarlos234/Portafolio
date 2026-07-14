    import { useState } from 'react'
    import styles from './EmployeeList.module.css'
    import type { Employee } from '../../types'

    interface EmployeeListProps {
    employees: Employee[]
    onAdd: () => void
    onEdit: (employee: Employee) => void
    onDelete: (id: string) => void
    }

    const EmployeeList = ({ employees, onAdd, onEdit, onDelete }: EmployeeListProps) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [deptFilter, setDeptFilter] = useState('all')
    const [statusFilter, setStatusFilter] = useState('all')

    const departments = ['all', ...Array.from(new Set(employees.map(e => e.department)))]

    const filtered = employees
        .filter(e => deptFilter === 'all' || e.department === deptFilter)
        .filter(e => statusFilter === 'all' || e.status === statusFilter)
        .filter(e => 
        `${e.firstName} ${e.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.email.toLowerCase().includes(searchTerm.toLowerCase())
        )

    const getStatusStyle = (status: string) => {
        switch (status) {
        case 'active': return styles.statusActive
        case 'inactive': return styles.statusInactive
        case 'on_leave': return styles.statusLeave
        default: return ''
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
        case 'active': return 'Activo'
        case 'inactive': return 'Inactivo'
        case 'on_leave': return 'Vacaciones'
        default: return status
        }
    }

    return (
        <div className={styles.list}>
        <div className={styles.header}>
            <div>
            <h1 className={styles.title}>Empleados</h1>
            <p className={styles.count}>{filtered.length} empleados</p>
            </div>
            <button onClick={onAdd} className={styles.addBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Nuevo Empleado
            </button>
        </div>

        <div className={styles.toolbar}>
            <div className={styles.searchBox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Buscar por nombre o email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
            </div>
            <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className={styles.select}>
            <option value="all">Todos los departamentos</option>
            {departments.filter(d => d !== 'all').map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={styles.select}>
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
            <option value="on_leave">De vacaciones</option>
            </select>
        </div>

        <div className={styles.grid}>
            {filtered.map(emp => (
            <div key={emp.id} className={styles.card}>
                <div className={styles.cardHeader}>
                <div className={styles.avatar}>
                    {emp.firstName[0]}{emp.lastName[0]}
                </div>
                <div className={styles.cardInfo}>
                    <h3 className={styles.empName}>{emp.firstName} {emp.lastName}</h3>
                    <span className={styles.empPosition}>{emp.position}</span>
                </div>
                <span className={`${styles.status} ${getStatusStyle(emp.status)}`}>{getStatusLabel(emp.status)}</span>
                </div>
                <div className={styles.cardBody}>
                <div className={styles.detail}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    {emp.email}
                </div>
                <div className={styles.detail}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    {emp.phone}
                </div>
                <div className={styles.detail}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Contratado: {new Date(emp.hireDate).toLocaleDateString('es-ES')}
                </div>
                <div className={styles.detail}>
                    <span className={styles.deptBadge}>{emp.department}</span>
                    <span className={styles.salary}>${emp.salary.toLocaleString()}/año</span>
                </div>
                </div>
                <div className={styles.cardFooter}>
                <button onClick={() => onEdit(emp)} className={styles.editBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    Editar
                </button>
                <button onClick={() => onDelete(emp.id)} className={styles.deleteBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    Eliminar
                </button>
                </div>
            </div>
            ))}
            {filtered.length === 0 && <div className={styles.empty}><p>No se encontraron empleados</p></div>}
        </div>
        </div>
    )
    }

    export default EmployeeList