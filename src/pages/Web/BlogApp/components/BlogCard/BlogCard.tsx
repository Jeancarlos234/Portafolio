    import { Link } from 'react-router-dom'
    import styles from './BlogCard.module.css'
    import type { BlogPost as BlogPostType } from '../../type'

    interface BlogCardProps {
    post: BlogPostType
    featured?: boolean
    isAdmin?: boolean
    onDelete?: (id: string) => void
    }

    const BlogCard = ({ post, featured, isAdmin, onDelete }: BlogCardProps) => {
    return (
        <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
        <Link to={`/blog/post/${post.slug}`} className={styles.link}>
            <div className={styles.imageWrapper}>
            <img src={post.image} alt={post.title} className={styles.image} />
            {post.featured && <span className={styles.featuredBadge}>Destacado</span>}
            <span className={styles.category}>{post.category}</span>
            </div>
            <div className={styles.content}>
            <div className={styles.meta}>
                <span className={styles.date}>{new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span className={styles.dot}>·</span>
                <span className={styles.readTime}>{post.readTime}</span>
            </div>
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <div className={styles.tags}>
                {post.tags.slice(0, 3).map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
                ))}
            </div>
            <div className={styles.author}>
                <div className={styles.avatar}>
                {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <span className={styles.authorName}>{post.author}</span>
            </div>
            </div>
        </Link>
        {isAdmin && onDelete && (
            <button 
            className={styles.deleteBtn}
            onClick={(e) => { e.preventDefault(); onDelete(post.id) }}
            >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
            </button>
        )}
        </article>
    )
    }

    export default BlogCard