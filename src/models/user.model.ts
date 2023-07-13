import mongoose from "mongoose";
import bcrypt from 'bcrypt';

export interface  UserDocument extends mongoose.Document{
    email:string,
    name:string,
    password:string,
    createdAt?:Date,
    updatedAt?:Date,
    comparePassword(candidatePassword: string): Promise<Boolean>;

}

const userSchema=new mongoose.Schema({
email:{type:String,
  require:true,
  unique:true,
},
name:{type:String,
  require:true},

password:{require:true,
  type:String}
},{
    timestamps:true
})


userSchema.pre("save", async function (next) {
    let user = this as UserDocument;  
    if (!user.isModified("password")) {
      return next();
    }
    const hash = await bcrypt.hashSync(user.password, 8);
    user.password = hash;

    return next();
  });

  userSchema.methods.comparePassword = async function (
    candidatePassword: string
  ): Promise<boolean> {
    const user = this as UserDocument;
  
    return bcrypt.compare(candidatePassword, user.password)
  };


const UserModel=mongoose.model<UserDocument>("User",userSchema)
export default UserModel