import express from  "express";
import Thread from "../models/Thread.js"
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
      const thread = await Thread.findOne({threadId});
      if(!thread){
        res.status(404).json({error:"Thread is not Found"});
        }
      res.json(thread.messages);
    }catch(err){
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
        res.status(404).json({error:"Thread is not Found"});
        
      }
      res.status(200).json({success: "Thread Deleted Successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({error : "Failed to delete Thread"});
    }
});

export default router;

