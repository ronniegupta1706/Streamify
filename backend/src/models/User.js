import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    fullName:
    {
        type:String,
        required:true,
    },
    email:
    {
        type:String,
        required:true,
        unique:true,
    },
    password:
    {
        type:String,
        required:true,
        minlength:6
    },
    bio:
    {
        type:String,
        default:"",
    },
    profilePic:
    {
        type:String,
        default:"",
    },
    nativeLanguage:
    {
        type:String,
        default:"",
    },
    learningLanguage:
    {
        type:String,
        default:"",
    },
    isOnboarded:
    {
        type:Boolean,
        default:false, //when not onboarded they will be taken to onboarded page first, then come back to the login/signup page
    },
    location:
    {
      type:String,
      default:"",  
    },
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ] //since friends will have id, associated with them, like id1 of friend1,id2 of friend2
}, { timestamps: true }
);

//createdAt,updatedAt

const User = mongoose.model("User", userSchema);

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    
    try{
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next();
    }
    catch(error)
    {

    }
});
export default User; 