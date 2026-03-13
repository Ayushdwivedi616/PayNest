import supabase from '../config/supabase.js';

// @desc    Get all Rent payments for a user
// @route   GET /api/rent
// @access  Private
export const getRents = async (req, res) => {
    try {
        const { data: rents, error } = await supabase
            .from('rents')
            .select('*')
            .eq('user_id', req.user._id);

        if (error) throw error;

        // Map database fields to frontend expected fields if necessary
        const formattedRents = rents.map(rent => ({
            _id: rent.id,
            landlordName: rent.landlord_name,
            amount: rent.amount,
            dueDate: rent.due_date,
            autoPay: rent.auto_pay
        }));

        res.json(formattedRents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a new Rent payment setup
// @route   POST /api/rent
// @access  Private
export const addRent = async (req, res) => {
    try {
        const { landlordName, amount, dueDate, autoPay } = req.body;

        const { data: createdRent, error } = await supabase
            .from('rents')
            .insert([{
                user_id: req.user._id,
                landlord_name: landlordName,
                amount,
                due_date: dueDate,
                auto_pay: autoPay || false
            }])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json({
            _id: createdRent.id,
            landlordName: createdRent.landlord_name,
            amount: createdRent.amount,
            dueDate: createdRent.due_date,
            autoPay: createdRent.auto_pay
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a rent payment setup
// @route   DELETE /api/rent/:id
// @access  Private
export const deleteRent = async (req, res) => {
    try {
        const { data: rent, error: fetchError } = await supabase
            .from('rents')
            .select('user_id')
            .eq('id', req.params.id)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

        if (rent && rent.user_id === req.user._id) {
            const { error: deleteError } = await supabase
                .from('rents')
                .delete()
                .eq('id', req.params.id);

            if (deleteError) throw deleteError;
            res.json({ message: 'Rent setup removed' });
        } else {
            res.status(404).json({ message: 'Rent setup not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle Rent autoPay status
// @route   PUT /api/rent/:id/toggle
// @access  Private
export const toggleRent = async (req, res) => {
    try {
        const { data: rent, error: fetchError } = await supabase
            .from('rents')
            .select('user_id, auto_pay')
            .eq('id', req.params.id)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

        if (rent && rent.user_id === req.user._id) {
            const { data: updatedRent, error: updateError } = await supabase
                .from('rents')
                .update({ auto_pay: !rent.auto_pay })
                .eq('id', req.params.id)
                .select()
                .single();

            if (updateError) throw updateError;

            res.json({
                _id: updatedRent.id,
                landlordName: updatedRent.landlord_name,
                amount: updatedRent.amount,
                dueDate: updatedRent.due_date,
                autoPay: updatedRent.auto_pay
            });
        } else {
            res.status(404).json({ message: 'Rent setup not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
