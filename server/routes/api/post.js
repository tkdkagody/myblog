import express from "express";
 
//model : 글을 쓰기 위해 mongodb 모델을 불러와야함 
import Post from "../../models/post";

const router = express.Router()

// api/post 
router.get('/', async(req,res)=>{
    const postFindResult = await Post.find();
    console.log(postFindResult, "All Post Get")
    res.json(postFindResult)
})

router.post('/', async(req,res,next) => {
    try{
        console.log(req,'post-req')
        const { title, contents, fileUrl, creator } = req.body
        const newPost = await Post.create({
            title,
            contents,
            fileUrl,
            creator
        });
        res.json(newPost);
    }catch(e){
        console.log(e)
    }
});

export default router;