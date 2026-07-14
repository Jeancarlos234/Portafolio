    import styles from './OrderConfirmation.module.css'
    import type { Order } from '../../types'

    interface OrderConfirmationProps {
    order: Order
    onContinueShopping: () => void
    }

    const OrderConfirmation = ({ order, onContinueShopping }: OrderConfirmationProps) => {
    return (
        <div className={styles.confirmation}>
        <div className={styles.card}>
            <div className={styles.iconWrapper}>
            <div className={styles.icon}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
                </svg>
            </div>
            <div className={styles.iconGlow}></div>
            </div>

            <h2 className={styles.title}>Pedido Confirmado</h2>
            <p className={styles.orderNumber}>Orden #{order.id}</p>
            <p className={styles.text}>Gracias por tu compra. Recibirás un email con los detalles de tu pedido.</p>

            <div className={styles.orderDetails}>
            <h3 className={styles.detailsTitle}>Resumen del pedido</h3>
            {order.items.map((item, i) => (
                <div key={i} className={styles.detailItem}>
                <img src={item.image} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemQty}>x{item.quantity}</span>
                </div>
                <span className={styles.itemPrice}>${(item.price * item.quantity).toLocaleString()}</span>
                </div>
            ))}
            <div className={styles.divider}></div>
            <div className={styles.totalRow}><span>Subtotal</span><span>${order.subtotal.toLocaleString()}</span></div>
            <div className={styles.totalRow}><span>IVA</span><span>${order.tax.toLocaleString()}</span></div>
            <div className={styles.totalRow}><span>Envío</span><span>{order.shipping === 0 ? 'Gratis' : `$${order.shipping}`}</span></div>
            <div className={`${styles.totalRow} ${styles.grandTotal}`}><span>Total</span><span>${order.total.toLocaleString()}</span></div>
            </div>

            <div className={styles.customerInfo}>
            <h3 className={styles.detailsTitle}>Información de envío</h3>
            <p>{order.customer.name}</p>
            <p>{order.customer.address}, {order.customer.city}, {order.customer.zip}</p>
            <p>{order.customer.country}</p>
            </div>

            <button onClick={onContinueShopping} className={styles.continueBtn}>
            Continuar comprando
            </button>
        </div>
        </div>
    )
    }

    export default OrderConfirmation