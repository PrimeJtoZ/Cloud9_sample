var fs = require("fs");
var http = require("http");
var express = require('express');

var app = express();

app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(app.router);

console.log('process.env.PORT', process.env.PORT);
app.get('/', function(req, res){
   if(req.cookies.auth){
       res.send('<h1>Login Success</h1>');
   }else{
       res.redirect('/login');
   }
});
app.get('/login', function(req, res){
    fs.readFile('login.html', function(error, data){
       res.send(data.toString()); 
    });
});
app.post('/login', function(req, res){
    var login = req.param('login');
    var password = req.param('password');
    
    console.log(login, password);
    console.log(req.body);
    
    if(login == 'rint' && password == '1234'){
        res.cookie('auth', true);
        res.redirect('/');
    }else{
        res.redirect('login')
    }
});


http.createServer(app).listen(process.env.PORT, function(){
    console.log('connected!!!');
});