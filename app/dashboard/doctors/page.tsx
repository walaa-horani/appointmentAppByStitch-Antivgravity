'use client'

import { useState, useEffect } from 'react'
import { resizeImage } from '@/app/lib/imageUtils'

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState<any[]>([])
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showAddDoctorModal, setShowAddDoctorModal] = useState(false)
    const [newDoctor, setNewDoctor] = useState<{ userId: string, specialization: string, imageFile: File | null, name: string }>({ userId: '', specialization: '', imageFile: null, name: '' })
    const [submitting, setSubmitting] = useState(false)

    // Fetch doctors and users
    useEffect(() => {
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
    }, [])

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

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Doctors</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage medical staff.</p>
                </div>
                <button
                    onClick={() => setShowAddDoctorModal(true)}
                    className="bg-[var(--color-primary)] text-white font-semibold py-2.5 px-6 rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/30"
                >
                    <span className="material-icons text-sm">add</span>
                    Add Doctor
                </button>
            </div>

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
                            {/* <span className="text-slate-500">ID: ...{doc.id.slice(-6)}</span> */}
                            <span className="text-slate-500"></span>
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
            </div>

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
        </div>
    )
}
