    import { useState } from 'react'
    import styles from './AttendanceHistory.module.css'
    import type { AttendanceRecord, Employee } from '../../types'

    interface AttendanceHistoryProps {
    attendance: AttendanceRecord[]
    employees: Employee[]
    }

    const AttendanceHistory = ({ attendance, employees }: AttendanceHistoryProps) => {
    const [employeeFilter, setEmployeeFilter] = useState('all')
    const [monthFilter, setMonthFilter] = useState(new Date().toISOString().slice(0, 7))

    const filtered = attendance
        .filter(a => employeeFilter === 'all' || a.employeeId === employeeFilter)
        .filter(a => a.date.startsWith(monthFilter))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const getStatusStyle = (status: string) => {
        switch (status) {
        case 'present': return styles.statusPresent
        case 'late': return styles.statusLate
        case 'absent': return styles.statusAbsent
        default: return ''
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
        case 'present': return 'Presente'
        case 'late': return 'Tarde'
        case 'absent': return 'Ausente'
        default: return status
        }
    }

    return (
        <div className={styles.history}>
        <div className={styles.header}>
            <div>
            <h1 className={styles.title}>Historial de Asistencias</h1>
            <p className={styles.count}>{filtered.length} registros</p>
            </div>
        </div>

        <div className={styles.toolbar}>
            <select value={employeeFilter} onChange={(e) => setEmployeeFilter(e.target.value)} className={styles.select}>
            <option value="all">Todos los empleados</option>
            {employees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>)}
            </select>
            <input type="month" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} className={styles.select} />
        </div>

        <div className={styles.tableWrapper}>
            <table className={styles.table}>
            <thead><tr><th>Empleado</th><th>Fecha</th><th>Entrada</th><th>Salida</th><th>Estado</th><th>Notas</th></tr></thead>
            <tbody>
                {filtered.map(a => (
                <tr key={a.id} className={styles.row}>
                    <td className={styles.empName}>{a.employeeName}</td>
                    <td>{new Date(a.date).toLocaleDateString('es-ES')}</td>
                    <td>{a.checkIn}</td>
                    <td>{a.checkOut}</td>
                    <td><span className={`${styles.status} ${getStatusStyle(a.status)}`}>{getStatusLabel(a.status)}</span></td>
                    <td className={styles.notes}>{a.notes || '-'}</td>
                </tr>
                ))}
            </tbody>
            </table>
            {filtered.length === 0 && <div className={styles.empty}><p>No hay registros</p></div>}
        </div>
        </div>
    )
    }

    export default AttendanceHistory