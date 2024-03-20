 import asyncHandler from 'express-async-handler'
 import User from '../models/userModel.js'
 import generateToken from '../utils/genetareToken.js'

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;


    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }


    // res.status(200).json({message: 'Auth User'})
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

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message: 'User logged out'})
})

// @desc    Get user Profile
// route    GET /api/users/profile
// @access  Private
const getuserProfile = asyncHandler(async(req, res)=>{
    // the user information is already available in the req variable
    // it is added in the authMiddleware at the following line of code
    // req.user = await User.findById(decoded.userId).select('-password');

    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user)
})

// @desc    Update user Profile
// route    GET /api/users/profile
// @access  Private
const updateuserProfile = asyncHandler(async(req, res)=>{
    // the user information is already available in the req variable
    // it is added in the authMiddleware at the following line of code
    // req.user = await User.findById(decoded.userId).select('-password');

    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;


        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._is,
            name: updatedUser.name,
            email: updatedUser.email,
        })
    }else{
        res.status(404);
        throw new Error('User not found');
    }
    res.status(200).json({message: 'Update user Profile'})
})

export {
    authUser,
    registerUser,
    logoutUser,
    getuserProfile,
    updateuserProfile
}