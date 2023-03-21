let express = require("express");
let mysql = require("mysql");
let bodyparser = require("body-parser");
let app = express();
app.use(bodyparser.json());


var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"nodecrudapi"
});

app.post("/users",(req,res)=>{
   
    console.log(req.body);
   let body = req.body;
   
   let query = "INSERT INTO users(name,email,mobileno) ";
   query += " VALUES('"+ body.name+"','"+body.email +"','"+body.mobileno +"')";
   
   con.query(query,(err,result)=>{
    if(err){
        res.end(JSON.stringify({status:"failed",data:err}));
    }
    res.end(JSON.stringify({status:"success",data:result}));
   })

});

app.put("/users/:id",(req,res)=>{
    let body = req.body;
    let id = req.params.id;
    let query = "UPDATE users SET name ='" + body.name + "',";
    query += "email = '" + body.email + "', ";
    query += "mobileno = '" + body.mobileno + "' WHERE id = " + id;
    
    con.query(query,(err,result)=>{
        if(err){
            res.end(JSON.stringify({status:"failed",data:err}));
        }
        res.end(JSON.stringify({status:"success",data:result}));
   });
});

app.delete("/users/:id",(req,res)=>{
    let id = req.params.id;
    let query = "DELETE FROM users WHERE id = " + id;
    con.query(query,(err,result)=>{
        if(err){
            res.end(JSON.stringify({status:"failed",data:err}));
        }
        res.end(JSON.stringify({status:"success",data:result}));
   });
});

app.get("/users",(req,res)=>{
    let query = "SELECT * FROM users";
    con.query(query,(err,result)=>{
        if(err){
            res.end(JSON.stringify({status:"failed",data:err}));
        }
        res.end(JSON.stringify({status:"success",data:result}));
   });
});

app.get("/users/:id",(req,res)=>{
    let query = "SELECT * FROM users WHERE id = " + req.params.id;
    con.query(query,(err,result)=>{
        if(err){
            res.end(JSON.stringify({status:"failed",data:err}));
        }
        if(result.length>0)
        res.end(JSON.stringify({status:"success",data:result[0]}));
        else
        res.end(JSON.stringify({status:"success",data:"not found..!"}));
   });
});

app.get("/",(req,res)=>{
    res.end("welcome to sql api...! server is now live for working :) ");
});


app.listen(8081,()=>{
    console.log("api running on http://localhost:8081/");
});


