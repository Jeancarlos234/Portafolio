    import styles from './Dashboard.module.css'
    import type { InventoryStats, Product } from '../../types'

    interface DashboardProps {
    stats: InventoryStats
    products: Product[]
    onViewAll: () => void
    }

    const Dashboard = ({ stats, products, onViewAll }: DashboardProps) => {
    const lowStockProducts = products.filter(p => p.stock <= p.minStock)

    const kpis = [
        { title: 'Total Productos', value: stats.totalProducts.toString(), icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
        ), color: '#3b82f6', bg: '#eff6ff' },
        { title: 'Valor Inventario', value: `$${stats.totalValue.toLocaleString()}`, icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        ), color: '#22c55e', bg: '#f0fdf4' },
        { title: 'Stock Bajo', value: stats.lowStockCount.toString(), icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        ), color: '#ef4444', bg: '#fef2f2' },
        { title: 'Movimientos', value: stats.totalMovements.toString(), icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
        ), color: '#f59e0b', bg: '#fffbeb' },
    ]

    return (
        <div className={styles.dashboard}>
        <div className={styles.header}>
            <div>
            <h1 className={styles.title}>Panel de Control</h1>
            <p className={styles.subtitle}>Resumen del inventario</p>
            </div>
        </div>

        <div className={styles.kpiGrid}>
            {kpis.map((kpi, i) => (
            <div key={i} className={styles.kpiCard} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.kpiIcon} style={{ backgroundColor: kpi.bg, color: kpi.color }}>{kpi.icon}</div>
                <div>
                <span className={styles.kpiValue}>{kpi.value}</span>
                <span className={styles.kpiLabel}>{kpi.title}</span>
                </div>
            </div>
            ))}
        </div>

        <div className={styles.section}>
            <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Productos con Stock Bajo</h2>
            <button onClick={onViewAll} className={styles.viewAll}>Ver todos</button>
            </div>
            {lowStockProducts.length === 0 ? (
            <div className={styles.empty}><p>Todos los productos tienen stock suficiente</p></div>
            ) : (
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                <thead><tr><th>Producto</th><th>SKU</th><th>Stock</th><th>Mínimo</th><th>Estado</th></tr></thead>
                <tbody>
                    {lowStockProducts.map(p => (
                    <tr key={p.id} className={styles.row}>
                        <td className={styles.productName}>{p.name}</td>
                        <td className={styles.sku}>{p.sku}</td>
                        <td className={p.stock === 0 ? styles.outStock : styles.lowStock}>{p.stock}</td>
                        <td>{p.minStock}</td>
                        <td><span className={`${styles.badge} ${p.stock === 0 ? styles.badgeDanger : styles.badgeWarning}`}>{p.stock === 0 ? 'Agotado' : 'Bajo'}</span></td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </div>
        </div>
    )
    }

    export default Dashboard