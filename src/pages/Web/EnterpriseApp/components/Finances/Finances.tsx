    import { useState } from 'react'
    import styles from './Finances.module.css'
    import type { FinanceRecord } from '../../types'

    interface FinancesProps {
    finances: FinanceRecord[]
    onAdd: (record: Omit<FinanceRecord, 'id'>) => void
    }

    const Finances = ({ finances, onAdd }: FinancesProps) => {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState<{
        type: FinanceRecord['type']
        category: string
        amount: number
        description: string
        date: string
        status: FinanceRecord['status']
    }>({
        type: 'income', category: '', amount: 0, description: '', date: new Date().toISOString().split('T')[0], status: 'completed'
    })
    const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all')
    const [message, setMessage] = useState('')

    const filtered = finances.filter(f => filter === 'all' || f.type === filter)
    const totalIncome = finances.filter(f => f.type === 'income').reduce((s, f) => s + f.amount, 0)
    const totalExpense = finances.filter(f => f.type === 'expense').reduce((s, f) => s + f.amount, 0)
    const balance = totalIncome - totalExpense

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.category || formData.amount <= 0) return
        onAdd({
        type: formData.type,
        category: formData.category,
        amount: formData.amount,
        description: formData.description,
        date: formData.date,
        status: formData.status,
        })
        setFormData({ type: 'income', category: '', amount: 0, description: '', date: new Date().toISOString().split('T')[0], status: 'completed' })
        setShowForm(false)
        setMessage('Registro agregado correctamente')
        setTimeout(() => setMessage(''), 2000)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: name === 'amount' ? Number(value) : value }))
    }

    return (
        <div className={styles.finances}>
        <div className={styles.header}>
            <div>
            <h1 className={styles.title}>Finanzas</h1>
            <p className={styles.subtitle}>Gestión de ingresos y gastos</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className={styles.addBtn}>
            {showForm ? 'Cancelar' : '+ Nuevo Registro'}
            </button>
        </div>

        <div className={styles.balanceRow}>
            <div className={styles.balanceCard}>
            <span className={styles.balanceLabel}>Ingresos</span>
            <span className={styles.balanceValue} style={{ color: '#22c55e' }}>+${totalIncome.toLocaleString()}</span>
            </div>
            <div className={styles.balanceCard}>
            <span className={styles.balanceLabel}>Gastos</span>
            <span className={styles.balanceValue} style={{ color: '#ef4444' }}>-${totalExpense.toLocaleString()}</span>
            </div>
            <div className={styles.balanceCard}>
            <span className={styles.balanceLabel}>Balance</span>
            <span className={styles.balanceValue} style={{ color: balance >= 0 ? '#22c55e' : '#ef4444' }}>
                {balance >= 0 ? '+' : ''}${balance.toLocaleString()}
            </span>
            </div>
        </div>

        {message && <div className={styles.message}>{message}</div>}

        {showForm && (
            <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
                <select name="type" value={formData.type} onChange={handleChange} className={styles.input}>
                <option value="income">Ingreso</option>
                <option value="expense">Gasto</option>
                </select>
                <input type="text" name="category" placeholder="Categoría *" value={formData.category} onChange={handleChange} required className={styles.input} />
                <input type="number" name="amount" placeholder="Monto *" value={formData.amount || ''} onChange={handleChange} required className={styles.input} />
                <input type="text" name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} className={styles.input} />
                <input type="date" name="date" value={formData.date} onChange={handleChange} className={styles.input} />
                <button type="submit" className={styles.submitBtn}>Guardar</button>
            </div>
            </form>
        )}

        <div className={styles.filters}>
            {(['all', 'income', 'expense'] as const).map(f => (
            <button key={f} className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? 'Todos' : f === 'income' ? 'Ingresos' : 'Gastos'}
            </button>
            ))}
        </div>

        <div className={styles.list}>
            {filtered.map(f => (
            <div key={f.id} className={styles.item}>
                <div className={`${styles.itemDot} ${f.type === 'income' ? styles.dotIncome : styles.dotExpense}`} />
                <div className={styles.itemInfo}>
                <span className={styles.itemDesc}>{f.description || f.category}</span>
                <span className={styles.itemMeta}>{f.category} · {f.date}</span>
                </div>
                <div className={styles.itemRight}>
                <span className={`${styles.itemAmount} ${f.type === 'income' ? styles.amountIncome : styles.amountExpense}`}>
                    {f.type === 'income' ? '+' : '-'}${f.amount.toLocaleString()}
                </span>
                <span className={`${styles.itemStatus} ${f.status === 'completed' ? styles.statusDone : styles.statusPending}`}>
                    {f.status === 'completed' ? '✓' : '○'}
                </span>
                </div>
            </div>
            ))}
            {filtered.length === 0 && <p className={styles.empty}>Sin registros</p>}
        </div>
        </div>
    )
    }

    export default Finances