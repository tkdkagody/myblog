import moment from "moment";
import  mongoose  from "mongoose";

// create Schema
const UserSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
    },
    email : {
        type: String, 
        required : true, 
        unique: true, 
    },
    password :{
        type: String, 
        required : true, 
    },
    role:{
        type: String, 
        enum : ['MainJuin', 'SubJuin', 'User'],
        default: 'User',
    },
    register_date: {
        type: Date,
        default : moment().format("YYYY-MM-DD") ,
    },
    comments: [
        {
            post_id : {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'post'
            },
            comment_id : {
                type: mongoose.Schema.Types.ObjectId,
                ref: "comments",
            }
        }
    ],
    posts : [  //다 :배열구조
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",  //post라고 부르겠다~
        }
    ],
});

const User = mongoose.model("user", UserSchema) ;  //이 UserSchema 모델을 불러올때 'user'라고 참조하겠다. 
export default User; 