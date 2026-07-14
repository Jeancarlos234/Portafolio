    import { useState } from 'react'
    import styles from './QRScanner.module.css'
    import type { Product } from '../../types'

    interface QRScannerProps {
    products: Product[]
    onProductFound: (product: Product) => void
    }

    const QRScanner = ({ products, onProductFound }: QRScannerProps) => {
    const [scanning, setScanning] = useState(false)
    const [scannedSku, setScannedSku] = useState('')
    const [result, setResult] = useState<Product | null>(null)
    const [error, setError] = useState('')

    const handleScan = () => {
        if (!scannedSku.trim()) return
        
        setScanning(true)
        setError('')
        
        // Simular escaneo con delay
        setTimeout(() => {
        const product = products.find(p => p.sku.toLowerCase() === scannedSku.toLowerCase())
        if (product) {
            setResult(product)
            onProductFound(product)
        } else {
            setError('Producto no encontrado')
            setResult(null)
        }
        setScanning(false)
        }, 800)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
        handleScan()
        }
    }

    return (
        <div className={styles.scanner}>
        <div className={styles.scannerHeader}>
            <div className={styles.scannerIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/>
                <line x1="9" y1="3" x2="9" y2="9"/><line x1="15" y1="3" x2="15" y2="9"/>
                <line x1="9" y1="15" x2="9" y2="21"/><line x1="15" y1="15" x2="15" y2="21"/>
            </svg>
            </div>
            <div>
            <h3 className={styles.scannerTitle}>Escanear Código QR</h3>
            <p className={styles.scannerSubtitle}>Ingresa el SKU del producto</p>
            </div>
        </div>

        <div className={styles.scannerInput}>
            <input
            type="text"
            value={scannedSku}
            onChange={(e) => { setScannedSku(e.target.value); setError(''); setResult(null) }}
            onKeyDown={handleKeyDown}
            placeholder="Ingresa o escanea el SKU..."
            className={styles.input}
            autoFocus
            />
            <button onClick={handleScan} className={styles.scanBtn} disabled={scanning}>
            {scanning ? (
                <span className={styles.spinner}></span>
            ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
            )}
            {scanning ? 'Buscando...' : 'Buscar'}
            </button>
        </div>

        {error && (
            <div className={styles.error}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
            </div>
        )}

        {result && (
            <div className={styles.result}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            <div>
                <strong>{result.name}</strong>
                <span>SKU: {result.sku} | Stock: {result.stock} | {result.location}</span>
            </div>
            </div>
        )}
        </div>
    )
    }

    export default QRScanner