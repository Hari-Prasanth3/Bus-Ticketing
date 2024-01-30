import generateToken from "../utils/generateToken.js";
import { authenticateUser, createUser,getUser } from "../services/service.js";

// @desc Auth & get token
// @route POST /api/users/login
// @access Public
const authUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password)
    try {
        if (user) {
            generateToken(res, user._id);
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(401).json({
                message: "Invalid email or password"
            })
        }
    } catch (error) {
        res.status(401).json({ message: error.message})
    }
};
      
// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
   
    try {
      
        const user = await createUser(name, email, password, isAdmin);

            generateToken(res, user._id)

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            })
    } catch (error) {
        res.status(401).json({
            message: "user already exists"
        })
    }
};

// @desc Get User by Id
// @route GET /api/users/:id
const getUserById = async(req, res) => {
    try {
        const user = await getUser(req.params.id)
        if(user){
            res.status(200).json(user)
        } else {
            res.status(404).json({
                message: "User Not Found"
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "Invalid User ID"
        })
    }
    
}



export {authUser, registerUser,getUserById}
