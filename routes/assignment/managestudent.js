const express = require('express') ; 
const router = express.Router();
const Class = require( '../../models/assignments/classes' );


router.get( '/getstudents', async ( req, res ) =>
{
    try {
        const db = await Class.findById( req.params.id ).select( "students" ); 
        res.json(db)
        }
        catch(err){
            res.json( {message:err } ) ; 
    
    }

} );

router.post('/addstudent', async(req ,res)=>{
    const data = req.params.students; 
    try{
        const db = await Class.findByIdAndUpdate(req.params.id, {
            $push: {
              students: {
                  data
              },
            },
          });
        res.json(db);

    }
    catch(err){
         res.json({message:err})
    }

} );



// 

router.get('/removestudent/:classid' , async (req, res) =>{

    try {
        
    }
    catch ( err )
    {
          console.log(err);
    }

}) ; 





module.exports  = router ; 


