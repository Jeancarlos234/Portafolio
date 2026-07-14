    import styles from './CourseCard.module.css'
    import type { Course } from '../../types'

    interface CourseCardProps { course: Course; onSelect: (course: Course) => void }

    const CourseCard = ({ course, onSelect }: CourseCardProps) => {
    const levelLabels = { Beginner: 'Principiante', Intermediate: 'Intermedio', Advanced: 'Avanzado' }
    const progress = course.lessons.length > 0 ? Math.round((course.lessons.filter(l => l.completed).length / course.lessons.length) * 100) : 0

    return (
        <div className={styles.card} onClick={() => onSelect(course)}>
        <div className={styles.imageWrapper}>
            <img src={course.image} alt={course.title} className={styles.image} />
            <span className={styles.level}>{levelLabels[course.level]}</span>
            {course.featured && <span className={styles.featured}>Destacado</span>}
        </div>
        <div className={styles.content}>
            <span className={styles.category}>{course.category}</span>
            <h3 className={styles.title}>{course.title}</h3>
            <p className={styles.instructor}>{course.instructor}</p>
            <div className={styles.rating}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>{course.rating}</span>
            <span className={styles.reviews}>({course.reviews})</span>
            </div>
            <div className={styles.meta}>
            <span>{course.lessons.length} lecciones</span>
            <span>{course.duration}</span>
            </div>
            {progress > 0 && (
            <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: `${progress}%` }} />
            </div>
            )}
            <div className={styles.bottom}>
            <span className={styles.price}>${course.price}</span>
            <span className={styles.students}>{course.students} estudiantes</span>
            </div>
        </div>
        </div>
    )
    }

    export default CourseCard