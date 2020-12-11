
const User = require('../models/User');
const passport = require('passport');
const {userRegister, userContact}=require('../config/nodemailer')

//Signup controller, create user
exports.signup = async (req, res) => {
  const newUser= await User.register(req.body, req.body.password, function(err){
    if(err){
      res.status(501).json({message:'There was an error while registering please try again with a different email or password'})
    }
  })
  await userRegister(req.body.name, req.body.email)
  res.status(201).json(newUser)
}

//Login process
exports.login = async (req, res, next) => {
  passport.authenticate('local', (err, user, failureDetails) => {
    if (err) {
      return res
        .status(500)
        .json({ message: 'Something went wrong ' })
    }
    if (!user) {
      return res.status(401).json(failureDetails)
    }
    req.login(user, err => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Something went wrong authenticating' })
      }
      user.password = null
      res.status(200).json(user)
    })
  })(req, res, next)
}

//Check of current logged user
exports.currentUser = (req, res) => {
  res.json(req.user || null)
}

//Get user details for public profile
exports.userDetails = async (req, res) =>{
  const {userId}=req.params
  const user=await User.findById(userId).populate('posts')
  res.status(200).json(user)
}

//Logout user
exports.logout = (req, res) => {
  req.logout()
  res.status(200).json({ message: 'logged out' })
}

//Update User details
exports.updateUser= async (req,res)=>{
  const id=req.user._id
  const {email, 
    name, 
    lastname, 
    image}=req.body
  if(!email){
    return res
    .status(403)
    .json({message:"Email field cannot be empty"})
  }
  const updateUser= await User.findByIdAndUpdate(id, {
    email,
    name,
    lastname,
    image
  }, {new: true})
  res.status(200).json(updateUser)
}

//Contact user by email
exports.sendEmail=async (req,res)=>{
  const {sender, email, body}=req.body
  const {name}=req.user
  const {userId}=req.params
  const user= await User.findById(userId)
  senderName=name
  const userName=user.name
  await userContact(userName, senderName, email, sender, body)
  res.status(200).json({message:"email sent"})
}


/*-----------------------Google login process--------------------*/
exports.googleInit = passport.authenticate('google', {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
})

exports.googleCb = (req, res, next) => {
  passport.authenticate('google', (err, user, errDetails) => {
    if (err) return res.status(500).json({ err, errDetails })
    if (!user) return res.status(401).json({ err, errDetails })

    req.login(user, err => {
      if (err) return res.status(500).json({ err })
      return res.redirect(process.env.NODE_ENV === 'development' ?
        'http://localhost:3001/profile' : '/profile')
    })
  })(req, res, next)
}