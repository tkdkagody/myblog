import express from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from "../../config/index";
const { JWT_SECRET } = config; 
//model
import User from "../../models/user";

const router = express.Router();

//@routes  GET api/user
//@desc    get all user 
//@access  public

router.get('/', async(req,res)=>{
    try{

        const users = await User.find();
        if(!users) throw Error("No users");
        res.status(200).json(users);

    }catch(e){

        console.log(e);
        res.status(400).json({meg: e.message});

    }
})


//@routes  POST api/user
//@desc    Register user 
//@access  public
router.post('/', async(req,res)=> {
    console.log(req.body)
    const {name, email, password} = req.body
    
    //simple validation
    if(!name || !email || !password){
        return res.status(400).json({msg:"모든 필드를 채워주세요"});
    }


    //check for existing user
    User.findOne({email})
    .then((user) => {
        if(user){
            return res.status(400).json({msg: "이미 가입된 유저가 존재합니다."})
        }

        const newUser = new User({
            name,
            email,
            password,
        });
   

    //암호 해쉬 (2의10승, )
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err; 
            newUser.password = hash;  //hash값으로 ct에 전달할거임
            newUser.save().then((user)=> {  //여기서 newUser에 세이브 처음으로 진행 ! 
                jwt.sign(   //토큰 생성함 (아이디, 시크릿,만료일, (에러,토큰)=> { 응답값 보내기})
                    {id:user.id}, JWT_SECRET, {expiresIn: 3600},
                    (err,token)=> {
                        if(err) throw err; 
                        res.json({ //응답값 ! : 토큰 + 유저값
                            token, 
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        })
                    }
                )
            })

        })
    })
})
})

export default router;