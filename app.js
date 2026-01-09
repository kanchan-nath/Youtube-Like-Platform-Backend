import express from "express"


const app = express()

app.get("/welcome", ()=>{
    console.log("Hello Kanchan")
})

export {app}