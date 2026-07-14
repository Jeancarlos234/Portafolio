    import { useState } from 'react'
    import styles from './CourseDetail.module.css'
    import type { Course, Lesson } from '../../types'

    interface CourseDetailProps {
    course: Course
    onToggleLesson: (lessonId: string) => void
    onOpenLesson: (lesson: Lesson, index: number) => void
    onBack: () => void
    }

    const CourseDetail = ({ course, onToggleLesson, onOpenLesson, onBack }: CourseDetailProps) => {
    const [activeTab, setActiveTab] = useState<'content' | 'description'>('content')
    const completedLessons = course.lessons.filter(l => l.completed).length
    const progress = course.lessons.length > 0 ? Math.round((completedLessons / course.lessons.length) * 100) : 0
    const levelLabels = { Beginner: 'Principiante', Intermediate: 'Intermedio', Advanced: 'Avanzado' }

    return (
        <div className={styles.detail}>
        <button onClick={onBack} className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Volver a cursos
        </button>

        <div className={styles.header}>
            <div className={styles.headerInfo}>
            <span className={styles.category}>{course.category}</span>
            <span className={styles.level}>{levelLabels[course.level]}</span>
            <h1 className={styles.title}>{course.title}</h1>
            <p className={styles.instructor}>Instructor: {course.instructor}</p>
            <div className={styles.rating}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span>{course.rating} ({course.reviews} reseñas)</span>
                <span>{course.students} estudiantes</span>
            </div>
            </div>
            <div className={styles.progressCircle}>
            <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e5e5" strokeWidth="8"/>
                <circle cx="50" cy="50" r="42" fill="none" stroke="#7c3aed" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${progress * 2.64} 264`} transform="rotate(-90 50 50)" style={{ transition: 'stroke-dasharray 0.5s' }}/>
            </svg>
            <span className={styles.progressText}>{progress}%</span>
            </div>
        </div>

        <div className={styles.tabs}>
            <button className={`${styles.tab} ${activeTab === 'content' ? styles.activeTab : ''}`} onClick={() => setActiveTab('content')}>
            Contenido del curso
            </button>
            <button className={`${styles.tab} ${activeTab === 'description' ? styles.activeTab : ''}`} onClick={() => setActiveTab('description')}>
            Descripción
            </button>
        </div>

        {activeTab === 'content' && (
            <div className={styles.lessons}>
            <h3>{course.lessons.length} lecciones · {course.duration}</h3>
            {course.lessons.map((lesson, i) => (
                <div key={lesson.id} className={`${styles.lesson} ${lesson.completed ? styles.completed : ''}`}>
                <div className={styles.lessonCheck} onClick={() => onToggleLesson(lesson.id)}>
                    {lesson.completed ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    ) : (
                    <div className={styles.checkCircle} />
                    )}
                </div>
                <div className={styles.lessonInfo} onClick={() => onOpenLesson(lesson, i)}>
                    <span className={styles.lessonTitle}>{i + 1}. {lesson.title}</span>
                    <span className={styles.lessonDuration}>{lesson.duration}</span>
                </div>
                <button className={styles.playBtn} onClick={() => onOpenLesson(lesson, i)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                </button>
                </div>
            ))}
            </div>
        )}

        {activeTab === 'description' && (
            <div className={styles.description}>
            <p>{course.description}</p>
            <div className={styles.infoGrid}>
                <div><span>Nivel</span><strong>{levelLabels[course.level]}</strong></div>
                <div><span>Duración</span><strong>{course.duration}</strong></div>
                <div><span>Lecciones</span><strong>{course.lessons.length}</strong></div>
                <div><span>Estudiantes</span><strong>{course.students}</strong></div>
            </div>
            </div>
        )}
        </div>
    )
    }

    export default CourseDetail