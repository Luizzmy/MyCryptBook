
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
// const router = require('../routes/auth')
const {userRegister}=require('../config/nodemailer')

exports.signup = async (req, res) => {
  const newUser= await User.register(req.body, req.body.password, function(err){
    if(err){
      res.status(501).json({message:'There was an error while registering please try again with a different email or password'})
    }
  })
  //const password=null
  await userRegister(req.body.name, req.body.email)
  res.status(201).json(newUser)
}




exports.login = async (req, res, next) => {
  passport.authenticate('local', (err, user, failureDetails) => {
    if (err) {
      return res
        .status(500)
        .json({ message: 'Something went wrong ' })
    }
    if (!user) {
      console.log(failureDetails)
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

exports.currentUser = (req, res) => {
  res.json(req.user || null)
}

exports.userDetails = async (req, res) =>{
  const {userId}=req.params
  const user=await User.findById(userId).populate('posts')

  res.status(200).json(user)

}

exports.logout = (req, res) => {
  req.logout()
  res.status(200).json({ message: 'logged out' })
}

exports.test=(req,res)=>{
  console.log("hola")
  res.status(200)
}

exports.updateUser= async (req,res)=>{
  const id=req.user._id
  const {email, 
    name, 
    lastname, 
    //password, need to double check how to update password with the plugin 
    image}=req.body
  if(!email /*|| !password*/){
    return res
    .status(403)
    .json({message:"Email field cannot be empty"})
  }
  const updateUser= await User.findByIdAndUpdate(id, {
    email,
    name,
    lastname,
    //password,
    image
  }, {new: true})
  res.status(200).json(updateUser)
}

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