const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/note.routes");
const cors = require("cors")
require("dotenv").config()

const app = express();
app.use(express.json())
app.use(cors());
app.use("/user", userRouter);
app.use("/note", noteRouter)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Server is Connected");
        console.log("Connected to DB")
    }catch(err) {
        console.log(err)
    }
})