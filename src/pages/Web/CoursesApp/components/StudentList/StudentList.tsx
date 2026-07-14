    import { useState } from 'react'
    import styles from './StudentList.module.css'
    import type { Student, Course } from '../../types'

    interface StudentListProps {
    students: Student[]
    courses: Course[]
    onEnroll: (student: Omit<Student, 'id' | 'enrolledDate'>) => void
    onRemove: (id: string, courseId: string) => void
    }

    const StudentList = ({ students, courses, onEnroll, onRemove }: StudentListProps) => {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '', courseId: '' })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.email || !formData.courseId) return
        const course = courses.find(c => c.id === formData.courseId)
        onEnroll({ name: formData.name, email: formData.email, courseId: formData.courseId, courseName: course?.title || '', progress: 0 })
        setFormData({ name: '', email: '', courseId: '' })
        setShowForm(false)
    }

    return (
        <div className={styles.students}>
        <div className={styles.header}>
            <div>
            <h1 className={styles.title}>Estudiantes</h1>
            <p className={styles.count}>{students.length} inscritos</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className={styles.addBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            {showForm ? 'Cancelar' : 'Inscribir Estudiante'}
            </button>
        </div>

        {showForm && (
            <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Nueva Inscripción</h3>
            <div className={styles.formGrid}>
                <input type="text" placeholder="Nombre *" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} required className={styles.input} />
                <input type="email" placeholder="Email *" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} required className={styles.input} />
                <select value={formData.courseId} onChange={(e) => setFormData(p => ({ ...p, courseId: e.target.value }))} required className={styles.input}>
                <option value="">Seleccionar curso</option>
                {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
            </div>
            <button type="submit" className={styles.submitBtn}>Inscribir</button>
            </form>
        )}

        <div className={styles.tableWrapper}>
            <table className={styles.table}>
            <thead>
                <tr><th>Estudiante</th><th>Email</th><th>Curso</th><th>Progreso</th><th>Fecha</th><th>Acción</th></tr>
            </thead>
            <tbody>
                {students.map(s => (
                <tr key={s.id} className={styles.row}>
                    <td className={styles.name}>{s.name}</td>
                    <td className={styles.email}>{s.email}</td>
                    <td className={styles.course}>{s.courseName}</td>
                    <td>
                    <div className={styles.progressCell}>
                        <div className={styles.progressBar}><div className={styles.progress} style={{ width: `${s.progress}%` }} /></div>
                        <span>{s.progress}%</span>
                    </div>
                    </td>
                    <td className={styles.date}>{new Date(s.enrolledDate).toLocaleDateString('es-ES')}</td>
                    <td>
                    <button onClick={() => onRemove(s.id, s.courseId)} className={styles.deleteBtn}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            {students.length === 0 && <div className={styles.empty}><p>No hay estudiantes inscritos</p></div>}
        </div>
        </div>
    )
    }

    export default StudentList