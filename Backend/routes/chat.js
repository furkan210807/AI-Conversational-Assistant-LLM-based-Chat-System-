import express from  "express";
import Thread from "../models/Thread.js"
import getOpenAIApIResponse from "../utils/openai.js";
const router = express.Router();


//test
router.post("/test",async(req,res)=>{
    try{
        const thread = new Thread({
        threadId: "abc",
        title : "Testing new Thread2"
    });
     const response = await thread.save();
    res.send(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error : "Failed to Save DataBase"});
    }
});

//to get all threads
router.get("/thread",async(req,res)=>{
    try{
        const threads = await Thread.find({}).sort({updatedAt:-1});
        res.json(threads);
    }catch(err){
        console.log(err);
         res.status(500).json({error : "Failed to Fetch Threads"});
    }
});

//get thread

router.get("/thread/:threadId",async(req,res)=>{
    try{
        const {threadId} = req.params;
      let  thread = await Thread.findOne({threadId});

        if(!thread){
       return res.status(404).json({error:"Thread is not Found"});
        }

      res.json(thread.messages);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "Failed to Fetch Thread"});
    }
});

//delete thread
router.delete("/thread/:threadId",async(req,res)=>{
    try{
        const {threadId} = req.params;
      const deletedThread = await Thread.findOneAndDelete({threadId});
      if(!deletedThread){
       return res.status(404).json({error:"Thread is not Found"});
        
      }
      res.status(200).json({success: "Thread Deleted Successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({error : "Failed to delete Thread"});
    }
});

router.post("/chat",async(req,res)=>{
    console.log("BODY:", req.body);
    const {threadId,message} = req.body || {};

        if(!threadId || !message){
          return  res.status(404).json({error: "Missing required Fields"});
        }
    try{
        let thread = await Thread.findOne({threadId});
        if(!thread){
            //create a new thread in DB
            thread = new Thread({
                threadId,
                title: message,
                messages : [{role: "user", content: message}]
            });
        }else{
            thread.messages.push({role: "user", content: message})
        }
        const assistantReply = await getOpenAIApIResponse(message);
        thread.messages.push({role: "assistant", content: assistantReply});
        thread.updatedAt = new Date();
        await thread.save();
        res.json({reply: assistantReply})
        
         }catch(err){
        console.log(err);
         res.status(500).json({error : "Something Went Wrong"});
    }
})
//hello
export default router;

