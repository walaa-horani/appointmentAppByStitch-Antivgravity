'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

interface Service {
    id: string
    name: string
    description: string
    duration: number
    price: number
    category?: string
}

interface Doctor {
    id: string
    name: string
    specialization: string
    email: string
}

export default function BookAppointmentPage() {
    const router = useRouter()
    const { user, isSignedIn } = useUser()
    const [step, setStep] = useState(1)
    const [services, setServices] = useState<Service[]>([])
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    const [selectedService, setSelectedService] = useState('')
    const [selectedDoctor, setSelectedDoctor] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTime, setSelectedTime] = useState('')
    const [patientName, setPatientName] = useState('')
    const [patientEmail, setPatientEmail] = useState('')
    const [patientPhone, setPatientPhone] = useState('')
    const [notes, setNotes] = useState('')
    const [takenSlots, setTakenSlots] = useState<string[]>([])

    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
        '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    ]

    useEffect(() => {
        async function fetchData() {
            try {
                const [servicesRes, doctorsRes] = await Promise.all([
                    fetch('/api/services'),
                    fetch('/api/doctors'),
                ])
                const servicesData = await servicesRes.json()
                const doctorsData = await doctorsRes.json()
                setServices(servicesData)
                setDoctors(doctorsData)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (selectedDoctor && selectedDate) {
            setTakenSlots([])
            fetch(`/api/availability?doctorId=${selectedDoctor}&date=${selectedDate}`)
                .then(res => res.json())
                .then(data => {
                    if (data.takenSlots) setTakenSlots(data.takenSlots)
                })
                .catch(err => console.error('Error fetching availability:', err))
        }
    }, [selectedDoctor, selectedDate])

    useEffect(() => {
        if (user) {
            setPatientName(user.fullName || '')
            setPatientEmail(user.primaryEmailAddress?.emailAddress || '')
        }
    }, [user])

    const handleSubmit = async () => {
        if (!isSignedIn) {
            router.push('/sign-in')
            return
        }

        setSubmitting(true)
        try {
            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    serviceId: selectedService,
                    doctorId: selectedDoctor,
                    date: selectedDate,
                    time: selectedTime,
                    patientName,
                    patientEmail,
                    patientPhone,
                    notes,
                    userId: user?.id,
                }),
            })

            if (res.ok) {
                const appointment = await res.json()
                router.push(`/confirmation?id=${appointment.id}`)
            } else {
                alert('Failed to book appointment. Please try again.')
            }
        } catch (error) {
            console.error('Error booking appointment:', error)
            alert('An error occurred. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    const selectedServiceObj = services.find(s => s.id === selectedService)

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
            </div>
        )
    }

    return (
        <>
            {/* Header */}
            <section className="bg-white py-10 border-b border-slate-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Schedule Your Visit</h1>
                    <p className="text-slate-600 text-lg">Select a specialist and a convenient time for your appointment.</p>
                </div>
            </section>

            {/* Step Indicator */}
            <section className="bg-white border-b border-slate-100">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        {['Select Service', 'Choose Doctor', 'Your Info', 'Date & Time'].map((label, i) => (
                            <div key={label} className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step > i + 1 ? 'bg-green-500 text-white' :
                                    step === i + 1 ? 'bg-[var(--color-primary)] text-white' :
                                        'bg-slate-200 text-slate-500'
                                    }`}>
                                    {step > i + 1 ? <span className="material-icons text-sm">check</span> : i + 1}
                                </div>
                                <span className={`hidden sm:inline ml-2 text-sm font-medium ${step === i + 1 ? 'text-[var(--color-primary)]' : 'text-slate-500'}`}>{label}</span>
                                {i < 3 && <div className={`hidden sm:block w-16 lg:w-24 h-0.5 mx-3 ${step > i + 1 ? 'bg-green-500' : 'bg-slate-200'}`}></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form */}
            <section className="py-12 bg-slate-50 min-h-[60vh]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Step 1: Select Service */}
                    {step === 1 && (
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <span className="material-icons text-[var(--color-primary)]">medical_services</span>
                                Select Service
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {services.map((service) => (
                                    <button
                                        key={service.id}
                                        onClick={() => { setSelectedService(service.id); setStep(2) }}
                                        className={`text-left p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${selectedService === service.id
                                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                                            : 'border-slate-200 bg-white hover:border-[var(--color-primary)]/50'
                                            }`}
                                    >
                                        <h3 className="font-bold text-slate-900 mb-2">{service.name}</h3>
                                        <p className="text-sm text-slate-500 mb-3">{service.description}</p>
                                        <div className="flex items-center gap-4 text-sm">
                                            <span className="flex items-center gap-1 text-slate-600">
                                                <span className="material-icons text-sm">schedule</span>
                                                {service.duration} min
                                            </span>
                                            <span className="font-bold text-[var(--color-primary)]">${Number(service.price).toFixed(2)}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Choose Doctor */}
                    {step === 2 && (
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <span className="material-icons text-[var(--color-primary)]">person</span>
                                Choose Specialist
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {doctors
                                    .filter(d => !selectedServiceObj?.category || d.specialization === selectedServiceObj.category || d.specialization.includes(selectedServiceObj.category || ''))
                                    .map((doctor) => (
                                        <button
                                            key={doctor.id}
                                            onClick={() => { setSelectedDoctor(doctor.id); setStep(3) }}
                                            className={`text-left p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${selectedDoctor === doctor.id
                                                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                                                : 'border-slate-200 bg-white hover:border-[var(--color-primary)]/50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                                                    <span className="material-icons text-[var(--color-primary)] text-2xl">person</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900">{doctor.name}</h3>
                                                    <p className="text-sm text-slate-500">{doctor.specialization}</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                            </div>
                            <button onClick={() => setStep(1)} className="mt-6 text-[var(--color-primary)] font-medium flex items-center gap-1 hover:underline">
                                <span className="material-icons text-sm">arrow_back</span> Back
                            </button>
                        </div>
                    )}

                    {/* Step 3: Patient Info */}
                    {step === 3 && (
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <span className="material-icons text-[var(--color-primary)]">badge</span>
                                Your Information
                            </h2>
                            <div className="bg-white p-8 rounded-xl border border-slate-200 space-y-5 max-w-lg">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <input
                                        type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input
                                        type="email" value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                    <input
                                        type="tel" value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
                                        placeholder="(555) 000-0000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Notes (optional)</label>
                                    <textarea
                                        value={notes} onChange={(e) => setNotes(e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
                                        placeholder="Any additional information..."
                                        rows={3}
                                    />
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <span className="material-icons text-green-500 text-sm">lock</span>
                                    Your information is encrypted and secure.
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button onClick={() => setStep(2)} className="px-6 py-3 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50">
                                        Back
                                    </button>
                                    <button
                                        onClick={() => setStep(4)}
                                        disabled={!patientName || !patientEmail}
                                        className="px-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Date & Time */}
                    {step === 4 && (
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <span className="material-icons text-[var(--color-primary)]">event</span>
                                Select Date & Time
                            </h2>
                            <div className="grid lg:grid-cols-2 gap-8">
                                <div className="bg-white p-6 rounded-xl border border-slate-200">
                                    <label className="block text-sm font-medium text-slate-700 mb-3">Choose a Date</label>
                                    <input
                                        type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
                                    />
                                    {selectedDate && (
                                        <>
                                            <h4 className="font-semibold text-slate-900 mt-6 mb-3">Available Time Slots</h4>
                                            <div className="grid grid-cols-3 gap-2">
                                                {timeSlots.map((time) => {
                                                    const isTaken = takenSlots.includes(time)
                                                    return (
                                                        <button
                                                            key={time}
                                                            onClick={() => !isTaken && setSelectedTime(time)}
                                                            disabled={isTaken}
                                                            className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${selectedTime === time
                                                                ? 'bg-[var(--color-primary)] text-white'
                                                                : isTaken
                                                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed decoration-slate-400 line-through'
                                                                    : 'bg-slate-50 text-slate-700 hover:bg-[var(--color-primary)]/10'
                                                                }`}
                                                        >
                                                            {time}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Summary */}
                                <div className="bg-white p-6 rounded-xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-4">Booking Summary</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between py-2 border-b border-slate-100">
                                            <span className="text-slate-500">Service</span>
                                            <span className="font-medium text-slate-900">{selectedServiceObj?.name || '-'}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-slate-100">
                                            <span className="text-slate-500">Doctor</span>
                                            <span className="font-medium text-slate-900">{doctors.find(d => d.id === selectedDoctor)?.name || '-'}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-slate-100">
                                            <span className="text-slate-500">Date</span>
                                            <span className="font-medium text-slate-900">{selectedDate || '-'}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-slate-100">
                                            <span className="text-slate-500">Time</span>
                                            <span className="font-medium text-slate-900">{selectedTime || '-'}</span>
                                        </div>
                                        <div className="flex justify-between py-3 text-lg">
                                            <span className="font-semibold text-slate-900">Total Fee</span>
                                            <span className="font-bold text-[var(--color-primary)]">${selectedServiceObj ? Number(selectedServiceObj.price).toFixed(2) : '0.00'}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-3">
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <span className="material-icons text-green-500 text-sm">event_available</span>
                                            Free cancellation up to 24h before your visit.
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <span className="material-icons text-[var(--color-primary)] text-sm">verified</span>
                                            We accept most major insurance plans.
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-6">
                                        <button onClick={() => setStep(3)} className="px-5 py-3 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50">
                                            Back
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={!selectedDate || !selectedTime || submitting}
                                            className="flex-1 py-3 bg-[var(--color-primary)] text-white font-bold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {submitting ? (
                                                <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> Booking...</>
                                            ) : (
                                                <><span className="material-icons text-sm">check_circle</span> Confirm Booking</>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
