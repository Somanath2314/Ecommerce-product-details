import express  from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import loginroutes from './src/routes/loginroutes.js'
import apiRoutes from './src/routes/apiRoutes.js'
import cookieParser from 'cookie-parser';
import user from './src/routes/user.js'

dotenv.config({
    path:"./.env"
});

const PORT = process.env.PORT || 8080;
const app = express();
 
app.use(
    cors({
        origin:'http://localhost:5173',
        credentials:true
    })
)
app.use(express.json({limit:"1000kb"})) 
app.use(cookieParser())
app.use(express.urlencoded({extended:true,limit:"1000kb"}))
app.use(express.static("public"))

app.use("/api/v1",loginroutes) 
app.use("/api/v1",apiRoutes) 
app.get('/', (req, res) => {
    res.send('Hello World!');
});

try {
    const res = await mongoose.connect(process.env.mongoUrl)
    console.log(`db connected ${res.connection.host}`);       
    app.listen(PORT, () => {
        console.log('Server is running on port', PORT);
    })
} catch (error) {
    console.log('some error in server connecting db', error); 
}
