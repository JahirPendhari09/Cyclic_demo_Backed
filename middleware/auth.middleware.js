const jwt = require('jsonwebtoken');

const auth =(req,res,next)=>{
    const token= req.headers.authorization?.split(" ")[1];

    if(token)
    {
        jwt.verify(token, 'masai', (err, decoded)=> {
            if(decoded)
            {
                // console.log(decoded);
                req.body.username=decoded.username;
                req.body.userID = decoded.userID
                next()
            }else{
                res.status(200).send({"msg":"You are not Authorized"})
            }
        });
        
    }else{
        res.status(400).send({"msg":"Token is Not Available please login "})
    }
}

module.exports ={auth};