    import styles from './InvoicePreview.module.css'
    import type { Invoice } from '../../types'

    interface InvoicePreviewProps {
    invoice: Invoice
    onBack: () => void
    }

    const InvoicePreview = ({ invoice, onBack }: InvoicePreviewProps) => {
    const getStatusStyle = (status: string) => {
        switch (status) {
        case 'paid': return styles.statusPaid
        case 'sent': return styles.statusSent
        case 'draft': return styles.statusDraft
        case 'cancelled': return styles.statusCancelled
        default: return ''
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
        case 'paid': return 'Pagada'
        case 'sent': return 'Enviada'
        case 'draft': return 'Borrador'
        case 'cancelled': return 'Cancelada'
        default: return status
        }
    }

    return (
        <div className={styles.preview}>
        <div className={styles.header}>
            <button onClick={onBack} className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Volver
            </button>
            <span className={`${styles.status} ${getStatusStyle(invoice.status)}`}>{getStatusLabel(invoice.status)}</span>
        </div>

        <div className={styles.invoice}>
            <div className={styles.invoiceHeader}>
            <div>
                <h2 className={styles.invoiceTitle}>FACTURA</h2>
                <span className={styles.invoiceNumber}>#{invoice.number}</span>
            </div>
            <div className={styles.companyInfo}>
                <strong>FactuPro</strong>
                <span>factupro@email.com</span>
                <span>Calle Empresa 123, Madrid</span>
                <span>B12345678</span>
            </div>
            </div>

            <div className={styles.parties}>
            <div className={styles.party}>
                <span className={styles.partyLabel}>Facturar a:</span>
                <strong>{invoice.clientName}</strong>
                <span>{invoice.clientEmail}</span>
                <span>{invoice.clientAddress}</span>
                <span>{invoice.clientTaxId}</span>
            </div>
            <div className={styles.dates}>
                <div><span>Fecha:</span> {new Date(invoice.date).toLocaleDateString('es-ES')}</div>
                <div><span>Vencimiento:</span> {new Date(invoice.dueDate).toLocaleDateString('es-ES')}</div>
            </div>
            </div>

            <table className={styles.table}>
            <thead>
                <tr>
                <th>Descripción</th>
                <th>Cant.</th>
                <th>Precio</th>
                <th>IVA</th>
                <th>Desc.</th>
                <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {invoice.items.map(item => (
                <tr key={item.id}>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toLocaleString()}</td>
                    <td>{item.taxRate}%</td>
                    <td>${(item.discount || 0).toLocaleString()}</td>
                    <td>${((item.price * item.quantity) - (item.discount || 0)).toLocaleString()}</td>
                </tr>
                ))}
            </tbody>
            </table>

            <div className={styles.totals}>
            <div className={styles.totalRow}><span>Subtotal</span><span>${invoice.subtotal.toLocaleString()}</span></div>
            <div className={styles.totalRow}><span>Descuentos</span><span>-${invoice.discountTotal.toLocaleString()}</span></div>
            <div className={styles.totalRow}><span>IVA</span><span>${invoice.taxTotal.toLocaleString()}</span></div>
            <div className={`${styles.totalRow} ${styles.grandTotal}`}><span>TOTAL</span><span>${invoice.total.toLocaleString()}</span></div>
            </div>

            {invoice.notes && (
            <div className={styles.notes}>
                <strong>Notas:</strong>
                <p>{invoice.notes}</p>
            </div>
            )}
        </div>
        </div>
    )
    }

    export default InvoicePreview