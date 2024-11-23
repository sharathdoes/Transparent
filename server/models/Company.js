const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,
        unique: true
    },
    company_id: {
        type: String,
        required: true,
        unique: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;