    import { useState, useEffect, useCallback } from 'react'
    import Header from './components/Header/Header'
    import CourseGrid from './components/CourseGrid/CourseGrid'
    import CourseDetail from './components/CourseDetail/CourseDetail'
    import LessonView from './components/LessonView/LessonView'
    import AdminPanel from './components/AdminPanel/AdminPanel'
    import StudentList from './components/StudentList/StudentList'
    import styles from './CoursesApp.module.css'
    import type { Course, Student, Lesson } from './types'

    const initialCourses: Course[] = [
    { id: '1', title: 'React Avanzado: De Cero a Experto', description: 'Domina React con TypeScript, hooks avanzados, estado global, testing y despliegue.', instructor: 'AntaresJB', category: 'Desarrollo Web', level: 'Advanced', duration: '24h 30m', lessons: [
        { id: 'l1', title: 'Introducción al curso', duration: '10:00', videoUrl: '', completed: false },
        { id: 'l2', title: 'TypeScript con React', duration: '25:00', videoUrl: '', completed: false },
        { id: 'l3', title: 'Hooks Avanzados', duration: '30:00', videoUrl: '', completed: false },
        { id: 'l4', title: 'Estado Global con Zustand', duration: '20:00', videoUrl: '', completed: false },
        { id: 'l5', title: 'Testing con Vitest', duration: '22:00', videoUrl: '', completed: false },
    ], students: 1280, rating: 4.8, reviews: 342, price: 49, image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400', featured: true },
    { id: '2', title: 'Node.js: Backend Profesional', description: 'Construye APIs RESTful, GraphQL, autenticación JWT, bases de datos y despliegue.', instructor: 'AntaresJB', category: 'Backend', level: 'Intermediate', duration: '18h', lessons: [
        { id: 'l6', title: 'Fundamentos de Node.js', duration: '15:00', videoUrl: '', completed: false },
        { id: 'l7', title: 'Express y Middleware', duration: '22:00', videoUrl: '', completed: false },
        { id: 'l8', title: 'Bases de Datos', duration: '28:00', videoUrl: '', completed: false },
        { id: 'l9', title: 'Autenticación JWT', duration: '18:00', videoUrl: '', completed: false },
    ], students: 950, rating: 4.7, reviews: 215, price: 39, image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400', featured: true },
    { id: '3', title: 'CSS Moderno y Diseño Responsive', description: 'Flexbox, Grid, animaciones, variables CSS, container queries y diseño adaptable.', instructor: 'AntaresJB', category: 'Diseño', level: 'Beginner', duration: '12h', lessons: [
        { id: 'l10', title: 'Fundamentos CSS', duration: '18:00', videoUrl: '', completed: false },
        { id: 'l11', title: 'Flexbox Completo', duration: '22:00', videoUrl: '', completed: false },
        { id: 'l12', title: 'CSS Grid', duration: '25:00', videoUrl: '', completed: false },
    ], students: 2100, rating: 4.9, reviews: 520, price: 29, image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400', featured: true },
    { id: '4', title: 'Flutter: Apps Móviles Nativas', description: 'Desarrollo de aplicaciones móviles multiplataforma con Flutter y Dart.', instructor: 'AntaresJB', category: 'Móvil', level: 'Intermediate', duration: '20h', lessons: [
        { id: 'l13', title: 'Introducción a Flutter', duration: '12:00', videoUrl: '', completed: false },
        { id: 'l14', title: 'Widgets y Layouts', duration: '28:00', videoUrl: '', completed: false },
        { id: 'l15', title: 'Navegación y Rutas', duration: '18:00', videoUrl: '', completed: false },
        { id: 'l16', title: 'Estado y APIs', duration: '25:00', videoUrl: '', completed: false },
    ], students: 680, rating: 4.6, reviews: 145, price: 44, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400', featured: false },
    { id: '5', title: 'TypeScript desde Cero', description: 'Tipos avanzados, genéricos, decoradores, módulos y configuración de proyectos.', instructor: 'AntaresJB', category: 'Desarrollo Web', level: 'Beginner', duration: '10h', lessons: [
        { id: 'l17', title: 'Tipos Básicos', duration: '15:00', videoUrl: '', completed: false },
        { id: 'l18', title: 'Interfaces y Types', duration: '20:00', videoUrl: '', completed: false },
        { id: 'l19', title: 'Genéricos', duration: '22:00', videoUrl: '', completed: false },
    ], students: 3200, rating: 4.9, reviews: 890, price: 19, image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400', featured: true },
    { id: '6', title: 'Python para Ciencia de Datos', description: 'NumPy, Pandas, Matplotlib, scikit-learn y análisis de datos reales.', instructor: 'AntaresJB', category: 'Data Science', level: 'Intermediate', duration: '16h', lessons: [
        { id: 'l20', title: 'Python Básico', duration: '18:00', videoUrl: '', completed: false },
        { id: 'l21', title: 'NumPy y Pandas', duration: '30:00', videoUrl: '', completed: false },
        { id: 'l22', title: 'Visualización', duration: '20:00', videoUrl: '', completed: false },
        { id: 'l23', title: 'Machine Learning', duration: '28:00', videoUrl: '', completed: false },
    ], students: 1500, rating: 4.7, reviews: 380, price: 54, image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400', featured: false },
    ]

    const CoursesApp = () => {
    // ✅ Tipo corregido: incluye 'lesson'
    const [activeView, setActiveView] = useState<'courses' | 'detail' | 'lesson' | 'admin' | 'students'>('courses')
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
    const [selectedLessonIndex, setSelectedLessonIndex] = useState(0)
    const [courses, setCourses] = useState<Course[]>(() => {
        const saved = localStorage.getItem('courses-data')
        return saved ? JSON.parse(saved) : initialCourses
    })
    const [students, setStudents] = useState<Student[]>(() => {
        const saved = localStorage.getItem('courses-students')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => { localStorage.setItem('courses-data', JSON.stringify(courses)) }, [courses])
    useEffect(() => { localStorage.setItem('courses-students', JSON.stringify(students)) }, [students])

    const toggleLessonComplete = useCallback((courseId: string, lessonId: string) => {
        setCourses(prev => prev.map(c => {
        if (c.id !== courseId) return c
        return { ...c, lessons: c.lessons.map(l => l.id === lessonId ? { ...l, completed: !l.completed } : l) }
        }))
    }, [])

    const openLesson = useCallback((course: Course, lesson: Lesson, index: number) => {
        setSelectedCourse(course)
        setSelectedLesson(lesson)
        setSelectedLessonIndex(index)
        setActiveView('lesson')
    }, [])

    const goToNextLesson = useCallback(() => {
        if (!selectedCourse || selectedLessonIndex >= selectedCourse.lessons.length - 1) return
        const nextIndex = selectedLessonIndex + 1
        setSelectedLessonIndex(nextIndex)
        setSelectedLesson(selectedCourse.lessons[nextIndex])
    }, [selectedCourse, selectedLessonIndex])

    const goToPrevLesson = useCallback(() => {
        if (!selectedCourse || selectedLessonIndex <= 0) return
        const prevIndex = selectedLessonIndex - 1
        setSelectedLessonIndex(prevIndex)
        setSelectedLesson(selectedCourse.lessons[prevIndex])
    }, [selectedCourse, selectedLessonIndex])

    const addCourse = useCallback((course: Omit<Course, 'id' | 'lessons' | 'students' | 'rating' | 'reviews'>) => {
        setCourses(prev => [...prev, { ...course, id: Date.now().toString(), lessons: [], students: 0, rating: 0, reviews: 0 }])
    }, [])

    const deleteCourse = useCallback((id: string) => {
        setCourses(prev => prev.filter(c => c.id !== id))
    }, [])

    const enrollStudent = useCallback((student: Omit<Student, 'id' | 'enrolledDate'>) => {
        setStudents(prev => [...prev, { ...student, id: Date.now().toString(), enrolledDate: new Date().toISOString().split('T')[0] }])
        setCourses(prev => prev.map(c => c.id === student.courseId ? { ...c, students: c.students + 1 } : c))
    }, [])

    const removeStudent = useCallback((id: string, courseId: string) => {
        setStudents(prev => prev.filter(s => s.id !== id))
        setCourses(prev => prev.map(c => c.id === courseId ? { ...c, students: Math.max(0, c.students - 1) } : c))
    }, [])

    return (
        <div className={styles.app}>
        <Header 
            activeView={activeView} 
            onViewChange={(view) => { 
            setActiveView(view)
            if (view !== 'detail' && view !== 'lesson') setSelectedCourse(null)
            }} 
        />
        <div className={styles.container}>
            {activeView === 'courses' && (
            <CourseGrid 
                courses={courses} 
                onSelectCourse={(course) => { setSelectedCourse(course); setActiveView('detail') }} 
            />
            )}
            {activeView === 'detail' && selectedCourse && (
            <CourseDetail 
                course={selectedCourse} 
                onToggleLesson={(lessonId) => toggleLessonComplete(selectedCourse.id, lessonId)} 
                onOpenLesson={(lesson, index) => openLesson(selectedCourse, lesson, index)}
                onBack={() => { setSelectedCourse(null); setActiveView('courses') }} 
            />
            )}
            {activeView === 'lesson' && selectedCourse && selectedLesson && (
            <LessonView 
                course={selectedCourse}
                lesson={selectedLesson}
                lessonIndex={selectedLessonIndex}
                totalLessons={selectedCourse.lessons.length}
                onComplete={(lessonId) => toggleLessonComplete(selectedCourse.id, lessonId)}
                onBack={() => setActiveView('detail')}
                onNext={goToNextLesson}
                onPrev={goToPrevLesson}
            />
            )}
            {activeView === 'admin' && (
            <AdminPanel courses={courses} onAdd={addCourse} onDelete={deleteCourse} />
            )}
            {activeView === 'students' && (
            <StudentList students={students} courses={courses} onEnroll={enrollStudent} onRemove={removeStudent} />
            )}
        </div>
        </div>
    )
    }

    export default CoursesApp