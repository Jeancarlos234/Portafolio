    import { useState } from 'react'
    import styles from './AdminPanel.module.css'
    import type { Course } from '../../types'

    interface AdminPanelProps {
    courses: Course[]
    onAdd: (course: Omit<Course, 'id' | 'lessons' | 'students' | 'rating' | 'reviews'>) => void
    onDelete: (id: string) => void
    }

    const AdminPanel = ({ courses, onAdd, onDelete }: AdminPanelProps) => {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        title: '', description: '', instructor: 'AntaresJB', category: 'Desarrollo Web',
        level: 'Beginner' as const, duration: '', price: 0, image: '', featured: false
    })

    const categories = ['Desarrollo Web', 'Backend', 'Diseño', 'Móvil', 'Data Science', 'DevOps']
    const levels = ['Beginner', 'Intermediate', 'Advanced'] as const

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.title || formData.price <= 0) return
        onAdd(formData)
        setFormData({ title: '', description: '', instructor: 'AntaresJB', category: 'Desarrollo Web', level: 'Beginner', duration: '', price: 0, image: '', featured: false })
        setShowForm(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        const checked = (e.target as HTMLInputElement).checked
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : (name === 'price' ? Number(value) : value) }))
    }

    return (
        <div className={styles.admin}>
        <div className={styles.header}>
            <div>
            <h1 className={styles.title}>Panel de Administración</h1>
            <p className={styles.count}>{courses.length} cursos</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className={styles.addBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            {showForm ? 'Cancelar' : 'Nuevo Curso'}
            </button>
        </div>

        {showForm && (
            <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.formTitle}>Nuevo Curso</h3>
            <div className={styles.formGrid}>
                <input type="text" name="title" placeholder="Título *" value={formData.title} onChange={handleChange} required className={styles.input} />
                <input type="text" name="instructor" placeholder="Instructor" value={formData.instructor} onChange={handleChange} className={styles.input} />
                <select name="category" value={formData.category} onChange={handleChange} className={styles.input}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select name="level" value={formData.level} onChange={handleChange} className={styles.input}>
                {levels.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <input type="text" name="duration" placeholder="Duración (ej: 12h 30m)" value={formData.duration} onChange={handleChange} className={styles.input} />
                <input type="number" name="price" placeholder="Precio *" value={formData.price || ''} onChange={handleChange} required className={styles.input} />
                <input type="text" name="image" placeholder="URL de imagen" value={formData.image} onChange={handleChange} className={styles.input} />
            </div>
            <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} className={styles.textarea} rows={3} />
            <label className={styles.checkbox}>
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
                Curso destacado
            </label>
            <button type="submit" className={styles.submitBtn}>Guardar Curso</button>
            </form>
        )}

        <div className={styles.grid}>
            {courses.map(course => (
            <div key={course.id} className={styles.card}>
                <img src={course.image} alt={course.title} className={styles.cardImage} />
                <div className={styles.cardContent}>
                <span className={styles.cardCategory}>{course.category}</span>
                <h3 className={styles.cardTitle}>{course.title}</h3>
                <div className={styles.cardMeta}>
                    <span>{course.lessons.length} lecciones</span>
                    <span>{course.students} estudiantes</span>
                    <span>${course.price}</span>
                </div>
                <button onClick={() => onDelete(course.id)} className={styles.deleteBtn}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                    Eliminar
                </button>
                </div>
            </div>
            ))}
        </div>
        </div>
    )
    }

    export default AdminPanel