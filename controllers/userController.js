
import { db } from './../db.js';
import validator from 'validator';




export function GetAllUsers(req,res) {
    db.query("select * from Users",(err,result)=>{
        res.json({
            users : result
        }).status(200)
    })
}


export  function GetUser(req,res) {
    const  id  = req.params.id
    if(!id || isNaN(id)){
        return res.json({
            msg : "id required and must be a number"
        }).status(400)
    }
    else{
        db.query("select * from Users where id = ?",[id],(err,result)=>{
            if(err){
                return err
            }
            else if(result.length == 0){
                return res.json({
                    msg : "not found"
                }).status(200)
            }
            else{
                res.json({
                    user : result
                })
            }
        })
    }
    
}  
export function CreateUser(req,res) {

    const {UserName , UserEmail} = req.body

    if(!UserEmail || !UserName){
        return res.json({
            msg :"User info are required"
        }).status(400)

    }
    //validate user email
    else if(validator.isEmail(UserEmail)){

        //validate user name
        if(typeof(UserName) == "number" || String(UserName).length < 2){
            return res.json({
                msg : "name must be String",
                MinLength : 2
            }).status(400)
        }else{
            let values = [UserName,UserEmail]
            db.query("INSERT INTO users (name,email) VALUES (?);",[values],(err,result)=>{

                if(err){
                    return res.json({
                        msg : "Email Existente"
                    }).status(201)
                }
                res.json({
                    msg : "Posted sucess"
                })
            })
        }

    }else{
        return res.json({
            msg : "Email invalid"
        }).status(400)
    }
    
}


export function UpdateUser(req,res) {

    const {UserName , UserEmail} = req.body
    const id = req.params.id

    if(!UserEmail || !UserName || isNaN(id) || !id){
        return res.json({
            msg :"User info are required"
        }).status(400)

    }
    //validate user email
    else if(validator.isEmail(UserEmail)){

        //validate user name
        if(typeof(UserName) == "number" || String(UserName).length < 2){
            return res.json({
                msg : "name must be String",
                MinLength : 2
            }).status(400)
        }else{
            db.query("UPDATE users SET name = ? , email = ? WHERE (id = ?);",[UserName,UserEmail,id],(err,result)=>{
                console.log(err)
                console.log(result)
                if(err){
                    
                    return res.json({
                        msg : "Email Existente tente outro"
                    }).status(400)
                }else{
                    
                    res.json({
                        msg : "Updated sucess"
                    })
                }
            })
        }

    }else{
        return res.json({
            msg : "Email invalid"
        }).status(400)
    }
    
}

export function DeleteUser(req,res) {
    const  id  = req.params.id
    if(!id || isNaN(id)){
        return res.json({
            msg : "id required and must be a number"
        }).status(400)
    }
    else{
        //verifiar se exixte um user com este id
        db.query("select * from Users where id = ?",[id],(err,result)=>{
            if(err){
                return err
            }
            else if(result.length == 0){
                return res.json({
                    msg : "not found"
                }).status(200)
            }
            else{
                db.query("delete from Users where id = ?",[id],(err,result)=>{
                    if(err){
                        return err
                    }
                    else{
                        return res.json({
                            msg : "deleted sucess",
                            id : id
                        }).status(200)
                    }
                })
            }
        })
    }
    
}