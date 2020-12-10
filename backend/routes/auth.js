const express = require("express");
const passport = require('passport');
const router = express.Router();


const { signup, 
    login, 
    logout,
    currentUser,
    userDetails,
    sendEmail,
    updateUser,
    googleInit, 
    googleCb 
} = require('../controllers/auth')

const {
    catchErrs
}=require('../middlewares/auth')

//Login route
router.post("/login", catchErrs(login));

//Signup route
router.post("/signup", catchErrs(signup));

//Logged In user
router.get('/current-user', currentUser)

//Update user
router.put('/userUpdate', catchErrs(updateUser))

//Logout user
router.get("/logout", logout);

//Send Email
router.post('/sendEmail/:userId', catchErrs(sendEmail))

//User details
router.get("/:userId", catchErrs(userDetails))

//Google authentication routes
router.get('/auth/google', googleInit)
router.get('/auth/google/callback', googleCb)

module.exports = router;