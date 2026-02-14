'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardSidebar() {
    const pathname = usePathname()

    const sidebarItems = [
        { href: '/dashboard', icon: 'dashboard', label: 'Dashboard', exact: true },
        { href: '/dashboard/patients', icon: 'people', label: 'Patients' },
        { href: '/dashboard/doctors', icon: 'medical_services', label: 'Doctors' }, // Renamed from Staff
        { href: '/dashboard/settings', icon: 'settings', label: 'Settings' },
    ]

    const isActive = (item: any) => {
        if (item.exact) return pathname === item.href
        return pathname.startsWith(item.href)
    }

    return (
        <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col fixed h-full">
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
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {sidebarItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive(item)
                            ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                            : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <span className="material-icons text-xl">{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}
