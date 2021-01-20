const express = require( 'express' );

const app = express();

const PORT = process.env.PORT || 5000;

const apiMessage = () => console.log( `Server runs on ${PORT}` );

app.get('/', (req, res) => res.send('Mo ti wa online')); 

app.listen(PORT, apiMessage);