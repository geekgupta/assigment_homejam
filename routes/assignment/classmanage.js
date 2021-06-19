const express = require('express') ; 
const router = express.Router() ; 
const Class = require( '../../models/assignments/classes' );


router.get('/schedule' , async (req, res) =>{

    try {
        const db = await Class.find() ; 
        res.json(db)
        }
        catch(err){
            res.json( {message:err } ) ; 
    
    }

} );

router.post('/addclass', async(req ,res)=>{
    
    const db = new Class( {
        subject: req.body.subject,
        teacher: req.body.teacher,
        date : req.body.date,
        time: req.body.time
    } );
    try {
    const data = await db.save() ; 
    res.json(data)
    }
    catch(err){
        res.json( {message:err } ) ; 

    }

} );

router.get('/:classid' , async (req, res) =>{

    try {
        const db = await Class.findById(req.params.classid) ; 
        res.json(db)
        }
        catch(err){
            res.json( {message:err } ) ; 
    
    }

} );

router.delete('/delete/:classid' , async (req, res) =>{

    try {
        const db = await Class.remove({ _id: req.params.classid });
        res.json(db)
        }
        catch(err){
            res.json( {message:err } ) ; 
    
    }

} );




router.patch('/updateclass/:classid', async(req,res) =>{
    try{
        const db = await Class.updateOne({_id: req.params.classid} , {$set : {date:req.body.date,time:req.body.time}});
        res.json(db);

    }
    catch(err){
         res.json({message:err})
    }

} );



module.exports  = router ; 


