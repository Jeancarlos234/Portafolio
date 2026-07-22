    import { Link } from 'react-router-dom'
    import { useState } from 'react'
    import styles from '../../css/CertificatesPage.module.css'

    // Importación de imágenes de certificados
    import reactCourseImg from '../../assets/certificates/reactCourseImg.png'
    import postgresqlCourseImg from '../../assets/certificates/postgresqlCourseImg.png'
    import aiExplorerImg from '../../assets/certificates/aiExplorerImg.png'
    import aiAssociateImg from '../../assets/certificates/aiAssociateImg.png'
    import aiProfessionalImg from '../../assets/certificates/aiProfessionalImg.png'
    import owaspSecurityImg from '../../assets/certificates/owaspSecurityImg.png'
    import flaskPythonImg from '../../assets/certificates/flaskPythonImg.png'
    import flutterflowImg from '../../assets/certificates/flutterflowImg.png'
    import typescriptImg from '../../assets/certificates/typescriptImg.png'
    import aiHackingImg from '../../assets/certificates/aiHackingImg.png'
    import sqlChatgptImg from '../../assets/certificates/sqlChatgptImg.png'
    import reactFirebaseImg from '../../assets/certificates/reactFirebaseImg.png'

    const CertificatesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [previewCert, setPreviewCert] = useState<string | null>(null)

    const certificates = [
        {
        id: 1,
        title: 'Curso completo de React. Desde 0 hasta Desarrollador apps',
        issuer: 'Udemy',
        date: '2025-07-15',
        category: 'Desarrollo Web',
        pdfUrl: '/pdf/Curso completo de React. Desde 0 hasta Desarrollador apps..pdf',
        credentialUrl: 'https://www.udemy.com/certificate/UC-23915daa-9bcc-4422-8939-dd27c676ed0d/',
        skills: ['React', 'TypeScript', 'JavaScript', 'POO'],
        image: reactCourseImg,
        color: '#61DAFB'
        },
        {
        id: 2,
        title: 'Curso Básico de PostgreSQL Con Linux',
        issuer: 'Udemy',
        date: '2025-07-15',
        category: 'Bases de Datos',
        pdfUrl: '/pdf/Curso Básico de PostgreSQL.pdf',
        credentialUrl: 'https://www.udemy.com/certificate/UC-39acad55-4b01-4305-b064-e1e8001f6ae4/',
        skills: ['PostgreSQL', 'Linux', 'Bases de Datos'],
        image: postgresqlCourseImg,
        color: '#336791'
        },
        {
        id: 3,
        title: 'Certificado de Explorador en Ingeniería de IA',
        issuer: 'Udemy',
        date: '2025-07-15',
        category: 'Inteligencia Artificial',
        pdfUrl: '/pdf/Curso de Certificado de Explorador en Ingeniería de IA.pdf',
        credentialUrl: 'https://www.udemy.com/certificate/UC-e4d382e0-0cae-475a-abe3-4aa59b222e76/',
        skills: ['Inteligencia Artificial', 'Machine Learning'],
        image: aiExplorerImg,
        color: '#FF6B6B'
        },
        {
        id: 4,
        title: 'Curso de Certificación de Ingeniero Asociado en IA',
        issuer: 'Udemy',
        date: '2025-07-15',
        category: 'Inteligencia Artificial',
        pdfUrl: '/pdf/Curso de Certificación de Ingeniero Asociado en IA.pdf',
        credentialUrl: 'https://www.udemy.com/certificate/UC-d2909983-3bcb-4e14-8b89-431d90e84bef/',
        skills: ['Inteligencia Artificial', 'Ingeniería de Software'],
        image: aiAssociateImg,
        color: '#FF6B6B'
        },
        {
        id: 5,
        title: 'Curso de Certificación Profesional en Ingeniería de IA',
        issuer: 'Udemy',
        date: '2025-07-15',
        category: 'Inteligencia Artificial',
        pdfUrl: '/pdf/Curso de Certificación Profesional en Ingenieria de IA.pdf',
        credentialUrl: 'https://www.udemy.com/certificate/UC-4dd67bb3-66d0-41bb-8d79-09724c892ce7/',
        skills: ['Inteligencia Artificial', 'Desarrollo'],
        image: aiProfessionalImg,
        color: '#FF6B6B'
        },
        {
        id: 6,
        title: 'OWASP Top 10 2023 de Seguridad en APIs',
        issuer: 'Udemy',
        date: '2025-07-15',
        category: 'Ciberseguridad',
        pdfUrl: '/pdf/Seguridad en APIs.pdf',
        credentialUrl: 'https://www.udemy.com/certificate/UC-c1b6bf5b-a3bd-4535-a89a-e46bae3fb13b/',
        skills: ['OWASP', 'Seguridad Web', 'APIs'],
        image: owaspSecurityImg,
        color: '#FF4D4D'
        },
        {
        id: 7,
        title: 'Crea aplicaciones Profesionales con Flask, Python y API REST',
        issuer: 'Udemy',
        date: '2025-07-15',
        category: 'Desarrollo Web',
        pdfUrl: '/pdf/Crea aplicaciones Profesionales con Flask Python y Api Rest.pdf',
        credentialUrl: 'https://www.udemy.com/certificate/UC-1872ea8e-4ee4-46d3-9428-f89102ebef0f/',
        skills: ['Python', 'Flask', 'API REST'],
        image: flaskPythonImg,
        color: '#3776AB'
        },
        {
        id: 8,
        title: 'Crea tus Aplicaciones sin Código (No code) con FlutterFlow',
        issuer: 'Udemy',
        date: '2025-07-15',
        category: 'Desarrollo Móvil',
        pdfUrl: '/pdf/Crea tus Aplicaciones sin Codigo (no code) con FlutterFlow.pdf',
        credentialUrl: 'https://www.udemy.com/certificate/UC-a123e926-7577-4704-89b7-9a47000ee6dd/',
        skills: ['FlutterFlow', 'No Code', 'Desarrollo Móvil'],
        image: flutterflowImg,
        color: '#02569B'
        },
        {
        id: 9,
        title: 'Curso Completo de TypeScript',
        issuer: 'Udemy',
        date: '2025-07-15',
        category: 'Desarrollo Web',
        pdfUrl: '/pdf/Curso Completo de Typescript. Desde las bases a la Practica.pdf',
        credentialUrl: 'https://www.udemy.com/certificate/UC-0c0fc41d-7540-4c73-a682-34040d2ad654/',
        skills: ['TypeScript', 'Desarrollo Web'],
        image: typescriptImg,
        color: '#3178C6'
        },
        {
        id: 10,
        title: 'IA Generativa & LLM Hacking. Ciberseguridad con Claude.',
        issuer: 'Udemy',
        date: '2025-07-20',
        category: 'Ciberseguridad',
        pdfUrl: '/pdf/IA Generativa & LLM.pdf',
        credentialUrl: 'https://www.udemy.com/certificate/UC-7e1327fa-3229-4f47-b0c8-bd81a847bf74/',
        skills: ['Claude IA', 'Hacking Etico', 'Ciberseguridad', 'Modelos de lenguaje de gran tamaño (LLM)', 'Redes y Seguridad'],
        image: aiHackingImg,
        color: '#FF4D4D'
        },
        {
        id: 11,
        title: 'Curso Completo de consultas de SQL con IA generativa Chatgpt',
        issuer: 'Udemy',
        date: '2025-07-20',
        category: 'Bases de Datos',
        pdfUrl: '/pdf/Curso Completo de consultas de SQL con IA generativa Chatgpt.pdf',
        credentialUrl: 'https://www.udemy.com/certificate/UC-647f702a-479a-4d94-a381-e659d667679b/',
        skills: ['SQL', 'ChatGPT', 'Administración de base de datos', 'IA Generativa (GenAI)', 'Diseño y desarrollo de bases de datos'],
        image: sqlChatgptImg,
        color: '#336791'
        },
        {
        id: 12,
        title: 'Mastering React and Node.js Firebase Authentication [2026]',
        issuer: 'Udemy',
        date: '2025-07-20',
        category: 'Desarrollo Web',
        pdfUrl: '/pdf/Mastering React and Node.js Firebase Authentication [2026].pdf',
        credentialUrl: 'https://www.udemy.com/certificate/UC-ff7c3b87-e99a-47f3-a4e8-d7e9bf14fd1c/',
        skills: ['Desarrollo web full stack', 'Node.js', 'React.js', 'Firebase', 'Desarrollo web'],
        image: reactFirebaseImg,
        color: '#61DAFB'
        },
    ]

    // ✅ Categorías corregidas
    const categories = ['all', ...Array.from(new Set(certificates.map(c => c.category)))]

    const filtered = certificates.filter(c => selectedCategory === 'all' || c.category === selectedCategory)

    return (
        <div className={styles.page}>
        {/* Modal de previsualización */}
        {previewCert && (
            <div className={styles.modal} onClick={() => setPreviewCert(null)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                <h3>Vista previa del certificado</h3>
                <button onClick={() => setPreviewCert(null)} className={styles.closeBtn}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                </div>
                <iframe src={previewCert} className={styles.pdfViewer} title="Vista previa del certificado" />
            </div>
            </div>
        )}

        <div className={styles.header}>
            <Link to="/about" className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Volver a Sobre Mí
            </Link>
        </div>

        <div className={styles.hero}>
            <h1 className={styles.title}>Mis Certificaciones</h1>
            <p className={styles.subtitle}>
            Credenciales que respaldan mi experiencia y conocimientos técnicos
            </p>
            <div className={styles.stats}>
            <div className={styles.statItem}>
                <span className={styles.statValue}>{certificates.length}</span>
                <span className={styles.statLabel}>Certificaciones</span>
            </div>
            <div className={styles.statItem}>
                <span className={styles.statValue}>{categories.length - 1}</span>
                <span className={styles.statLabel}>Categorías</span>
            </div>
            </div>
        </div>

        <div className={styles.filters}>
            {categories.map(cat => (
            <button
                key={cat}
                className={`${styles.filterBtn} ${selectedCategory === cat ? styles.active : ''}`}
                onClick={() => setSelectedCategory(cat)}
            >
                {cat === 'all' ? 'Todas' : cat}
            </button>
            ))}
        </div>

        <div className={styles.grid}>
            {filtered.map(cert => (
            <div key={cert.id} className={styles.card}>
                {/* 🖼️ Imagen del curso */}
                <div className={styles.cardImage} style={{ backgroundColor: cert.color + '15' }}>
                <img 
                    src={cert.image} 
                    alt={cert.title}
                    className={styles.courseImage}
                    onError={(e) => {
                    // Fallback si la imagen no carga
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                        parent.innerHTML = `
                        <div style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 3rem;">
                            📜
                        </div>
                        `;
                    }
                    }}
                />
                <div className={styles.imageOverlay}>
                    <button onClick={() => setPreviewCert(cert.pdfUrl)} className={styles.overlayBtn}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    Vista previa
                    </button>
                </div>
                </div>
                
                <div className={styles.cardTop}>
                <div className={styles.cardIcon}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                </div>
                <span className={styles.category}>{cert.category}</span>
                </div>
                
                <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{cert.title}</h3>
                <p className={styles.issuer}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    {cert.issuer}
                </p>
                <p className={styles.date}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    {new Date(cert.date + 'T00:00:00').toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}
                </p>
                
                <div className={styles.skills}>
                    {cert.skills.map(skill => (
                    <span key={skill} className={styles.skill}>{skill}</span>
                    ))}
                </div>
                </div>

                <div className={styles.cardActions}>
                <button onClick={() => setPreviewCert(cert.pdfUrl)} className={styles.previewBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    Ver
                </button>
                <a href={cert.pdfUrl} download className={styles.downloadBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Descargar
                </a>
                <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className={styles.verifyBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                    Verificar
                </a>
                </div>
            </div>
            ))}
        </div>

        {/* ✅ CTA para evitar que el footer se pegue */}
        <div className={styles.cta}>
            <h2>¿Quieres ver más sobre mi experiencia?</h2>
            <Link to="/experience" className={styles.ctaBtn}>
            Ver experiencia laboral
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
        </div>
        </div>
    )
    }

    export default CertificatesPage