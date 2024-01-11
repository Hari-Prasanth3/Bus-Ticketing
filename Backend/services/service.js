import User from '../models/userModel.js';

const authenticateUser = async (email, password) => {
    const user = await User.findOne({email});
  
    if (user && (await user.matchPassword(password))){
        return user
    }
}
//checking user if user already exist or not
const getUser = async (id)=> {
    const user = await User.findById(id)

    if(user){
        return user
    }
}
const CheckUser = async (email)=> {
    const user = await User.findOne({email})

    if(user){
        return user
    }
}
//create new user
const createUser = async (name, email, password, isAdmin) => {
    const user = await User.create({
        name,email,password, isAdmin
    });
    return user
}



export {authenticateUser, createUser, getUser,CheckUser}