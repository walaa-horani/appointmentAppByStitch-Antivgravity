'use client'

import { useState, useEffect } from 'react'

interface User {
    id: string
    name: string
    email: string
    role: string
    createdAt: string
}

export default function PatientsPage() {
    const [patients, setPatients] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchPatients() {
            try {
                const res = await fetch('/api/users?role=patient') // Assuming API supports filtering or returns all
                if (res.ok) {
                    const data = await res.json()
                    // Filter client-side if API doesn't filter
                    const patientList = data.filter((u: User) => u.role === 'patient')
                    setPatients(patientList)
                }
            } catch (error) {
                console.error('Error fetching patients:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchPatients()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center p-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--color-primary)]"></div>
            </div>
        )
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Patients</h1>
                <p className="text-slate-500 text-sm mt-1">View and manage registered patients.</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700">Name</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Email</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Joined</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Role</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {patients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{patient.name || 'N/A'}</td>
                                    <td className="px-6 py-4 text-slate-600">{patient.email}</td>
                                    <td className="px-6 py-4 text-slate-500">{new Date(patient.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {patient.role}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {patients.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                        No patients found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
