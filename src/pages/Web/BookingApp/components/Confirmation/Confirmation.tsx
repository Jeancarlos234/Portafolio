        import styles from './Confirmation.module.css'

        interface ConfirmationProps {
        onNewBooking: () => void
        }

        const Confirmation = ({ onNewBooking }: ConfirmationProps) => {
        return (
            <div className={styles.confirmation}>
            <div className={styles.card}>
                <div className={styles.iconWrapper}>
                <div className={styles.icon}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                    </svg>
                </div>
                <div className={styles.iconGlow}></div>
                </div>

                <h2 className={styles.title}>Reserva confirmada</h2>
                <p className={styles.text}>
                Tu cita ha sido reservada exitosamente. Recibirás un correo de confirmación con los detalles.
                </p>

                <div className={styles.info}>
                <div className={styles.infoItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>Te enviaremos un recordatorio 1 hora antes</span>
                </div>
                <div className={styles.infoItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <span>Puedes cancelar hasta 24 horas antes</span>
                </div>
                </div>

                <button onClick={onNewBooking} className={styles.newBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Nueva reserva
                </button>
            </div>
            </div>
        )
        }

        export default Confirmation