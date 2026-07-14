    import { useState, useMemo } from 'react'
    import styles from './InvoiceForm.module.css'
    import type { Client, Product, Invoice, InvoiceItem } from '../../types'

    interface InvoiceFormProps {
    clients: Client[]
    products: Product[]
    onSave: (invoice: Omit<Invoice, 'id' | 'number' | 'date'>) => void
    onCancel: () => void
    editingInvoice: Invoice | null
    }

    const InvoiceForm = ({ clients, products, onSave, onCancel, editingInvoice }: InvoiceFormProps) => {
    // ✅ Usar valores iniciales directamente del editingInvoice
    const [selectedClient, setSelectedClient] = useState<Client | null>(() => {
        if (editingInvoice) {
        return clients.find(c => c.id === editingInvoice.clientId) || null
        }
        return null
    })

    const [items, setItems] = useState<InvoiceItem[]>(() => {
        return editingInvoice ? editingInvoice.items : []
    })

    const [notes, setNotes] = useState(() => editingInvoice?.notes || '')
    const [dueDate, setDueDate] = useState(() => editingInvoice?.dueDate || '')
    const [status, setStatus] = useState<Invoice['status']>(() => editingInvoice?.status || 'draft')

    // ✅ Valor memoizado para evitar Date.now() en render
    const defaultDueDate = useMemo(() => {
        const date = new Date()
        date.setDate(date.getDate() + 30)
        return date.toISOString().split('T')[0]
    }, [])

    const addItem = () => {
        setItems(prev => [...prev, {
        id: crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        productId: '',
        productName: '',
        quantity: 1,
        price: 0,
        taxRate: 21,
        discount: 0,
        }])
    }

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id))
    }

    const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
        setItems(prev => prev.map(item => {
        if (item.id !== id) return item
        const updated = { ...item, [field]: value }
        if (field === 'productId') {
            const product = products.find(p => p.id === value)
            if (product) {
            updated.productName = product.name
            updated.price = product.price
            updated.taxRate = product.taxRate
            }
        }
        return updated
        }))
    }

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const discountTotal = items.reduce((sum, item) => sum + (item.discount || 0), 0)
    const taxTotal = items.reduce((sum, item) => sum + ((item.price * item.quantity - (item.discount || 0)) * item.taxRate / 100), 0)
    const total = subtotal - discountTotal + taxTotal

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedClient || items.length === 0) return

        onSave({
        clientId: selectedClient.id,
        clientName: selectedClient.name,
        clientEmail: selectedClient.email,
        clientAddress: selectedClient.address,
        clientTaxId: selectedClient.taxId,
        items,
        subtotal,
        taxTotal,
        discountTotal,
        total,
        status,
        dueDate: dueDate || defaultDueDate,  // ✅ Usar valor memoizado
        notes,
        })
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.header}>
            <h2 className={styles.title}>{editingInvoice ? 'Editar Factura' : 'Nueva Factura'}</h2>
            <div className={styles.headerActions}>
            <button type="button" onClick={onCancel} className={styles.cancelBtn}>Cancelar</button>
            <button type="submit" className={styles.saveBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
                </svg>
                Guardar
            </button>
            </div>
        </div>

        <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Cliente</h3>
            <select
            value={selectedClient?.id || ''}
            onChange={(e) => setSelectedClient(clients.find(c => c.id === e.target.value) || null)}
            className={styles.select}
            required
            >
            <option value="">Seleccionar cliente...</option>
            {clients.map(c => (
                <option key={c.id} value={c.id}>{c.name} - {c.taxId}</option>
            ))}
            </select>
            {selectedClient && (
            <div className={styles.clientInfo}>
                <span>{selectedClient.email}</span>
                <span>{selectedClient.address}</span>
                <span>{selectedClient.taxId}</span>
            </div>
            )}
        </div>

        <div className={styles.section}>
            <div className={styles.itemsHeader}>
            <h3 className={styles.sectionTitle}>Productos / Servicios</h3>
            <button type="button" onClick={addItem} className={styles.addItemBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Agregar
            </button>
            </div>

            {items.map((item) => (  // ✅ Quitado 'index' que no se usaba
            <div key={item.id} className={styles.itemRow}>
                <select
                value={item.productId}
                onChange={(e) => updateItem(item.id, 'productId', e.target.value)}
                className={styles.itemSelect}
                required
                >
                <option value="">Producto...</option>
                {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} - ${p.price}</option>
                ))}
                </select>
                <input type="number" value={item.quantity} onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))} min="1" className={styles.itemQty} placeholder="Cant." />
                <input type="number" value={item.price} onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))} className={styles.itemPrice} placeholder="Precio" />
                <input type="number" value={item.discount} onChange={(e) => updateItem(item.id, 'discount', Number(e.target.value))} className={styles.itemDiscount} placeholder="Desc." />
                <span className={styles.itemTotal}>${((item.price * item.quantity) - (item.discount || 0)).toLocaleString()}</span>
                <button type="button" onClick={() => removeItem(item.id)} className={styles.removeBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                </button>
            </div>
            ))}
        </div>

        <div className={styles.section}>
            <div className={styles.totalsGrid}>
            <div className={styles.totalRow}><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
            <div className={styles.totalRow}><span>Descuentos</span><span>-${discountTotal.toLocaleString()}</span></div>
            <div className={styles.totalRow}><span>IVA</span><span>${taxTotal.toLocaleString()}</span></div>
            <div className={`${styles.totalRow} ${styles.grandTotal}`}><span>Total</span><span>${total.toLocaleString()}</span></div>
            </div>
        </div>

        <div className={styles.section}>
            <div className={styles.optionsGrid}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Fecha de vencimiento</label>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Estado</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as Invoice['status'])} className={styles.select}>
                <option value="draft">Borrador</option>
                <option value="sent">Enviada</option>
                <option value="paid">Pagada</option>
                <option value="cancelled">Cancelada</option>
                </select>
            </div>
            </div>
            <div className={styles.formGroup}>
            <label className={styles.label}>Notas</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className={styles.textarea} placeholder="Notas adicionales..." rows={3} />
            </div>
        </div>
        </form>
    )
    }

    export default InvoiceForm