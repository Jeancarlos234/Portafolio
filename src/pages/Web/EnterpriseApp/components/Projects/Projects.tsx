    import { useState } from 'react'
    import styles from './Projects.module.css'
    import type { Project } from '../../types'

    interface ProjectsProps {
    projects: Project[]
    onAdd: (project: Omit<Project, 'id'>) => void
    }

    const Projects = ({ projects, onAdd }: ProjectsProps) => {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        name: '', description: '', client: '', status: 'planning' as const,
        progress: 0, budget: 0, spent: 0, startDate: '', endDate: '', team: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name) return
        onAdd({ ...formData, team: formData.team.split(',').map(t => t.trim()).filter(Boolean) })
        setFormData({ name: '', description: '', client: '', status: 'planning', progress: 0, budget: 0, spent: 0, startDate: '', endDate: '', team: '' })
        setShowForm(false)
    }

    const getStatusColor = (s: string) => {
        switch (s) { case 'active': return '#22c55e'; case 'planning': return '#f59e0b'; case 'completed': return '#6366f1'; case 'on_hold': return '#94a3b8'; default: return '#94a3b8' }
    }
    const getStatusLabel = (s: string) => {
        switch (s) { case 'active': return 'Activo'; case 'planning': return 'Planificación'; case 'completed': return 'Completado'; case 'on_hold': return 'En Pausa'; default: return s }
    }

    return (
        <div className={styles.projects}>
        <div className={styles.header}>
            <h1 className={styles.title}>Proyectos</h1>
            <button onClick={() => setShowForm(!showForm)} className={styles.addBtn}>
            {showForm ? 'Cancelar' : '+ Nuevo Proyecto'}
            </button>
        </div>

        {showForm && (
            <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
                <input type="text" placeholder="Nombre *" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} required className={styles.input} />
                <input type="text" placeholder="Cliente" value={formData.client} onChange={(e) => setFormData(p => ({ ...p, client: e.target.value }))} className={styles.input} />
                <input type="number" placeholder="Presupuesto" value={formData.budget || ''} onChange={(e) => setFormData(p => ({ ...p, budget: Number(e.target.value) }))} className={styles.input} />
                <input type="date" value={formData.startDate} onChange={(e) => setFormData(p => ({ ...p, startDate: e.target.value }))} className={styles.input} />
                <input type="date" value={formData.endDate} onChange={(e) => setFormData(p => ({ ...p, endDate: e.target.value }))} className={styles.input} />
                <input type="text" placeholder="Equipo (separado por comas)" value={formData.team} onChange={(e) => setFormData(p => ({ ...p, team: e.target.value }))} className={styles.input} />
            </div>
            <textarea placeholder="Descripción" value={formData.description} onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))} className={styles.textarea} rows={2} />
            <button type="submit" className={styles.submitBtn}>Guardar Proyecto</button>
            </form>
        )}

        <div className={styles.grid}>
            {projects.map(p => (
            <div key={p.id} className={styles.card}>
                <div className={styles.cardHeader}>
                <h3>{p.name}</h3>
                <span className={styles.cardStatus} style={{ color: getStatusColor(p.status), background: `${getStatusColor(p.status)}15` }}>
                    {getStatusLabel(p.status)}
                </span>
                </div>
                <p className={styles.cardDesc}>{p.description}</p>
                <div className={styles.cardMeta}>
                <span>Cliente: {p.client}</span>
                <span>{p.startDate} → {p.endDate}</span>
                </div>
                <div className={styles.progressSection}>
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${p.progress}%`, background: getStatusColor(p.status) }} />
                </div>
                <span className={styles.progressText}>{p.progress}%</span>
                </div>
                <div className={styles.budgetRow}>
                <span>Presupuesto: ${p.budget.toLocaleString()}</span>
                <span>Gastado: ${p.spent.toLocaleString()}</span>
                </div>
                <div className={styles.teamRow}>
                {p.team.map((t, i) => (
                    <span key={i} className={styles.teamAvatar}>{t.split(' ').map(n => n[0]).join('')}</span>
                ))}
                </div>
            </div>
            ))}
            {projects.length === 0 && <p className={styles.empty}>Sin proyectos</p>}
        </div>
        </div>
    )
    }

    export default Projects 