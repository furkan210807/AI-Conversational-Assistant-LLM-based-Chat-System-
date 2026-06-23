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

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(cors());
app.listen(PORT,()=>{
  console.log(`Port is Listening ${PORT}`);
});

app.post("/test", async(req,res)=>{
      try{
        fetch("https://api.openai.com/v1/chat/completions")

        }catch(err){
        console.log(err);
        }
})