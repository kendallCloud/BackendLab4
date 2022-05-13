var require:any;
//conectar BD
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const app = express();
const cors = require('cors');
app.use(cors());

 app.listen(8080, () => {
  console.log("El servidor está inicializado en el puerto 8080");
 });
 var session:any;

 const oneDay = 1000 * 60 * 60 * 24;
 app.use(cookieParser());
 //session middleware
 app.use(sessions({
     secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
     saveUninitialized:true,
     cookie: { maxAge: oneDay },
     resave: false
 }));

app.get('/',function (req:any, res:any) {
  session=req.session;

  var json = {
    "hola":"Bienvenido al servidor "+req.query.name
  }
  console.log("Bienvenido al servidor "+req.query.name);
  session.userid=req.query.name;
  res.send(json);
  console.log("sesion iniciada");
});

app.post('/user',(req:any,res:any) => {
  if(req.body.username != 0 && req.body.password !=0){
      session=req.session;
      session.userid=req.body.username;
      console.log(req.session)
      res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
  }
  else{
      res.send('Invalid username or password');
  }
})

app.get('/logout',(req:any,res:any) => {
  var mensaje = new String(session.userid +" a cerrado sesion");
  var json = {
    "adios":mensaje
  }
  req.session.destroy();
  console.log(mensaje);
  res.send(mensaje);
});
