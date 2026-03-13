import supabase from '../config/supabase.js';

// @desc    Get all expenses for a user
// @route   GET /api/expense
// @access  Private
export const getExpenses = async (req, res) => {
    try {
        const { data: expenses, error } = await supabase
            .from('expenses')
            .select('*')
            .eq('user_id', req.user._id)
            .order('date', { ascending: false });

        if (error) throw error;

        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a new expense
// @route   POST /api/expense
// @access  Private
export const addExpense = async (req, res) => {
    try {
        const { category, amount, description, date } = req.body;

        const { data: createdExpense, error } = await supabase
            .from('expenses')
            .insert([{
                user_id: req.user._id,
                category,
                amount,
                description,
                date: date || new Date().toISOString(),
            }])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(createdExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete an expense
// @route   DELETE /api/expense/:id
// @access  Private
export const deleteExpense = async (req, res) => {
    try {
        const { data: expense, error: fetchError } = await supabase
            .from('expenses')
            .select('user_id')
            .eq('id', req.params.id)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

        if (expense && expense.user_id === req.user._id) {
            const { error: deleteError } = await supabase
                .from('expenses')
                .delete()
                .eq('id', req.params.id);

            if (deleteError) throw deleteError;
            res.json({ message: 'Expense removed' });
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get analytics summary (expenses group by category)
// @route   GET /api/expense/analytics
// @access  Private
export const getAnalytics = async (req, res) => {
    try {
        // Since Supabase doesn't have a direct equivalent to Mongoose aggregate $group in the JS client,
        // we'll fetch all expenses and group them in Node.js (or we could use a Postgres RPC, but this is simpler for now).
        const { data: expenses, error } = await supabase
            .from('expenses')
            .select('category, amount')
            .eq('user_id', req.user._id);

        if (error) throw error;

        const grouped = expenses.reduce((acc, curr) => {
            if (!acc[curr.category]) acc[curr.category] = 0;
            acc[curr.category] += Number(curr.amount);
            return acc;
        }, {});

        const chartData = Object.keys(grouped).map(key => ({
            name: key,
            value: grouped[key]
        }));

        res.json(chartData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
