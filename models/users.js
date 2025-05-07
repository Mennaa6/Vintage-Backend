const mongoose = require("mongoose");
const bcrypt = require("bcrypt");



const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required :[true,"Username required !"]
    },
    email: {
        type: String,
        required: [true, "Email address required !"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password required !"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default :"user"
    },
    cartItems: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
            quantity: {
                type: Number,
                default: 1
            }
        },
      ],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId,  ref: "products" }],
    // orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "orders"}],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

});

userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) { 
            //hashing password with generated salt 10iterations
        this.password = await bcrypt.hash(this.password, 10);
        }
        next();   
    }catch (error) {
        next(error);
    }
})
module.exports = mongoose.model("users", userSchema);