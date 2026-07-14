    import { useState } from 'react'
    import ServiceCard from '../ServiceCard/ServiceCard'
    import styles from './ServiceGrid.module.css'
    import type { Service } from '../../types'

    interface ServiceGridProps {
    services: Service[]
    onSelect: (service: Service) => void
    }

    const ServiceGrid = ({ services, onSelect }: ServiceGridProps) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')

    const categories = ['all', ...Array.from(new Set(services.map(s => s.category)))]

    const filtered = services
        .filter(s => s.active)
        .filter(s => categoryFilter === 'all' || s.category === categoryFilter)
        .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className={styles.grid}>
        <div className={styles.hero}>
            <h1 className={styles.title}>Nuestros Servicios</h1>
            <p className={styles.subtitle}>Soluciones profesionales para tu negocio</p>
        </div>
        <div className={styles.toolbar}>
            <div className={styles.searchBox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Buscar servicios..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
            </div>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={styles.select}>
            <option value="all">Todas las categorías</option>
            {categories.filter(c => c !== 'all').map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </div>
        <div className={styles.servicesGrid}>
            {filtered.map(service => <ServiceCard key={service.id} service={service} onSelect={onSelect} />)}
            {filtered.length === 0 && <div className={styles.empty}><p>No se encontraron servicios</p></div>}
        </div>
        </div>
    )
    }

    export default ServiceGrid