    import styles from './ServiceSelector.module.css'
    import type { Service } from '../../type'

    interface ServiceSelectorProps {
    services: Service[]
    onSelect: (service: Service) => void
    }

    const ServiceSelector = ({ services, onSelect }: ServiceSelectorProps) => {
    return (
        <div className={styles.selector}>
        <div className={styles.hero}>
            <h1 className={styles.title}>Reserva tu cita</h1>
            <p className={styles.subtitle}>Selecciona el servicio que necesitas</p>
        </div>

        <div className={styles.grid}>
            {services.map((service) => (
            <button
                key={service.id}
                className={styles.card}
                onClick={() => onSelect(service)}
            >
                <div className={styles.cardTop}>
                <span className={styles.icon}>{service.icon}</span>
                <div className={styles.duration}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {service.duration} min
                </div>
                </div>
                <h3 className={styles.serviceName}>{service.name}</h3>
                <p className={styles.serviceDesc}>{service.description}</p>
                <div className={styles.cardBottom}>
                <span className={styles.price}>${service.price}</span>
                <span className={styles.selectBtn}>
                    Reservar
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                </span>
                </div>
            </button>
            ))}
        </div>
        </div>
    )
    }

    export default ServiceSelector