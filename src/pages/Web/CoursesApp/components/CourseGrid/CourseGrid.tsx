    import { useState } from 'react'
    import CourseCard from '../CourseCard/CourseCard'
    import styles from './CourseGrid.module.css'
    import type { Course } from '../../types'

    interface CourseGridProps {
    courses: Course[]
    onSelectCourse: (course: Course) => void
    }

    const CourseGrid = ({ courses, onSelectCourse }: CourseGridProps) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [levelFilter, setLevelFilter] = useState('all')

    const categories = ['all', ...Array.from(new Set(courses.map(c => c.category)))]
    const levels = ['all', 'Beginner', 'Intermediate', 'Advanced']

    const filtered = courses
        .filter(c => categoryFilter === 'all' || c.category === categoryFilter)
        .filter(c => levelFilter === 'all' || c.level === levelFilter)
        .filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className={styles.grid}>
        <div className={styles.hero}>
            <h1 className={styles.title}>Explora Nuestros Cursos</h1>
            <p className={styles.subtitle}>Aprende nuevas habilidades con cursos profesionales</p>
        </div>
        <div className={styles.toolbar}>
            <div className={styles.searchBox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Buscar cursos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
            </div>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={styles.select}>
            <option value="all">Todas las categorías</option>
            {categories.filter(c => c !== 'all').map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} className={styles.select}>
            <option value="all">Todos los niveles</option>
            {levels.filter(l => l !== 'all').map(l => <option key={l} value={l}>{l}</option>)}
            </select>
        </div>
        <div className={styles.coursesGrid}>
            {filtered.map(course => <CourseCard key={course.id} course={course} onSelect={onSelectCourse} />)}
            {filtered.length === 0 && <div className={styles.empty}><p>No se encontraron cursos</p></div>}
        </div>
        </div>
    )
    }

    export default CourseGrid