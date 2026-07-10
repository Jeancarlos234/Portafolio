    import { useState, useEffect, useCallback } from 'react'
    import { Routes, Route } from 'react-router-dom'
    import Header from './components/Header/Header'
    import BlogList from './components/BlogList/BlogList'
    import BlogPost from './components/BlogPost/BlogPost'
    import AdminPanel from './components/AdminPanel/AdminPanel'
    import SearchBar from './components/SearchBar/SearchBar'
    import styles from './BlogApp.module.css'
    import type { BlogPost as BlogPostType } from './type'

    const initialPosts: BlogPostType[] = [
    {
        id: '1',
        title: 'Guía Completa de React 19: Novedades y Mejoras',
        slug: 'guia-react-19',
        excerpt: 'Descubre todas las nuevas características de React 19, incluyendo Server Components, Actions y más.',
        content: `# React 19: La Evolución del Desarrollo Web\n\nReact 19 ha llegado con características revolucionarias...`,
        category: 'Frontend',
        tags: ['React', 'JavaScript', 'Frontend'],
        author: 'AntaresJB',
        date: '2024-12-15',
        readTime: '8 min',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
        featured: true,
    },
    {
        id: '2',
        title: 'TypeScript Avanzado: Patrones que Debes Conocer',
        slug: 'typescript-patrones-avanzados',
        excerpt: 'Aprende patrones avanzados de TypeScript para escribir código más seguro y mantenible.',
        content: `# TypeScript Avanzado\n\nExplora patrones como discriminated unions, template literals...`,
        category: 'Desarrollo',
        tags: ['TypeScript', 'JavaScript', 'Patrones'],
        author: 'AntaresJB',
        date: '2024-12-10',
        readTime: '12 min',
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600',
        featured: true,
    },
    {
        id: '3',
        title: 'CSS Moderno: Container Queries y más',
        slug: 'css-moderno-container-queries',
        excerpt: 'Las Container Queries están cambiando la forma en que diseñamos componentes responsive.',
        content: `# CSS Moderno\n\nLas Container Queries permiten estilos basados en el tamaño del contenedor...`,
        category: 'CSS',
        tags: ['CSS', 'Frontend', 'Diseño'],
        author: 'AntaresJB',
        date: '2024-12-05',
        readTime: '6 min',
        image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600',
        featured: false,
    },
    {
        id: '4',
        title: 'Node.js Performance: Optimización de APIs',
        slug: 'nodejs-performance',
        excerpt: 'Técnicas avanzadas para optimizar el rendimiento de tus APIs en Node.js.',
        content: `# Node.js Performance\n\nAprende a usar clustering, caching y streams...`,
        category: 'Backend',
        tags: ['Node.js', 'Backend', 'Performance'],
        author: 'AntaresJB',
        date: '2024-11-28',
        readTime: '10 min',
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600',
        featured: false,
    },
    {
        id: '5',
        title: 'Flutter vs React Native: ¿Cuál Elegir en 2025?',
        slug: 'flutter-vs-react-native-2025',
        excerpt: 'Comparativa completa entre los dos frameworks más populares para desarrollo móvil.',
        content: `# Flutter vs React Native\n\nAnalizamos rendimiento, ecosistema y curva de aprendizaje...`,
        category: 'Móvil',
        tags: ['Flutter', 'React Native', 'Móvil'],
        author: 'AntaresJB',
        date: '2024-11-20',
        readTime: '15 min',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600',
        featured: true,
    },
    {
        id: '6',
        title: 'Bases de Datos: SQL vs NoSQL en Proyectos Reales',
        slug: 'sql-vs-nosql',
        excerpt: 'Cuándo usar cada tipo de base de datos basado en casos de uso reales.',
        content: `# SQL vs NoSQL\n\nComparativa basada en proyectos reales...`,
        category: 'Backend',
        tags: ['SQL', 'NoSQL', 'Bases de Datos'],
        author: 'AntaresJB',
        date: '2024-11-15',
        readTime: '9 min',
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600',
        featured: false,
    },
    ]

    const BlogApp = () => {
    const [posts, setPosts] = useState<BlogPostType[]>(() => {
        const saved = localStorage.getItem('blog-posts')
        return saved ? JSON.parse(saved) : initialPosts
    })
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('Todas')
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        localStorage.setItem('blog-posts', JSON.stringify(posts))
    }, [posts])

    const categories = ['Todas', ...Array.from(new Set(posts.map(p => p.category)))]

    const filteredPosts = posts
        .filter(post => selectedCategory === 'Todas' || post.category === selectedCategory)
        .filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        )

    const addPost = useCallback((post: Omit<BlogPostType, 'id' | 'slug' | 'date' | 'readTime'>) => {
        const newPost: BlogPostType = {
        ...post,
        id: Date.now().toString(),
        slug: post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        date: new Date().toISOString().split('T')[0],
        readTime: `${Math.ceil(post.content.split(' ').length / 200)} min`,
        }
        setPosts(prev => [newPost, ...prev])
    }, [])

    const deletePost = useCallback((id: string) => {
        setPosts(prev => prev.filter(p => p.id !== id))
    }, [])

    const updatePost = useCallback((id: string, updatedPost: Partial<BlogPostType>) => {
        setPosts(prev => prev.map(p => p.id === id ? { ...p, ...updatedPost } : p))
    }, [])

    return (
        <div className={styles.blog}>
        <Header 
            isAdmin={isAdmin} 
            onToggleAdmin={() => setIsAdmin(!isAdmin)}
        />
        
        <div className={styles.container}>
            <Routes>
            <Route path="/" element={
                <>
                <div className={styles.heroSection}>
                    <h1 className={styles.heroTitle}>Blog de Tecnología</h1>
                    <p className={styles.heroSubtitle}>
                    Artículos sobre desarrollo web, programación y tecnología
                    </p>
                    <SearchBar 
                    searchTerm={searchTerm} 
                    onSearch={setSearchTerm}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    />
                </div>
                <BlogList 
                    posts={filteredPosts} 
                    isAdmin={isAdmin}
                    onDelete={deletePost}
                />
                </>
            } />
            <Route path="/post/:slug" element={
                <BlogPost posts={posts} />
            } />
            <Route path="/admin" element={
                <AdminPanel 
                posts={posts}
                onAdd={addPost}
                onDelete={deletePost}
                onUpdate={updatePost}
                />
            } />
            </Routes>
        </div>
        </div>
    )
    }

    export default BlogApp