const {Pool} = require("pg")

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    database: "lesson6",
    password: "7777",
    
},
console.log("connet to DB")
)

module.exports = pool