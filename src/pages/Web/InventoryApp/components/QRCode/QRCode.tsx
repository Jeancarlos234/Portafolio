    import { useState } from 'react'
    import styles from './QRCode.module.css'

    interface QRCodeProps {
    product: {
        id: string
        name: string
        sku: string
        location: string
    }
    size?: number
    }

    const QRCode = ({ product, size = 120 }: QRCodeProps) => {
    const [showModal, setShowModal] = useState(false)

    // Generar patrón QR simulado basado en el SKU
    const generateQRPattern = (sku: string) => {
        const hash = sku.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
        const modules: boolean[][] = Array(21).fill(null).map(() => Array(21).fill(false))
        
        // Patrón de posición (esquinas)
        const addPositionPattern = (row: number, col: number) => {
        for (let r = 0; r < 7; r++) {
            for (let c = 0; c < 7; c++) {
            if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
                if (row + r < 21 && col + c < 21) modules[row + r][col + c] = true
            }
            }
        }
        }
        
        addPositionPattern(0, 0)
        addPositionPattern(0, 14)
        addPositionPattern(14, 0)

        // Patrón de datos basado en el hash
        for (let i = 0; i < 21; i++) {
        for (let j = 0; j < 21; j++) {
            if (!modules[i][j]) {
            modules[i][j] = ((hash * (i + 1) * (j + 1)) % 3) === 0
            }
        }
        }

        return modules
    }

    const qrModules = generateQRPattern(product.sku)

    return (
        <>
        <div className={styles.qrWrapper} onClick={() => setShowModal(true)} title="Ver código QR">
            <svg width={size} height={size} viewBox="0 0 21 21" className={styles.qrSvg}>
            {qrModules.map((row, i) =>
                row.map((cell, j) =>
                cell ? (
                    <rect key={`${i}-${j}`} x={j} y={i} width={1} height={1} fill="#1e293b" rx={0.15} />
                ) : null
                )
            )}
            </svg>
            <span className={styles.qrLabel}>QR</span>
        </div>

        {showModal && (
            <div className={styles.modal} onClick={() => setShowModal(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                </button>
                <h3 className={styles.modalTitle}>Código QR del Producto</h3>
                <svg width={250} height={250} viewBox="0 0 21 21" className={styles.qrLarge}>
                {qrModules.map((row, i) =>
                    row.map((cell, j) =>
                    cell ? (
                        <rect key={`${i}-${j}`} x={j} y={i} width={1} height={1} fill="#1e293b" rx={0.15} />
                    ) : null
                    )
                )}
                </svg>
                <div className={styles.qrInfo}>
                <div className={styles.qrInfoItem}>
                    <span className={styles.qrInfoLabel}>Producto</span>
                    <span className={styles.qrInfoValue}>{product.name}</span>
                </div>
                <div className={styles.qrInfoItem}>
                    <span className={styles.qrInfoLabel}>SKU</span>
                    <span className={styles.qrInfoValue}>{product.sku}</span>
                </div>
                <div className={styles.qrInfoItem}>
                    <span className={styles.qrInfoLabel}>Ubicación</span>
                    <span className={styles.qrInfoValue}>{product.location}</span>
                </div>
                </div>
                <button className={styles.printBtn} onClick={() => window.print()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 12H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"/><rect x="6" y="14" width="12" height="8"/>
                </svg>
                Imprimir etiqueta
                </button>
            </div>
            </div>
        )}
        </>
    )
    }

    export default QRCode