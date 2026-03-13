import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon } from 'lucide-react';

const expenseData = [
    { name: 'Rent', value: 1500 },
    { name: 'Food', value: 400 },
    { name: 'Travel', value: 150 },
    { name: 'Shopping', value: 300 },
    { name: 'Utilities', value: 200 },
    { name: 'Misc', value: 100 },
];

const COLORS = ['#8b5cf6', '#f97316', '#3b82f6', '#ec4899', '#14b8a6', '#64748b'];

const trendData = [
    { name: 'May', spent: 2400 },
    { name: 'Jun', spent: 2130 },
    { name: 'Jul', spent: 2800 },
    { name: 'Aug', spent: 2600 },
    { name: 'Sep', spent: 2300 },
    { name: 'Oct', spent: 2650 },
];

const Analytics = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100">Analytics & Insights</h1>
                    <p className="text-slate-400 text-sm">Understand your spending habits deeply.</p>
                </div>
                <select className="bg-surface hover:bg-surface-hover text-slate-200 border border-white/5 px-4 py-2 rounded-xl text-sm font-medium outline-none cursor-pointer">
                    <option>Last 6 Months</option>
                    <option>This Year</option>
                    <option>All Time</option>
                </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-6 h-96 flex flex-col">
                    <div className="flex items-center space-x-2 mb-6 text-slate-100 font-bold">
                        <PieChartIcon className="text-primary-400" size={20} />
                        <h2>Categories Breakdown</h2>
                    </div>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={expenseData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {expenseData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '0.75rem' }}
                                    itemStyle={{ color: '#2dd4bf' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card p-6 h-96 flex flex-col">
                    <div className="flex items-center space-x-2 mb-6 text-slate-100 font-bold">
                        <TrendingUp className="text-emerald-400" size={20} />
                        <h2>Spending Trend</h2>
                    </div>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trendData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                <Tooltip
                                    cursor={{ fill: '#334155', opacity: 0.2 }}
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '0.75rem' }}
                                />
                                <Bar dataKey="spent" fill="#14b8a6" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-slate-100 mb-6">AI Financial Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-primary-500/10 border border-primary-500/20 p-4 rounded-xl">
                        <h4 className="text-primary-400 font-semibold mb-2 text-sm">Savings Opportunity</h4>
                        <p className="text-slate-300 text-sm">You spent 25% more on food this month. Consider reducing dining out to save an estimated $120.</p>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                        <h4 className="text-emerald-400 font-semibold mb-2 text-sm">Great Progress!</h4>
                        <p className="text-slate-300 text-sm">You've successfully allocated 20% of your income to mutual funds via SIPs. Keep it up!</p>
                    </div>
                    <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl">
                        <h4 className="text-rose-400 font-semibold mb-2 text-sm">Upcoming Alert</h4>
                        <p className="text-slate-300 text-sm">Your car insurance premium ($300) is due next week. Your 'General' wallet might need top-up.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
