    import { useState } from 'react'
    import styles from './AdminPanel.module.css'
    import type { BlogPost as BlogPostType } from '../../type'

    interface AdminPanelProps {
    posts: BlogPostType[]
    onAdd: (post: Omit<BlogPostType, 'id' | 'slug' | 'date' | 'readTime'>) => void
    onDelete: (id: string) => void
    onUpdate: (id: string, post: Partial<BlogPostType>) => void
    }

    const AdminPanel = ({ posts, onAdd, onDelete, onUpdate }: AdminPanelProps) => {
    const [title, setTitle] = useState('')
    const [excerpt, setExcerpt] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('Frontend')
    const [tags, setTags] = useState('')
    const [image, setImage] = useState('')
    const [featured, setFeatured] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [showForm, setShowForm] = useState(false)

    const categories = ['Frontend', 'Backend', 'CSS', 'Móvil', 'Desarrollo', 'DevOps']

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const postData = {
        title,
        excerpt,
        content,
        category,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        author: 'AntaresJB',
        image: image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600',
        featured,
        }
        
        if (editingId) {
        onUpdate(editingId, postData)
        } else {
        onAdd(postData)
        }
        
        resetForm()
    }

    const resetForm = () => {
        setTitle(''); setExcerpt(''); setContent(''); setCategory('Frontend')
        setTags(''); setImage(''); setFeatured(false); setEditingId(null); setShowForm(false)
    }

    const startEdit = (post: BlogPostType) => {
        setTitle(post.title); setExcerpt(post.excerpt); setContent(post.content)
        setCategory(post.category); setTags(post.tags.join(', '))
        setImage(post.image); setFeatured(post.featured)
        setEditingId(post.id); setShowForm(true)
    }

    return (
        <div className={styles.admin}>
        <div className={styles.header}>
            <h2>Panel de Administración</h2>
            <button className={styles.addBtn} onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : 'Nuevo Artículo'}
            </button>
        </div>

        {showForm && (
            <form onSubmit={handleSubmit} className={styles.form}>
            <h3>{editingId ? 'Editar Artículo' : 'Nuevo Artículo'}</h3>
            <div className={styles.formGrid}>
                <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
                <input type="text" placeholder="URL de imagen" value={image} onChange={e => setImage(e.target.value)} />
            </div>
            <textarea placeholder="Extracto" value={excerpt} onChange={e => setExcerpt(e.target.value)} required rows={2} />
            <textarea placeholder="Contenido (Markdown)" value={content} onChange={e => setContent(e.target.value)} required rows={6} />
            <div className={styles.formGrid}>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input type="text" placeholder="Tags (separados por coma)" value={tags} onChange={e => setTags(e.target.value)} />
            </div>
            <label className={styles.checkbox}>
                <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} />
                Artículo destacado
            </label>
            <button type="submit" className={styles.submitBtn}>
                {editingId ? 'Actualizar' : 'Publicar'}
            </button>
            </form>
        )}

        <div className={styles.postsList}>
            <h3>Todos los artículos ({posts.length})</h3>
            <div className={styles.table}>
            {posts.map(post => (
                <div key={post.id} className={styles.row}>
                <div className={styles.rowInfo}>
                    <span className={styles.rowTitle}>{post.title}</span>
                    <span className={styles.rowMeta}>{post.category} · {post.date}</span>
                </div>
                <div className={styles.rowActions}>
                    <button className={styles.editBtn} onClick={() => startEdit(post)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    </button>
                    <button className={styles.deleteBtn} onClick={() => onDelete(post.id)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                    </button>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    )
    }

    export default AdminPanel