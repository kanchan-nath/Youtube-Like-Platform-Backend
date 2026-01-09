import { app } from "./app.js";
import dotenv from "dotenv"
import { connectMongoDB } from "./db/index.js";

dotenv.config({
    path: "./.env"
})

const PORT  = process.env.PORT

connectMongoDB()
.then(() =>{
    app.listen(PORT, ()=>{
        console.log(`Server is running at port ${process.env.PORT}`)
    })
})
.catch((error) =>{
    console.log("MONGO DB connection failed !!! ", error);
})