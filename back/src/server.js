var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
const { json } = require('body-parser');
var app_url = "http://127.0.0.1/";

var connection = mysql.createConnection({
	host     : 'db',
	user     : 'root',
	password : 'configuracion',
	database : 'nodelogin'
});

var corsOptions = {
    origin: 'http://127.0.0.1',
    credentials: true };


var app = express();
app.use(session({
	secret: 'eCdEeMbwHf',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.redirect(app_url);
});

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = SHA1(?)', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect(app_url+'home.html');
			} else {
				response.redirect(app_url+'bad_user.html');
			}			
		});
	} else {
		response.redirect(app_url+'bad_user.html');
	}
});

app.post('/create_user', function(request, response) {
	var username = request.body.username;
	var email = request.body.email;
	var password = request.body.password;
	var password_confirm = request.body.password_confirm;
	if (username && password && email && (password_confirm == password) && request.session.loggedin) {
		connection.query('SELECT * FROM accounts WHERE username LIKE ?', [username], function(error, results, fields) {
			if(results.length>0){
				response.redirect(app_url+'user_exist.html');
			}else{
				connection.query('INSERT INTO accounts SET username = ?, password = SHA1(?),email = ?', [username, password, email], function(error, results, fields) {
					response.redirect(app_url+'home.html');
				});
			}
		});
	} else {
		response.send('Datos incorrectos');
		response.end();
	}
});

app.get('/getUsers', cors(corsOptions), function(request, response) {
	if (request.session.loggedin) {
		connection.query('SELECT username, email FROM accounts', function(error, results, fields) {
			response.send(JSON.stringify(results));
			response.end();
		});
	} else {
		response.send(JSON.stringify(["Usuario no registrado"]));
		response.end();
	}
	
});

app.post('/logout', function(request, response) {
	request.session.loggedin = false;
	request.session.username = "";
	response.redirect(app_url+"index.html");
});

app.listen(3000);