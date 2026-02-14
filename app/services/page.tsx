import Link from 'next/link'

const departments = [
    { icon: 'medical_services', title: 'General Medicine', desc: 'Comprehensive primary care for adults, focusing on disease prevention, diagnosis, and treatment of common ailments.', bgColor: 'bg-blue-50', iconColor: 'text-[var(--color-primary)]', hoverBg: 'group-hover:bg-[var(--color-primary)]' },
    { icon: 'favorite', title: 'Cardiology', desc: 'Advanced heart care including diagnostics, treatment of heart diseases, and preventive cardiology programs.', bgColor: 'bg-red-50', iconColor: 'text-red-500', hoverBg: 'group-hover:bg-red-500' },
    { icon: 'child_care', title: 'Pediatrics', desc: 'Compassionate healthcare for infants, children, and adolescents, ensuring their healthy growth and development.', bgColor: 'bg-yellow-50', iconColor: 'text-yellow-600', hoverBg: 'group-hover:bg-yellow-500' },
    { icon: 'psychology', title: 'Neurology', desc: 'Expert diagnosis and treatment for disorders of the nervous system, including the brain, spinal cord, and nerves.', bgColor: 'bg-purple-50', iconColor: 'text-purple-600', hoverBg: 'group-hover:bg-purple-500' },
    { icon: 'accessibility_new', title: 'Orthopedics', desc: 'Treatment for musculoskeletal issues, sports injuries, joint replacements, and spine conditions.', bgColor: 'bg-indigo-50', iconColor: 'text-indigo-600', hoverBg: 'group-hover:bg-indigo-500' },
    { icon: 'clean_hands', title: 'Dental Care', desc: 'Complete oral health services ranging from routine cleanings to cosmetic dentistry and oral surgery.', bgColor: 'bg-cyan-50', iconColor: 'text-cyan-600', hoverBg: 'group-hover:bg-cyan-500' },
    { icon: 'visibility', title: 'Ophthalmology', desc: 'Comprehensive eye care services, including vision tests, cataract surgery, and treatment of eye diseases.', bgColor: 'bg-green-50', iconColor: 'text-green-600', hoverBg: 'group-hover:bg-green-500' },
    { icon: 'face', title: 'Dermatology', desc: 'Specialized care for skin, hair, and nail conditions, offering both medical and cosmetic treatments.', bgColor: 'bg-rose-50', iconColor: 'text-rose-500', hoverBg: 'group-hover:bg-rose-500' },
]

export default function ServicesPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative bg-white py-16 sm:py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[var(--color-primary)]/20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-blue-400/20 blur-3xl"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-semibold mb-6">World-Class Healthcare</span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                        Comprehensive Care <br className="hidden sm:block" /> for You and Your Family
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
                        From routine check-ups to specialized treatments, our expert team is dedicated to providing personalized medical care with compassion and excellence.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 sm:py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">Our Departments</h2>
                            <p className="mt-2 text-slate-600">Browse our specialized medical services designed for your well-being.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {departments.map((dept) => (
                            <div key={dept.title} className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
                                <div className={`w-14 h-14 rounded-lg ${dept.bgColor} flex items-center justify-center mb-6 ${dept.hoverBg} transition-colors duration-300`}>
                                    <span className={`material-icons ${dept.iconColor} text-3xl group-hover:text-white transition-colors duration-300`}>{dept.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{dept.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6">{dept.desc}</p>
                                <Link href="/book" className="inline-flex items-center text-[var(--color-primary)] font-semibold text-sm hover:underline">
                                    Book Now <span className="material-icons text-sm ml-1">arrow_forward</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lab Feature Section */}
            <section className="py-16 bg-white border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div className="mb-10 lg:mb-0 relative">
                            <div className="absolute inset-0 bg-[var(--color-primary)]/20 rounded-2xl transform rotate-3 scale-95 opacity-50"></div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt="Modern medical laboratory"
                                className="relative rounded-2xl shadow-xl w-full h-auto object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACQM6TmNuMAdUg2fr-OOy7FRy-UXmIeZBv96mrOLg-hhE0vkaeS68hNT2Ifh57YfiyHeUici9sGlBkCIDQI6T6zqWmamQJXvu3FAFcUIXc0jbh-Qn1ZAbLIwsT2Bz2OhIvg7UVZ2LQBectGXBmy6iCrNQtNxxIlTQvX2JFh6dCzfbSqJQn4eCFEoD6lLiUcIIeFT4m1NozqQMctGg6HC8sIVITpzI4XpC1H-33fqPEoBmhgkqM7s94zRgxBZzkJL2OO8q72D5afy_P"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Advanced Diagnostic Laboratory</h2>
                            <p className="text-lg text-slate-600 mb-6">
                                Our state-of-the-art laboratory ensures quick and accurate results for all your diagnostic needs. We utilize the latest technology to support our doctors in making precise diagnoses.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {['Same-day results for routine blood work', 'Advanced imaging technology (MRI, CT, X-Ray)', 'Integrated digital health records'].map((item) => (
                                    <li key={item} className="flex items-start">
                                        <span className="material-icons text-[var(--color-primary)] mr-3 mt-0.5">check_circle</span>
                                        <span className="text-slate-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/book" className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors inline-block">
                                Book a Diagnostic Test
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="relative bg-[var(--color-primary)] overflow-hidden">
                <div className="absolute inset-0">
                    <svg className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 w-96 h-96 text-blue-400 opacity-20" fill="currentColor" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50"></circle>
                    </svg>
                    <svg className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-96 h-96 text-blue-600 opacity-20" fill="currentColor" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="50"></circle>
                    </svg>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Not sure which specialist you need?</h2>
                    <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                        Schedule a consultation with our General Medicine department. Our doctors will assess your health and guide you to the right specialist if needed.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/book" className="px-8 py-3.5 bg-white text-[var(--color-primary)] font-bold rounded-full shadow-lg hover:bg-slate-50 transition-all transform hover:-translate-y-0.5">
                            Book General Consultation
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
