    import { useState } from 'react'
    import styles from './Performance.module.css'
    import type { Employee, PerformanceReview as PerfReview } from '../../types'

    interface PerformanceReviewProps {
    employees: Employee[]
    onAddReview: (employeeId: string, review: Omit<PerfReview, 'id'>) => void
    }

    const PerformanceReview = ({ employees, onAddReview }: PerformanceReviewProps) => {
    const [selectedEmployee, setSelectedEmployee] = useState('')
    const [rating, setRating] = useState(3)
    const [comments, setComments] = useState('')
    const [goalInput, setGoalInput] = useState('')
    const [goals, setGoals] = useState<string[]>([])

    const employee = employees.find(e => e.id === selectedEmployee)

    const addGoal = () => {
        if (goalInput.trim()) {
        setGoals(prev => [...prev, goalInput.trim()])
        setGoalInput('')
        }
    }

    const removeGoal = (index: number) => {
        setGoals(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = () => {
        if (!selectedEmployee || !comments) return
        onAddReview(selectedEmployee, {
        date: new Date().toISOString().split('T')[0],
        rating,
        reviewer: 'RRHH',
        comments,
        goals,
        })
        setRating(3)
        setComments('')
        setGoals([])
    }

    return (
        <div className={styles.review}>
        <div className={styles.header}>
            <h1 className={styles.title}>Evaluaciones de Desempeño</h1>
        </div>

        <div className={styles.controls}>
            <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} className={styles.select}>
            <option value="">Seleccionar empleado...</option>
            {employees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>)}
            </select>
        </div>

        {employee && (
            <div className={styles.form}>
            <h3>Evaluar a {employee.firstName} {employee.lastName}</h3>
            <div className={styles.ratingSection}>
                <label className={styles.label}>Calificación: {rating}/5</label>
                <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map(i => (
                    <button key={i} onClick={() => setRating(i)} className={`${styles.star} ${i <= rating ? styles.activeStar : ''}`}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill={i <= rating ? '#f59e0b' : '#e5e5e5'}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    </button>
                ))}
                </div>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Comentarios</label>
                <textarea value={comments} onChange={(e) => setComments(e.target.value)} className={styles.textarea} placeholder="Comentarios de la evaluación..." rows={3} />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Objetivos</label>
                <div className={styles.goalInput}>
                <input type="text" value={goalInput} onChange={(e) => setGoalInput(e.target.value)} placeholder="Agregar objetivo..." className={styles.input} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addGoal())} />
                <button onClick={addGoal} className={styles.goalBtn}>+</button>
                </div>
                {goals.length > 0 && (
                <ul className={styles.goalList}>
                    {goals.map((g, i) => (
                    <li key={i} className={styles.goalItem}>
                        <span>{g}</span>
                        <button onClick={() => removeGoal(i)} className={styles.removeGoal}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                    </li>
                    ))}
                </ul>
                )}
            </div>
            <button onClick={handleSubmit} className={styles.submitBtn}>Guardar Evaluación</button>
            </div>
        )}

        {employee && employee.performance?.length > 0 && (
            <div className={styles.history}>
            <h3>Historial de Evaluaciones</h3>
            {employee.performance.map((review, i) => (
                <div key={review.id || i} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                    <span className={styles.reviewDate}>{new Date(review.date).toLocaleDateString('es-ES')}</span>
                    <div className={styles.reviewStars}>
                    {Array.from({ length: 5 }).map((_, j) => (
                        <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill={j < review.rating ? '#f59e0b' : '#e5e5e5'}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ))}
                    </div>
                </div>
                <p className={styles.reviewComments}>{review.comments}</p>
                {review.goals?.length > 0 && (
                    <div className={styles.reviewGoals}>
                    <strong>Objetivos:</strong>
                    <ul>{review.goals.map((g, j) => <li key={j}>{g}</li>)}</ul>
                    </div>
                )}
                </div>
            ))}
            </div>
        )}
        </div>
    )
    }

    export default PerformanceReview