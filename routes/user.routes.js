const express = require("express");
const bcrypt = require('bcrypt');
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken")

// Post Register

userRouter.post("/register",(req,res)=>{
    const {email,password,username}= req.body;
    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
            // Store hash in your password DB.
            if(err)
            {
                res.status(200).send({"err":err.message})
            }else{
                const new_User = new UserModel({
                    email,
                    username,
                    password:hash
                })
                await new_User.save()
                res.status(200).send({"msg":"new User has been Regiterd","new_user":req.body})
            }
        });

    }catch(err){
        res.status(400).send({"err":err})
    }
})

//Post Login

userRouter.post("/login" , async(req,res)=>{
    const {email,password}= req.body;
    try{
        const user = await UserModel.findOne({email});
        // console.log(user)
        if(user)
        {
            bcrypt.compare(password, user.password, (err, result)=> {
                // result == true
                if(result)
                {
                    console.log(result)
                    const token = jwt.sign({username:user.username,userID: user._id},"masai",{ expiresIn:'1h'})
                    res.status(200).send({"msg":"Login Successfull","token":token})
                   
                }else{
                    res.status(200).send({"msg":"Password is Invalid"})
                }
            });
        }else{
            res.status(200).send({"msg":"user not found"})
        }
    }catch(err){
        res.status(400).send({"err":err})
    }
})
module.exports ={userRouter}