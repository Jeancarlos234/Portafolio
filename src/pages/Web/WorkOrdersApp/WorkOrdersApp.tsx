    import { useState, useEffect, useCallback } from 'react'
    import Sidebar from './components/Sidebar/Sidebar'
    import KanbanBoard from './components/KanbanBoard/KanbanBoard'
    import Dashboard from './components/Dashboard/Dashboard'
    import OrderCalendar from './components/Calendar/Calendar'
    import ClientPanel from './components/ClientPanel/ClientPanel'
    import Reports from './components/Reports/Reports'
    import OrderModal from './components/OrderModal/OrderModal'
    import styles from './WorkOrdersApp.module.css'
    import type { WorkOrder, Client, Technician, OrderStats } from './types'

    const initialClients: Client[] = [
    { id: 'c1', name: 'Empresa ABC', email: 'contacto@abc.com', phone: '+34 912 345 678', company: 'ABC S.L.', address: 'Calle Mayor 123, Madrid' },
    { id: 'c2', name: 'TechCorp', email: 'info@techcorp.com', phone: '+34 923 456 789', company: 'TechCorp Inc.', address: 'Av. Tecnología 456, Barcelona' },
    { id: 'c3', name: 'InnovaSol', email: 'admin@innovasol.com', phone: '+34 934 567 890', company: 'InnovaSol S.A.', address: 'Plaza Innovación 789, Valencia' },
    ]

    const initialTechnicians: Technician[] = [
    { id: 't1', name: 'Carlos García', role: 'Técnico Senior', email: 'carlos@empresa.com', phone: '+34 611 111 111', active: true },
    { id: 't2', name: 'María López', role: 'Técnico Junior', email: 'maria@empresa.com', phone: '+34 622 222 222', active: true },
    { id: 't3', name: 'Roberto Sánchez', role: 'Supervisor', email: 'roberto@empresa.com', phone: '+34 633 333 333', active: true },
    ]

    const initialOrders: WorkOrder[] = [
    { id: '1', number: 'OT-2024-001', title: 'Reparación de servidor principal', description: 'El servidor de producción presenta fallos intermitentes.', clientId: 'c1', clientName: 'Empresa ABC', clientContact: '+34 912 345 678', assignedTo: 'Carlos García', priority: 'urgent', status: 'in_progress', category: 'Soporte Técnico', location: 'Calle Mayor 123, Madrid', scheduledDate: new Date().toISOString().split('T')[0], startTime: '09:00', endTime: '14:00', estimatedHours: 5, actualHours: 3, materials: 'Disco duro SSD 1TB', notes: '', createdAt: '2024-12-10', updatedAt: '2024-12-11', completedAt: '' },
    { id: '2', number: 'OT-2024-002', title: 'Instalación de red WiFi', description: 'Instalación de 5 puntos de acceso WiFi.', clientId: 'c2', clientName: 'TechCorp', clientContact: '+34 923 456 789', assignedTo: 'María López', priority: 'high', status: 'pending', category: 'Instalación', location: 'Av. Tecnología 456, Barcelona', scheduledDate: '2025-01-15', startTime: '08:00', endTime: '16:00', estimatedHours: 8, actualHours: 0, materials: 'Routers WiFi 6', notes: '', createdAt: '2024-12-12', updatedAt: '2024-12-12', completedAt: '' },
    { id: '3', number: 'OT-2024-003', title: 'Mantenimiento preventivo', description: 'Revisión trimestral de equipos informáticos.', clientId: 'c3', clientName: 'InnovaSol', clientContact: '+34 934 567 890', assignedTo: 'Roberto Sánchez', priority: 'medium', status: 'completed', category: 'Mantenimiento', location: 'Plaza Innovación 789, Valencia', scheduledDate: '2024-12-01', startTime: '10:00', endTime: '13:00', estimatedHours: 3, actualHours: 2.5, materials: 'Kit de limpieza', notes: 'Todo en orden', createdAt: '2024-11-28', updatedAt: '2024-12-01', completedAt: '2024-12-01' },
    { id: '4', number: 'OT-2024-004', title: 'Configuración de firewall', description: 'Configuración de reglas de seguridad.', clientId: 'c1', clientName: 'Empresa ABC', clientContact: '+34 912 345 678', assignedTo: '', priority: 'high', status: 'assigned', category: 'Seguridad', location: 'Calle Mayor 123, Madrid', scheduledDate: '2025-01-20', startTime: '10:00', endTime: '15:00', estimatedHours: 5, actualHours: 0, materials: '', notes: '', createdAt: '2024-12-13', updatedAt: '2024-12-13', completedAt: '' },
    ]

    const WorkOrdersApp = () => {
    const [activeView, setActiveView] = useState<'dashboard' | 'kanban' | 'calendar' | 'clients' | 'reports'>('dashboard')
    const [showModal, setShowModal] = useState(false)
    const [editingOrder, setEditingOrder] = useState<WorkOrder | null>(null)
    const [orders, setOrders] = useState<WorkOrder[]>(() => {
        const saved = localStorage.getItem('wo-orders')
        return saved ? JSON.parse(saved) : initialOrders
    })
    const [clients, setClients] = useState<Client[]>(() => {
        const saved = localStorage.getItem('wo-clients')
        return saved ? JSON.parse(saved) : initialClients
    })
    const [technicians] = useState<Technician[]>(initialTechnicians)

    useEffect(() => { localStorage.setItem('wo-orders', JSON.stringify(orders)) }, [orders])
    useEffect(() => { localStorage.setItem('wo-clients', JSON.stringify(clients)) }, [clients])

    const today = new Date().toISOString().split('T')[0]
    const completedOrders = orders.filter(o => o.status === 'completed')
    const avgTime = completedOrders.length > 0 ? completedOrders.reduce((sum, o) => sum + o.actualHours, 0) / completedOrders.length : 0

    const stats: OrderStats = {
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'pending' || o.status === 'assigned').length,
        inProgressOrders: orders.filter(o => o.status === 'in_progress').length,
        completedOrders: completedOrders.length,
        urgentOrders: orders.filter(o => o.priority === 'urgent').length,
        todayOrders: orders.filter(o => o.scheduledDate === today).length,
        avgCompletionTime: Math.round(avgTime * 10) / 10,
        completionRate: orders.length > 0 ? Math.round((completedOrders.length / orders.length) * 100) : 0,
    }

    const addOrder = useCallback((order: Omit<WorkOrder, 'id' | 'number' | 'createdAt' | 'updatedAt' | 'completedAt'>) => {
        const newOrder: WorkOrder = { ...order, id: Date.now().toString(), number: `OT-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`, createdAt: new Date().toISOString().split('T')[0], updatedAt: new Date().toISOString().split('T')[0], completedAt: '' }
        setOrders(prev => [newOrder, ...prev])
    }, [orders])

    const updateOrder = useCallback((id: string, updates: Partial<WorkOrder>) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates, updatedAt: new Date().toISOString().split('T')[0], completedAt: updates.status === 'completed' ? new Date().toISOString().split('T')[0] : o.completedAt } : o))
    }, [])

    const deleteOrder = useCallback((id: string) => {
        setOrders(prev => prev.filter(o => o.id !== id))
    }, [])

    const addClient = useCallback((client: Omit<Client, 'id'>) => {
        setClients(prev => [...prev, { ...client, id: Date.now().toString() }])
    }, [])

    const deleteClient = useCallback((id: string) => {
        setClients(prev => prev.filter(c => c.id !== id))
    }, [])

    const openNewModal = () => { setEditingOrder(null); setShowModal(true) }
    const openEditModal = (order: WorkOrder) => { setEditingOrder(order); setShowModal(true) }

    return (
        <div className={styles.app}>
        <Sidebar activeView={activeView} onViewChange={setActiveView} stats={stats} />
        <main className={styles.main}>
            <header className={styles.topBar}>
            <h1 className={styles.pageTitle}>
                {activeView === 'dashboard' ? 'Panel de Control' : activeView === 'kanban' ? 'Tablero Kanban' : activeView === 'calendar' ? 'Calendario' : activeView === 'clients' ? 'Clientes' : 'Reportes'}
            </h1>
            <button onClick={openNewModal} className={styles.newBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Nueva Orden
            </button>
            </header>

            <div className={styles.content}>
            {activeView === 'dashboard' && <Dashboard stats={stats} orders={orders} onEdit={openEditModal} />}
            {activeView === 'kanban' && <KanbanBoard orders={orders} onUpdate={updateOrder} onEdit={openEditModal} onDelete={deleteOrder} />}
            {activeView === 'calendar' && <OrderCalendar orders={orders} />}
            {activeView === 'clients' && <ClientPanel clients={clients} onAdd={addClient} onDelete={deleteClient} />}
            {activeView === 'reports' && <Reports orders={orders} clients={clients} technicians={technicians} />}
            </div>
        </main>

        {showModal && (
            <OrderModal
            order={editingOrder}
            clients={clients}
            technicians={technicians}
            onSave={(order) => editingOrder ? updateOrder(editingOrder.id, order) : addOrder(order as Omit<WorkOrder, 'id' | 'number' | 'createdAt' | 'updatedAt' | 'completedAt'>)}
            onClose={() => setShowModal(false)}
            />
        )}
        </div>
    )
    }

    export default WorkOrdersApp