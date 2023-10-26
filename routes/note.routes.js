const express= require("express");
const { NoteModel } = require("../model/note.model");
const { auth } = require("../middleware/auth.middleware");

const noteRouter = express.Router();

noteRouter.use(auth);

noteRouter.get("/",async(req,res)=>{
    try{
        const notes = await NoteModel.find({username:req.body.username});
        res.status(200).send(notes)
    }catch(err){
        res.status(400).send({'error':err})
    }
})

noteRouter.post("/create", async(req,res)=>{
    try{
        const new_note = new NoteModel(req.body);
        await new_note.save();
        res.status(200).send({"msg":"New Note has been Added ","new note":req.body})
    }catch(err){
        res.status(400).send({'error':err})
    }
})

noteRouter.patch("/update/:noteID", async(req,res)=>{
    const {noteID}=req.params
    const note = await NoteModel.findOne({_id:noteID})
    try{
        if(req.body.userID==note.userID)
        {
            await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
            res.status(200).send({"msg":`the id:${noteID} has been updated `})
        }else{
            res.status(200).send({"msg":"You are not Authorised"});
        }
    }
    catch(err){
        res.status(400).send({'error':err})
    }
})

noteRouter.delete("/delete/:noteID", async(req,res)=>{
    const {noteID}=req.params
    const note = await NoteModel.findOne({_id:noteID})
    try{
        if(req.body.userID==note.userID)
        {
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.status(200).send({"msg":`the id:${noteID} has been Deleted `})
        }else{
            res.status(200).send({"msg":"You are not Authorised"});
        }
    }
    catch(err){
        res.status(400).send({'error':err})
    }
})

module.exports={noteRouter}