import jwt from 'jsonwebtoken';
import supabase from '../config/supabase.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

            const { data: user, error } = await supabase
                .from('users')
                .select('id, full_name, email')
                .eq('id', decoded.id)
                .single();

            if (error || !user) throw new Error('Not authorized');

            req.user = { _id: user.id, name: user.full_name, ...user };

            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
