    export interface BlogPost {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    category: string
    tags: string[]
    author: string
    date: string
    readTime: string
    image: string
    featured: boolean
    }

    export interface Comment {
    id: string
    postId: string
    author: string
    content: string
    date: string
    }