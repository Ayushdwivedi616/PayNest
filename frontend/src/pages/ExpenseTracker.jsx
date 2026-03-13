import { useState } from 'react';
import { Receipt, Search, Filter, Plus, Calendar, Coffee, ShoppingBag, Car, Wallet } from 'lucide-react';

const icons = {
    Food: Coffee,
    Retail: ShoppingBag,
    Travel: Car,
    General: Wallet,
};

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([
        { id: 1, title: 'Starbucks Coffee', category: 'Food', amount: 5.40, date: '2026-10-09', time: '09:41 AM' },
        { id: 2, title: 'Uber Ride', category: 'Travel', amount: 18.20, date: '2026-10-08', time: '08:30 PM' },
        { id: 3, title: 'Amazon AWS', category: 'General', amount: 12.00, date: '2026-10-08', time: '02:15 PM' },
        { id: 4, title: 'Whole Foods Market', category: 'Food', amount: 145.80, date: '2026-10-07', time: '06:10 PM' },
    ]);

    return (
        <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100">Expense Tracker</h1>
                    <p className="text-slate-400 text-sm">Monitor where your money goes.</p>
                </div>
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center transition-colors shadow-lg shadow-primary-500/20">
                    <Plus size={16} className="mr-2" /> Record Expense
                </button>
            </div>

            <div className="flex-1 glass-card flex flex-col overflow-hidden">
                <div className="p-4 md:p-6 border-b border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-center shrink-0">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search expenses..."
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:border-primary-500/50 outline-none"
                        />
                    </div>
                    <button className="bg-surface hover:bg-surface-hover text-slate-300 px-4 py-2 flex items-center rounded-xl text-sm border border-white/5 transition-colors w-full sm:w-auto justify-center">
                        <Filter size={16} className="mr-2" /> Filter
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="space-y-6">
                        {/* Hardcoded grouping by date for demonstration */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-500 mb-4 sticky top-0 bg-surface/90 backdrop-blur-md py-2 z-10">Today, Oct 9</h3>
                            <div className="space-y-3">
                                {expenses.filter(e => e.date === '2026-10-09').map(expense => {
                                    const Icon = icons[expense.category] || Receipt;
                                    return (
                                        <div key={expense.id} className="p-4 rounded-xl bg-black/20 hover:bg-white/5 border border-white/5 transition-colors flex items-center justify-between group cursor-pointer">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-primary-500/20 group-hover:text-primary-400 transition-colors">
                                                    <Icon size={18} />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-slate-200">{expense.title}</h4>
                                                    <p className="text-xs text-slate-500 mt-0.5">{expense.category} • {expense.time}</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-white">-${expense.amount.toFixed(2)}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-slate-500 mb-4 sticky top-0 bg-surface/90 backdrop-blur-md py-2 z-10">Yesterday, Oct 8</h3>
                            <div className="space-y-3">
                                {expenses.filter(e => e.date === '2026-10-08').map(expense => {
                                    const Icon = icons[expense.category] || Receipt;
                                    return (
                                        <div key={expense.id} className="p-4 rounded-xl bg-black/20 hover:bg-white/5 border border-white/5 transition-colors flex items-center justify-between group cursor-pointer">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-primary-500/20 group-hover:text-primary-400 transition-colors">
                                                    <Icon size={18} />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-slate-200">{expense.title}</h4>
                                                    <p className="text-xs text-slate-500 mt-0.5">{expense.category} • {expense.time}</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-white">-${expense.amount.toFixed(2)}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-slate-500 mb-4 sticky top-0 bg-surface/90 backdrop-blur-md py-2 z-10">Oct 7</h3>
                            <div className="space-y-3">
                                {expenses.filter(e => e.date === '2026-10-07').map(expense => {
                                    const Icon = icons[expense.category] || Receipt;
                                    return (
                                        <div key={expense.id} className="p-4 rounded-xl bg-black/20 hover:bg-white/5 border border-white/5 transition-colors flex items-center justify-between group cursor-pointer">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-primary-500/20 group-hover:text-primary-400 transition-colors">
                                                    <Icon size={18} />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-slate-200">{expense.title}</h4>
                                                    <p className="text-xs text-slate-500 mt-0.5">{expense.category} • {expense.time}</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-white">-${expense.amount.toFixed(2)}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseTracker;
