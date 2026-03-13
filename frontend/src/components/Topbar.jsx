import { useState } from 'react';
import { Bell, Search, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Topbar = () => {
    const { user } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="h-20 bg-surface/30 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
            <div className="flex items-center md:hidden">
                <button
                    className="text-slate-400 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div className="hidden md:flex flex-1 items-center max-w-md bg-black/20 border border-white/5 rounded-full px-4 py-2 focus-within:border-primary-500/50 transition-colors">
                <Search className="text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search transactions, budgets..."
                    className="bg-transparent border-none outline-none text-sm text-slate-200 ml-3 w-full placeholder-slate-500"
                />
            </div>

            <div className="flex items-center space-x-6 ml-auto">
                <button className="relative text-slate-400 hover:text-primary-400 transition-colors">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-surface"></span>
                </button>

                <div className="flex items-center space-x-3 border-l border-white/10 pl-6 cursor-pointer">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-slate-200">{user?.name || 'User'}</p>
                        <p className="text-xs text-slate-500">Premium Member</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-600 to-emerald-400 flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/20">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
