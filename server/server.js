const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/userRoutes.js');
const companyRoutes = require('./Routes/companyRoutes.js');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://sharath7693:dASAm9lfV67DtEzQ@deadpool.oekbu.mongodb.net/goldenexperience', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});