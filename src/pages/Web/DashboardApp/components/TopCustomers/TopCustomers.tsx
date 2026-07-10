import styles from './TopCustomers.module.css'

const TopCustomers = () => {
  const customers = [
    { name: 'Carlos García', email: 'carlos@email.com', spent: 12450, orders: 24, avatar: 'CG', color: '#3b82f6' },
    { name: 'María López', email: 'maria@email.com', spent: 9870, orders: 18, avatar: 'ML', color: '#8b5cf6' },
    { name: 'Ana Martínez', email: 'ana@email.com', spent: 8230, orders: 15, avatar: 'AM', color: '#22c55e' },
    { name: 'Roberto Sánchez', email: 'roberto@email.com', spent: 6540, orders: 12, avatar: 'RS', color: '#f59e0b' },
    { name: 'Laura Fernández', email: 'laura@email.com', spent: 5120, orders: 10, avatar: 'LF', color: '#ef4444' },
  ]

  const maxSpent = Math.max(...customers.map(c => c.spent))

  return (
    <div className={styles.container}>
      {customers.map((customer, index) => (
        <div key={index} className={styles.customerRow}>
          <div className={styles.rank}>
            <span className={styles.rankNumber}>#{index + 1}</span>
          </div>
          <div className={styles.avatar} style={{ background: `linear-gradient(135deg, ${customer.color}, ${customer.color}dd)` }}>
            {customer.avatar}
          </div>
          <div className={styles.info}>
            <span className={styles.name}>{customer.name}</span>
            <span className={styles.email}>{customer.email}</span>
          </div>
          <div className={styles.spent}>
            <span className={styles.amount}>${customer.spent.toLocaleString()}</span>
            <div className={styles.progressBar}>
              <div 
                className={styles.progress} 
                style={{ 
                  width: `${(customer.spent / maxSpent) * 100}%`,
                  background: `linear-gradient(90deg, ${customer.color}, ${customer.color}88)`
                }} 
              />
            </div>
            <span className={styles.orders}>{customer.orders} órdenes</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TopCustomers