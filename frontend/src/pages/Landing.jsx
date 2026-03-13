import { Link } from 'react-router-dom';
import { ArrowRight, Wallet, PieChart, ShieldCheck } from 'lucide-react';

const Landing = () => {
    return (
        <div className="min-h-screen bg-background overflow-hidden selection:bg-primary-500/30">
            {/* Navigation */}
            <nav className="container mx-auto px-6 py-6 flex items-center justify-between relative z-10">
                <div className="text-2xl font-bold text-gradient">PayNest</div>
                <div className="space-x-4">
                    <Link to="/login" className="text-slate-300 hover:text-white font-medium transition-colors">Log In</Link>
                    <Link to="/register" className="bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 px-5 py-2.5 rounded-full font-medium transition-colors border border-primary-500/20">
                        Get Started
                    </Link>
                </div>
            </nav>

            <main className="container mx-auto px-6 pt-20 pb-32 text-center relative z-10">
                {/* Decorative Blur */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-500/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none"></div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 max-w-4xl mx-auto leading-tight">
                    Smart Financial Management, <span className="text-gradient">Automated.</span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12">
                    PayNest helps you organize your money, schedule payments, and manage budgets automatically without the stress.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <Link to="/register" className="bg-gradient-to-r from-primary-600 to-emerald-500 hover:from-primary-500 hover:to-emerald-400 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center shadow-lg shadow-primary-500/25 transition-all w-full sm:w-auto justify-center group">
                        Start Your Journey <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Feature Highlights */}
                <div className="mt-32 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
                    <div className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-12 h-12 bg-primary-500/20 rounded-2xl flex items-center justify-center mb-6 border border-primary-500/20">
                            <Wallet className="text-primary-400" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Smart Budgeting</h3>
                        <p className="text-slate-400">Automatically split your income into wallets like Rent, Savings, and SIPs instantly.</p>
                    </div>

                    <div className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
                            <PieChart className="text-emerald-400" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Deep Analytics</h3>
                        <p className="text-slate-400">Visualize your financial health with interactive charts and spending insights.</p>
                    </div>

                    <div className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                            <ShieldCheck className="text-blue-400" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Automated Payments</h3>
                        <p className="text-slate-400">Never miss a due date. Schedule rent and SIPs directly from your wallets with ease.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Landing;
