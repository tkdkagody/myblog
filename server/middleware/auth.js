import jwt from "jsonwebtoken";

import config from "../config";
const { JWT_SECRET } = config; 


const auth = (req, res, next) => {
    //헤더에 x-어쩌구로 설정하거나, url파라미터로 서버로 전달하면 !
    const token = req.header("x-auth-token");
    
    //token이 없으면 
    if(!token){
        return res.status(401).json({msg:"토큰없음. 인증거부"})
    }
    //token이 있으면 
    try{
        //토큰값 해석하고 
        const decoded = jwt.verify(token,JWT_SECRET)
        console.log(req.user, "sfdsdfsdf===")
        //req.user와 토큰해석값이 같으면 ????====================================뭐지 여기 
        req.user = decoded
        //다음으로 넘어감 
        next();

    }catch(e){
        console.log(e)
        res.status(400).json({msg: "토큰값이 유효하지 않다"})
    }
}


export default auth; 