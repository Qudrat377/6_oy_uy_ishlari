import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import StudentRouter from "./router/student.routes.js"
import botRouter from "./router/bot.routes.js"

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3000

// router 
app.use(StudentRouter)
// app.use(botRouter)

app.listen(PORT, () => {
    console.log("Server is running at: " + PORT);
    
})