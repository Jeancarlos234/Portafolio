    import type { FormEvent } from 'react'
    import { useState } from 'react'
    import styles from '../../css/Contact.module.css'

    interface FormData {
    name: string
    email: string
    subject: string
    message: string
    }

    const Contact = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
        ...prev,
        [name]: value
        }))
        // Limpiar mensajes de error al escribir
        if (errorMessage) setErrorMessage('')
        if (submitMessage) setSubmitMessage('')
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        
        // Validación básica
        if (!formData.name || !formData.email || !formData.message) {
            setErrorMessage('Por favor, completa todos los campos requeridos')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            setErrorMessage('Por favor, ingresa un email válido')
            return
        }

        setIsSubmitting(true)
        
        // Simular envío
        try {
            await new Promise(resolve => setTimeout(resolve, 1500))
            setSubmitMessage('¡Mensaje enviado con éxito! Te responderé pronto.')
            setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
            })
        } catch (error) {
            // ✅ Ahora usamos la variable error
            console.error('Error al enviar el formulario:', error)
            setErrorMessage('Hubo un error al enviar el mensaje. Intenta de nuevo.')
        } finally {
            setIsSubmitting(false)
        }
        }

    return (
        <section className={styles.contact}>
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>📬 Contacto</h1>
            <p className={styles.subtitle}>¿Tienes un proyecto en mente? ¡Hablemos!</p>
            <div className={styles.content}>
            <div className={styles.info}>
                <h3>Información de contacto</h3>
                <p>
                Estoy disponible para colaboraciones y proyectos freelance. 
                No dudes en contactarme para discutir cómo podemos trabajar juntos.
                </p>
                <div className={styles.contactInfo}>
                <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>📧</span>
                    <span>tuemail@ejemplo.com</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>📱</span>
                    <span>+34 600 000 000</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>📍</span>
                    <span>Madrid, España</span>
                </div>
                </div>
                <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
                <a href="#" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                </a>
                <a href="#" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                    Twitter
                </a>
                </div>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.form}>
                {errorMessage && (
                <div className={styles.errorMessage}>
                    {errorMessage}
                </div>
                )}
                
                <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                    Nombre *
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="Tu nombre"
                />
                </div>
                
                <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                    Email *
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="tuemail@ejemplo.com"
                />
                </div>
                
                <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>
                    Asunto
                </label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Asunto del mensaje"
                />
                </div>
                
                <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                    Mensaje *
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={styles.textarea}
                    placeholder="Tu mensaje..."
                    rows={5}
                />
                </div>
                
                <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={isSubmitting}
                >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
                
                {submitMessage && (
                <div className={styles.successMessage}>
                    {submitMessage}
                </div>
                )}
            </form>
            </div>
        </div>
        </section>
    )
    }

    export default Contact