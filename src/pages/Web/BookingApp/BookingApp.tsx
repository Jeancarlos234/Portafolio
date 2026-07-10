    import { useState, useEffect, useCallback } from 'react'
    import Header from './components/Header/Header'
    import ServiceSelector from './components/ServiceSelector/ServiceSelector'
    import Calendar from './components/Calendar/Calendar'
    import TimeSlots from './components/TimeSlots/TimeSlots'
    import BookingForm from './components/BookingForm/BookingForm'
    import BookingList from './components/BookingList/BookingList'
    import Confirmation from './components/Confirmation/Confirmation'
    import styles from './BookingApp.module.css'
    import type { Service, Booking } from './type'

    const initialServices: Service[] = [
    { id: '1', name: 'Consulta General', description: 'Revisión completa de salud', duration: 30, price: 50, icon: '🏥', color: '#22c55e' },
    { id: '2', name: 'Limpieza Dental', description: 'Limpieza profunda profesional', duration: 45, price: 80, icon: '🦷', color: '#3b82f6' },
    { id: '3', name: 'Terapia Física', description: 'Sesión de rehabilitación', duration: 60, price: 65, icon: '💪', color: '#f59e0b' },
    { id: '4', name: 'Masaje Terapéutico', description: 'Masaje relajante profesional', duration: 50, price: 70, icon: '💆', color: '#8b5cf6' },
    { id: '5', name: 'Nutrición', description: 'Plan alimenticio personalizado', duration: 40, price: 55, icon: '🥗', color: '#ef4444' },
    { id: '6', name: 'Psicología', description: 'Terapia psicológica individual', duration: 50, price: 75, icon: '🧠', color: '#06b6d4' },
    ]

    const generateTimeSlots = (serviceId: string, date: string, existingBookings: Booking[]) => {
    const service = initialServices.find(s => s.id === serviceId)
    if (!service) return []

    const slots: { time: string; available: boolean }[] = []
    const startHour = 8
    const endHour = 18
    const interval = service.duration

    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        const isBooked = existingBookings.some(
            b => b.date === date && b.time === time && b.status !== 'cancelled'
        )
        slots.push({ time, available: !isBooked })
        }
    }

    return slots
    }

    const BookingApp = () => {
    const [step, setStep] = useState<'service' | 'datetime' | 'form' | 'confirmation' | 'list'>('service')
    const [selectedService, setSelectedService] = useState<Service | null>(null)
    const [selectedDate, setSelectedDate] = useState<string>('')
    const [selectedTime, setSelectedTime] = useState<string>('')
    const [bookings, setBookings] = useState<Booking[]>(() => {
        const saved = localStorage.getItem('bookings')
        return saved ? JSON.parse(saved) : []
    })
    const [timeSlots, setTimeSlots] = useState<{ time: string; available: boolean }[]>([])
    const [showAdmin, setShowAdmin] = useState(false)

    useEffect(() => {
        localStorage.setItem('bookings', JSON.stringify(bookings))
    }, [bookings])

    const handleSelectService = (service: Service) => {
        setSelectedService(service)
        setSelectedDate('')
        setSelectedTime('')
        setStep('datetime')
    }

    const handleSelectDate = (date: string) => {
        setSelectedDate(date)
        if (selectedService) {
        const slots = generateTimeSlots(selectedService.id, date, bookings)
        setTimeSlots(slots)
        }
        setSelectedTime('')
    }

    const handleSelectTime = (time: string) => {
        setSelectedTime(time)
        setStep('form')
    }

    const handleSubmitBooking = useCallback((data: { name: string; email: string; phone: string; notes: string }) => {
        if (!selectedService || !selectedDate || !selectedTime) return

        const newBooking: Booking = {
        id: Date.now().toString(),
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        date: selectedDate,
        time: selectedTime,
        name: data.name,
        email: data.email,
        phone: data.phone,
        notes: data.notes,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        }

        setBookings(prev => [newBooking, ...prev])
        setStep('confirmation')
    }, [selectedService, selectedDate, selectedTime])

    const handleCancelBooking = useCallback((id: string) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' as const } : b))
    }, [])

    return (
        <div className={styles.app}>
        <Header 
            step={step} 
            onBack={() => {
            if (step === 'datetime') setStep('service')
            else if (step === 'form') setStep('datetime')
            else if (step === 'confirmation') setStep('service')
            else if (step === 'list') setShowAdmin(false)
            }}
            showAdmin={showAdmin}
            onToggleAdmin={() => { setShowAdmin(!showAdmin); setStep('list') }}
        />

        <div className={styles.container}>
            {step === 'service' && !showAdmin && (
            <ServiceSelector 
                services={initialServices} 
                onSelect={handleSelectService} 
            />
            )}

            {step === 'datetime' && selectedService && (
            <div className={styles.datetimeSection}>
                <h2 className={styles.sectionTitle}>
                {selectedService.icon} {selectedService.name} - {selectedService.duration} min
                </h2>
                <div className={styles.datetimeGrid}>
                <Calendar 
                    selectedDate={selectedDate}
                    onSelectDate={handleSelectDate}
                    bookedDates={bookings.filter(b => b.serviceId === selectedService.id && b.status !== 'cancelled').map(b => b.date)}
                />
                {selectedDate && (
                    <TimeSlots 
                    slots={timeSlots}
                    selectedTime={selectedTime}
                    onSelectTime={handleSelectTime}
                    />
                )}
                </div>
            </div>
            )}

            {step === 'form' && selectedService && selectedDate && selectedTime && (
            <BookingForm 
                service={selectedService}
                date={selectedDate}
                time={selectedTime}
                onSubmit={handleSubmitBooking}
                onCancel={() => setStep('datetime')}
            />
            )}

            {step === 'confirmation' && (
            <Confirmation 
                onNewBooking={() => { setStep('service'); setSelectedService(null); setSelectedDate(''); setSelectedTime('') }}
            />
            )}

            {step === 'list' && (
            <BookingList 
                bookings={bookings}
                onCancel={handleCancelBooking}
            />
            )}
        </div>
        </div>
    )
    }

    export default BookingApp