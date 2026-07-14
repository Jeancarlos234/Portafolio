    import { useState } from 'react'
    import styles from './RequestForm.module.css'
    import type { Service, Client, ServiceRequest } from '../../types'

    interface RequestFormProps {
    service: Service
    clients: Client[]
    onAddClient: (client: Omit<Client, 'id'>) => void
    onSubmit: (request: Omit<ServiceRequest, 'id' | 'date' | 'status' | 'completedDate'>) => void
    onBack: () => void
    }

    const RequestForm = ({ service, clients, onAddClient, onSubmit, onBack }: RequestFormProps) => {
    const [clientId, setClientId] = useState('')
    const [newClient, setNewClient] = useState(false)
    const [clientData, setClientData] = useState({ name: '', email: '', phone: '', company: '', address: '' })
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
    const [notes, setNotes] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (newClient) {
        if (!clientData.name || !clientData.email) return
        const newId = Date.now().toString()
        onAddClient(clientData)
        onSubmit({
            serviceId: service.id,
            serviceName: service.name,
            clientId: newId,
            clientName: clientData.name,
            priority,
            notes,
        })
        } else {
        const client = clients.find(c => c.id === clientId)
        if (!client) return
        onSubmit({
            serviceId: service.id,
            serviceName: service.name,
            clientId: client.id,
            clientName: client.name,
            priority,
            notes,
        })
        }

        setMessage(`Solicitud enviada para ${service.name}`)
        setTimeout(() => { setMessage(''); onBack() }, 2000)
    }

    return (
        <div className={styles.formContainer}>
        <button onClick={onBack} className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Volver
        </button>

        <div className={styles.serviceInfo}>
            <h3>{service.name}</h3>
            <span>${service.price.toLocaleString()} · {service.duration}</span>
        </div>

        {message && (
            <div className={styles.message}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            {message}
            </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.formTitle}>Solicitar Servicio</h3>

            <div className={styles.clientToggle}>
            <button type="button" className={`${styles.toggleBtn} ${!newClient ? styles.active : ''}`} onClick={() => setNewClient(false)}>Cliente existente</button>
            <button type="button" className={`${styles.toggleBtn} ${newClient ? styles.active : ''}`} onClick={() => setNewClient(true)}>Nuevo cliente</button>
            </div>

            {!newClient ? (
            <select value={clientId} onChange={(e) => setClientId(e.target.value)} required className={styles.input}>
                <option value="">Seleccionar cliente...</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name} - {c.company}</option>)}
            </select>
            ) : (
            <div className={styles.clientForm}>
                <input type="text" placeholder="Nombre *" value={clientData.name} onChange={(e) => setClientData(p => ({ ...p, name: e.target.value }))} required className={styles.input} />
                <input type="email" placeholder="Email *" value={clientData.email} onChange={(e) => setClientData(p => ({ ...p, email: e.target.value }))} required className={styles.input} />
                <input type="text" placeholder="Teléfono" value={clientData.phone} onChange={(e) => setClientData(p => ({ ...p, phone: e.target.value }))} className={styles.input} />
                <input type="text" placeholder="Empresa" value={clientData.company} onChange={(e) => setClientData(p => ({ ...p, company: e.target.value }))} className={styles.input} />
            </div>
            )}

            <div className={styles.formGroup}>
            <label className={styles.label}>Prioridad</label>
            <div className={styles.prioritySelect}>
                {(['low', 'medium', 'high'] as const).map(p => (
                <button key={p} type="button" className={`${styles.priorityBtn} ${priority === p ? styles[`priority${p.charAt(0).toUpperCase() + p.slice(1)}`] : ''}`} onClick={() => setPriority(p)}>
                    {p === 'low' ? 'Baja' : p === 'medium' ? 'Media' : 'Alta'}
                </button>
                ))}
            </div>
            </div>

            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Detalles adicionales..." className={styles.textarea} rows={3} />

            <button type="submit" className={styles.submitBtn}>Enviar Solicitud</button>
        </form>
        </div>
    )
    }

    export default RequestForm