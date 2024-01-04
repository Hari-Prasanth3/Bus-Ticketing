import asyncHandler from "../middleware/asyncHandler";
import generateToken from "../utils/generateToken";
import { authenticateUser, createUser } from "../Service/service";

// @desc Auth & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res)=> {
    const { email, password } = req.body;
        try{
            const user = authenticateUser(email, password)

                generateToken(res, user._id);

                res.status(200).json(user);
        } catch (error){
            console.log(error)
            res.status(400).json({ message: error.message })
        }
})

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res)=> {
    const { name, email, password } = req.body;
    try {
        const user = await createUser(name, email, password)

        generateToken(res, user._id);

        res.status(200).json(user);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
})

export {authUser, registerUser}