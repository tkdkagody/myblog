import app from './app' ;
import config from '../server/config';
const {PORT } = config;


app.listen('7000', () => {
    console.log(`server started on PORT ${PORT}`);
})