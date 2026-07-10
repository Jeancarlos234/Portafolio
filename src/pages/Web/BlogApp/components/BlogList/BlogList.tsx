    import BlogCard from '../BlogCard/BlogCard'
    import styles from './BlogList.module.css'
    import type { BlogPost as BlogPostType } from '../../type'

    interface BlogListProps {
    posts: BlogPostType[]
    isAdmin: boolean
    onDelete: (id: string) => void
    }

    const BlogList = ({ posts, isAdmin, onDelete }: BlogListProps) => {
    const featuredPosts = posts.filter(p => p.featured)
    const regularPosts = posts.filter(p => !p.featured)

    return (
        <div className={styles.blogList}>
        {posts.length === 0 ? (
            <div className={styles.empty}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <h3>No se encontraron artículos</h3>
            <p>Intenta con otra búsqueda o categoría</p>
            </div>
        ) : (
            <>
            {featuredPosts.length > 0 && (
                <div className={styles.featuredGrid}>
                {featuredPosts.map(post => (
                    <BlogCard key={post.id} post={post} featured isAdmin={isAdmin} onDelete={onDelete} />
                ))}
                </div>
            )}
            {regularPosts.length > 0 && (
                <>
                {featuredPosts.length > 0 && <h2 className={styles.sectionTitle}>Más artículos</h2>}
                <div className={styles.grid}>
                    {regularPosts.map(post => (
                    <BlogCard key={post.id} post={post} isAdmin={isAdmin} onDelete={onDelete} />
                    ))}
                </div>
                </>
            )}
            </>
        )}
        </div>
    )
    }

    export default BlogList