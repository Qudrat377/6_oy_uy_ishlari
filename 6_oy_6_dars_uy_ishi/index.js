const express = require("express")
require("dotenv").config()
const cors = require("cors")
const AuthRouter = require("./router/auth.routes")
const TaskRouter = require("./router/board.routes")

const app = express()
app.use(express.json())
app.use(cors())

app.use(AuthRouter)
app.use(TaskRouter)


app.listen(3011, () => {
    console.log("Server is running at: " + 3011)    
})