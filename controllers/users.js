const users = require("../models/users");


const getAllusers = async (request, response) => {
    try {
        const Users = await users.find({}, { __v: false, password: false });
        return response.status(200).json({
            status: 200,
            data: { Users }
        })
    } catch (error) {
        return response.status(500).json({
            status: 500,
            message:error
        })
    }
}
const getUser = async (request, response) => {
    try {
        const userId = request.params.id
        const User = await users.findById({ _id: userId },{ __v: false, password: false });
        if (!User) {
            return response.status(404).json({
                status: 404,
                message: "User not found"
            })
        }

        return response.status(200).json({
            status: 200,
            data: { User }
        })
    } catch (error) {
        return response.status(500).json({
            status: 500,
            message : error
        })
    }
        
}
const addUser = async (request, response) => {
    try {
        const user = await users.create(request.body)
        return response.status(200).json({
            status: 200,
            data:{user}
        })
        
    } catch (error) {
        return response.status(500).json({
            status: 500,
            message : error
        })
    }
}

const editUser = async (request, response) => {
    try {
        const userId = request.params.id;
        const User = await users.findByIdAndUpdate({ _id: userId }, request.body, {
            new: true,
            projection: { __v: false, password: false }
        });
        if (!User) {
            return response.status(404).json({
                status: 404,
                message: "User not found"
            })
        }
        return response.status(200).json({
            status: 200,
            data: { User }
        })
        

    } catch (error) {
        return response.status(500).json({
            status: 500,
            message : error
        })
        
    }
    
}



const deleteUser = async (request,response) => {
    try {
        const userId = request.params.id;
        const User = await users.findByIdAndDelete({ _id: userId })
        if (!User) {
            return response.status(404).json({
                status: 404,
                message: "User not found"
            })
        }
        return response.status(200).json({
            status: 200,
            data: { User }
        })
    } catch (error) {
        return response.status(500).json({
            status: 500,
            message : error
        })
    }  
}


module.exports ={ getAllusers,getUser,addUser,editUser,deleteUser}