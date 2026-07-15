    import { useState } from 'react'
    import styles from './Chat.module.css'
    import type { ChatMessage } from '../../types'

    interface ChatProps {
    messages: ChatMessage[]
    }

    const Chat = ({ messages }: ChatProps) => {
    const [activeRoom, setActiveRoom] = useState('general')
    const [newMessage, setNewMessage] = useState('')
    const [chatMessages, setChatMessages] = useState(messages)

    const rooms = ['general', 'proyectos', 'finanzas', 'soporte']
    const roomMessages = chatMessages.filter(m => m.room === activeRoom)

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim()) return
        setChatMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'Admin',
        content: newMessage.trim(),
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        room: activeRoom
        }])
        setNewMessage('')
    }

    return (
        <div className={styles.chat}>
        <div className={styles.rooms}>
            <h3>Salas</h3>
            {rooms.map(r => (
            <button key={r} className={`${styles.roomBtn} ${activeRoom === r ? styles.activeRoom : ''}`} onClick={() => setActiveRoom(r)}>
                # {r}
                <span className={styles.roomCount}>{chatMessages.filter(m => m.room === r).length}</span>
            </button>
            ))}
        </div>

        <div className={styles.chatMain}>
            <div className={styles.chatHeader}>
            <h3># {activeRoom}</h3>
            <span>{roomMessages.length} mensajes</span>
            </div>

            <div className={styles.messages}>
            {roomMessages.map(m => (
                <div key={m.id} className={`${styles.message} ${m.sender === 'Admin' ? styles.myMessage : ''}`}>
                <div className={styles.msgAvatar}>{m.sender[0]}</div>
                <div className={styles.msgContent}>
                    <div className={styles.msgHeader}>
                    <span className={styles.msgSender}>{m.sender}</span>
                    <span className={styles.msgTime}>{m.time}</span>
                    </div>
                    <p className={styles.msgText}>{m.content}</p>
                </div>
                </div>
            ))}
            </div>

            <form onSubmit={handleSend} className={styles.chatInput}>
            <input type="text" placeholder="Escribe un mensaje..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className={styles.input} />
            <button type="submit" className={styles.sendBtn}>Enviar</button>
            </form>
        </div>
        </div>
    )
    }

    export default Chat