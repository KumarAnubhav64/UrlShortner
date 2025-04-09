const express = require('express');
const path =  require('path')
const urlRoute = require('./routes');
const staticRoute = require('./routes/staticRouter')
const { connectMongoDb } = require('./connection');
const app = express();
const PORT = 8000;

// Connection

connectMongoDb('mongodb://127.0.0.1:27017/url')
	.then(() => {
		console.log('MongoDb Connected');
	})
	.catch((err) => {
		console.log('Error', err);
	});

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))
//EJS
app.set('view engine', 'ejs');
app.set('views',path.resolve('./view'));



//Routes
app.use('/url', urlRoute);
app.use('/',staticRoute)
app.listen(PORT, () => console.log(`Sever started at ${PORT}`));
