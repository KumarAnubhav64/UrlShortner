const {User} = require('../model/users');
const {v4: uuidv4} = require('uuid')
const { setUser } = require('../service/auth')
async function handleUserSignup(req, res) {
	const { name, email, password } = req.body;
	await User.create({
		name : name,
		email :email,
		password: password,
	});
	return res.redirect('/');
}
async function handleUserLogIn(req, res) {
	const { email, password } = req.body;
	const user  = await User.findOne({
		email :email,
		password: password,
	});
    if(!user){
        return res.render("login",{
            error : "Invalid Username or Password"
        });
        // return res.redirect("/")
    }
	const sessionId =  uuidv4();
	setUser(sessionId,user);
	res.cookie('uid',sessionId)
	return res.redirect('/');
}
module.exports = { handleUserSignup, handleUserLogIn };
