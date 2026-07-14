    import { useState } from 'react'
    import styles from './LessonView.module.css'
    import type { Course, Lesson } from '../../types'

    interface LessonViewProps {
    course: Course
    lesson: Lesson
    lessonIndex: number
    totalLessons: number
    onComplete: (lessonId: string) => void
    onBack: () => void
    onNext: () => void
    onPrev: () => void
    }

    const LessonView = ({ course, lesson, lessonIndex, totalLessons, onComplete, onBack, onNext, onPrev }: LessonViewProps) => {
    const [isCompleted, setIsCompleted] = useState(lesson.completed)

    const handleComplete = () => {
        setIsCompleted(!isCompleted)
        onComplete(lesson.id)
    }

    const progress = Math.round(((lessonIndex + 1) / totalLessons) * 100)

    return (
        <div className={styles.lessonView}>
        <div className={styles.topBar}>
            <button onClick={onBack} className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Volver al curso
            </button>
            <div className={styles.progressInfo}>
            <span>Lección {lessonIndex + 1} de {totalLessons}</span>
            <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: `${progress}%` }} />
            </div>
            </div>
        </div>

        <div className={styles.content}>
            <div className={styles.videoPlaceholder}>
            <div className={styles.videoOverlay}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1">
                <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                <span>Video de la lección</span>
                <span className={styles.videoDuration}>{lesson.duration}</span>
            </div>
            <div className={styles.videoBg}></div>
            </div>

            <div className={styles.lessonInfo}>
            <div className={styles.lessonHeader}>
                <div>
                <span className={styles.courseName}>{course.title}</span>
                <h1 className={styles.lessonTitle}>{lesson.title}</h1>
                </div>
                <button onClick={handleComplete} className={`${styles.completeBtn} ${isCompleted ? styles.completed : ''}`}>
                {isCompleted ? (
                    <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Completado
                    </>
                ) : (
                    <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                    </svg>
                    Marcar como completado
                    </>
                )}
                </button>
            </div>

            <div className={styles.lessonContent}>
                <h3>Contenido de la lección</h3>
                <p>En esta lección aprenderás los conceptos fundamentales sobre {lesson.title.toLowerCase()}. El video incluye ejemplos prácticos y ejercicios para reforzar tu aprendizaje.</p>
                <ul>
                <li>Conceptos teóricos explicados paso a paso</li>
                <li>Ejemplos prácticos con código en tiempo real</li>
                <li>Ejercicios para practicar lo aprendido</li>
                <li>Recursos adicionales y referencias</li>
                </ul>
            </div>

            <div className={styles.resources}>
                <h3>Recursos</h3>
                <div className={styles.resourceItem}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
                <span>Material de lectura complementario</span>
                </div>
                <div className={styles.resourceItem}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                </svg>
                <span>Código fuente de los ejemplos</span>
                </div>
            </div>
            </div>
        </div>

        <div className={styles.navigation}>
            <button onClick={onPrev} disabled={lessonIndex === 0} className={styles.navBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Lección anterior
            </button>
            <button onClick={onNext} disabled={lessonIndex === totalLessons - 1} className={styles.navBtn}>
            Siguiente lección
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            </button>
        </div>
        </div>
    )
    }

    export default LessonView