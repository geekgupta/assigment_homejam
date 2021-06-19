const express = require('express') ; 
const router = express.Router();
const User = require( '../../models/assignments/users' );
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/keys");

router.post( '/signup', async ( req, res ) =>
{
    const db = new User(req.body);
    try {
        const data = await db.save(req.body) ; 
        res.json(data)
        }
    catch(err)
    {
        res.json( {message:err } ) ; 
    
    }
})

router.post( '/login', async ( req, res ) =>
{
    const email = req.body.email;
    const password = req.body.password;
    const data = await User.findOne({ email: email });
    User.findOne( { 'email': email }, ( err, user ) =>
    {
        if (!user ) res.json( { message: 'login faild' } )
        user.comparedPassword( req.body.password, ( err, isMatch ) =>
        {
            if ( err ) throw err;
            if ( !isMatch ) return res.status( 400 ).json(
                { message: 'wrong password' } )
                const token = jwt.sign(
                    { _id: data._id, role: data.userRole },
                    JWT_SECRET
                 );
                const encode = jwt.verify(token, JWT_SECRET);
                  return res.json({
                    token: token,
                    user: encode,
                  });
                
        } );
    })
   
    
    
} )

router.get( '/all', async ( req, res ) =>
{
    try {
        const db = await User.find() ; 
        res.json(db)
        }
        catch(err){
            res.json( {message:err } ) ; 
    
    }
})

module.exports  = router ; 

