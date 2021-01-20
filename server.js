const express = require( 'express' );

const connectDB = require( './config/db' );

const app = express();

const PORT = process.env.PORT || 5000;

const apiMessage = () => console.log( `Server runs on ${PORT}` );

// Connect Database
connectDB();
// Init Middleware
app.use( express.json({ extended: false }) );


app.get('/', (req, res) => res.send('Server Mo ti wa online')); 

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));
app.use('/api/auth', require('./routes/api/auth'));



app.listen(PORT, apiMessage);