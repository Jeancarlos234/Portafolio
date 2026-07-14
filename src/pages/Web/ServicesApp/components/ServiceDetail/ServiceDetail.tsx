    import styles from './ServiceDetail.module.css'
    import type { Service } from '../../types'

    interface ServiceDetailProps {
    service: Service
    onRequest: () => void
    onBack: () => void
    }

    const ServiceDetail = ({ service, onRequest, onBack }: ServiceDetailProps) => {
    return (
        <div className={styles.detail}>
        <button onClick={onBack} className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Volver a servicios
        </button>

        <div className={styles.layout}>
            <div className={styles.imageSection}>
            <img src={service.image} alt={service.name} className={styles.image} />
            </div>
            <div className={styles.info}>
            <span className={styles.category}>{service.category}</span>
            <h1 className={styles.title}>{service.name}</h1>
            <p className={styles.description}>{service.longDescription}</p>
            
            <div className={styles.meta}>
                <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Precio</span>
                <span className={styles.metaValue}>${service.price.toLocaleString()}</span>
                </div>
                <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Duración</span>
                <span className={styles.metaValue}>{service.duration}</span>
                </div>
            </div>

            <div className={styles.featuresSection}>
                <h3>Características</h3>
                <div className={styles.featuresList}>
                {service.features.map((f, i) => (
                    <div key={i} className={styles.featureItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                    </div>
                ))}
                </div>
            </div>

            <button onClick={onRequest} className={styles.requestBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Solicitar este servicio
            </button>
            </div>
        </div>
        </div>
    )
    }

    export default ServiceDetail