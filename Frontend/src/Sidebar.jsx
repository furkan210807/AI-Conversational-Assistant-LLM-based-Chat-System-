import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import {v1 as uuidv1} from "uuid";

function Sidebar(){
    const{ allThreads,setAllThreads,currThreadId,setNewChat,setPrompt,setReply,setCurrThreadId,setPrevChats} = useContext(MyContext);
    const getAllThreads =async()=>{
        try{
           const response = await fetch("http://localhost:8080/api/thread");
           const res = await response.json();
           const filteredData = res.map(thread =>({threadId:thread.threadId, title: thread.title}));
           console.log(filteredData);
           setAllThreads(filteredData);
        }catch(err){
            console.log(err);
        }

    };
    useEffect(()=>{
        getAllThreads();

    },[currThreadId])

    const createNewChat = ()=>{
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    }

    const changeThread = async(newThreadId)=>{
        setCurrThreadId(newThreadId);
        try{
            const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
            const res = await response.json();
            console.log(res);
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        }catch(err){
            console.log(err);
        }
    }

    const deleteThread = async(threadId) =>{
        try{
           const response = await fetch(`http://localhost:8080/api/thread/${threadId}`, {method : "DELETE"});
           const res =await response.json();
           console.log(res);
           //updates threads re-render
           setAllThreads(prev => prev.filter(thread=>thread.threadId!==threadId));

           if(threadId===currThreadId){
            createNewChat();
           }

        }catch(err){
            console.log(err);
        }
    }


    return(
        <section className="sidebar">
            
            {/*new chat Button*/}
            <button onClick={createNewChat}>
                <img src="https://imgs.search.brave.com/nGld_ROSRtP-EAQeEttK9iuxrd98dDnt7dB2EyFhN5s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvcHJl/dmlld3MvMDIxLzYw/OC83OTAvbm9uXzJ4/L2NoYXRncHQtbG9n/by1jaGF0LWdwdC1p/Y29uLW9uLWJsYWNr/LWJhY2tncm91bmQt/ZnJlZS12ZWN0b3Iu/anBn" alt="gpt logo" className="logo" />
                New Chat
              <span><i className="fa-solid fa-pen-to-square"></i></span> 
            </button>
            {/*history*/}
            <ul className="history">
                {
                    allThreads?.map((thread,idx)=>(
                        <li key={idx}
                        onClick={()=>changeThread(thread.threadId)}
                        className={thread.threadId ===currThreadId ? "highlighted": ""}
                        >
                            {thread.title}
                            <i className="fa-solid fa-trash"
                            onClick={(e)=>{
                                e.stopPropagation();//stop event bubbling
                                deleteThread(thread.threadId);
                            }}
                            ></i>
                        </li>

                    ))
                }
               
            </ul>
            {/*sign*/}
            <div className="sign">
                <p>By Apna College &hearts;</p>
            </div>
        </section>
    )
}

export default Sidebar;