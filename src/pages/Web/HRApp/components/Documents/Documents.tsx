    import { useState } from 'react'
    import styles from './Documents.module.css'
    import type { Employee, EmployeeDocument } from '../../types'

    interface DocumentManagerProps {
    employees: Employee[]
    onAddDocument: (employeeId: string, doc: Omit<EmployeeDocument, 'id'>) => void
    onDeleteDocument: (employeeId: string, docId: string) => void
    }

    const DocumentManager = ({ employees, onAddDocument, onDeleteDocument }: DocumentManagerProps) => {
    const [selectedEmployee, setSelectedEmployee] = useState('')
    const [docType, setDocType] = useState<EmployeeDocument['type']>('contract')
    const [docName, setDocName] = useState('')

    const employee = employees.find(e => e.id === selectedEmployee)
    const docTypes = [
        { value: 'contract' as const, label: 'Contrato' },
        { value: 'id' as const, label: 'Identificación' },
        { value: 'certificate' as const, label: 'Certificado' },
        { value: 'other' as const, label: 'Otro' },
    ]

    const handleAdd = () => {
        if (!selectedEmployee || !docName) return
        onAddDocument(selectedEmployee, {
        type: docType,
        name: docName,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'valid',
        })
        setDocName('')
    }

    return (
        <div className={styles.manager}>
        <div className={styles.header}>
            <h1 className={styles.title}>Documentos de Empleados</h1>
        </div>

        <div className={styles.controls}>
            <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} className={styles.select}>
            <option value="">Seleccionar empleado...</option>
            {employees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>)}
            </select>
        </div>

        {employee && (
            <div className={styles.addDoc}>
            <h3>Agregar Documento - {employee.firstName} {employee.lastName}</h3>
            <div className={styles.addForm}>
                <select value={docType} onChange={(e) => setDocType(e.target.value as EmployeeDocument['type'])} className={styles.input}>
                {docTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                <input type="text" value={docName} onChange={(e) => setDocName(e.target.value)} placeholder="Nombre del documento" className={styles.input} />
                <button onClick={handleAdd} className={styles.addBtn}>Agregar</button>
            </div>
            <div className={styles.docList}>
                <h4>Documentos ({employee.documents?.length || 0})</h4>
                {employee.documents?.length === 0 && <p className={styles.empty}>Sin documentos</p>}
                {employee.documents?.map(doc => (
                <div key={doc.id} className={styles.docItem}>
                    <div>
                    <span className={styles.docName}>{doc.name}</span>
                    <span className={styles.docType}>{docTypes.find(t => t.value === doc.type)?.label}</span>
                    </div>
                    <div className={styles.docActions}>
                    <span className={`${styles.docStatus} ${doc.status === 'valid' ? styles.valid : doc.status === 'expired' ? styles.expired : styles.pending}`}>
                        {doc.status === 'valid' ? 'Válido' : doc.status === 'expired' ? 'Expirado' : 'Pendiente'}
                    </span>
                    <button onClick={() => onDeleteDocument(employee.id, doc.id)} className={styles.deleteBtn}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                    </div>
                </div>
                ))}
            </div>
            </div>
        )}
        </div>
    )
    }

    export default DocumentManager