import mysql from 'mysql'
import { dbCredentials } from './config.js'

export const db = mysql.createConnection({
    user :  process.env.UserDB || dbCredentials.user,
    host :  process.env.DbHost || dbCredentials.host,
    password : process.env.DBpass || dbCredentials.password,
    database : process.env.DB || dbCredentials.db
})
db.connect((err)=>{
    if(err){
        throw new Error(err.message)
    }
    console.log("DataBase Connected")
})

