const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const md5 = require("md5");
const cors = require("cors");

const app = express();

app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cors());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "infoware",
  port: 3306
});

con.connect(function(err)
{
  if (err)
  {
    throw err;
  }
  console.log("Connected!");
});

var name;

app.get("/" , function(req,res)
{
    con.query("SELECT * FROM `user`" , function(err , rows ,fields)
    {
      if(err)
      {
        console.log(err);
      }
      else
      {
        console.log(rows);
      }
    })
})

app.post("/register" , function(req,res)
{
  const name = req.query.name;
  const uname = req.query.Uname;
  const email = req.query.email;
  const pass = req.query.Pass;
  const img = req.query.Image;
  con.query("INSERT INTO `user` (name,username,email,password,photo) VALUES('" + name + "','" + uname + "','" + email + "','" + pass + "','" + img + "')" , function(err,rows,fields)
  {
    if(err)
    {
      console.log(err);
      res.send("Not Added")
    }
    else
    {
      res.send("Added");
    }
  })
});

app.post("/login" , function(req,res)
{
  const email = req.query.email;
  const pwd = req.query.pass;
  console.log(email);
  con.query("SELECT password from user where email=email", function(err,rows,fields)
  {
    var str = JSON.stringify(rows[0].password);
    str = str.slice(1, -1);
    console.log(str);
    if(pwd==str)
    {
      res.send("auth");
    }
    else
    {
      console.log(err);
      res.send("err");
    }
  })
});

app.post("/editProfile" , function(req,res)
{

});

app.get("/profile" , function(req,res)
{
  var Email = req.query.email;
  Email = "'" + Email + "'";
  console.log(Email);
  con.query("SELECT * FROM user WHERE email=Email", function(err,rows)
  {
    console.log(rows);
    res.send(rows)
  })
});

app.post("/delete" , function(req,res)
{

});

app.listen(4000 ,function(req,res)
{
	console.log("Started");
});
