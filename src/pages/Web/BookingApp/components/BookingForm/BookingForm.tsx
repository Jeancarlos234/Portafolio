    import type { FormEvent } from 'react'
    import { useState } from 'react'
    import styles from './BookingForm.module.css'
    import type { Service } from '../../type'

    interface BookingFormProps {
    service: Service
    date: string
    time: string
    onSubmit: (data: { name: string; email: string; phone: string; notes: string }) => void
    onCancel: () => void
    }

    const BookingForm = ({ service, date, time, onSubmit, onCancel }: BookingFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        notes: '',
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const formatDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split('-')
        return `${day}/${month}/${year}`
    }

    const formatTime = (timeStr: string) => {
        const [hour, minute] = timeStr.split(':')
        const h = parseInt(hour)
        const ampm = h >= 12 ? 'PM' : 'AM'
        const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h
        return `${h12}:${minute} ${ampm}`
    }

    const validate = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.name.trim()) newErrors.name = 'El nombre es requerido'
        if (!formData.email.trim()) newErrors.email = 'El email es requerido'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email inválido'
        if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (validate()) {
        onSubmit(formData)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
        setErrors(prev => {
            const newErrors = { ...prev }
            delete newErrors[name]
            return newErrors
        })
        }
    }

    return (
        <div className={styles.formContainer}>
        <div className={styles.summary}>
            <div className={styles.summaryHeader}>
            <span className={styles.serviceIcon}>{service.icon}</span>
            <div>
                <h3 className={styles.serviceName}>{service.name}</h3>
                <span className={styles.servicePrice}>${service.price}</span>
            </div>
            </div>
            <div className={styles.summaryDetails}>
            <div className={styles.summaryItem}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>{formatDate(date)}</span>
            </div>
            <div className={styles.summaryItem}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>{formatTime(time)} · {service.duration} min</span>
            </div>
            </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.formTitle}>Tus datos</h3>

            <div className={styles.formGroup}>
            <label className={styles.label}>Nombre completo *</label>
            <div className={`${styles.inputWrapper} ${errors.name ? styles.error : ''}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                className={styles.input}
                />
            </div>
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            <div className={styles.formGrid}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Email *</label>
                <div className={`${styles.inputWrapper} ${errors.email ? styles.error : ''}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className={styles.input}
                />
                </div>
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Teléfono *</label>
                <div className={`${styles.inputWrapper} ${errors.phone ? styles.error : ''}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+34 600 000 000"
                    className={styles.input}
                />
                </div>
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>
            </div>

            <div className={styles.formGroup}>
            <label className={styles.label}>Notas adicionales</label>
            <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="¿Algo que debamos saber?"
                rows={3}
                className={styles.textarea}
            />
            </div>

            <div className={styles.buttons}>
            <button type="button" onClick={onCancel} className={styles.cancelBtn}>
                Cancelar
            </button>
            <button type="submit" className={styles.submitBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
                </svg>
                Confirmar reserva
            </button>
            </div>
        </form>
        </div>
    )
    }

    export default BookingForm