export default function SettingsPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500 text-sm mt-1">Manage system configurations.</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 max-w-2xl">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="material-icons text-[var(--color-primary)]">tune</span>
                    General Settings
                </h2>

                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                        <div>
                            <p className="font-medium text-slate-900">Email Notifications</p>
                            <p className="text-xs text-slate-500">Receive emails for new appointments.</p>
                        </div>
                        <div className="w-11 h-6 bg-[var(--color-primary)] rounded-full relative cursor-pointer">
                            <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                        <div>
                            <p className="font-medium text-slate-900">Maintenance Mode</p>
                            <p className="text-xs text-slate-500">Disable bookings temporarily.</p>
                        </div>
                        <div className="w-11 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                            <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button disabled className="bg-slate-100 text-slate-400 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
