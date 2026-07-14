    import { useState } from 'react'
    import styles from './EmployeeForm.module.css'
    import type { Employee } from '../../types'

    interface EmployeeFormProps {
    employee: Employee | null
    onSave: (employee: Omit<Employee, 'id'> | Partial<Employee>) => void
    onCancel: () => void
    }

    const EmployeeForm = ({ employee, onSave, onCancel }: EmployeeFormProps) => {
    const [formData, setFormData] = useState({
        firstName: employee?.firstName || '',
        lastName: employee?.lastName || '',
        email: employee?.email || '',
        phone: employee?.phone || '',
        department: employee?.department || 'Desarrollo',
        position: employee?.position || '',
        hireDate: employee?.hireDate || '',
        salary: employee?.salary || 0,
        status: employee?.status || 'active' as const,
        address: employee?.address || '',
        emergencyContact: employee?.emergencyContact || '',
        emergencyPhone: employee?.emergencyPhone || '',
    })

    const departments = ['Desarrollo', 'Diseño', 'Marketing', 'RRHH', 'Ventas', 'Finanzas', 'Operaciones']
    const statuses = ['active', 'inactive', 'on_leave'] as const

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.firstName || !formData.lastName || !formData.email) return
        onSave(formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: name === 'salary' ? Number(value) : value }))
    }

    return (
        <div className={styles.formContainer}>
        <h2 className={styles.title}>{employee ? 'Editar Empleado' : 'Nuevo Empleado'}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Nombre *</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className={styles.input} placeholder="Nombre" />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Apellido *</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className={styles.input} placeholder="Apellido" />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className={styles.input} placeholder="email@empresa.com" />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Teléfono</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className={styles.input} placeholder="+34 600 000 000" />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Departamento</label>
                <select name="department" value={formData.department} onChange={handleChange} className={styles.input}>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Cargo</label>
                <input type="text" name="position" value={formData.position} onChange={handleChange} className={styles.input} placeholder="Cargo" />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Fecha de contratación</label>
                <input type="date" name="hireDate" value={formData.hireDate} onChange={handleChange} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Salario anual</label>
                <input type="number" name="salary" value={formData.salary || ''} onChange={handleChange} className={styles.input} placeholder="0" min="0" />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Estado</label>
                <select name="status" value={formData.status} onChange={handleChange} className={styles.input}>
                {statuses.map(s => <option key={s} value={s}>{s === 'active' ? 'Activo' : s === 'inactive' ? 'Inactivo' : 'Vacaciones'}</option>)}
                </select>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Dirección</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className={styles.input} placeholder="Dirección" />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Contacto de emergencia</label>
                <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} className={styles.input} placeholder="Nombre" />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Teléfono de emergencia</label>
                <input type="text" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} className={styles.input} placeholder="+34 600 000 000" />
            </div>
            </div>
            <div className={styles.buttons}>
            <button type="button" onClick={onCancel} className={styles.cancelBtn}>Cancelar</button>
            <button type="submit" className={styles.saveBtn}>{employee ? 'Actualizar' : 'Guardar'}</button>
            </div>
        </form>
        </div>
    )
    }

    export default EmployeeForm