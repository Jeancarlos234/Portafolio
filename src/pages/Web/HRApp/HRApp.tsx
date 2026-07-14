    import { useState, useEffect, useCallback } from 'react'
    import Header from './components/Header/Header'
    import Dashboard from './components/Dashboard/Dashboard'
    import EmployeeList from './components/EmployeeList/EmployeeList'
    import EmployeeForm from './components/EmployeeForm/EmployeeForm'
    import Attendance from './components/Attendance/Attendance'
    import VacationManager from './components/VacationManager/VacationManager'
    import VacationCalendar from './components/Calendar/Calendar'
    import AttendanceHistory from './components/AttendanceHistory/AttendanceHistory'
    import Payroll from './components/Payroll/Payroll'
    import DocumentManager from './components/Documents/Documents'
    import PerformanceReview from './components/Performance/Performance'
    import Reports from './components/Reports/Reports'
    import styles from './HRApp.module.css'
    import type { Employee, AttendanceRecord, VacationRequest, PayrollRecord, EmployeeDocument, PerformanceReview as PerfReview, HRStats } from './types'

    const initialEmployees: Employee[] = [
    { id: '1', firstName: 'Carlos', lastName: 'García', email: 'carlos@empresa.com', phone: '+34 612 345 678', department: 'Desarrollo', position: 'Senior Developer', hireDate: '2022-03-15', salary: 45000, status: 'active', address: 'Calle Mayor 123, Madrid', emergencyContact: 'María García', emergencyPhone: '+34 623 456 789', hourlyRate: 25, documents: [{ id: 'd1', type: 'contract', name: 'Contrato Laboral', uploadDate: '2022-03-15', status: 'valid' }], performance: [] },
    { id: '2', firstName: 'María', lastName: 'López', email: 'maria@empresa.com', phone: '+34 623 456 789', department: 'Diseño', position: 'UX Designer', hireDate: '2023-01-10', salary: 38000, status: 'active', address: 'Av. Principal 456, Barcelona', emergencyContact: 'Juan López', emergencyPhone: '+34 634 567 890', hourlyRate: 22, documents: [], performance: [] },
    { id: '3', firstName: 'Ana', lastName: 'Martínez', email: 'ana@empresa.com', phone: '+34 634 567 890', department: 'Desarrollo', position: 'Junior Developer', hireDate: '2024-06-01', salary: 28000, status: 'active', address: 'Calle Nueva 789, Valencia', emergencyContact: 'Pedro Martínez', emergencyPhone: '+34 645 678 901', hourlyRate: 16, documents: [], performance: [] },
    { id: '4', firstName: 'Roberto', lastName: 'Sánchez', email: 'roberto@empresa.com', phone: '+34 645 678 901', department: 'Marketing', position: 'Marketing Manager', hireDate: '2021-09-20', salary: 42000, status: 'active', address: 'Plaza Central 12, Sevilla', emergencyContact: 'Laura Sánchez', emergencyPhone: '+34 656 789 012', hourlyRate: 24, documents: [], performance: [] },
    { id: '5', firstName: 'Laura', lastName: 'Fernández', email: 'laura@empresa.com', phone: '+34 656 789 012', department: 'RRHH', position: 'HR Specialist', hireDate: '2023-04-05', salary: 35000, status: 'active', address: 'Calle Sol 45, Málaga', emergencyContact: 'José Fernández', emergencyPhone: '+34 667 890 123', hourlyRate: 20, documents: [], performance: [] },
    ]

    const initialAttendance: AttendanceRecord[] = [
    { id: 'a1', employeeId: '1', employeeName: 'Carlos García', date: new Date().toISOString().split('T')[0], checkIn: '08:00', checkOut: '17:00', hoursWorked: 8, overtime: 0, status: 'present', notes: '' },
    { id: 'a2', employeeId: '2', employeeName: 'María López', date: new Date().toISOString().split('T')[0], checkIn: '08:15', checkOut: '16:45', hoursWorked: 7.5, overtime: 0, status: 'late', notes: 'Llegada tarde por tráfico' },
    { id: 'a3', employeeId: '3', employeeName: 'Ana Martínez', date: new Date().toISOString().split('T')[0], checkIn: '07:55', checkOut: '17:05', hoursWorked: 8, overtime: 0.5, status: 'present', notes: '' },
    ]

    const initialVacations: VacationRequest[] = [
    { id: 'v1', employeeId: '1', employeeName: 'Carlos García', type: 'vacation', startDate: '2025-01-15', endDate: '2025-01-25', days: 10, reason: 'Vacaciones familiares', status: 'approved', createdAt: '2024-12-20' },
    { id: 'v2', employeeId: '2', employeeName: 'María López', type: 'sick', startDate: '2025-02-01', endDate: '2025-02-03', days: 3, reason: 'Consulta médica', status: 'pending', createdAt: '2025-01-28' },
    ]

    const HRApp = () => {
    const [activeView, setActiveView] = useState<'dashboard' | 'employees' | 'add' | 'attendance' | 'vacations' | 'calendar' | 'history' | 'payroll' | 'documents' | 'performance' | 'reports'>('dashboard')
    const [employees, setEmployees] = useState<Employee[]>(() => {
        const saved = localStorage.getItem('hr-employees')
        return saved ? JSON.parse(saved) : initialEmployees
    })
    const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
        const saved = localStorage.getItem('hr-attendance')
        return saved ? JSON.parse(saved) : initialAttendance
    })
    const [vacations, setVacations] = useState<VacationRequest[]>(() => {
        const saved = localStorage.getItem('hr-vacations')
        return saved ? JSON.parse(saved) : initialVacations
    })
    const [payrolls, setPayrolls] = useState<PayrollRecord[]>(() => {
        const saved = localStorage.getItem('hr-payrolls')
        return saved ? JSON.parse(saved) : []
    })
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

    useEffect(() => { localStorage.setItem('hr-employees', JSON.stringify(employees)) }, [employees])
    useEffect(() => { localStorage.setItem('hr-attendance', JSON.stringify(attendance)) }, [attendance])
    useEffect(() => { localStorage.setItem('hr-vacations', JSON.stringify(vacations)) }, [vacations])
    useEffect(() => { localStorage.setItem('hr-payrolls', JSON.stringify(payrolls)) }, [payrolls])

    const today = new Date().toISOString().split('T')[0]
    const todayAttendance = attendance.filter(a => a.date === today)

    const avgPerformance = employees.reduce((sum, e) => {
        const reviews = e.performance || []
        if (reviews.length === 0) return sum
        const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
        return sum + avg
    }, 0) / Math.max(1, employees.filter(e => (e.performance || []).length > 0).length)

    const stats: HRStats = {
        totalEmployees: employees.length,
        activeEmployees: employees.filter(e => e.status === 'active').length,
        presentToday: todayAttendance.filter(a => a.status === 'present' || a.status === 'late').length,
        absentToday: employees.filter(e => e.status === 'active').length - todayAttendance.length,
        onVacation: employees.filter(e => e.status === 'on_leave').length,
        pendingRequests: vacations.filter(v => v.status === 'pending').length,
        totalPayroll: payrolls.reduce((sum, p) => sum + p.netSalary, 0),
        avgPerformance: Math.round(avgPerformance * 10) / 10 || 0,
    }

    const addEmployee = useCallback((employee: Omit<Employee, 'id'>) => {
        setEmployees(prev => [...prev, { ...employee, id: Date.now().toString(), documents: [], performance: [] }])
        setActiveView('employees')
    }, [])

    const updateEmployee = useCallback((id: string, employee: Partial<Employee>) => {
        setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...employee } : e))
        setEditingEmployee(null)
        setActiveView('employees')
    }, [])

    const deleteEmployee = useCallback((id: string) => {
        setEmployees(prev => prev.filter(e => e.id !== id))
    }, [])

    const addAttendance = useCallback((record: Omit<AttendanceRecord, 'id'>) => {
        const checkInHour = parseInt(record.checkIn.split(':')[0])
        const checkInMin = parseInt(record.checkIn.split(':')[1])
        const checkOutHour = record.checkOut !== '--:--' ? parseInt(record.checkOut.split(':')[0]) : 17
        const checkOutMin = record.checkOut !== '--:--' ? parseInt(record.checkOut.split(':')[1]) : 0
        
        const hoursWorked = checkOutHour - checkInHour + (checkOutMin - checkInMin) / 60
        const overtime = hoursWorked > 8 ? hoursWorked - 8 : 0

        setAttendance(prev => [...prev, { ...record, id: Date.now().toString(), hoursWorked: Math.round(hoursWorked * 10) / 10, overtime: Math.round(overtime * 10) / 10 }])
    }, [])

    const addVacationRequest = useCallback((request: Omit<VacationRequest, 'id' | 'createdAt' | 'status'>) => {
        setVacations(prev => [...prev, { ...request, id: Date.now().toString(), status: 'pending', createdAt: new Date().toISOString().split('T')[0] }])
    }, [])

    const updateVacationStatus = useCallback((id: string, status: VacationRequest['status']) => {
        setVacations(prev => prev.map(v => v.id === id ? { ...v, status } : v))
        if (status === 'approved') {
        const vacation = vacations.find(v => v.id === id)
        if (vacation) {
            setEmployees(prev => prev.map(e => e.id === vacation.employeeId ? { ...e, status: 'on_leave' } : e))
        }
        }
    }, [vacations])

    const generatePayroll = useCallback((record: Omit<PayrollRecord, 'id' | 'date'>) => {
        setPayrolls(prev => [...prev, { ...record, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] }])
    }, [])

    const addDocument = useCallback((employeeId: string, doc: Omit<EmployeeDocument, 'id'>) => {
        setEmployees(prev => prev.map(e => e.id === employeeId ? { ...e, documents: [...(e.documents || []), { ...doc, id: Date.now().toString() }] } : e))
    }, [])

    const deleteDocument = useCallback((employeeId: string, docId: string) => {
        setEmployees(prev => prev.map(e => e.id === employeeId ? { ...e, documents: (e.documents || []).filter(d => d.id !== docId) } : e))
    }, [])

    const addPerformanceReview = useCallback((employeeId: string, review: Omit<PerfReview, 'id'>) => {
        setEmployees(prev => prev.map(e => e.id === employeeId ? { ...e, performance: [...(e.performance || []), { ...review, id: Date.now().toString() }] } : e))
    }, [])

    return (
        <div className={styles.app}>
        <Header 
            activeView={activeView} 
            onViewChange={(view) => { setActiveView(view); setEditingEmployee(null) }} 
        />
        <div className={styles.container}>
            {activeView === 'dashboard' && (
            <Dashboard stats={stats} employees={employees} attendance={attendance} vacations={vacations} />
            )}
            {activeView === 'employees' && (
            <EmployeeList employees={employees} onAdd={() => setActiveView('add')} onEdit={(e) => { setEditingEmployee(e); setActiveView('add') }} onDelete={deleteEmployee} />
            )}
            {activeView === 'add' && (
            <EmployeeForm employee={editingEmployee} onSave={(e) => editingEmployee ? updateEmployee(editingEmployee.id, e) : addEmployee(e as Omit<Employee, 'id'>)} onCancel={() => { setEditingEmployee(null); setActiveView('employees') }} />
            )}
            {activeView === 'attendance' && (
            <Attendance employees={employees} attendance={attendance} onAdd={addAttendance} />
            )}
            {activeView === 'vacations' && (
            <VacationManager vacations={vacations} employees={employees} onAdd={addVacationRequest} onUpdateStatus={updateVacationStatus} />
            )}
            {activeView === 'calendar' && (
            <VacationCalendar vacations={vacations} />
            )}
            {activeView === 'history' && (
            <AttendanceHistory attendance={attendance} employees={employees} />
            )}
            {activeView === 'payroll' && (
            <Payroll employees={employees} attendance={attendance} payrolls={payrolls} onGenerate={generatePayroll} />
            )}
            {activeView === 'documents' && (
            <DocumentManager employees={employees} onAddDocument={addDocument} onDeleteDocument={deleteDocument} />
            )}
            {activeView === 'performance' && (
            <PerformanceReview employees={employees} onAddReview={addPerformanceReview} />
            )}
            {activeView === 'reports' && (
            <Reports employees={employees} attendance={attendance} />
            )}
        </div>
        </div>
    )
    }

    export default HRApp