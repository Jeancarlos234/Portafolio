    import { useState } from 'react'
    import styles from './Documents.module.css'
    import type { Document } from '../../types'

    interface DocumentsProps {
    documents: Document[]
    }

    const Documents = ({ documents }: DocumentsProps) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')

    const categories = ['all', ...Array.from(new Set(documents.map(d => d.category)))]

    const filtered = documents
        .filter(d => categoryFilter === 'all' || d.category === categoryFilter)
        .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className={styles.documents}>
        <div className={styles.header}>
            <h1 className={styles.title}>Documentos</h1>
        </div>

        <div className={styles.toolbar}>
            <div className={styles.searchBox}>
            <span>⌕</span>
            <input type="text" placeholder="Buscar documentos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
            </div>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={styles.select}>
            {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'Todas' : c}</option>)}
            </select>
        </div>

        <div className={styles.grid}>
            {filtered.map(d => (
            <div key={d.id} className={styles.card}>
                <div className={styles.cardIcon}>
                {d.type === 'PDF' ? '◫' : d.type === 'DOC' ? '◰' : '◲'}
                </div>
                <div className={styles.cardInfo}>
                <span className={styles.cardName}>{d.name}</span>
                <span className={styles.cardMeta}>{d.type} · {d.size} · {d.date}</span>
                <span className={styles.cardUploader}>Subido por {d.uploadedBy}</span>
                </div>
                <span className={styles.cardCategory}>{d.category}</span>
            </div>
            ))}
            {filtered.length === 0 && <p className={styles.empty}>Sin documentos</p>}
        </div>
        </div>
    )
    }

    export default Documents