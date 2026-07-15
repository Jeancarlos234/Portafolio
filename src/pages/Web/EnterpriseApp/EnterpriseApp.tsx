    import { useState, useEffect, useCallback } from 'react'
    import Sidebar from './components/Sidebar/Sidebar'
    import TopBar from './components/TopBar/TopBar'
    import Dashboard from './components/Dashboard/Dashboard'
    import Finances from './components/Finances/Finances'
    import Projects from './components/Projects/Projects'
    import Contacts from './components/Contacts/Contacts'
    import CorpCalendar from './components/Calendar/Calendar'
    import Chat from './components/Chat/Chat'
    import Documents from './components/Documents/Documents'
    import styles from './EnterpriseApp.module.css'
    import type { FinanceRecord, Project, Contact, CalendarEvent, ChatMessage, Document as DocType, EnterpriseStats } from './types'

    const EnterpriseApp = () => {
    const [activeModule, setActiveModule] = useState('dashboard')
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [notifications] = useState(3)

    const [finances, setFinances] = useState<FinanceRecord[]>(() => {
        const saved = localStorage.getItem('ent-finances')
        return saved ? JSON.parse(saved) : [
        { id: '1', type: 'income', category: 'Ventas', amount: 25000, description: 'Proyecto A', date: '2025-01-15', status: 'completed' },
        { id: '2', type: 'expense', category: 'Nómina', amount: 12000, description: 'Enero 2025', date: '2025-01-31', status: 'completed' },
        { id: '3', type: 'income', category: 'Consultoría', amount: 8500, description: 'Servicios B', date: '2025-02-01', status: 'pending' },
        ]
    })

    const [projects, setProjects] = useState<Project[]>(() => {
        const saved = localStorage.getItem('ent-projects')
        return saved ? JSON.parse(saved) : [
        { id: '1', name: 'Plataforma Web', description: 'Desarrollo completo', client: 'TechCorp', status: 'active', progress: 65, budget: 50000, spent: 32500, startDate: '2025-01-01', endDate: '2025-06-30', team: ['Carlos', 'María'] },
        { id: '2', name: 'App Móvil', description: 'iOS y Android', client: 'InnovaSol', status: 'planning', progress: 10, budget: 35000, spent: 3500, startDate: '2025-03-01', endDate: '2025-08-30', team: ['Ana', 'Roberto'] },
        ]
    })

    const [contacts, setContacts] = useState<Contact[]>(() => {
        const saved = localStorage.getItem('ent-contacts')
        return saved ? JSON.parse(saved) : [
        { id: '1', name: 'Empresa ABC', type: 'client', email: 'abc@email.com', phone: '+34 911 111 111', company: 'ABC S.L.', category: 'Tecnología', notes: 'Cliente premium' },
        { id: '2', name: 'Proveedor XYZ', type: 'supplier', email: 'xyz@email.com', phone: '+34 922 222 222', company: 'XYZ Inc.', category: 'Hardware', notes: '' },
        ]
    })

    const [events, setEvents] = useState<CalendarEvent[]>(() => {
        const saved = localStorage.getItem('ent-events')
        return saved ? JSON.parse(saved) : [
        { id: '1', title: 'Reunión de proyecto', date: new Date().toISOString().split('T')[0], time: '10:00', type: 'meeting', attendees: ['Carlos', 'María'] },
        ]
    })

    const [messages] = useState<ChatMessage[]>([
        { id: '1', sender: 'Carlos', content: '¿Cómo va el proyecto?', time: '10:30', room: 'general' },
        { id: '2', sender: 'María', content: 'Todo bien, al 65%', time: '10:32', room: 'general' },
    ])

    const [documents] = useState<DocType[]>([
        { id: '1', name: 'Informe Financiero Q1.pdf', type: 'PDF', size: '2.4 MB', uploadedBy: 'Admin', date: '2025-01-15', category: 'Finanzas' },
    ])

    useEffect(() => { localStorage.setItem('ent-finances', JSON.stringify(finances)) }, [finances])
    useEffect(() => { localStorage.setItem('ent-projects', JSON.stringify(projects)) }, [projects])
    useEffect(() => { localStorage.setItem('ent-contacts', JSON.stringify(contacts)) }, [contacts])
    useEffect(() => { localStorage.setItem('ent-events', JSON.stringify(events)) }, [events])

    const stats: EnterpriseStats = {
        totalRevenue: finances.filter(f => f.type === 'income' && f.status === 'completed').reduce((s, f) => s + f.amount, 0),
        totalExpenses: finances.filter(f => f.type === 'expense' && f.status === 'completed').reduce((s, f) => s + f.amount, 0),
        activeProjects: projects.filter(p => p.status === 'active').length,
        totalClients: contacts.filter(c => c.type === 'client').length,
        pendingTasks: finances.filter(f => f.status === 'pending').length,
        profitMargin: 0,
    }
    stats.profitMargin = stats.totalRevenue > 0 ? Math.round(((stats.totalRevenue - stats.totalExpenses) / stats.totalRevenue) * 100) : 0

    const addFinance = useCallback((record: Omit<FinanceRecord, 'id'>) => {
        setFinances(prev => [...prev, { ...record, id: Date.now().toString() }])
    }, [])

    const addProject = useCallback((project: Omit<Project, 'id'>) => {
        setProjects(prev => [...prev, { ...project, id: Date.now().toString() }])
    }, [])

    const addContact = useCallback((contact: Omit<Contact, 'id'>) => {
        setContacts(prev => [...prev, { ...contact, id: Date.now().toString() }])
    }, [])

    const addEvent = useCallback((event: Omit<CalendarEvent, 'id'>) => {
        setEvents(prev => [...prev, { ...event, id: Date.now().toString() }])
    }, [])

    return (
        <div className={styles.app}>
        <Sidebar 
            activeModule={activeModule} 
            onModuleChange={setActiveModule} 
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            notifications={notifications}
            stats={stats}
        />
        <div className={`${styles.main} ${sidebarCollapsed ? styles.expanded : ''}`}>
            <TopBar stats={stats} notifications={notifications} />
            <div className={styles.content}>
            {activeModule === 'dashboard' && <Dashboard stats={stats} finances={finances} projects={projects} events={events} />}
            {activeModule === 'finances' && <Finances finances={finances} onAdd={addFinance} />}
            {activeModule === 'projects' && <Projects projects={projects} onAdd={addProject} />}
            {activeModule === 'contacts' && <Contacts contacts={contacts} onAdd={addContact} />}
            {activeModule === 'calendar' && <CorpCalendar events={events} onAdd={addEvent} />}
            {activeModule === 'chat' && <Chat messages={messages} />}
            {activeModule === 'documents' && <Documents documents={documents} />}
            </div>
        </div>
        </div>
    )
    }

    export default EnterpriseApp