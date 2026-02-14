'use client'

import React from 'react'

export default function NewsletterSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[var(--color-secondary-bg)] rounded-3xl p-8 md:p-16 relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <span className="text-[var(--color-primary)] font-bold tracking-wide uppercase text-sm mb-2 block">Stay Informed</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Get Health Tips & Updates</h2>
                        <p className="text-slate-600 mb-8 text-lg">Subscribe to our newsletter for the latest health advice, news, and exclusive offers.</p>
                        <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="bg-[var(--color-primary)] text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-[var(--color-primary)]/25"
                            >
                                Subscribe
                            </button>
                        </form>
                        <p className="mt-4 text-sm text-slate-500 flex items-center gap-2">
                            <span className="material-icons text-green-500 text-sm">check_circle</span>
                            No spam, unsubscribe anytime.
                        </p>
                    </div>
                    {/* Decorative Element */}
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[var(--color-primary)]/10 to-transparent hidden md:block"></div>
                    <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-blue-200/50 rounded-full blur-3xl"></div>
                </div>
            </div>
        </section>
    )
}
