    import { useState } from 'react'
    import styles from './MovementHistory.module.css'
    import type { StockMovement, Product } from '../../types'

    interface MovementHistoryProps {
    movements: StockMovement[]
    products: Product[]
    }

    const MovementHistory = ({ movements, products }: MovementHistoryProps) => {
    const [typeFilter, setTypeFilter] = useState<'all' | 'entrada' | 'salida'>('all')
    const [productFilter, setProductFilter] = useState('all')

    const filtered = movements
        .filter(m => typeFilter === 'all' || m.type === typeFilter)
        .filter(m => productFilter === 'all' || m.productId === productFilter)

    const getTypeStyle = (type: string) => type === 'entrada' ? styles.typeEntrada : styles.typeSalida

    return (
        <div className={styles.history}>
        <div className={styles.header}>
            <div>
            <h1 className={styles.title}>Historial de Movimientos</h1>
            <p className={styles.count}>{filtered.length} movimientos</p>
            </div>
        </div>

        <div className={styles.toolbar}>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)} className={styles.select}>
            <option value="all">Todos los tipos</option>
            <option value="entrada">Entradas</option>
            <option value="salida">Salidas</option>
            </select>
            <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className={styles.select}>
            <option value="all">Todos los productos</option>
            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
        </div>

        <div className={styles.tableWrapper}>
            <table className={styles.table}>
            <thead>
                <tr><th>Producto</th><th>Tipo</th><th>Cantidad</th><th>Stock Anterior</th><th>Stock Nuevo</th><th>Motivo</th><th>Fecha</th></tr>
            </thead>
            <tbody>
                {filtered.map(m => (
                <tr key={m.id} className={styles.row}>
                    <td className={styles.productName}>{m.productName}</td>
                    <td><span className={`${styles.typeBadge} ${getTypeStyle(m.type)}`}>{m.type === 'entrada' ? 'Entrada' : 'Salida'}</span></td>
                    <td className={`${styles.quantity} ${getTypeStyle(m.type)}`}>{m.type === 'entrada' ? '+' : '-'}{m.quantity}</td>
                    <td>{m.previousStock}</td>
                    <td>{m.newStock}</td>
                    <td>{m.reason}</td>
                    <td className={styles.date}>{new Date(m.date).toLocaleDateString('es-ES')}</td>
                </tr>
                ))}
            </tbody>
            </table>
            {filtered.length === 0 && <div className={styles.empty}><p>No hay movimientos registrados</p></div>}
        </div>
        </div>
    )
    }

    export default MovementHistory