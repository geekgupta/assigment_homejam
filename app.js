const express = require( 'express' );
const mongoose = require('mongoose') ;
const bodyParser = require( 'body-parser' );
const jwt = require( 'jsonwebtoken' );
const auth = require('./routes/assignment/login');
const classmanage = require( './routes/assignment/classmanage' );
const managestudent = require( './routes/assignment/managestudent')
const { loginCheck , isAuth , isAdmin } = require('./middleware/auth')
const cors = require( 'cors' );
const Class = require('./models/assignments/classes')

require( 'dotenv/config' );


// I used JWTWEBTOKEN for authentication 

const app = express();
app.use( cors() );
app.use( express.json());
app.use( '/auth', auth ); 
app.use( '/class',isAuth , isAdmin , loginCheck, classmanage ); // adding middlwware and authencation for isAdmin
app.use( '/students',isAuth , isAdmin , loginCheck, managestudent );  //  // adding middlwware and authencation for isAdmin

// all the lecture will be displayed to student once  they logged in  on home page
app.get( '/', loginCheck ,  async( req, res ) =>
{
    try {
        const db = await Class.find() ; 
        res.json(db)
        }
        catch(err){
            res.json( {message:err } ) ; 
    
    }
});

mongoose.connect( process.env.db_connection, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, () =>
{
    console.log("conencted") ; 
}
)

app.listen( 8000, () =>
{
    console.log("=========***assigment***=========")
} );

