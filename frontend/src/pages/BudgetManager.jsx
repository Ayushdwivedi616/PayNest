import { useState, useEffect } from 'react';
import { Wallet, Plus, ArrowRight, Settings2 } from 'lucide-react';
import api from '../utils/api';

const BudgetManager = () => {
    const [income, setIncome] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSaveIncome = async () => {
        // API logic will go here
        setLoading(true);
        setTimeout(() => setLoading(false), 500);
    };

    const wallets = [
        { name: 'Rent', allocated: 1500, spent: 1500, color: 'text-purple-400', bg: 'bg-purple-500/20', borderColor: 'border-purple-500/20' },
        { name: 'Food', allocated: 800, spent: 340, color: 'text-orange-400', bg: 'bg-orange-500/20', borderColor: 'border-orange-500/20' },
        { name: 'Travel', allocated: 400, spent: 120, color: 'text-blue-400', bg: 'bg-blue-500/20', borderColor: 'border-blue-500/20' },
        { name: 'Savings', allocated: 1000, spent: 0, color: 'text-emerald-400', bg: 'bg-emerald-500/20', borderColor: 'border-emerald-500/20' },
        { name: 'SIP', allocated: 500, spent: 500, color: 'text-rose-400', bg: 'bg-rose-500/20', borderColor: 'border-rose-500/20' },
        { name: 'Misc', allocated: 300, spent: 50, color: 'text-slate-400', bg: 'bg-slate-500/20', borderColor: 'border-slate-500/20' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100">Budget Manager</h1>
                    <p className="text-slate-400 text-sm">Distribute your income into smart wallets.</p>
                </div>
                <button className="bg-surface hover:bg-surface-hover text-slate-200 border border-white/5 px-4 py-2 rounded-xl text-sm font-medium flex items-center transition-colors">
                    <Settings2 size={16} className="mr-2" /> Adjust Rules
                </button>
            </div>

            <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/2">
                    <h3 className="text-lg font-bold text-slate-100 mb-2">Total Monthly Income</h3>
                    <p className="text-slate-400 text-sm mb-6">Enter your expected income to auto-distribute based on your rules.</p>

                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">$</span>
                            <input
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="0.00"
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-slate-100 font-semibold focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all outline-none"
                            />
                        </div>
                        <button
                            onClick={handleSaveIncome}
                            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-primary-500/20 flex items-center"
                        >
                            Update <ArrowRight size={18} className="ml-2" />
                        </button>
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex items-center justify-center md:border-l border-white/10 md:pl-8">
                    <div className="text-center">
                        <p className="text-sm text-slate-400 mb-1">Total Current Budget</p>
                        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">$4,500</h2>
                        <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
                            100% Allocated
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold text-slate-100 mb-4 mt-8">Your Wallets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wallets.map((wallet, idx) => (
                        <div key={idx} className="glass-card p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-2xl ${wallet.bg} flex items-center justify-center border ${wallet.borderColor}`}>
                                    <Wallet className={wallet.color} size={24} />
                                </div>
                                <div className="text-right">
                                    <p className="text-slate-400 text-sm">Allocated</p>
                                    <p className="text-slate-100 font-bold mt-0.5">${wallet.allocated}</p>
                                </div>
                            </div>

                            <h4 className="text-lg font-bold text-white">{wallet.name}</h4>

                            <div className="mt-6">
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-slate-400">Spent: ${wallet.spent}</span>
                                    <span className="text-slate-400">Left: ${(wallet.allocated - wallet.spent)}</span>
                                </div>
                                <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${wallet.spent >= wallet.allocated ? 'bg-rose-500' : 'bg-primary-500'}`}
                                        style={{ width: `${Math.min((wallet.spent / wallet.allocated) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="p-6 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-center hover:border-slate-500 hover:bg-surface/30 cursor-pointer transition-colors min-h-[220px]">
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4 text-slate-400">
                            <Plus size={24} />
                        </div>
                        <h4 className="text-slate-200 font-medium">Create New Wallet</h4>
                        <p className="text-slate-500 text-sm mt-1">Add custom category</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetManager;
