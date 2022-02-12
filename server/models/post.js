import mongoose from 'mongoose';
import moment from 'moment';

const PostSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true, 
        index: true,   //검색기능 향상 ? 
        
    },
    contents : {
        type: String, 
        required: true, 
    },
    views: {
        type:Number,
        default: -2  //작성자의 첫 뷰도 카운트 되는것 막기 위해 ? 
    },
    fileUrl: {
        type: String, 
        default : "https://source.unsplash.com/random/301x201"  //빈 이미지 막기 위해 랜덤값으로 이미지 넣어둠 
    },
    date: {
        type: String,
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    comments : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
    ],
    creator : {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    }
});

const Post = mongoose.model('post', PostSchema)

export default Post ;


