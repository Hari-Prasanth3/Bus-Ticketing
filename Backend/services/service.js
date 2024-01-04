import User from "../models/userModel";

//checking user exist or not
const authenticateUser = async (email, password) => {
    const user = await User.findOne({email});
    if (!user){
        throw new Error("User not Found")
    }

    const matchPassword = await user.matchPassword(password);
    if(matchPassword){
        return user;
    } else {
        throw new Error("Invalid email or Password");
    }
}
//new user
const createUser = async (name, email, password) => {
    const user = await User.findOne({email});
    if(user){
        throw new Error("User already Exists");
    }
    user = new User({name, email, password});
    await user.save();
}


export {authenticateUser, createUser}