import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Wallet, Calendar, Plus } from 'lucide-react';

const mockData = [
    { name: 'Mon', balance: 4000 },
    { name: 'Tue', balance: 3000 },
    { name: 'Wed', balance: 2000 },
    { name: 'Thu', balance: 2780 },
    { name: 'Fri', balance: 1890 },
    { name: 'Sat', balance: 2390 },
    { name: 'Sun', balance: 3490 },
];

const Dashboard = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100">Dashboard Snapshot</h1>
                    <p className="text-slate-400 text-sm">Welcome back, here's your financial overview.</p>
                </div>
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center transition-colors shadow-lg shadow-primary-500/20">
                    <Plus size={16} className="mr-2" /> Quick Add Expense
                </button>
            </div>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm text-slate-400 font-medium">Total Balance</p>
                            <h3 className="text-3xl font-bold text-white mt-1">$12,450.00</h3>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center border border-primary-500/20">
                            <Wallet className="text-primary-400" size={20} />
                        </div>
                    </div>
                    <div className="flex items-center text-sm">
                        <span className="text-emerald-400 flex items-center font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            <ArrowUpRight size={16} className="mr-1" /> +2.5%
                        </span>
                        <span className="text-slate-500 ml-2">from last month</span>
                    </div>
                </div>

                <div className="glass-card p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm text-slate-400 font-medium">Monthly Income</p>
                            <h3 className="text-3xl font-bold text-white mt-1">$6,200.00</h3>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20">
                            <ArrowDownRight className="text-emerald-400" size={20} />
                        </div>
                    </div>
                    <div className="flex items-center text-sm">
                        <span className="text-slate-400">Regular Salary</span>
                    </div>
                </div>

                <div className="glass-card p-6 border-rose-500/10 hover:border-rose-500/20 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm text-slate-400 font-medium">Monthly Spending</p>
                            <h3 className="text-3xl font-bold text-white mt-1">$3,840.00</h3>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/20">
                            <ArrowUpRight className="text-rose-400" size={20} />
                        </div>
                    </div>
                    <div className="flex items-center text-sm">
                        <span className="text-rose-400 flex items-center font-medium bg-rose-500/10 px-2 py-0.5 rounded-full">
                            <ArrowUpRight size={16} className="mr-1" /> +12%
                        </span>
                        <span className="text-slate-500 ml-2">from last month</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="glass-card p-6 lg:col-span-2">
                    <h3 className="text-lg font-bold text-slate-100 mb-6">Cash Flow</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockData}>
                                <defs>
                                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2dd4bf" opacity={0.1} vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '0.75rem' }}
                                    itemStyle={{ color: '#2dd4bf' }}
                                />
                                <Area type="monotone" dataKey="balance" stroke="#14b8a6" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Upcoming Payments */}
                <div className="glass-card p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-100">Upcoming Payments</h3>
                        <button className="text-sm text-primary-400 hover:text-primary-300">View All</button>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-surface/50 border border-white/5 hover:bg-surface transition-colors flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-slate-200 text-sm">Apartment Rent</h4>
                                    <p className="text-xs text-slate-500 mt-0.5">Due in 3 days (12th Oct)</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-white text-sm">$1,200.00</p>
                                <p className="text-[10px] text-primary-400 font-medium bg-primary-500/10 inline-block px-1.5 py-0.5 rounded mt-1">Auto-Pay On</p>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-surface/50 border border-white/5 hover:bg-surface transition-colors flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <h4 className="font-medium text-slate-200 text-sm">Mutual Fund SIP</h4>
                                    <p className="text-xs text-slate-500 mt-0.5">Due in 5 days (15th Oct)</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-white text-sm">$500.00</p>
                                <p className="text-[10px] text-primary-400 font-medium bg-primary-500/10 inline-block px-1.5 py-0.5 rounded mt-1">Auto-Pay On</p>
                            </div>
                        </div>

                        <button className="w-full mt-4 py-3 rounded-xl border border-dashed border-slate-600 text-slate-400 hover:text-white hover:border-slate-500 transition-colors text-sm font-medium flex items-center justify-center">
                            <Plus size={16} className="mr-2" /> Add Scheduled Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
