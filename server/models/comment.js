import mongoose from 'mongoose';
import moment from 'moment';

//create Schema
const CommentSchema = new mongoose.Schema({
    contents: {
        type: String, 
        required: true,
    },
    date:{
        type: String, 
        default: moment().format('YYYY-MM-DD hh:mm:ss'),
    },
    post: {  //comment 는 Post와 연결되어있어야 함 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
    },
    creator:{  //comment 유저도 있어야 함 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    creatorName : {
        type: String,
    }
});

const Comment = mongoose.model('comment', CommentSchema);
export default Comment; 