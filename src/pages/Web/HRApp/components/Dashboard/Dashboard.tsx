    import styles from './Dashboard.module.css'
    import type { HRStats, Employee, AttendanceRecord, VacationRequest } from '../../types'

    interface DashboardProps {
    stats: HRStats
    employees: Employee[]
    attendance: AttendanceRecord[]
    vacations: VacationRequest[]
    }

    const Dashboard = ({ stats, employees, attendance, vacations }: DashboardProps) => {
    const kpis = [
        { title: 'Total Empleados', value: stats.totalEmployees.toString(), subtitle: `${stats.activeEmployees} activos`, icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        ), color: '#2563eb', bg: '#eff6ff' },
        { title: 'Presentes Hoy', value: stats.presentToday.toString(), subtitle: `${stats.absentToday} ausentes`, icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
        ), color: '#22c55e', bg: '#f0fdf4' },
        { title: 'De Vacaciones', value: stats.onVacation.toString(), subtitle: 'ausentes', icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="9" x2="12" y2="2"/></svg>
        ), color: '#f59e0b', bg: '#fffbeb' },
        { title: 'Pendientes', value: stats.pendingRequests.toString(), subtitle: 'solicitudes', icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        ), color: '#ef4444', bg: '#fef2f2' },
    ]

    const today = new Date().toISOString().split('T')[0]
    const todayAttendance = attendance.filter(a => a.date === today)
    const pendingVacations = vacations.filter(v => v.status === 'pending').slice(0, 5)

    const departments = Array.from(new Set(employees.map(e => e.department)))
    const deptStats = departments.map(dept => ({
        name: dept,
        count: employees.filter(e => e.department === dept).length,
        present: todayAttendance.filter(a => employees.find(e => e.id === a.employeeId && e.department === dept)).length,
    }))

    return (
        <div className={styles.dashboard}>
        <div className={styles.header}>
            <h1 className={styles.title}>Panel de RRHH</h1>
            <p className={styles.subtitle}>Resumen general del personal</p>
        </div>

        <div className={styles.kpiGrid}>
            {kpis.map((kpi, i) => (
            <div key={i} className={styles.kpiCard} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.kpiIcon} style={{ backgroundColor: kpi.bg, color: kpi.color }}>{kpi.icon}</div>
                <div>
                <span className={styles.kpiValue}>{kpi.value}</span>
                <span className={styles.kpiLabel}>{kpi.title}</span>
                <span className={styles.kpiSubtitle}>{kpi.subtitle}</span>
                </div>
            </div>
            ))}
        </div>

        <div className={styles.grid}>
            <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Asistencia por Departamento</h2>
            <div className={styles.deptList}>
                {deptStats.map(dept => (
                <div key={dept.name} className={styles.deptRow}>
                    <span className={styles.deptName}>{dept.name}</span>
                    <span className={styles.deptCount}>{dept.present}/{dept.count} presentes</span>
                    <div className={styles.deptBar}>
                    <div className={styles.deptFill} style={{ width: `${dept.count > 0 ? (dept.present / dept.count) * 100 : 0}%`, background: '#2563eb' }} />
                    </div>
                </div>
                ))}
            </div>
            </div>

            <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Solicitudes Pendientes</h2>
            {pendingVacations.length === 0 ? (
                <p className={styles.empty}>No hay solicitudes pendientes</p>
            ) : (
                <div className={styles.vacationList}>
                {pendingVacations.map(v => (
                    <div key={v.id} className={styles.vacationItem}>
                    <div>
                        <span className={styles.vacationName}>{v.employeeName}</span>
                        <span className={styles.vacationType}>{v.type === 'vacation' ? 'Vacaciones' : v.type === 'sick' ? 'Enfermedad' : v.type}</span>
                    </div>
                    <span className={styles.vacationDates}>{v.startDate} → {v.endDate} ({v.days} días)</span>
                    </div>
                ))}
                </div>
            )}
            </div>
        </div>
        </div>
    )
    }

    export default Dashboard