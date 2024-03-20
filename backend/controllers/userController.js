 import asyncHandler from 'express-async-handler'
 import User from '../models/userModel.js'
 import generateToken from '../utils/genetareToken.js'

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async(req, res)=>{
    res.status(200).json({message: 'Auth User'})
})

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async(req, res)=>{
    const {name, email, password} = req.body
    
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400);
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(400);
        throw new Error("Invalid User data")
    }

    // res.status(200).json({message: 'Register User'})
})

// @desc    Logout  user
// route    POST /api/users
// @access  Public
const logoutUser = asyncHandler(async(req, res)=>{
    res.status(200).json({message: 'Logout User'})
})

// @desc    Get user Profile
// route    GET /api/users/profile
// @access  Private
const getuserProfile = asyncHandler(async(req, res)=>{
    res.status(200).json({message: 'User Profile'})
})

// @desc    Update user Profile
// route    GET /api/users/profile
// @access  Private
const updateuserProfile = asyncHandler(async(req, res)=>{
    res.status(200).json({message: 'Update user Profile'})
})

export {
    authUser,
    registerUser,
    logoutUser,
    getuserProfile,
    updateuserProfile
}