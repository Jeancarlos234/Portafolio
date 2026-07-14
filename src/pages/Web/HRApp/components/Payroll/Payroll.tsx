    import { useState, useMemo } from 'react'
    import styles from './Payroll.module.css'
    import type { Employee, AttendanceRecord, PayrollRecord } from '../../types'

    interface PayrollProps {
    employees: Employee[]
    attendance: AttendanceRecord[]
    payrolls: PayrollRecord[]
    onGenerate: (record: Omit<PayrollRecord, 'id' | 'date'>) => void
    }

    const Payroll = ({ employees, attendance, payrolls, onGenerate }: PayrollProps) => {
    const [selectedEmployee, setSelectedEmployee] = useState('')
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
    const [message, setMessage] = useState('')

    const employee = employees.find(e => e.id === selectedEmployee)

    const monthAttendance = useMemo(() => {
        if (!employee) return []
        return attendance.filter(a => 
        a.employeeId === employee.id && a.date.startsWith(selectedMonth)
        )
    }, [attendance, employee, selectedMonth])

    const totalHours = monthAttendance.reduce((sum, a) => sum + a.hoursWorked, 0)
    const totalOvertime = monthAttendance.reduce((sum, a) => sum + a.overtime, 0)

    const calculations = useMemo(() => {
        if (!employee) return null
        const baseSalary = employee.salary / 12
        const hourlyRate = employee.hourlyRate || employee.salary / 12 / 160
        const overtimePay = totalOvertime * hourlyRate * 1.5
        const grossSalary = baseSalary + overtimePay
        const irpf = grossSalary * 0.15
        const socialSecurity = grossSalary * 0.065
        const netSalary = grossSalary - irpf - socialSecurity

        return { baseSalary, hourlyRate, overtimePay, grossSalary, irpf, socialSecurity, netSalary }
    }, [employee, totalOvertime])

    const handleGenerate = () => {
        if (!employee || !calculations) return
        onGenerate({
        employeeId: employee.id,
        employeeName: `${employee.firstName} ${employee.lastName}`,
        period: selectedMonth,
        baseSalary: calculations.baseSalary,
        hoursWorked: totalHours,
        overtime: totalOvertime,
        overtimePay: calculations.overtimePay,
        grossSalary: calculations.grossSalary,
        irpf: calculations.irpf,
        socialSecurity: calculations.socialSecurity,
        netSalary: calculations.netSalary,
        })
        setMessage(`Nómina generada para ${employee.firstName} ${employee.lastName}`)
        setTimeout(() => setMessage(''), 3000)
    }

    const filteredPayrolls = payrolls
        .filter(p => selectedEmployee === 'all' || p.employeeId === selectedEmployee)
        .filter(p => !selectedMonth || p.period === selectedMonth)

    return (
        <div className={styles.payroll}>
        <div className={styles.header}>
            <h1 className={styles.title}>Gestión de Nómina</h1>
        </div>

        {message && (
            <div className={styles.message}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            {message}
            </div>
        )}

        <div className={styles.controls}>
            <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} className={styles.select}>
            <option value="">Seleccionar empleado...</option>
            <option value="all">Todos los empleados</option>
            {employees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>)}
            </select>
            <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className={styles.select} />
            {employee && (
            <button onClick={handleGenerate} className={styles.generateBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                Generar Nómina
            </button>
            )}
        </div>

        {employee && calculations && (
            <div className={styles.preview}>
            <h3 className={styles.previewTitle}>Vista Previa - {employee.firstName} {employee.lastName}</h3>
            <div className={styles.previewGrid}>
                <div className={styles.previewItem}><span>Salario Base</span><strong>${calculations.baseSalary.toLocaleString()}</strong></div>
                <div className={styles.previewItem}><span>Horas Trabajadas</span><strong>{totalHours}h</strong></div>
                <div className={styles.previewItem}><span>Horas Extra</span><strong>{totalOvertime}h</strong></div>
                <div className={styles.previewItem}><span>Pago Extra</span><strong>${calculations.overtimePay.toLocaleString()}</strong></div>
                <div className={styles.previewItem}><span>Salario Bruto</span><strong>${calculations.grossSalary.toLocaleString()}</strong></div>
                <div className={styles.previewItem}><span>IRPF (15%)</span><strong className={styles.deduction}>-${calculations.irpf.toLocaleString()}</strong></div>
                <div className={styles.previewItem}><span>Seg. Social (6.5%)</span><strong className={styles.deduction}>-${calculations.socialSecurity.toLocaleString()}</strong></div>
                <div className={`${styles.previewItem} ${styles.total}`}><span>Salario Neto</span><strong>${calculations.netSalary.toLocaleString()}</strong></div>
            </div>
            </div>
        )}

        <div className={styles.history}>
            <h3 className={styles.historyTitle}>Historial de Nóminas</h3>
            <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead><tr><th>Empleado</th><th>Período</th><th>Bruto</th><th>Neto</th><th>Horas</th><th>Extra</th></tr></thead>
                <tbody>
                {filteredPayrolls.map(p => (
                    <tr key={p.id} className={styles.row}>
                    <td>{p.employeeName}</td>
                    <td>{p.period}</td>
                    <td>${p.grossSalary.toLocaleString()}</td>
                    <td className={styles.netAmount}>${p.netSalary.toLocaleString()}</td>
                    <td>{p.hoursWorked}h</td>
                    <td>{p.overtime}h</td>
                    </tr>
                ))}
                {filteredPayrolls.length === 0 && <tr><td colSpan={6} className={styles.empty}>No hay nóminas generadas</td></tr>}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    )
    }

    export default Payroll