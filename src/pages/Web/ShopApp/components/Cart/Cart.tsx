    import styles from './Cart.module.css'
    import type { CartItem } from '../../types'

    interface CartProps {
    cart: CartItem[]
    onUpdateQuantity: (productId: string, quantity: number) => void
    onRemove: (productId: string) => void
    onClear: () => void
    onCheckout: () => void
    onContinueShopping: () => void
    }

    const Cart = ({ cart, onUpdateQuantity, onRemove, onClear, onCheckout, onContinueShopping }: CartProps) => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.15
    const shipping = subtotal > 100 ? 0 : 15
    const total = subtotal + tax + shipping

    if (cart.length === 0) {
        return (
        <div className={styles.empty}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <h2>Tu carrito está vacío</h2>
            <p>Agrega productos desde la tienda</p>
            <button onClick={onContinueShopping} className={styles.continueBtn}>Continuar comprando</button>
        </div>
        )
    }

    return (
        <div className={styles.cart}>
        <div className={styles.header}>
            <h1 className={styles.title}>Carrito de Compras</h1>
            <button onClick={onClear} className={styles.clearBtn}>Vaciar carrito</button>
        </div>

        <div className={styles.layout}>
            <div className={styles.items}>
            {cart.map(item => (
                <div key={item.productId} className={styles.item}>
                <img src={item.image} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemInfo}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <span className={styles.itemPrice}>${item.price.toLocaleString()}</span>
                    <div className={styles.itemActions}>
                    <div className={styles.quantity}>
                        <button onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)} className={styles.qtyBtn}>-</button>
                        <span className={styles.qtyValue}>{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)} className={styles.qtyBtn}>+</button>
                    </div>
                    <span className={styles.itemTotal}>${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                </div>
                <button onClick={() => onRemove(item.productId)} className={styles.removeBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
                </div>
            ))}
            </div>

            <div className={styles.summary}>
            <h3 className={styles.summaryTitle}>Resumen del pedido</h3>
            <div className={styles.summaryRow}><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
            <div className={styles.summaryRow}><span>IVA (15%)</span><span>${tax.toLocaleString()}</span></div>
            <div className={styles.summaryRow}><span>Envío</span><span>{shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString()}`}</span></div>
            <div className={`${styles.summaryRow} ${styles.total}`}><span>Total</span><span>${total.toLocaleString()}</span></div>
            <button onClick={onCheckout} className={styles.checkoutBtn}>Proceder al pago</button>
            <button onClick={onContinueShopping} className={styles.continueShoppingBtn}>Seguir comprando</button>
            </div>
        </div>
        </div>
    )
    }

    export default Cart