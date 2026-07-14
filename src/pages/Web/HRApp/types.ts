    export interface Employee {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    department: string
    position: string
    hireDate: string
    salary: number
    status: 'active' | 'inactive' | 'on_leave'
    address: string
    emergencyContact: string
    emergencyPhone: string
    hourlyRate: number
    documents: EmployeeDocument[]
    performance: PerformanceReview[]
    }

    export interface EmployeeDocument {
    id: string
    type: 'contract' | 'id' | 'certificate' | 'other'
    name: string
    uploadDate: string
    status: 'valid' | 'expired' | 'pending'
    }

    export interface PerformanceReview {
    id: string
    date: string
    rating: number
    reviewer: string
    comments: string
    goals: string[]
    }

    export interface AttendanceRecord {
    id: string
    employeeId: string
    employeeName: string
    date: string
    checkIn: string
    checkOut: string
    hoursWorked: number
    overtime: number
    status: 'present' | 'absent' | 'late' | 'half_day'
    notes: string
    }

    export interface VacationRequest {
    id: string
    employeeId: string
    employeeName: string
    type: 'vacation' | 'sick' | 'personal' | 'other'
    startDate: string
    endDate: string
    days: number
    reason: string
    status: 'pending' | 'approved' | 'rejected'
    createdAt: string
    }

    export interface PayrollRecord {
    id: string
    employeeId: string
    employeeName: string
    period: string
    baseSalary: number
    hoursWorked: number
    overtime: number
    overtimePay: number
    grossSalary: number
    irpf: number
    socialSecurity: number
    netSalary: number
    date: string
    }

    export interface HRStats {
    totalEmployees: number
    activeEmployees: number
    presentToday: number
    absentToday: number
    onVacation: number
    pendingRequests: number
    totalPayroll: number
    avgPerformance: number
    }