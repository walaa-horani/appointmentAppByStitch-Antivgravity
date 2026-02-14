'use client'

import DashboardSidebar from '@/app/components/DashboardSidebar'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isSignedIn, isLoaded } = useUser()
    const router = useRouter()
    const [userRole, setUserRole] = useState<string | null>(null)
    const [roleLoading, setRoleLoading] = useState(true)

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
                    setUserRole('patient')
                }
            } catch {
                setUserRole('patient')
            } finally {
                setRoleLoading(false)
            }
        }
        checkRole()
    }, [isLoaded, isSignedIn, router])

    if (!isLoaded || roleLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
            </div>
        )
    }

    if (userRole !== 'admin' && userRole !== 'doctor') {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-icons text-red-500 text-4xl">lock</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-3">Access Restricted</h1>
                    <p className="text-slate-600 mb-6">
                        This dashboard is only accessible to administrators and doctors.
                    </p>
                    <Link href="/" className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-600 transition-colors">
                        <span className="material-icons text-sm">home</span>
                        Back to Home
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-[calc(100vh-5rem)] bg-slate-50">
            <DashboardSidebar />
            <main className="flex-1 lg:ml-64 p-6 lg:p-8">
                {children}
            </main>
        </div>
    )
}
