    import { useState, useEffect, useCallback } from 'react'
    import Header from './components/Header/Header'
    import Dashboard from './components/Dashboard/Dashboard'
    import InvoiceList from './components/InvoiceList/InvoiceList'
    import InvoiceForm from './components/InvoiceForm/InvoiceForm'
    import InvoicePreview from './components/InvoicePreview/InvoicePreview'
    import ClientManager from './components/ClientManager/ClientManager'
    import ProductManager from './components/ProductManager/ProductManager'
    import styles from './InvoiceApp.module.css'
    import type { Client, Product, Invoice } from './types'

    const initialClients: Client[] = [
    { id: '1', name: 'Carlos García', email: 'carlos@email.com', phone: '+34 612 345 678', address: 'Calle Mayor 123, Madrid', taxId: '12345678A' },
    { id: '2', name: 'María López', email: 'maria@email.com', phone: '+34 623 456 789', address: 'Av. Principal 456, Barcelona', taxId: '87654321B' },
    { id: '3', name: 'Empresa ABC S.L.', email: 'info@abc.com', phone: '+34 634 567 890', address: 'Calle Industria 789, Valencia', taxId: 'B12345678' },
    ]

    const initialProducts: Product[] = [
    { id: '1', name: 'Desarrollo Web', description: 'Sitio web completo', price: 1500, taxRate: 21, category: 'Desarrollo' },
    { id: '2', name: 'App Móvil', description: 'Aplicación nativa', price: 3000, taxRate: 21, category: 'Desarrollo' },
    { id: '3', name: 'Consultoría TI', description: 'Hora de consultoría', price: 80, taxRate: 21, category: 'Consultoría' },
    { id: '4', name: 'Diseño UX/UI', description: 'Diseño de interfaz', price: 800, taxRate: 21, category: 'Diseño' },
    { id: '5', name: 'Hosting Anual', description: 'Servicio de hosting', price: 200, taxRate: 10, category: 'Servicios' },
    { id: '6', name: 'Mantenimiento Web', description: 'Mantenimiento mensual', price: 150, taxRate: 21, category: 'Servicios' },
    ]

    const InvoiceApp = () => {
    const [activeView, setActiveView] = useState<'dashboard' | 'invoices' | 'create' | 'preview' | 'clients' | 'products'>('dashboard')
    const [clients, setClients] = useState<Client[]>(() => {
        const saved = localStorage.getItem('invoice-clients')
        return saved ? JSON.parse(saved) : initialClients
    })
    const [products, setProducts] = useState<Product[]>(() => {
        const saved = localStorage.getItem('invoice-products')
        return saved ? JSON.parse(saved) : initialProducts
    })
    const [invoices, setInvoices] = useState<Invoice[]>(() => {
        const saved = localStorage.getItem('invoices')
        return saved ? JSON.parse(saved) : []
    })
    const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null)
    const [previewInvoice, setPreviewInvoice] = useState<Invoice | null>(null)

    useEffect(() => { localStorage.setItem('invoice-clients', JSON.stringify(clients)) }, [clients])
    useEffect(() => { localStorage.setItem('invoice-products', JSON.stringify(products)) }, [products])
    useEffect(() => { localStorage.setItem('invoices', JSON.stringify(invoices)) }, [invoices])

    const addClient = useCallback((client: Omit<Client, 'id'>) => {
        setClients(prev => [...prev, { ...client, id: Date.now().toString() }])
    }, [])

    const deleteClient = useCallback((id: string) => {
        setClients(prev => prev.filter(c => c.id !== id))
    }, [])

    const addProduct = useCallback((product: Omit<Product, 'id'>) => {
        setProducts(prev => [...prev, { ...product, id: Date.now().toString() }])
    }, [])

    const deleteProduct = useCallback((id: string) => {
        setProducts(prev => prev.filter(p => p.id !== id))
    }, [])

    const saveInvoice = useCallback((invoiceData: Omit<Invoice, 'id' | 'number' | 'date'>) => {
        const invoiceNumber = `FAC-${String(invoices.length + 1).padStart(4, '0')}`
        const newInvoice: Invoice = {
        ...invoiceData,
        id: editingInvoice?.id || Date.now().toString(),
        number: editingInvoice?.number || invoiceNumber,
        date: editingInvoice?.date || new Date().toISOString().split('T')[0],
        }
        if (editingInvoice) {
        setInvoices(prev => prev.map(inv => inv.id === editingInvoice.id ? newInvoice : inv))
        } else {
        setInvoices(prev => [newInvoice, ...prev])
        }
        setEditingInvoice(null)
        setActiveView('invoices')
    }, [invoices, editingInvoice])

    const deleteInvoice = useCallback((id: string) => {
        setInvoices(prev => prev.filter(inv => inv.id !== id))
    }, [])

    const updateInvoiceStatus = useCallback((id: string, status: Invoice['status']) => {
        setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status } : inv))
    }, [])

    return (
        <div className={styles.app}>
        <Header 
            activeView={activeView}
            onViewChange={(view) => {
            setActiveView(view)
            setEditingInvoice(null)
            setPreviewInvoice(null)
            }}
        />
        <div className={styles.container}>
            {activeView === 'dashboard' && (
            <Dashboard 
                invoices={invoices}
                clients={clients}
                products={products}
                onViewInvoices={() => setActiveView('invoices')}
                onCreateInvoice={() => setActiveView('create')}
            />
            )}
            {activeView === 'invoices' && (
            <InvoiceList 
                invoices={invoices}
                onEdit={(inv) => { setEditingInvoice(inv); setActiveView('create') }}
                onDelete={deleteInvoice}
                onStatusChange={updateInvoiceStatus}
                onPreview={(inv) => { setPreviewInvoice(inv); setActiveView('preview') }}
                onCreateNew={() => setActiveView('create')}
            />
            )}
            {activeView === 'create' && (
            <InvoiceForm 
                clients={clients}
                products={products}
                onSave={saveInvoice}
                onCancel={() => { setEditingInvoice(null); setActiveView('invoices') }}
                editingInvoice={editingInvoice}
            />
            )}
            {activeView === 'preview' && previewInvoice && (
            <InvoicePreview 
                invoice={previewInvoice}
                onBack={() => { setPreviewInvoice(null); setActiveView('invoices') }}
            />
            )}
            {activeView === 'clients' && (
            <ClientManager 
                clients={clients}
                onAdd={addClient}
                onDelete={deleteClient}
            />
            )}
            {activeView === 'products' && (
            <ProductManager 
                products={products}
                onAdd={addProduct}
                onDelete={deleteProduct}
            />
            )}
        </div>
        </div>
    )
    }

    export default InvoiceApp