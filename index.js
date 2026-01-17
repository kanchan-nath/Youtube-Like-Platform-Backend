import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})
import { app } from "./app.js";
import { connectMongoDB } from "./db/index.js";


const PORT  = process.env.PORT

connectMongoDB()
.then(() =>{
    app.listen(PORT, ()=>{
        console.log(`Server is running at port ${process.env.PORT}\n`)
    })
})
.catch((error) =>{
    console.log("MONGO DB connection failed !!! \n", error);
})