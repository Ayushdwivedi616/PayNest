import { useState } from 'react';
import { CalendarClock, Plus, CheckCircle2, PauseCircle, Trash2 } from 'lucide-react';

const SipScheduler = () => {
    const [sips, setSips] = useState([
        { id: 1, name: 'HDFC Index Fund', amount: 500, date: 5, active: true },
        { id: 2, name: 'Parag Parikh Flexi Cap', amount: 300, date: 15, active: true },
        { id: 3, name: 'Axis Small Cap', amount: 200, date: 12, active: false },
    ]);

    const toggleSip = (id) => {
        setSips(sips.map(sip => sip.id === id ? { ...sip, active: !sip.active } : sip));
    };

    const deleteSip = (id) => {
        setSips(sips.filter(sip => sip.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100">SIP Automation</h1>
                    <p className="text-slate-400 text-sm">Schedule and manage your mutual fund investments.</p>
                </div>
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center transition-colors shadow-lg shadow-primary-500/20">
                    <Plus size={16} className="mr-2" /> New SIP
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="glass-card p-6 lg:col-span-2">
                    <h3 className="text-lg font-bold text-slate-100 mb-6">Active Schedules</h3>

                    <div className="space-y-4">
                        {sips.length === 0 ? (
                            <div className="text-center py-12 text-slate-500">
                                <CalendarClock className="mx-auto mb-4 opacity-50" size={48} />
                                <p>No active SIPs found.</p>
                            </div>
                        ) : (
                            sips.map(sip => (
                                <div key={sip.id} className="p-4 rounded-xl bg-surface border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${sip.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                                            <CalendarClock size={20} />
                                        </div>
                                        <div>
                                            <h4 className={`font-semibold ${sip.active ? 'text-slate-200' : 'text-slate-500'}`}>{sip.name}</h4>
                                            <p className="text-xs text-slate-500 mt-1">Deducts on {sip.date}th of every month</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-6 sm:ml-auto border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
                                        <div className="text-left sm:text-right">
                                            <p className={`font-bold ${sip.active ? 'text-white' : 'text-slate-500'}`}>${sip.amount}</p>
                                            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Amount</p>
                                        </div>

                                        <div className="flex items-center space-x-2 pl-4 border-l border-white/10">
                                            <button
                                                onClick={() => toggleSip(sip.id)}
                                                className={`p-2 rounded-lg transition-colors ${sip.active ? 'text-amber-400 hover:bg-amber-400/10' : 'text-emerald-400 hover:bg-emerald-400/10'}`}
                                                title={sip.active ? "Pause SIP" : "Resume SIP"}
                                            >
                                                {sip.active ? <PauseCircle size={20} /> : <CheckCircle2 size={20} />}
                                            </button>
                                            <button
                                                onClick={() => deleteSip(sip.id)}
                                                className="p-2 rounded-lg text-rose-400 hover:bg-rose-400/10 transition-colors"
                                                title="Delete SIP"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="glass-card p-6 border-t-4 border-t-primary-500 h-fit">
                    <div className="text-center mb-6">
                        <h3 className="text-lg font-bold text-white">Monthly Summary</h3>
                        <p className="text-slate-400 text-sm">Total SIP outflow</p>
                    </div>

                    <div className="flex justify-between mb-4 text-sm">
                        <span className="text-slate-400 flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></span> Active Outflow</span>
                        <span className="text-white font-medium">${sips.filter(s => s.active).reduce((a, b) => a + b.amount, 0)}</span>
                    </div>
                    <div className="flex justify-between mb-6 text-sm">
                        <span className="text-slate-400 flex items-center"><span className="w-2 h-2 rounded-full bg-slate-600 mr-2"></span> Paused Outflow</span>
                        <span className="text-white font-medium">${sips.filter(s => !s.active).reduce((a, b) => a + b.amount, 0)}</span>
                    </div>

                    <div className="pt-6 border-t border-white/10 text-center">
                        <p className="text-sm text-slate-400 mb-2">Projected 10-Year Value (12% CAGR)</p>
                        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-400">
                            ~$230K
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SipScheduler;
