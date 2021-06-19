const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcrypt' );

const UserSchema = mongoose.Schema( {
    name: {
        type :String , 
        require : true
    },
    email: {
        type:String , 
        require: true,
        index: { unique: true },
        match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    },
    password: {
        type: String,
        require : true
    },
    userRole: {
        type: Number,           // 0 = teacher , 1 = student 
        required: true,
    },
    

    
} );



let SALT = 10;
UserSchema.pre( 'save', function (next)
{
    var user = this;
    if ( user.isModified( 'password' ) )
    {
        bcrypt.genSalt( SALT, function ( err, salt )
        {
            if ( err ) return next( err );
            bcrypt.hash( user.password, salt, function ( err, hash )
            {
                if ( err ) return next( err );
                user.password = hash;
                next();
            })
        });
    }
    else
    {
        next()
    }
    
} );

UserSchema.methods.comparedPassword = function ( candidatePassword, checkpassword )
{
    bcrypt.compare( candidatePassword, this.password, function ( err, ismatch )
    {
        if ( err ) return checkpassword( err )
        checkpassword(null , ismatch)
    })
}



module.exports = mongoose.model( 'User', UserSchema );