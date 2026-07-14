    import { useState } from 'react'
    import styles from './Reports.module.css'
    import type { Employee, AttendanceRecord } from '../../types'

    interface ReportsProps {
    employees: Employee[]
    attendance: AttendanceRecord[]
    }

    const Reports = ({ employees, attendance }: ReportsProps) => {
    const [reportType, setReportType] = useState<'attendance' | 'departments'>('attendance')
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))

    const monthAttendance = attendance.filter(a => a.date.startsWith(selectedMonth))

    const getEmployeeReport = () => {
        return employees
        .filter(e => e.status === 'active')
        .map(e => {
            const empAttendance = monthAttendance.filter(a => a.employeeId === e.id)
            const present = empAttendance.filter(a => a.status === 'present' || a.status === 'late').length
            const absent = empAttendance.filter(a => a.status === 'absent').length
            const late = empAttendance.filter(a => a.status === 'late').length
            const rate = empAttendance.length > 0 ? Math.round((present / empAttendance.length) * 100) : 0
            return { ...e, present, absent, late, rate, total: empAttendance.length }
        })
    }

    const getDepartmentReport = () => {
        const depts = Array.from(new Set(employees.map(e => e.department)))
        return depts.map(dept => {
        const deptEmployees = employees.filter(e => e.department === dept)
        const count = deptEmployees.length
        return { department: dept, count }
        })
    }

    const exportCSV = (data: Record<string, unknown>[], filename: string) => {
        const headers = Object.keys(data[0] || {})
        const csv = [headers.join(','), ...data.map(row => headers.map(h => JSON.stringify(row[h] || '')).join(','))].join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url; a.download = filename; a.click()
    }

    return (
        <div className={styles.reports}>
        <div className={styles.header}>
            <h1 className={styles.title}>Reportes</h1>
        </div>

        <div className={styles.tabs}>
            {[
            { value: 'attendance' as const, label: 'Asistencia' },
            { value: 'departments' as const, label: 'Departamentos' },
            ].map(tab => (
            <button key={tab.value} className={`${styles.tab} ${reportType === tab.value ? styles.active : ''}`} onClick={() => setReportType(tab.value)}>
                {tab.label}
            </button>
            ))}
        </div>

        <div className={styles.controls}>
            <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className={styles.select} />
            <button onClick={() => exportCSV(getEmployeeReport(), `reporte-asistencia-${selectedMonth}.csv`)} className={styles.exportBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Exportar CSV
            </button>
        </div>

        {reportType === 'attendance' && (
            <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead><tr><th>Empleado</th><th>Presente</th><th>Ausente</th><th>Tarde</th><th>Total</th><th>Tasa</th></tr></thead>
                <tbody>
                {getEmployeeReport().map(e => (
                    <tr key={e.id}>
                    <td>{e.firstName} {e.lastName}</td>
                    <td className={styles.green}>{e.present}</td>
                    <td className={styles.red}>{e.absent}</td>
                    <td className={styles.yellow}>{e.late}</td>
                    <td>{e.total}</td>
                    <td>
                        <div className={styles.rateBar}>
                        <div className={styles.rateFill} style={{ width: `${e.rate}%`, background: e.rate >= 90 ? '#22c55e' : e.rate >= 75 ? '#f59e0b' : '#ef4444' }} />
                        </div>
                        <span>{e.rate}%</span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}

        {reportType === 'departments' && (
            <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead><tr><th>Departamento</th><th>Empleados</th><th>%</th></tr></thead>
                <tbody>
                {getDepartmentReport().map(d => (
                    <tr key={d.department}>
                    <td>{d.department}</td>
                    <td>{d.count}</td>
                    <td>{Math.round((d.count / employees.length) * 100)}%</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </div>
    )
    }

    export default Reports