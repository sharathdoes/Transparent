const User = require('../models/User');
const Company = require('../models/Company');
const bcrypt = require('bcryptjs');

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        return res.json({user : user});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.signup = async (req, res) => {
    try {
        const { username, email, password, role, company_id } = req.body;
        
        // Create user
        const user = new User({
            username,
            email,
            password,
            role
        });

        // If role is HR, generate special response number
        if (role === 'HR') {
            await user.save();
            return res.json({ user:user });
        }

        // If role is TEAM LEAD or EMP and companyId is provided
        if ((role === 'TEAM LEAD' || role === 'EMP') && company_id) {
            const company = await Company.findOne({company_id});
            if (!company) {
                return res.status(404).json({ message: 'Company not found' });
            }

            user.companyName = company.company_name;
            user.company_id = company_id;
            await user.save();

            // Add user to company's users array
            company.users.push(user._id);
            await company.save();
        }

        await user.save();
        return res.json({ user: user});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};