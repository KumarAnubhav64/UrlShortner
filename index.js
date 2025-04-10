const express = require('express');
const path =  require('path')
const urlRoute = require('./routes');
const cookieParser =  require('cookie-parser')
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')
const { connectMongoDb } = require('./connection')
const {restrictToLoggedInUserOnly,checkAuth} =  require('./middleware/auth')

const app = express();
const PORT = process.env.PORT || 8000;

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
app.use(cookieParser())
//EJS
app.set('view engine', 'ejs');
app.set('views',path.resolve('./view'));



//Routes
app.use('/url', restrictToLoggedInUserOnly,urlRoute);
app.use('/user',userRoute)
app.use('/',checkAuth,staticRoute)
app.listen(PORT, () => console.log(`Sever started at ${PORT}`));
