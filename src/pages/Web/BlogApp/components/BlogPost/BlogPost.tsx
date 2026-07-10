    import { useParams, Link } from 'react-router-dom'
    import styles from './BlogPost.module.css'
    import type { BlogPost as BlogPostType } from '../../type'

    interface BlogPostProps {
    posts: BlogPostType[]
    }

    const BlogPost = ({ posts }: BlogPostProps) => {
    const { slug } = useParams<{ slug: string }>()
    const post = posts.find(p => p.slug === slug)

    if (!post) {
        return (
        <div className={styles.notFound}>
            <h2>Artículo no encontrado</h2>
            <Link to="/blog" className={styles.backLink}>Volver al blog</Link>
        </div>
        )
    }

    const relatedPosts = posts
        .filter(p => p.id !== post.id && p.category === post.category)
        .slice(0, 3)

    return (
        <article className={styles.post}>
        <Link to="/blog" className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Volver al blog
        </Link>

        <div className={styles.header}>
            <div className={styles.meta}>
            <span className={styles.category}>{post.category}</span>
            <span className={styles.date}>{new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span className={styles.dot}>·</span>
            <span className={styles.readTime}>{post.readTime} de lectura</span>
            </div>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.author}>
            <div className={styles.avatar}>
                {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
                <span className={styles.authorName}>{post.author}</span>
                <span className={styles.authorRole}>Desarrollador Full Stack</span>
            </div>
            </div>
        </div>

        <img src={post.image} alt={post.title} className={styles.coverImage} />

        <div className={styles.content}>
            <div className={styles.text} dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
            
            <div className={styles.tags}>
            {post.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
            ))}
            </div>
        </div>

        {relatedPosts.length > 0 && (
            <div className={styles.related}>
            <h3 className={styles.relatedTitle}>Artículos relacionados</h3>
            <div className={styles.relatedGrid}>
                {relatedPosts.map(rp => (
                <Link key={rp.id} to={`/blog/post/${rp.slug}`} className={styles.relatedCard}>
                    <img src={rp.image} alt={rp.title} />
                    <div className={styles.relatedInfo}>
                    <h4>{rp.title}</h4>
                    <span>{rp.readTime}</span>
                    </div>
                </Link>
                ))}
            </div>
            </div>
        )}

        <div className={styles.comments}>
            <h3 className={styles.commentsTitle}>Comentarios (3)</h3>
            {[
            { author: 'Carlos García', text: 'Excelente artículo, muy bien explicado. Me ayudó mucho con mi proyecto.', date: 'Hace 2 días', initials: 'CG' },
            { author: 'María López', text: 'Justo lo que necesitaba. ¿Podrías hacer uno sobre testing en React?', date: 'Hace 3 días', initials: 'ML' },
            { author: 'Ana Martínez', text: 'Muy completo. Compartido con mi equipo de desarrollo.', date: 'Hace 5 días', initials: 'AM' },
            ].map((comment, i) => (
            <div key={i} className={styles.comment}>
                <div className={styles.commentAvatar}>{comment.initials}</div>
                <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                    <span className={styles.commentAuthor}>{comment.author}</span>
                    <span className={styles.commentDate}>{comment.date}</span>
                </div>
                <p className={styles.commentText}>{comment.text}</p>
                </div>
            </div>
            ))}
        </div>
        </article>
    )
    }

    const formatContent = (content: string) => {
    return content
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br/>')
    }

    export default BlogPost