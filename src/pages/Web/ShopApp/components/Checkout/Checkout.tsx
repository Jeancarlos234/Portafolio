    import type { FormEvent } from 'react'
    import { useState } from 'react'
    import styles from './Checkout.module.css'
    import type { CartItem, Order } from '../../types'

    interface CheckoutProps {
    cart: CartItem[]
    onPlaceOrder: (data: Omit<Order, 'id' | 'date' | 'items' | 'subtotal' | 'tax' | 'shipping' | 'total' | 'status'>) => void
    onBack: () => void
    }

    const Checkout = ({ cart, onPlaceOrder, onBack }: CheckoutProps) => {
    const [step, setStep] = useState<'shipping' | 'payment'>('shipping')
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', address: '', city: '', zip: '', country: ''
    })
    const [paymentMethod, setPaymentMethod] = useState('card')

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.15
    const shipping = subtotal > 100 ? 0 : 15
    const total = subtotal + tax + shipping

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onPlaceOrder({
        customer: formData,
        paymentMethod: paymentMethod === 'card' ? 'Tarjeta de crédito' : paymentMethod === 'paypal' ? 'PayPal' : 'Transferencia',
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className={styles.checkout}>
        <button onClick={onBack} className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Volver al carrito
        </button>

        <div className={styles.layout}>
            <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.steps}>
                <button type="button" className={`${styles.step} ${step === 'shipping' ? styles.activeStep : ''}`} onClick={() => setStep('shipping')}>
                <span className={styles.stepNumber}>1</span> Envío
                </button>
                <div className={styles.stepLine}></div>
                <button type="button" className={`${styles.step} ${step === 'payment' ? styles.activeStep : ''}`} onClick={() => setStep('payment')}>
                <span className={styles.stepNumber}>2</span> Pago
                </button>
            </div>

            {step === 'shipping' && (
                <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Información de envío</h3>
                <div className={styles.formGrid}>
                    <input type="text" name="name" placeholder="Nombre completo *" value={formData.name} onChange={handleChange} required className={styles.input} />
                    <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required className={styles.input} />
                    <input type="tel" name="phone" placeholder="Teléfono *" value={formData.phone} onChange={handleChange} required className={styles.input} />
                    <input type="text" name="address" placeholder="Dirección *" value={formData.address} onChange={handleChange} required className={styles.input} />
                    <input type="text" name="city" placeholder="Ciudad *" value={formData.city} onChange={handleChange} required className={styles.input} />
                    <input type="text" name="zip" placeholder="Código postal *" value={formData.zip} onChange={handleChange} required className={styles.input} />
                    <input type="text" name="country" placeholder="País *" value={formData.country} onChange={handleChange} required className={styles.input} />
                </div>
                <button type="button" onClick={() => setStep('payment')} className={styles.continueBtn}>Continuar al pago</button>
                </div>
            )}

            {step === 'payment' && (
                <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Método de pago</h3>
                <div className={styles.paymentOptions}>
                    {[
                    { value: 'card', label: 'Tarjeta de crédito', icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    )},
                    { value: 'paypal', label: 'PayPal', icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 11l5-5 5 5M7 17l5 5 5-5"/></svg>
                    )},
                    { value: 'transfer', label: 'Transferencia bancaria', icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/></svg>
                    )},
                    ].map(option => (
                    <label key={option.value} className={`${styles.paymentOption} ${paymentMethod === option.value ? styles.selected : ''}`}>
                        <input type="radio" name="payment" value={option.value} checked={paymentMethod === option.value} onChange={(e) => setPaymentMethod(e.target.value)} className={styles.radio} />
                        <span className={styles.paymentIcon}>{option.icon}</span>
                        <span className={styles.paymentLabel}>{option.label}</span>
                        <span className={styles.paymentCheck}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                    </label>
                    ))}
                </div>
                <button type="submit" className={styles.placeOrderBtn}>
                    Confirmar pedido - ${total.toLocaleString()}
                </button>
                </div>
            )}
            </form>

            <div className={styles.summary}>
            <h3 className={styles.summaryTitle}>Resumen</h3>
            {cart.map(item => (
                <div key={item.productId} className={styles.summaryItem}>
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toLocaleString()}</span>
                </div>
            ))}
            <div className={styles.divider}></div>
            <div className={styles.summaryRow}><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
            <div className={styles.summaryRow}><span>IVA</span><span>${tax.toLocaleString()}</span></div>
            <div className={styles.summaryRow}><span>Envío</span><span>{shipping === 0 ? 'Gratis' : `$${shipping}`}</span></div>
            <div className={`${styles.summaryRow} ${styles.total}`}><span>Total</span><span>${total.toLocaleString()}</span></div>
            </div>
        </div>
        </div>
    )
    }

    export default Checkout