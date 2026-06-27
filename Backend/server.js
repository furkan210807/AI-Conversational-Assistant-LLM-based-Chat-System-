// import OpenAI from 'openai';
// import 'dotenv/config';

// const client = new OpenAI({
//   apiKey: process.envOPENAI_API_KEY, 
// });

// const response = await client.responses.create({
//   model: 'gpt-5.4-mini',
//   input: 'Joke related to computer Science',
// });

// console.log(response.output_text);

import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from  "./routes/chat.js";

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(cors());
app.use("/api", chatRoutes);
app.listen(PORT,()=>{
  console.log(`Port is Listening ${PORT}`);
  connectDB();
});

const connectDB = async()=>{
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with DataBase");
  } catch(err){
    console.log("Failed Connected With DataBase",err);
  }
}

// app.post("/test", async(req,res)=>{
//     const options  = {
//       method : "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//       },
//       body :JSON.stringify({
//         model : "gpt-5.4-mini",
//         messages : [{
//            role: "user",
//            content: req.body.message
//         }]
//       })
//     }
//       try{
//        const response = await fetch("https://api.openai.com/v1/chat/completions");
//        const data = await response.json();
//       //  console.log(data.choices[0].message.content); // reply 
//        res.send(data.choices[0].message.content);
     

//         }catch(err){
//         console.log(err);
//         }
// })