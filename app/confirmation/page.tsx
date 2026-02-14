'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ConfirmationContent() {
    const searchParams = useSearchParams()
    const appointmentId = searchParams.get('id')

    return (
        <section className="py-16 sm:py-24 bg-slate-50 min-h-[70vh]">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Success Icon */}
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <span className="material-icons text-green-600 text-4xl">check_circle</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Appointment Confirmed!</h1>
                <p className="text-slate-600 text-lg mb-10">
                    Thank you for booking with us. A confirmation email has been sent to your email address.
                </p>

                {/* Appointment Details Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-left mb-8">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <span className="material-icons text-[var(--color-primary)]">event_note</span>
                        Appointment Details
                    </h2>

                    {appointmentId && (
                        <div className="flex justify-between items-center py-3 border-b border-slate-100">
                            <span className="text-sm text-slate-500">Booking ID</span>
                            <span className="text-sm font-mono font-medium text-slate-900">#{appointmentId.slice(0, 8)}</span>
                        </div>
                    )}

                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-sm text-slate-500">Status</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                            Confirmed
                        </span>
                    </div>

                    <div className="py-4 border-b border-slate-100">
                        <div className="flex items-start gap-2 text-sm text-slate-500 mb-1">
                            <span className="material-icons text-sm mt-0.5">location_on</span>
                            Location
                        </div>
                        <p className="text-sm font-medium text-slate-900">MediCare Central Clinic</p>
                        <p className="text-sm text-slate-500">123 Health Valley Blvd, Suite 400</p>
                    </div>

                    <div className="pt-4 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span className="material-icons text-green-500 text-sm">event_available</span>
                            You can reschedule or cancel up to 24 hours before.
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span className="material-icons text-[var(--color-primary)] text-sm">verified</span>
                            Insurance verification will be done at check-in.
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/dashboard"
                        className="bg-[var(--color-primary)] text-white font-semibold py-3 px-8 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-[var(--color-primary)]/30 flex items-center justify-center gap-2"
                    >
                        <span className="material-icons text-sm">dashboard</span>
                        View Dashboard
                    </Link>
                    <Link
                        href="/"
                        className="bg-white border border-slate-200 text-slate-700 font-semibold py-3 px-8 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <span className="material-icons text-sm">home</span>
                        Back to Home
                    </Link>
                </div>

                {/* Help Links */}
                <div className="mt-10 flex justify-center gap-6 text-sm text-slate-500">
                    <span className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">Help Center</span>
                    <span className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">Cancellation Policy</span>
                </div>
            </div>
        </section>
    )
}

export default function ConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
            </div>
        }>
            <ConfirmationContent />
        </Suspense>
    )
}
