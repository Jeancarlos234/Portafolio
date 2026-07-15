    import { useEffect, useState } from 'react'
    import { redis } from '../libs/redis'

    const TestDB = () => {
    const [status, setStatus] = useState('Probando conexión...')
    const [data, setData] = useState('')

    useEffect(() => {
        const testConnection = async () => {
        try {
            // Guardar un dato de prueba
            await redis.set('test', '¡Conexión exitosa a Upstash Redis! 🚀')
            
            // Leer el dato
            const result = await redis.get('test')
            setData(result as string)
            setStatus('✅ Conectado correctamente')
        } catch (error) {
            setStatus('❌ Error de conexión')
            console.error(error)
        }
        }
        testConnection()
    }, [])

    return (
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1>{status}</h1>
        {data && (
            <div style={{ 
            marginTop: '20px', 
            padding: '20px', 
            background: '#f0fdf4', 
            borderRadius: '10px',
            fontSize: '18px',
            fontWeight: 'bold'
            }}>
            {data}
            </div>
        )}
        </div>
    )
    }

    export default TestDB