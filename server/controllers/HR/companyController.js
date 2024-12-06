const User = require('../../models/User');
const Company = require('../../models/Company');

exports.createCompany = async (req, res) => {
    try {
        const { email, company_name, company_id } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user is HR
        if (user.role !== 'HR') {
            return res.status(403).json({ message: 'Only HR can create companies' });
        }

        // Check if company_id already exists
        const existingCompany = await Company.findOne({ company_id });
        if (existingCompany) {
            return res.status(400).json({ message: 'Company ID already exists' });
        }

        // Create new company
        const company = new Company({
            company_id,
            company_name,
            users: [user._id]
        });

        await company.save();

        // Update user with company details
        user.companyName = company_name;
        user.company_id = company_id;
        await user.save();

        return res.json(company);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};