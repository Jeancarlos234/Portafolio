    export interface Lesson {
    id: string
    title: string
    duration: string
    videoUrl: string
    completed: boolean
    }

    export interface Course {
    id: string
    title: string
    description: string
    instructor: string
    category: string
    level: 'Beginner' | 'Intermediate' | 'Advanced'
    duration: string
    lessons: Lesson[]
    students: number
    rating: number
    reviews: number
    price: number
    image: string
    featured: boolean
    }

    export interface Student {
    id: string
    name: string
    email: string
    courseId: string
    courseName: string
    progress: number
    enrolledDate: string
    }