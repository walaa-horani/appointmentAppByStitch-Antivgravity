'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

interface Appointment {
    id: string
    date: string
    time: string
    status: string
    patientName: string
    patientEmail: string
    service?: { name: string }
    doctor?: { name: string; specialization: string }
}

export default function DashboardPage() {
    const { isSignedIn } = useUser() // useUser hook handles auth check, layout handles redirect
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [loading, setLoading] = useState(true)

    // Fetch appointments
    useEffect(() => {
        async function fetchAppointments() {
            try {
                const res = await fetch('/api/appointments')
                if (res.ok) {
                    const data = await res.json()
                    setAppointments(data)
                }
            } catch (error) {
                console.error('Error fetching appointments:', error)
            } finally {
                setLoading(false)
            }
        }
        if (isSignedIn) {
            fetchAppointments()
        }
    }, [isSignedIn])

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/appointments/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            })
            if (res.ok) {
                // Refresh
                const aptRes = await fetch('/api/appointments')
                if (aptRes.ok) setAppointments(await aptRes.json())
            } else {
                alert('Failed to update status')
            }
        } catch (error) {
            console.error('Error updating status:', error)
        }
    }

    const stats = [
        { label: 'Total Appointments', value: appointments.length.toString(), icon: 'event_note', color: 'bg-blue-50 text-[var(--color-primary)]' },
        { label: "Today's Patients", value: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length.toString(), icon: 'person', color: 'bg-green-50 text-green-600' },
        { label: 'Pending', value: appointments.filter(a => a.status === 'PENDING' || a.status === 'pending').length.toString(), icon: 'pending', color: 'bg-amber-50 text-amber-600' },
    ]

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500 text-sm mt-1">Welcome back! Here&apos;s your clinic summary.</p>
                </div>
                <Link
                    href="/book"
                    className="hidden sm:flex bg-[var(--color-primary)] text-white font-semibold py-2.5 px-6 rounded-xl hover:bg-blue-600 transition-colors items-center gap-2"
                >
                    <span className="material-icons text-sm">add</span>
                    New Appointment
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                                <span className="material-icons text-2xl">{stat.icon}</span>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-slate-900">{loading ? '...' : stat.value}</p>
                        <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Appointments List */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-900">Upcoming Appointments</h2>
                    <Link href="/book" className="text-sm text-[var(--color-primary)] font-medium cursor-pointer hover:underline">View All</Link>
                </div>

                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
                        <p className="text-slate-500">Loading appointments...</p>
                    </div>
                ) : appointments.length === 0 ? (
                    <div className="p-12 text-center">
                        <span className="material-icons text-5xl text-slate-300 mb-4 block">event_busy</span>
                        <p className="text-slate-500 mb-4">No appointments yet.</p>
                        <Link href="/book" className="text-[var(--color-primary)] font-semibold hover:underline">
                            Book your first appointment →
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {appointments.map((apt) => (
                            <div key={apt.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                                        <span className="material-icons text-[var(--color-primary)] text-xl">person</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">{apt.patientName}</p>
                                        <p className="text-sm text-slate-500">
                                            {apt.service?.name || 'Consultation'} • {apt.doctor?.name || 'Doctor'}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-slate-900">{new Date(apt.date).toLocaleDateString()}</p>
                                    <p className="text-xs text-slate-500">{apt.time}</p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${(apt.status || 'pending').toLowerCase() === 'confirmed' ? 'bg-green-100 text-green-700' :
                                        (apt.status || 'pending').toLowerCase() === 'pending' ? 'bg-amber-100 text-amber-700' :
                                            'bg-slate-100 text-slate-600'
                                        }`}>
                                        {(apt.status || 'PENDING').toUpperCase()}
                                    </span>
                                    {(apt.status || 'pending').toLowerCase() === 'pending' && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleUpdateStatus(apt.id, 'confirmed')}
                                                className="text-green-600 hover:text-green-800 text-xs font-medium bg-green-50 px-2 py-1 rounded border border-green-100 transition-colors"
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(apt.id, 'cancelled')}
                                                className="text-red-600 hover:text-red-800 text-xs font-medium bg-red-50 px-2 py-1 rounded border border-red-100 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
