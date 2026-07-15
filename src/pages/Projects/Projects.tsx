        import { useEffect, useState } from 'react'
        import styles from '../../css/Projects.module.css'

        interface Project {
        id: number
        title: string
        description: string
        technologies: string[]
        category: string
        githubLink?: string
        liveLink?: string
        color: string
        }

        const Projects = () => {
        const [isVisible, setIsVisible] = useState(false)
        const [activeFilter, setActiveFilter] = useState('Todos')
        const [visibleCount, setVisibleCount] = useState(9)

        useEffect(() => {
            const timer = setTimeout(() => {
            setIsVisible(true)
            }, 100)
            return () => clearTimeout(timer)
        }, [])

        const projects: Project[] = [
            // ============ WEB (12 proyectos) ============
            {
            id: 1,
            title: 'Sistema de Gestión Empresarial',
            description: 'Sistema modular web con control de accesos y permisos por rol para administradores, analistas y supervisores.',
            technologies: ['Laravel', 'React', 'MySQL', 'Bootstrap', 'REST APIs'],
            category: 'Web',
            
            liveLink: '/enterprise',
            color: '#3b82f6'
            },
            {
            id: 2,
            title: 'Portal Web de Servicios',
            description: 'Plataforma web para gestión de servicios con panel de cliente, administración y reportes.',
            technologies: ['React', 'Laravel', 'PostgreSQL', 'Docker', 'AWS'],
            category: 'Web',
            
            liveLink: '/services-portal',
            color: '#3b82f6'
            },
            {
            id: 3,
            title: 'Dashboard de Visualización de Datos',
            description: 'Panel interactivo para visualización y análisis de datos empresariales con gráficos dinámicos.',
            technologies: ['React', 'TypeScript', 'Chart.js', 'Tailwind', 'REST APIs'],
            category: 'Web',
            
            liveLink: '/dashboard',
            color: '#3b82f6'
            },
            {
            id: 4,
            title: 'Sistema de Gestión de Órdenes de Trabajo',
            description: 'Plataforma para registro, seguimiento y gestión de órdenes de trabajo con flujo de aprobación.',
            technologies: ['Laravel', 'Vue.js', 'MySQL', 'Bootstrap'],
            category: 'Web',
            
            liveLink: '/work-orders',
            color: '#3b82f6'
            },
            {
            id: 5,
            title: 'E-commerce Platform',
            description: 'Tienda online completa con carrito de compras, pasarela de pago y panel de administración.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
            category: 'Web',
            
            liveLink: '/shop',
            color: '#3b82f6'
            },
            {
            id: 6,
            title: 'Sistema de Reservas Online',
            description: 'Plataforma de reservas con calendario interactivo, notificaciones y gestión de disponibilidad.',
            technologies: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
            category: 'Web',
            
            liveLink: '/bookings',
            color: '#3b82f6'
            },
            {
            id: 7,
            title: 'Blog Personal con CMS',
            description: 'Blog con sistema de gestión de contenidos, comentarios, categorías y buscador integrado.',
            technologies: ['Next.js', 'MDX', 'Tailwind', 'Vercel'],
            category: 'Web',
            
            liveLink: '/blog',
            color: '#3b82f6'
            },
            {
            id: 8,
            title: 'Sistema de Facturación Electrónica',
            description: 'Plataforma para generación y gestión de facturas electrónicas con reportes financieros.',
            technologies: ['Laravel', 'React', 'MySQL', 'PDF Generator'],
            category: 'Web',
            
            liveLink: '/facturacion',
            color: '#3b82f6'
            },
            {
            id: 9,
            title: 'Plataforma de Cursos Online',
            description: 'Sistema de e-learning con videos, quizzes, certificados y seguimiento de progreso.',
            technologies: ['React', 'Node.js', 'MongoDB', 'AWS S3'],
            category: 'Web',
            
            liveLink: '/courses',
            color: '#3b82f6'
            },
            {
            id: 10,
            title: 'Sistema de Inventario Web',
            description: 'Aplicación web para control de inventario con escaneo de códigos y alertas de stock.',
            technologies: ['React', 'Laravel', 'MySQL', 'Barcode API'],
            category: 'Web',
            
            liveLink: '/inventory',
            color: '#3b82f6'
            },
            {
            id: 11,
            title: 'Portal de Recursos Humanos',
            description: 'Sistema de gestión de empleados, asistencias, vacaciones y nóminas.',
            technologies: ['Angular', 'Node.js', 'PostgreSQL', 'JWT'],
            category: 'Web',
            
            liveLink: '/hr',
            color: '#3b82f6'
            },
            {
            id: 12,
            title: 'Landing Page Corporativa',
            description: 'Sitio web corporativo moderno con animaciones, formulario de contacto y blog integrado.',
            technologies: ['Next.js', 'Tailwind', 'Framer Motion', 'MDX'],
            category: 'Web',
            liveLink: '/landing',
            color: '#3b82f6'
            },

            // ============ MÓVIL (10 proyectos) ============
            {
            id: 13,
            title: 'App de Control de Asistencia',
            description: 'App móvil para registro de asistencia del personal con formularios de captura y herramientas de cálculo.',
            technologies: ['Flutter', 'Dart', 'Firebase', 'SQLite', 'GPS'],
            category: 'Móvil',
            
            liveLink: '#',
            color: '#8b5cf6'
            },
            {
            id: 14,
            title: 'App de Gestión de Inventario',
            description: 'Aplicación móvil para administración de inventario de dispositivos con escaneo y tracking.',
            technologies: ['React Native', 'TypeScript', 'MySQL', 'REST APIs'],
            category: 'Móvil',
            
            liveLink: '#',
            color: '#8b5cf6'
            },
            {
            id: 15,
            title: 'App de Delivery',
            description: 'Aplicación de entregas a domicilio con seguimiento en tiempo real y notificaciones push.',
            technologies: ['Flutter', 'Firebase', 'Google Maps', 'Stripe'],
            category: 'Móvil',
            
            liveLink: '#',
            color: '#8b5cf6'
            },
            {
            id: 16,
            title: 'App de Chat en Tiempo Real',
            description: 'Aplicación de mensajería instantánea con salas de chat, emojis y notificaciones.',
            technologies: ['React Native', 'Socket.io', 'Node.js', 'MongoDB'],
            category: 'Móvil',
            
            liveLink: '#',
            color: '#8b5cf6'
            },
            {
            id: 17,
            title: 'App de Finanzas Personales',
            description: 'Gestor de gastos e ingresos con categorías, presupuestos y reportes mensuales.',
            technologies: ['Flutter', 'SQLite', 'Charts', 'Local Notifications'],
            category: 'Móvil',
            
            liveLink: '#',
            color: '#8b5cf6'
            },
            {
            id: 18,
            title: 'App de Recordatorios y Tareas',
            description: 'Aplicación de productividad con recordatorios, listas de tareas y sincronización en la nube.',
            technologies: ['React Native', 'Firebase', 'Redux', 'Push Notifications'],
            category: 'Móvil',
            
            liveLink: '#',
            color: '#8b5cf6'
            },
            {
            id: 19,
            title: 'App de Clima y Pronóstico',
            description: 'Aplicación del clima con geolocalización, pronóstico extendido y alertas meteorológicas.',
            technologies: ['Flutter', 'OpenWeather API', 'Geolocator', 'Lottie'],
            category: 'Móvil',
            
            liveLink: '/weather',
            color: '#8b5cf6'
            },
            {
            id: 20,
            title: 'App de Recetas de Cocina',
            description: 'Aplicación con recetas categorizadas, búsqueda por ingredientes y modo offline.',
            technologies: ['React Native', 'SQLite', 'REST APIs', 'AsyncStorage'],
            category: 'Móvil',
            
            liveLink: '#',
            color: '#8b5cf6'
            },
            {
            id: 21,
            title: 'App de Ejercicios y Rutinas',
            description: 'Aplicación fitness con rutinas personalizadas, temporizador y seguimiento de progreso.',
            technologies: ['Flutter', 'Firebase', 'Health Kit', 'Animations'],
            category: 'Móvil',
            
            liveLink: '#',
            color: '#8b5cf6'
            },
            {
            id: 22,
            title: 'App de Lectura de Códigos QR',
            description: 'Escáner de códigos QR y barras con historial, favoritos y generación de códigos.',
            technologies: ['React Native', 'Camera', 'SQLite', 'Share API'],
            category: 'Móvil',
            
            liveLink: '#',
            color: '#8b5cf6'
            },

            // ============ BACKEND (10 proyectos) ============
            {
            id: 23,
            title: 'API RESTful de Gestión de Órdenes',
            description: 'Backend robusto para registro y gestión de órdenes de trabajo con integración de bases de datos.',
            technologies: ['ASP.NET Core', 'C#', 'SQL Server', 'Swagger', 'JWT'],
            category: 'Backend',
            
            liveLink: '#',
            color: '#22c55e'
            },
            {
            id: 24,
            title: 'API de Autenticación y Autorización',
            description: 'Microservicio de autenticación con JWT, OAuth2, roles y permisos granulares.',
            technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'OAuth2'],
            category: 'Backend',
            
            liveLink: '#',
            color: '#22c55e'
            },
            {
            id: 25,
            title: 'API de Procesamiento de Pagos',
            description: 'Servicio de pagos con integración de múltiples pasarelas y manejo de transacciones.',
            technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Stripe', 'PayPal'],
            category: 'Backend',
            
            liveLink: '#',
            color: '#22c55e'
            },
            {
            id: 26,
            title: 'API de Notificaciones',
            description: 'Sistema de notificaciones multicanal (email, SMS, push) con colas y programación.',
            technologies: ['Node.js', 'Redis', 'Bull', 'SendGrid', 'Twilio'],
            category: 'Backend',
            
            liveLink: '#',
            color: '#22c55e'
            },
            {
            id: 27,
            title: 'API de Gestión de Archivos',
            description: 'Servicio de almacenamiento de archivos con compresión, thumbnails y CDN integration.',
            technologies: ['Python', 'Django', 'AWS S3', 'CloudFront', 'Pillow'],
            category: 'Backend',
            
            liveLink: '#',
            color: '#22c55e'
            },
            {
            id: 28,
            title: 'API de Búsqueda Avanzada',
            description: 'Motor de búsqueda con Elasticsearch para indexación y búsqueda full-text.',
            technologies: ['Node.js', 'Elasticsearch', 'Redis', 'Docker'],
            category: 'Backend',
            
            liveLink: '#',
            color: '#22c55e'
            },
            {
            id: 29,
            title: 'API de Analytics y Métricas',
            description: 'Servicio de recolección y análisis de datos con dashboards en tiempo real.',
            technologies: ['Python', 'FastAPI', 'ClickHouse', 'Grafana', 'Redis'],
            category: 'Backend',
            
            liveLink: '#',
            color: '#22c55e'
            },
            {
            id: 30,
            title: 'API de Chat en Tiempo Real',
            description: 'Backend de mensajería con WebSockets, salas, presencia y persistencia de mensajes.',
            technologies: ['Node.js', 'Socket.io', 'MongoDB', 'Redis'],
            category: 'Backend',
            
            liveLink: '#',
            color: '#22c55e'
            },
            {
            id: 31,
            title: 'API de Geolocalización',
            description: 'Servicio de geocodificación, rutas, distancias y puntos de interés cercanos.',
            technologies: ['Node.js', 'Express', 'PostgreSQL', 'PostGIS', 'Redis'],
            category: 'Backend',
            
            liveLink: '#',
            color: '#22c55e'
            },
            {
            id: 32,
            title: 'API de Web Scraping',
            description: 'Servicio de extracción de datos web con programación de tareas y almacenamiento.',
            technologies: ['Python', 'Scrapy', 'Celery', 'PostgreSQL', 'Redis'],
            category: 'Backend',
            
            liveLink: '#',
            color: '#22c55e'
            },

            // ============ ESCRITORIO (10 proyectos) ============
            {
            id: 33,
            title: 'Gestor de Tareas con WPF',
            description: 'Aplicación de escritorio para gestión de tareas personales con interfaz moderna.',
            technologies: ['C#', 'WPF', '.NET', 'SQLite', 'MVVM'],
            category: 'Escritorio',
            
            liveLink: '#',
            color: '#f59e0b'
            },
            {
            id: 34,
            title: 'Herramienta de Base de Datos Local',
            description: 'Aplicación para crear, editar y gestionar bases de datos locales con interfaz intuitiva.',
            technologies: ['C#', 'WinForms', '.NET', 'SQL Server', 'Entity Framework'],
            category: 'Escritorio',
            
            liveLink: '#',
            color: '#f59e0b'
            },
            {
            id: 35,
            title: 'Sistema de Punto de Venta',
            description: 'Aplicación de escritorio para ventas, inventario y facturación con impresión térmica.',
            technologies: ['C#', 'WPF', 'SQL Server', 'Entity Framework', 'RDLC'],
            category: 'Escritorio',
            
            liveLink: '#',
            color: '#f59e0b'
            },
            {
            id: 36,
            title: 'Editor de Texto Avanzado',
            description: 'Procesador de texto con formato, tablas, imágenes y exportación a múltiples formatos.',
            technologies: ['C#', 'WPF', '.NET', 'RichTextBox', 'OpenXML'],
            category: 'Escritorio',
            
            liveLink: '#',
            color: '#f59e0b'
            },
            {
            id: 37,
            title: 'Gestor de Contraseñas',
            description: 'Aplicación segura para almacenar y gestionar contraseñas con encriptación AES.',
            technologies: ['C#', 'WPF', 'SQLite', 'AES Encryption', 'MVVM'],
            category: 'Escritorio',
            
            liveLink: '#',
            color: '#f59e0b'
            },
            {
            id: 38,
            title: 'Reproductor Multimedia',
            description: 'Reproductor de audio y video con listas de reproducción, ecualizador y soporte de formatos.',
            technologies: ['C#', 'WPF', 'MediaElement', 'SQLite', 'FFmpeg'],
            category: 'Escritorio',
            
            liveLink: '#',
            color: '#f59e0b'
            },
            {
            id: 39,
            title: 'Sistema de Gestión de Biblioteca',
            description: 'Aplicación para administración de libros, préstamos, devoluciones y socios.',
            technologies: ['C#', 'WinForms', 'SQL Server', 'Entity Framework'],
            category: 'Escritorio',
            
            liveLink: '#',
            color: '#f59e0b'
            },
            {
            id: 40,
            title: 'Calculadora de Ingeniería',
            description: 'Calculadora científica avanzada con gráficos 2D/3D y conversiones de unidades.',
            technologies: ['C#', 'WPF', 'Math.NET', 'OxyPlot', 'MVVM'],
            category: 'Escritorio',
            
            liveLink: '#',
            color: '#f59e0b'
            },
            {
            id: 41,
            title: 'Cliente FTP/SFTP',
            description: 'Cliente de transferencia de archivos con interfaz de doble panel y cola de transferencias.',
            technologies: ['C#', 'WPF', 'SSH.NET', 'FluentFTP', 'MVVM'],
            category: 'Escritorio',
            
            liveLink: '#',
            color: '#f59e0b'
            },
            {
            id: 42,
            title: 'Monitor de Sistema',
            description: 'Herramienta de monitoreo de recursos del sistema con gráficos en tiempo real y alertas.',
            technologies: ['C#', 'WPF', 'PerformanceCounters', 'LiveCharts'],
            category: 'Escritorio',
            
            liveLink: '#',
            color: '#f59e0b'
            },

            // ============ SISTEMAS / ALGORITMOS (8 proyectos) ============
            {
            id: 43,
            title: 'Simulador de Algoritmos de Ordenamiento',
            description: 'Visualizador de algoritmos de ordenamiento con animaciones y comparación de rendimiento.',
            technologies: ['C++', 'Algoritmos', 'SFML', 'Data Structures'],
            category: 'Sistemas',
            
            liveLink: '#',
            color: '#ef4444'
            },
            {
            id: 44,
            title: 'Compresor de Archivos',
            description: 'Implementación del algoritmo de Huffman para compresión y descompresión de archivos.',
            technologies: ['C++', 'Algoritmos', 'Bit Manipulation', 'File I/O'],
            category: 'Sistemas',
            
            liveLink: '#',
            color: '#ef4444'
            },
            {
            id: 45,
            title: 'Simulador de Memoria Virtual',
            description: 'Simulación de gestión de memoria virtual con algoritmos de reemplazo de páginas.',
            technologies: ['C++', 'OS Concepts', 'Algorithms', 'Visualization'],
            category: 'Sistemas',
            
            liveLink: '#',
            color: '#ef4444'
            },
            {
            id: 46,
            title: 'Intérprete de Lenguaje Simple',
            description: 'Intérprete para un lenguaje de programación simple con lexer, parser y ejecución.',
            technologies: ['C++', 'Compiler Design', 'AST', 'Lex/Yacc'],
            category: 'Sistemas',
            
            liveLink: '#',
            color: '#ef4444'
            },
            {
            id: 47,
            title: 'Juego de Ajedrez con IA',
            description: 'Juego de ajedrez completo con inteligencia artificial usando algoritmo Minimax.',
            technologies: ['C++', 'AI', 'Minimax', 'Alpha-Beta Pruning', 'SFML'],
            category: 'Sistemas',
            
            liveLink: '#',
            color: '#ef4444'
            },
            {
            id: 48,
            title: 'Sistema de Archivos Virtual',
            description: 'Implementación de un sistema de archivos virtual con operaciones CRUD y directorios.',
            technologies: ['C++', 'File Systems', 'Data Structures', 'Serialization'],
            category: 'Sistemas',
            
            liveLink: '#',
            color: '#ef4444'
            },
            {
            id: 49,
            title: 'Simulador de Redes Neuronales',
            description: 'Implementación básica de redes neuronales con backpropagation para clasificación.',
            technologies: ['C++', 'Machine Learning', 'Linear Algebra', 'Eigen'],
            category: 'Sistemas',
            
            liveLink: '#',
            color: '#ef4444'
            },
            {
            id: 50,
            title: 'Motor de Juegos 2D',
            description: 'Motor de juegos 2D básico con sistema de entidades, físicas y renderizado.',
            technologies: ['C++', 'OpenGL', 'GLM', 'Box2D', 'Game Engine'],
            category: 'Sistemas',
            
            liveLink: '#',
            color: '#ef4444'
            }
        ]

        const categories = ['Todos', ...Array.from(new Set(projects.map(p => p.category)))]
        
        const filteredProjects = activeFilter === 'Todos' 
            ? projects 
            : projects.filter(p => p.category === activeFilter)

        const displayedProjects = filteredProjects.slice(0, visibleCount)
        const hasMore = visibleCount < filteredProjects.length

        const loadMore = () => {
            setVisibleCount(prev => Math.min(prev + 9, filteredProjects.length))
        }

        const getCategoryIcon = (category: string) => {
            switch (category) {
            case 'Web':
                return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                )
            case 'Móvil':
                return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="18" x2="12.01" y2="18"/>
                </svg>
                )
            case 'Backend':
                return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                    <line x1="6" y1="6" x2="6.01" y2="6"/>
                    <line x1="6" y1="18" x2="6.01" y2="18"/>
                </svg>
                )
            case 'Escritorio':
                return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
                )
            case 'Sistemas':
                return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                </svg>
                )
            default:
                return null
            }
        }

        return (
        <>
        {/* Hero Section */}
        <section className={styles.hero}>
            <div className={styles.heroBackground}>
            <div className={styles.heroGradient}></div>
            <div className={styles.heroPattern}></div>
            </div>
            <div className={styles.heroContent}>
            <span className={styles.heroLabel}>PROYECTOS</span>
            <h1 className={styles.heroTitle}>Portafolio de Proyectos</h1>
            <p className={styles.heroDescription}>
                Una selección de <strong>50+ proyectos</strong> que he desarrollado, demostrando mis habilidades 
                en diferentes tecnologías y áreas del desarrollo de software.
            </p>
            <div className={styles.heroStats}>
                <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>50+</span>
                <span className={styles.heroStatLabel}>Proyectos completados</span>
                </div>
                <div className={styles.heroDivider}></div>
                <div className={styles.heroStat}>
                <span className={styles.heroStatNumber}>{categories.length - 1}</span>
                <span className={styles.heroStatLabel}>Categorías</span>
                </div>
            </div>
            </div>
        </section>

        {/* Main Content */}
        <section className={styles.main}>
            <div className={styles.container}>
            {/* Filters */}
            <div className={styles.filters}>
                {categories.map((category) => (
                <button
                    key={category}
                    className={`${styles.filterBtn} ${activeFilter === category ? styles.active : ''}`}
                    onClick={() => {
                    setActiveFilter(category)
                    setVisibleCount(9)
                    }}
                >
                    {category !== 'Todos' && (
                    <span className={styles.filterIcon}>
                        {getCategoryIcon(category)}
                    </span>
                    )}
                    {category}
                </button>
                ))}
            </div>

            {/* Projects Grid */}
            <div className={`${styles.grid} ${isVisible ? styles.visible : ''}`}>
                {displayedProjects.map((project, index) => (
                <article 
                    key={project.id} 
                    className={styles.card}
                    style={{ 
                    animationDelay: `${(index % 9) * 0.08}s`,
                    '--project-color': project.color 
                    } as React.CSSProperties}
                >
                    {/* ... mismo contenido de la card ... */}
                    <div className={styles.cardHeader}>
                    <div className={styles.cardIcon} style={{ backgroundColor: `${project.color}15`, color: project.color }}>
                        {getCategoryIcon(project.category)}
                    </div>
                    <span className={styles.category}>{project.category}</span>
                    </div>
                    
                    <div className={styles.cardBody}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.description}>{project.description}</p>
                    
                    <div className={styles.technologies}>
                        {project.technologies.map((tech) => (
                        <span key={tech} className={styles.tech}>
                            {tech}
                        </span>
                        ))}
                    </div>
                    </div>
                    
                    <div className={styles.cardFooter}>
                    {project.liveLink && (
                        <a 
                        href={project.liveLink} 
                        className={styles.liveLink}
                        rel="noopener noreferrer"
                        >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        Demo
                        </a>
                    )}
                    </div>
                </article>
                ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
                <div className={styles.loadMoreWrapper}>
                <button onClick={loadMore} className={styles.loadMoreBtn}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                    </svg>
                    Cargar más proyectos
                    <span className={styles.loadMoreCount}>
                    ({filteredProjects.length - visibleCount} restantes)
                    </span>
                </button>
                </div>
            )}
            </div>
        </section>
        </>
    )
    }

    export default Projects