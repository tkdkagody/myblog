import mongoose from 'mongoose';

//create Schema

const CategorySchema = new mongoose.Schema({
    categoryName :{
        type: String, 
        default: "미분류",
    },
    posts : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'post',  //postSchema참조 
        },
    ],
});

const Category = mongoose.model('category', CategorySchema);
export default Category;