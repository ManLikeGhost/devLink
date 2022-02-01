const express = require( 'express' );

const connectDB = require( './config/db' );
const path = require('path');

const app = express();

const PORT = process.env.PORT || 5000;

const apiMessage = () => console.log( `Server runs on ${PORT}` );

// Connect Database
connectDB();
// Init Middleware
app.use( express.json({ extended: false }) );



// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))
  app.get( '*', ( req, res ) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, apiMessage);