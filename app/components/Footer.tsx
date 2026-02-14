import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[var(--color-primary)] rounded-md flex items-center justify-center text-white">
                                <span className="material-icons text-sm">local_hospital</span>
                            </div>
                            <span className="font-bold text-xl text-slate-900">
                                MediCare<span className="text-[var(--color-primary)]">Plus</span>
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Leading the way in medical excellence. Trusted by thousands of families for compassionate, quality healthcare.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><Link href="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link></li>
                            <li><Link href="/services" className="hover:text-[var(--color-primary)] transition-colors">Services</Link></li>
                            <li><Link href="/book" className="hover:text-[var(--color-primary)] transition-colors">Book Appointment</Link></li>
                            <li><Link href="/dashboard" className="hover:text-[var(--color-primary)] transition-colors">Dashboard</Link></li>
                        </ul>
                    </div>

                    {/* Departments */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Departments</h4>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><span className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">Cardiology</span></li>
                            <li><span className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">Neurology</span></li>
                            <li><span className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">Pediatrics</span></li>
                            <li><span className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">Orthopedics</span></li>
                            <li><span className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">Dental Care</span></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-slate-600">
                            <li className="flex items-start gap-3">
                                <span className="material-icons text-[var(--color-primary)] text-base mt-0.5">location_on</span>
                                <span>123 Medical Center Dr,<br />Healthcare City, HC 90210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-icons text-[var(--color-primary)] text-base">phone</span>
                                <span>(555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-icons text-[var(--color-primary)] text-base">email</span>
                                <span>contact@medicareplus.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-icons text-[var(--color-primary)] text-base">schedule</span>
                                <span>Mon - Sat: 8:00 AM - 9:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© 2024 MediCarePlus Clinic. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <span className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
