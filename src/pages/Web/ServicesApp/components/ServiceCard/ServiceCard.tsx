    import styles from './ServiceCard.module.css'
    import type { Service } from '../../types'

    interface ServiceCardProps {
    service: Service
    onSelect: (service: Service) => void
    }

    const ServiceCard = ({ service, onSelect }: ServiceCardProps) => {
    return (
        <div className={styles.card} onClick={() => onSelect(service)}>
        <div className={styles.imageWrapper}>
            <img src={service.image} alt={service.name} className={styles.image} />
            <span className={styles.category}>{service.category}</span>
            {service.featured && <span className={styles.featured}>Destacado</span>}
        </div>
        <div className={styles.content}>
            <h3 className={styles.name}>{service.name}</h3>
            <p className={styles.desc}>{service.description}</p>
            <div className={styles.features}>
            {service.features.slice(0, 3).map((f, i) => (
                <span key={i} className={styles.feature}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {f}
                </span>
            ))}
            </div>
            <div className={styles.bottom}>
            <span className={styles.price}>${service.price.toLocaleString()}</span>
            <span className={styles.duration}>{service.duration}</span>
            </div>
        </div>
        </div>
    )
    }

    export default ServiceCard