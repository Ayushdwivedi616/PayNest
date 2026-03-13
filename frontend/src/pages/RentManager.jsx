import { useState } from 'react';
import { Home, Plus, Power, Trash2 } from 'lucide-react';

const RentManager = () => {
    const [rents, setRents] = useState([
        { id: 1, landlord: 'John Smith (2BHK Appt)', amount: 1200, date: 1, autoPay: true },
        { id: 2, landlord: 'City Storage Space', amount: 150, date: 15, autoPay: true },
    ]);

    const toggleAutoPay = (id) => {
        setRents(rents.map(rent => rent.id === id ? { ...rent, autoPay: !rent.autoPay } : rent));
    };

    const deleteRent = (id) => {
        setRents(rents.filter(rent => rent.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100">Rent Automation</h1>
                    <p className="text-slate-400 text-sm">Manage landlord payments and auto-pay toggles.</p>
                </div>
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center transition-colors shadow-lg shadow-primary-500/20">
                    <Plus size={16} className="mr-2" /> Add Landlord
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {rents.length === 0 ? (
                    <div className="glass-card p-12 col-span-full text-center text-slate-500">
                        <Home className="mx-auto mb-4 opacity-50" size={48} />
                        <p>No rent payments scheduled.</p>
                    </div>
                ) : (
                    rents.map(rent => (
                        <div key={rent.id} className="glass-card p-6 flex flex-col group relative overflow-hidden">
                            <div className={`absolute top-0 right-0 w-32 h-32 blur-[64px] rounded-full -z-10 transition-colors ${rent.autoPay ? 'bg-primary-500/20' : 'bg-slate-700/20'}`}></div>

                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${rent.autoPay ? 'bg-primary-500/20 text-primary-400' : 'bg-slate-800 text-slate-500'}`}>
                                        <Home size={18} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-100">{rent.landlord}</h3>
                                        <p className="text-sm text-slate-400">Due: {rent.date}th of month</p>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-white">${rent.amount}</h2>
                            </div>

                            <div className="mt-auto border-t border-white/5 pt-4 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => toggleAutoPay(rent.id)}
                                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${rent.autoPay ? 'bg-primary-500' : 'bg-slate-700'}`}
                                    >
                                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ease-in-out ${rent.autoPay ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                    </button>
                                    <span className={`text-sm font-medium ${rent.autoPay ? 'text-primary-400' : 'text-slate-500'}`}>Auto-Pay {rent.autoPay ? 'ON' : 'OFF'}</span>
                                </div>

                                <button
                                    onClick={() => deleteRent(rent.id)}
                                    className="text-slate-500 hover:text-rose-400 transition-colors p-2"
                                    title="Remove"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RentManager;
