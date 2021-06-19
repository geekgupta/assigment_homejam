const mongoose = require( 'mongoose' );
const { ObjectId } = mongoose.Schema.Types;
const ClassSchema = mongoose.Schema( {
    subject: {
        type: String,
        require: true
        
    },
    students: [{
        type: ObjectId,
        ref: "users",
        default: null
    }
    ],
    teacher: {
        type: ObjectId,
        ref: "users",
        require : true 
    },
    date: {
        type: Date,
        require : true
    },
    time: {
        type: String,
        required : true
        
    }
    
} );


module.exports = mongoose.model('Class' , ClassSchema ) ; 
