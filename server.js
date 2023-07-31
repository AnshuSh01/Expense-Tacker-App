const expresss = require('express');
const cors = require('cors');
const morgan = require('morgan');
const color = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');

const userRoute = require('./routes/userRoute');
const transRoute=require('./routes/transactionsRoute')

dotenv.config();

connectDB();
// rest object
const app = expresss();
app.use(morgan('dev'));
app.use(expresss.json());

//user 
app.use('/api/v1/users', userRoute)

// transaction

app.use('/api/v1/transactions', transRoute)

const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server listen at Port ${PORT}`);
});