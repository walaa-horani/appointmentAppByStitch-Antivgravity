'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { resizeImage } from '@/app/lib/imageUtils'

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
    const { isSignedIn, isLoaded } = useUser()
    const router = useRouter()
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('dashboard')
    const [userRole, setUserRole] = useState<string | null>(null)
    const [roleLoading, setRoleLoading] = useState(true)

    // Doctor management state
    const [doctors, setDoctors] = useState<any[]>([])
    const [users, setUsers] = useState<any[]>([])
    const [showAddDoctorModal, setShowAddDoctorModal] = useState(false)
    const [newDoctor, setNewDoctor] = useState<{ userId: string, specialization: string, imageFile: File | null, name: string }>({ userId: '', specialization: '', imageFile: null, name: '' })
    const [submitting, setSubmitting] = useState(false)

    // Check auth and role
    useEffect(() => {
        if (!isLoaded) return

        if (!isSignedIn) {
            router.push('/sign-in')
            return
        }

        async function checkRole() {
            try {
                const res = await fetch('/api/user')
                if (res.ok) {
                    const data = await res.json()
                    setUserRole(data.role)
                } else {
                    setUserRole('patient') // Default if not found
                }
            } catch {
                setUserRole('patient')
            } finally {
                setRoleLoading(false)
            }
        }
        checkRole()
    }, [isLoaded, isSignedIn, router])

    // Fetch appointments only if authorized
    useEffect(() => {
        if (userRole !== 'admin' && userRole !== 'doctor') return

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
        fetchAppointments()
    }, [userRole])

    // Fetch doctors and users
    useEffect(() => {
        if ((userRole !== 'admin' && userRole !== 'doctor') || activeTab !== 'staff') return

        async function fetchData() {
            setLoading(true)
            try {
                const [doctorsRes, usersRes] = await Promise.all([
                    fetch('/api/doctors'),
                    fetch('/api/users')
                ])
                if (doctorsRes.ok) setDoctors(await doctorsRes.json())
                if (usersRes.ok) setUsers(await usersRes.json())
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [userRole, activeTab])

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

    const handleDeleteDoctor = async (id: string) => {
        if (!confirm('Are you sure you want to delete this doctor?')) return

        try {
            const res = await fetch(`/api/doctors/${id}`, {
                method: 'DELETE',
            })
            if (res.ok) {
                // Refresh list
                const doctorsRes = await fetch('/api/doctors')
                if (doctorsRes.ok) setDoctors(await doctorsRes.json())
                alert('Doctor deleted successfully')
            } else {
                const err = await res.json()
                alert(`Failed to delete doctor: ${err.error || 'Unknown error'}`)
            }
        } catch (error) {
            console.error('Error deleting doctor:', error)
            alert('Error deleting doctor')
        }
    }

    const handleCreateDoctor = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const formData = new FormData()

            // If user selected, use their name (unless overridden? User said they want to write name)
            // The user said: "i want to write his name and all his info by using inputs"
            // So we prioritize usage of the name input.
            const selectedUser = users.find(u => u.id === newDoctor.userId)
            const nameToUse = newDoctor.name || selectedUser?.name || ''

            formData.append('name', nameToUse)
            formData.append('specialization', newDoctor.specialization)
            if (newDoctor.userId) {
                formData.append('userId', newDoctor.userId)
            }

            if (newDoctor.imageFile) {
                try {
                    const resizedParams = await resizeImage(newDoctor.imageFile, 800, 0.8)
                    formData.append('image', resizedParams)
                } catch (resizeError) {
                    console.error('Image resize failed, sending original', resizeError)
                    formData.append('image', newDoctor.imageFile)
                }
            }

            const res = await fetch('/api/doctors', {
                method: 'POST',
                body: formData,
            })

            if (res.ok) {
                setShowAddDoctorModal(false)
                setNewDoctor({ userId: '', specialization: '', imageFile: null, name: '' })
                // Refresh data
                const doctorsRes = await fetch('/api/doctors')
                if (doctorsRes.ok) setDoctors(await doctorsRes.json())
                alert('Doctor added successfully!')
            } else {
                const err = await res.json()
                alert(`Failed to add doctor: ${err.error || 'Unknown error'}`)
            }
        } catch (error) {
            console.error('Error creating doctor:', error)
            alert('Error creating doctor')
        } finally {
            setSubmitting(false)
        }
    }

    // Loading state
    if (!isLoaded || roleLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
            </div>
        )
    }

    // Access denied for patients
    if (userRole !== 'admin' && userRole !== 'doctor') {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-icons text-red-500 text-4xl">lock</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-3">Access Restricted</h1>
                    <p className="text-slate-600 mb-6">
                        This dashboard is only accessible to administrators and doctors. If you believe this is an error, please contact support.
                    </p>
                    <Link href="/" className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-600 transition-colors">
                        <span className="material-icons text-sm">home</span>
                        Back to Home
                    </Link>
                </div>
            </div>
        )
    }



    const sidebarItems = [
        { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
        { id: 'patients', icon: 'people', label: 'Patients' },
        { id: 'staff', icon: 'medical_services', label: 'Staff' },
        { id: 'schedule', icon: 'calendar_month', label: 'Schedule' },
        { id: 'settings', icon: 'settings', label: 'Settings' },
    ]

    const stats = [
        { label: 'Total Appointments', value: appointments.length.toString(), icon: 'event_note', color: 'bg-blue-50 text-[var(--color-primary)]' },
        { label: "Today's Patients", value: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length.toString(), icon: 'person', color: 'bg-green-50 text-green-600' },
        { label: 'Pending', value: appointments.filter(a => a.status === 'PENDING' || a.status === 'pending').length.toString(), icon: 'pending', color: 'bg-amber-50 text-amber-600' },
    ]

    return (

        <div className="flex min-h-[calc(100vh-5rem)]">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col">
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                            <span className="material-icons text-[var(--color-primary)]">admin_panel_settings</span>
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-sm">Admin Portal</p>
                            <p className="text-xs text-slate-500">Manage appointments</p>
                        </div>
                    </div>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === item.id
                                ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                                : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <span className="material-icons text-xl">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-slate-50 p-6 lg:p-8 overflow-y-auto relative">
                {/* Mobile Tab Bar */}
                <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-2">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeTab === item.id
                                ? 'bg-[var(--color-primary)] text-white'
                                : 'bg-white text-slate-600 border border-slate-200'
                                }`}
                        >
                            <span className="material-icons text-sm">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Dashboard View */}
                {activeTab === 'dashboard' && (
                    <>
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
                                <span className="text-sm text-[var(--color-primary)] font-medium cursor-pointer hover:underline">View All</span>
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
                                                <p className="text-sm font-medium text-slate-900">{apt.date}</p>
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
                                                {(apt.status || 'pending').toLowerCase() === 'confirmed' && (
                                                    <button
                                                        onClick={() => handleUpdateStatus(apt.id, 'cancelled')}
                                                        className="text-red-600 hover:text-red-800 text-xs font-medium bg-red-50 px-2 py-1 rounded border border-red-100 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Staff View */}
                {activeTab === 'staff' && (
                    <>
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Staff Management</h1>
                                <p className="text-slate-500 text-sm mt-1">Manage doctors and medical staff.</p>
                            </div>
                            <button
                                onClick={() => setShowAddDoctorModal(true)}
                                className="bg-[var(--color-primary)] text-white font-semibold py-2.5 px-6 rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/30"
                            >
                                <span className="material-icons text-sm">add</span>
                                Add Doctor
                            </button>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {doctors.map((doc) => (
                                    <div key={doc.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex items-center gap-4 mb-4">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={doc.image || 'https://via.placeholder.com/150'} alt={doc.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-100" />
                                            <div>
                                                <h3 className="font-bold text-slate-900">{doc.name}</h3>
                                                <p className="text-sm text-[var(--color-primary)] font-medium">{doc.specialization}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-sm">
                                            <span className="text-slate-500">ID: ...{doc.id.slice(-6)}</span>
                                            <button
                                                onClick={() => handleDeleteDoctor(doc.id)}
                                                className="text-slate-400 hover:text-red-500 transition-colors"
                                                title="Delete Doctor"
                                            >
                                                <span className="material-icons">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {doctors.length === 0 && (
                                    <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
                                        <span className="material-icons text-4xl text-slate-300 mb-2">medical_services</span>
                                        <p className="text-slate-500">No doctors found. Add one to get started.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}

                {/* Add Doctor Modal */}
                {showAddDoctorModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-slate-900">Add New Doctor</h3>
                                <button onClick={() => setShowAddDoctorModal(false)} className="text-slate-400 hover:text-slate-600">
                                    <span className="material-icons">close</span>
                                </button>
                            </div>
                            <form onSubmit={handleCreateDoctor} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Doctor Name *</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Dr. Sarah Smith"
                                        value={newDoctor.name}
                                        onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Link to User Account (Optional)</label>
                                    <select
                                        value={newDoctor.userId}
                                        onChange={(e) => setNewDoctor({ ...newDoctor, userId: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                                    >
                                        <option value="">-- No User Account --</option>
                                        {users.filter(u => u.role !== 'doctor').map(u => (
                                            <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                                        ))}
                                    </select>
                                    <p className="text-xs text-slate-500 mt-1">If linked, the user will be promoted to Doctor role.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Specialization *</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Cardiologist"
                                        value={newDoctor.specialization}
                                        onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Profile Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setNewDoctor({ ...newDoctor, imageFile: e.target.files[0] })
                                            }
                                        }}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                                    />
                                    <p className="text-xs text-slate-500 mt-1">Image will be resized automatically.</p>
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddDoctorModal(false)}
                                        className="flex-1 py-2.5 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex-1 py-2.5 bg-[var(--color-primary)] text-white font-bold rounded-lg hover:bg-blue-600 disabled:opacity-50"
                                    >
                                        {submitting ? 'Creating...' : 'Create Doctor'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </main>
        </div>
    )
}
