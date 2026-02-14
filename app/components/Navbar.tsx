'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                        <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center text-[var(--color-primary)]">
                            <span className="material-icons">local_hospital</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900">
                            MediCare<span className="text-[var(--color-primary)]">Plus</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/" className="text-slate-600 hover:text-[var(--color-primary)] font-medium transition-colors">Home</Link>
                        <Link href="/services" className="text-slate-600 hover:text-[var(--color-primary)] font-medium transition-colors">Services</Link>
                        <Link href="/book" className="text-slate-600 hover:text-[var(--color-primary)] font-medium transition-colors">Book Now</Link>
                        <Link href="/dashboard" className="text-slate-600 hover:text-[var(--color-primary)] font-medium transition-colors">Dashboard</Link>
                    </div>

                    {/* Auth + CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <SignedOut>
                            <Link
                                href="/sign-in"
                                className="bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-semibold py-2.5 px-6 rounded-full transition-all duration-300 flex items-center gap-2 group"
                            >
                                <span>Sign In</span>
                                <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </SignedOut>
                        <SignedIn>
                            <Link
                                href="/book"
                                className="bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-semibold py-2.5 px-6 rounded-full transition-all duration-300 flex items-center gap-2 group"
                            >
                                <span>Book Now</span>
                                <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                            <UserButton />
                        </SignedIn>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-3">
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-slate-500 hover:text-[var(--color-primary)] focus:outline-none"
                        >
                            <span className="material-icons text-3xl">{mobileMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-6 space-y-3">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-600 hover:text-[var(--color-primary)] font-medium transition-colors">Home</Link>
                        <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-600 hover:text-[var(--color-primary)] font-medium transition-colors">Services</Link>
                        <Link href="/book" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-600 hover:text-[var(--color-primary)] font-medium transition-colors">Book Now</Link>
                        <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-600 hover:text-[var(--color-primary)] font-medium transition-colors">Dashboard</Link>
                        <SignedOut>
                            <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-[var(--color-primary)] font-semibold">Sign In</Link>
                        </SignedOut>
                    </div>
                )}
            </div>
        </nav>
    )
}
