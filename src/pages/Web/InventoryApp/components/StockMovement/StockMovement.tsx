    import { useState } from 'react'
    import styles from './StockMovement.module.css'
    import type { Product, StockMovement as StockMovementType } from '../../types'

    interface StockMovementProps {
    product: Product
    onSave: (movement: Omit<StockMovementType, 'id' | 'date' | 'previousStock' | 'newStock'>) => void
    onCancel: () => void
    }

    const StockMovement = ({ product, onSave, onCancel }: StockMovementProps) => {
    const [type, setType] = useState<'entrada' | 'salida'>('entrada')
    const [quantity, setQuantity] = useState(1)
    const [reason, setReason] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (quantity <= 0) return
        onSave({ productId: product.id, productName: product.name, type, quantity, reason: reason || (type === 'entrada' ? 'Compra' : 'Venta') })
    }

    return (
        <div className={styles.container}>
        <div className={styles.header}>
            <h2 className={styles.title}>Movimiento de Stock</h2>
        </div>
        <div className={styles.productInfo}>
            <div className={styles.productName}>{product.name}</div>
            <div className={styles.productMeta}>
            <span>SKU: {product.sku}</span>
            <span>Stock actual: <strong className={product.stock <= product.minStock ? styles.lowStock : ''}>{product.stock}</strong></span>
            <span>Ubicación: {product.location}</span>
            </div>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.typeSelector}>
            <button type="button" className={`${styles.typeBtn} ${type === 'entrada' ? styles.typeEntrada : ''}`} onClick={() => setType('entrada')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/></svg>
                Entrada
            </button>
            <button type="button" className={`${styles.typeBtn} ${type === 'salida' ? styles.typeSalida : ''}`} onClick={() => setType('salida')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                Salida
            </button>
            </div>
            <div className={styles.formGrid}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Cantidad *</label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required min="1" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Motivo</label>
                <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} className={styles.input} placeholder={type === 'entrada' ? 'Ej: Compra' : 'Ej: Venta'} />
            </div>
            </div>
            <div className={styles.preview}>
            <span>Stock después del movimiento:</span>
            <strong className={type === 'entrada' ? styles.previewUp : styles.previewDown}>
                {type === 'entrada' ? product.stock + quantity : Math.max(0, product.stock - quantity)} unidades
            </strong>
            </div>
            <div className={styles.buttons}>
            <button type="button" onClick={onCancel} className={styles.cancelBtn}>Cancelar</button>
            <button type="submit" className={styles.saveBtn}>Confirmar Movimiento</button>
            </div>
        </form>
        </div>
    )
    }

    export default StockMovement