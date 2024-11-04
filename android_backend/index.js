import express from "express";
import "./db/index.js"
import authRouter from "./routes/auth.js";
import cors from "cors";
import bodyParser from "body-parser";
const app = express()
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);


app.get("/",(req,res)=>{
    res.json({ok:true});
})

const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(`App is running on http://localhost:${PORT}`)
})