import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import morgan from 'morgan';
import config from './config';
import cors from "cors";




//Routes 
import postsRoutes from './routes/api/post';
import userRoutes from './routes/api/user';
import authRoutes from './routes/api/auth';

const app = express();
const {MONGO_URI} = config;


//서버 보안 측면 2개 
app.use(hpp())
app.use(helmet())
//cors 설정
app.use(cors({origin: true, credentials:true}))
app.use(morgan("dev"))
app.use(express.json()); //express에서 json형태로 응답값 해석해주세요!




mongoose.connect(MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
})
.then(()=> console.log("MongoDB connecting Success!"))
.catch((error)=> console.log(error));



// Use routes 
app.get('/');  //신호 들어온건 모두 받자 !
app.use('/api/post', postsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);



export default app; 

