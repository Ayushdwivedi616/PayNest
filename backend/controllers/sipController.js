import supabase from '../config/supabase.js';

// @desc    Get all SIPs for a user
// @route   GET /api/sip
// @access  Private
export const getSips = async (req, res) => {
    try {
        const { data: sips, error } = await supabase
            .from('sips')
            .select('*')
            .eq('user_id', req.user._id);

        if (error) throw error;

        const formattedSips = sips.map(sip => ({
            _id: sip.id,
            investmentName: sip.investment_name,
            amount: sip.amount,
            date: sip.date,
            isActive: sip.is_active
        }));

        res.json(formattedSips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a new SIP
// @route   POST /api/sip
// @access  Private
export const addSip = async (req, res) => {
    try {
        const { investmentName, amount, date } = req.body;

        const { data: createdSip, error } = await supabase
            .from('sips')
            .insert([{
                user_id: req.user._id,
                investment_name: investmentName,
                amount,
                date,
                is_active: true
            }])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json({
            _id: createdSip.id,
            investmentName: createdSip.investment_name,
            amount: createdSip.amount,
            date: createdSip.date,
            isActive: createdSip.is_active
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a SIP
// @route   DELETE /api/sip/:id
// @access  Private
export const deleteSip = async (req, res) => {
    try {
        const { data: sip, error: fetchError } = await supabase
            .from('sips')
            .select('user_id')
            .eq('id', req.params.id)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

        if (sip && sip.user_id === req.user._id) {
            const { error: deleteError } = await supabase
                .from('sips')
                .delete()
                .eq('id', req.params.id);

            if (deleteError) throw deleteError;
            res.json({ message: 'SIP removed' });
        } else {
            res.status(404).json({ message: 'SIP not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle SIP active status
// @route   PUT /api/sip/:id/toggle
// @access  Private
export const toggleSip = async (req, res) => {
    try {
        const { data: sip, error: fetchError } = await supabase
            .from('sips')
            .select('user_id, is_active')
            .eq('id', req.params.id)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

        if (sip && sip.user_id === req.user._id) {
            const { data: updatedSip, error: updateError } = await supabase
                .from('sips')
                .update({ is_active: !sip.is_active })
                .eq('id', req.params.id)
                .select()
                .single();

            if (updateError) throw updateError;

            res.json({
                _id: updatedSip.id,
                investmentName: updatedSip.investment_name,
                amount: updatedSip.amount,
                date: updatedSip.date,
                isActive: updatedSip.is_active
            });
        } else {
            res.status(404).json({ message: 'SIP not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
