    import { useState, useEffect, useCallback } from 'react'
    import Header from './components/Header/Header'
    import ServiceGrid from './components/ServiceGrid/ServiceGrid'
    import ServiceDetail from './components/ServiceDetail/ServiceDetail'
    import RequestForm from './components/RequestForm/RequestForm'
    import AdminPanel from './components/AdminPanel/AdminPanel'
    import ClientManager from './components/ClientManager/ClientManager'
    import Dashboard from './components/Dashboard/Dashboard'
    import styles from './ServicesApp.module.css'
    import type { Service, Client, ServiceRequest, ServiceStats } from './types'

    const initialServices: Service[] = [
    { id: '1', name: 'Desarrollo Web Full Stack', description: 'Sitios web completos con React, Node.js y bases de datos', longDescription: 'Desarrollamos aplicaciones web completas desde cero, incluyendo frontend, backend, base de datos y despliegue. Utilizamos tecnologías modernas como React, TypeScript, Node.js y PostgreSQL.', category: 'Desarrollo', price: 2500, duration: '4-8 semanas', features: ['Frontend React/TypeScript', 'Backend Node.js', 'Base de datos SQL/NoSQL', 'Despliegue en la nube', 'Panel administrativo', 'SEO optimizado'], image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', featured: true, active: true },
    { id: '2', name: 'App Móvil Nativa', description: 'Aplicaciones iOS y Android con React Native o Flutter', longDescription: 'Creamos aplicaciones móviles nativas para iOS y Android con experiencias de usuario fluidas y rendimiento óptimo.', category: 'Móvil', price: 3500, duration: '6-10 semanas', features: ['iOS y Android', 'UI/UX nativo', 'Notificaciones push', 'Modo offline', 'Integración con APIs'], image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400', featured: true, active: true },
    { id: '3', name: 'E-commerce Platform', description: 'Tiendas online completas con carrito, pagos y panel admin', longDescription: 'Plataformas de comercio electrónico completas con todas las funcionalidades necesarias para vender online.', category: 'Desarrollo', price: 4000, duration: '6-12 semanas', features: ['Catálogo de productos', 'Carrito de compras', 'Pasarela de pagos', 'Panel de administración', 'Gestión de inventario', 'Reportes de ventas'], image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400', featured: true, active: true },
    { id: '4', name: 'Consultoría Tecnológica', description: 'Asesoría en arquitectura, optimización y mejores prácticas', longDescription: 'Servicio de consultoría para mejorar la arquitectura, rendimiento y seguridad de tus aplicaciones existentes.', category: 'Consultoría', price: 150, duration: 'Por hora', features: ['Análisis de arquitectura', 'Optimización de rendimiento', 'Auditoría de seguridad', 'Code review', 'Recomendaciones'], image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400', featured: false, active: true },
    { id: '5', name: 'Diseño UX/UI', description: 'Diseño de interfaces modernas y experiencias de usuario', longDescription: 'Diseñamos interfaces intuitivas y atractivas centradas en la experiencia del usuario y la conversión.', category: 'Diseño', price: 1800, duration: '2-4 semanas', features: ['Wireframes', 'Prototipos interactivos', 'Diseño visual', 'Sistema de diseño', 'Pruebas de usabilidad'], image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400', featured: false, active: true },
    { id: '6', name: 'Mantenimiento Web', description: 'Soporte continuo, actualizaciones y mejoras mensuales', longDescription: 'Servicio de mantenimiento continuo para mantener tu sitio web actualizado, seguro y funcionando al máximo.', category: 'Soporte', price: 500, duration: 'Mensual', features: ['Actualizaciones de seguridad', 'Backups regulares', 'Monitoreo 24/7', 'Soporte técnico', 'Mejoras mensuales'], image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400', featured: false, active: true },
    ]

    const initialClients: Client[] = [
    { id: 'c1', name: 'Carlos García', email: 'carlos@email.com', phone: '+34 612 345 678', company: 'TechStart Inc.', address: 'Calle Mayor 123, Madrid' },
    { id: 'c2', name: 'María López', email: 'maria@email.com', phone: '+34 623 456 789', company: 'InnovaCorp', address: 'Av. Principal 456, Barcelona' },
    ]

    const ServicesApp = () => {
    const [activeView, setActiveView] = useState<'services' | 'detail' | 'request' | 'admin' | 'clients' | 'dashboard'>('services')
    const [selectedService, setSelectedService] = useState<Service | null>(null)
    const [services, setServices] = useState<Service[]>(() => {
        const saved = localStorage.getItem('svc-services')
        return saved ? JSON.parse(saved) : initialServices
    })
    const [clients, setClients] = useState<Client[]>(() => {
        const saved = localStorage.getItem('svc-clients')
        return saved ? JSON.parse(saved) : initialClients
    })
    const [requests, setRequests] = useState<ServiceRequest[]>(() => {
        const saved = localStorage.getItem('svc-requests')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => { localStorage.setItem('svc-services', JSON.stringify(services)) }, [services])
    useEffect(() => { localStorage.setItem('svc-clients', JSON.stringify(clients)) }, [clients])
    useEffect(() => { localStorage.setItem('svc-requests', JSON.stringify(requests)) }, [requests])

    const stats: ServiceStats = {
        totalServices: services.length,
        activeServices: services.filter(s => s.active).length,
        totalClients: clients.length,
        pendingRequests: requests.filter(r => r.status === 'pending' || r.status === 'in_progress').length,
        completedRequests: requests.filter(r => r.status === 'completed').length,
        totalRevenue: requests.filter(r => r.status === 'completed').reduce((sum, r) => {
        const service = services.find(s => s.id === r.serviceId)
        return sum + (service?.price || 0)
        }, 0),
    }

    const addService = useCallback((service: Omit<Service, 'id'>) => {
        setServices(prev => [...prev, { ...service, id: Date.now().toString() }])
    }, [])

    const deleteService = useCallback((id: string) => {
        setServices(prev => prev.filter(s => s.id !== id))
    }, [])

    const addClient = useCallback((client: Omit<Client, 'id'>) => {
        setClients(prev => [...prev, { ...client, id: Date.now().toString() }])
    }, [])

    const deleteClient = useCallback((id: string) => {
        setClients(prev => prev.filter(c => c.id !== id))
    }, [])

    const addRequest = useCallback((request: Omit<ServiceRequest, 'id' | 'date' | 'status' | 'completedDate'>) => {
        setRequests(prev => [...prev, { ...request, id: Date.now().toString(), status: 'pending' as const, date: new Date().toISOString().split('T')[0], completedDate: '' }])
    }, [])

    const updateRequestStatus = useCallback((id: string, status: ServiceRequest['status']) => {
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status, completedDate: status === 'completed' ? new Date().toISOString().split('T')[0] : r.completedDate } : r))
    }, [])

    return (
        <div className={styles.app}>
        <Header activeView={activeView} onViewChange={(view) => { setActiveView(view); setSelectedService(null) }} />
        <div className={styles.container}>
            {activeView === 'services' && (
            <ServiceGrid services={services} onSelect={(s) => { setSelectedService(s); setActiveView('detail') }} />
            )}
            {activeView === 'detail' && selectedService && (
            <ServiceDetail service={selectedService} onRequest={() => setActiveView('request')} onBack={() => { setSelectedService(null); setActiveView('services') }} />
            )}
            {activeView === 'request' && selectedService && (
            <RequestForm service={selectedService} clients={clients} onAddClient={addClient} onSubmit={addRequest} onBack={() => setActiveView('detail')} />
            )}
            {activeView === 'dashboard' && (
            <Dashboard stats={stats} services={services} requests={requests} onUpdateStatus={updateRequestStatus} />
            )}
            {activeView === 'admin' && (
            <AdminPanel services={services} onAdd={addService} onDelete={deleteService} />
            )}
            {activeView === 'clients' && (
            <ClientManager clients={clients} onAdd={addClient} onDelete={deleteClient} />
            )}
        </div>
        </div>
    )
    }

    export default ServicesApp