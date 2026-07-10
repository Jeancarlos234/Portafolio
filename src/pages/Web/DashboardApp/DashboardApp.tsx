    import { useState } from 'react'
    import Sidebar from './components/Sidebar/Sidebar'
    import Header from './components/Header/Header'
    import KPICards from './components/KPICards/KPICards'
    import SalesChart from './components/Charts/SalesChart'
    import CategoryChart from './components/Charts/CategoryChart'
    import RevenueChart from './components/Charts/RevenueChart'
    import DataTable from './components/DataTable/DataTable'
    import TopCustomers from './components/TopCustomers/TopCustomers'
    import ActivityTimeline from './components/ActivityTimeline/ActivityTimeline'
    import styles from './DashboardApp.module.css'

    const DashboardApp = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [dateRange, setDateRange] = useState('30d')
    const [activeSection, setActiveSection] = useState('dashboard')

    return (
        <div className={styles.dashboard}>
        <Sidebar 
            collapsed={sidebarCollapsed} 
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
        />
        
        <div className={`${styles.mainContent} ${sidebarCollapsed ? styles.expanded : ''}`}>
            <Header 
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            />
            
            <div className={styles.content}>
            {/* KPIs */}
            <KPICards />
            
            {/* Gráficos principales */}
            <div className={styles.chartsGrid}>
                <div className={styles.chartCardLarge}>
                <h3 className={styles.chartTitle}>Ventas Mensuales</h3>
                <SalesChart />
                </div>
                <div className={styles.chartCardSmall}>
                <h3 className={styles.chartTitle}>Categorías</h3>
                <CategoryChart />
                </div>
            </div>
            
            {/* Segundo row de gráficos */}
            <div className={styles.chartsGrid}>
                <div className={styles.chartCardSmall}>
                <h3 className={styles.chartTitle}>Ingresos vs Gastos</h3>
                <RevenueChart />
                </div>
                <div className={styles.chartCardLarge}>
                <h3 className={styles.chartTitle}>Últimas Transacciones</h3>
                <DataTable />
                </div>
            </div>
            
            {/* Tercer row */}
            <div className={styles.chartsGrid}>
                <div className={styles.chartCardSmall}>
                <h3 className={styles.chartTitle}>Top Clientes</h3>
                <TopCustomers />
                </div>
                <div className={styles.chartCardSmall}>
                <h3 className={styles.chartTitle}>Actividad Reciente</h3>
                <ActivityTimeline />
                </div>
            </div>
            </div>
        </div>
        </div>
    )
    }

    export default DashboardApp