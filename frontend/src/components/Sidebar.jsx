import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wallet, CalendarClock, Home, Receipt, PieChart, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();

    const navItems = [
        { path: '/', name: 'Dashboard', icon: LayoutDashboard },
        { path: '/budget', name: 'Budget Manager', icon: Wallet },
        { path: '/sip', name: 'SIP Scheduler', icon: CalendarClock },
        { path: '/rent', name: 'Rent Auto-Pay', icon: Home },
        { path: '/expenses', name: 'Expenses', icon: Receipt },
        { path: '/analytics', name: 'Analytics', icon: PieChart },
    ];

    return (
        <aside className="w-64 bg-surface/40 backdrop-blur-xl border-r border-white/5 flex flex-col hidden md:flex">
            <div className="h-20 flex items-center px-8 border-b border-white/5">
                <h1 className="text-2xl font-bold text-gradient cursor-pointer">PayNest</h1>
            </div>

            <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            }`
                        }
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={logout}
                    className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
