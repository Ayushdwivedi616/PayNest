import supabase from '../config/supabase.js';

// Default allocation percentages
const defaultAllocations = {
    Rent: 0.30,
    Food: 0.20,
    Travel: 0.10,
    Savings: 0.20,
    SIP: 0.10,
    Misc: 0.10
};

// @desc    Set or update monthly budget
// @route   POST /api/budget
// @access  Private
export const setBudget = async (req, res) => {
    try {
        const { income, month } = req.body;
        const user_id = req.user._id;

        // Check if budget exists
        const { data: budget, error: fetchError } = await supabase
            .from('budgets')
            .select('*')
            .eq('user_id', user_id)
            .eq('month', month)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

        if (budget) {
            // Update existing budget (recalculate allocations if income changes)
            let updatedCategories = budget.categories.map(cat => {
                if (defaultAllocations[cat.name]) {
                    return { ...cat, allocated: income * defaultAllocations[cat.name] };
                }
                return cat;
            });

            const { data: updatedBudget, error } = await supabase
                .from('budgets')
                .update({ income, categories: updatedCategories })
                .eq('id', budget.id)
                .select()
                .single();

            if (error) throw error;
            return res.status(200).json(updatedBudget);
        }

        // Create new budget
        const categories = Object.keys(defaultAllocations).map(name => ({
            name,
            allocated: income * defaultAllocations[name],
            spent: 0
        }));

        const { data: newBudget, error } = await supabase
            .from('budgets')
            .insert([{ user_id, month, income, categories }])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(newBudget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get monthly budget
// @route   GET /api/budget/:month
// @access  Private
export const getBudget = async (req, res) => {
    try {
        const { data: budget, error } = await supabase
            .from('budgets')
            .select('*')
            .eq('user_id', req.user._id)
            .eq('month', req.params.month)
            .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (budget) {
            res.json(budget);
        } else {
            res.status(404).json({ message: 'Budget not found for this month' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
