const router = require("express").Router();
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const { isAuthenticated } = require("../middleware/jwt");

// const { user } = require('../client/src/context/auth')

// SIGNUP
router.post('/signup', (req, res, next) => {
	const { email, password, name } = req.body
	// check if email or name or password are empty
	if (email === '' || password === '' || name === '') {
		res.status(400).json({ message: 'Provide email, password and name' })
		return
	}
	// validate the email address
	// const emailValid = email.includes('@')
	// if (!emailValid) {
	// 	res.status(400).json({ message: 'Provide a valid email address' })
	// 	return
	// }
	if (password.length < 4) {
		res.status(400).json({ message: 'Password has to be 4 chars min' })
		return
	}
	// check the database if a user with the same email exists
	User.findOne({ email })
		.then(foundUser => {
			// if the user already exists send an error
			if (foundUser) {
				res.status(400).json({ message: 'User already exists' })
				return
			}
			// hash the password
			const salt = bcrypt.genSaltSync();
			const hashedPassword = bcrypt.hashSync(password, salt)
			// create the new user
			return User.create({ email, password: hashedPassword, name })
				.then(createdUser => {
					const { email, name, _id } = createdUser
					const user = { email, name, _id }
					res.status(201).json({ user: user })
				})
				.catch(err => {
					console.log(err)
					res.status(500).json({ message: 'Internal Server Error' })
				})
		})
});

// LOGIN
router.post('/login', (req, res, next) => {
	const { email, password } = req.body
	if (email === '' || password === '') {
		res.status(400).json({ message: 'Provide email and password' })
		return
	}
	User.findOne({ email })
		.then(foundUser => {
			if (!foundUser) {
				res.status(400).json({ message: 'User not found' })
				return
			}
			const passwordCorrect = bcrypt.compareSync(password, foundUser.password)
			if (passwordCorrect) {
				const { _id, email, name } = foundUser
				const payload = { _id, email, name }
				// create the json web token
				const authToken = jwt.sign(
					payload,
					process.env.JWT_SECRET,
					{ algorithm: 'HS256', expiresIn: '12h' }
				)
				res.status(200).json({ authToken })
			} else {
				res.status(401).json({ message: 'Unable to authenticate' })
			}
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({ message: 'Internal Server Error' })
		})
});

router.get('/verify', isAuthenticated, (req, res, next) => {
	// if the token is valid we can access it on : req.payload
	console.log('request payload is: ', req.payload)
	res.status(200).json(req.payload)
});

// router.get('/userProfile', !isAuthenticated, (req, res, next) => {
// 	res.status(400).json({ message: 'err' })
// });



//=====> change to if (email found in db){ err msg "mailadress already in use"}
// User.findOne({ email })
// 		.then(foundUser => {
// 			// if the user already exists send an error
// 			if (foundUser) {
// 				res.status(400).json({ message: 'User already exists' })
// 				return
// 			}

// UPDATE PROFILE
router.post("/userprofileedit", (req, res, next) => {
	const {name, email, password}  = req.body;
   
  console.log(req.body)
  
  User.findByIdAndUpdate(req.body.id, { name, email, password}, {new: true} )
  // User.findByIdAndUpdate(req.session.user, { lastName: req.body.lastName}, {firstName: req.body.firstName}, {email:req.body.email })
  .then((user) => {
  console.log('gets updated')  
  res.render('./userprofile')
  })
  .catch(err => { 
	next(err);
  })
  })

  // DELETE
router.get('/delete', (req, res, next) => {
	console.log('tried to delete User')
	//later feature delete groups owned by this user as well
	User.findByIdAndDelete(req.session.user).then(()=>{
	  //destroy session and delete database entry
	  req.session.destroy()
	  res.redirect('/auth/signup')
	})
  });
  //____________________________________



module.exports = router;
