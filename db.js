import mysql from 'mysql'

export const db = mysql.createConnection({
    user : "root",
    host : "localhost",
    password : process.env.DBpass || "",
    database : "CRUDNode"
})
db.connect((err)=>{
    if(err){
        throw new Error(err.message)
    }
    console.log("DataBase Connected")
})

