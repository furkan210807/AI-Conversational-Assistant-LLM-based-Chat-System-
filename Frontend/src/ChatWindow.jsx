import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import {MyContext} from "./MyContext.jsx";
import { useContext,useState,useEffect } from "react";
import {ScaleLoader} from "react-spinners";
function ChatWindow(){
    const {prompt,setPrompt,reply,setReply ,currThreadId,prevChats,setPrevChats,setNewChat} = useContext(MyContext);
    const [loading,setLoading] = useState(false);
    const [isOpen ,setIsOpen] = useState(true);//set default  false 
    const getReply = async()=>{
        setLoading(true);
        setNewChat(false);
        const options = {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                message:prompt,
                threadId:currThreadId

            })
        };
        try{
           const response = await fetch("http://localhost:8080/api/chat",options);
           const res = await response.json();
           console.log(res);
           setReply(res.reply);

        }catch(err){
            console.log(err);
        }finally{

            setLoading(false);
        }
    }
    //Append New Chats to prevChats
    useEffect(()=>{
        if(prompt && reply){
            setPrevChats(prevChats =>(
                [...prevChats,{
                    role: "user",
                    content : prompt
                },{
                    role: "assistant",
                    content : reply
                }]
            ));
        }
        setPrompt("");

    },[reply]);

    const handleProfileClick = ()=>{
        setIsOpen(!isOpen);
    }



    return (
        <div className="ChatWindow">
            <div className="navbar">
                <span>SigmaGPT <i className="fa-solid fa-angle-down"></i></span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>

            </div>
            {
                isOpen && 
                <div className="dropDown">
                    <div className="dropDownItems"><i className="fa-solid fa-cloud-arrow-up"></i>Upgrade Plan</div>
                    <div className="dropDownItems"><i className="fa-solid fa-gear"></i>Settings</div>
                    <div className="dropDownItems"><i className="fa-solid fa-share-nodes"></i>Share</div>
                    <div className="dropDownItems"><i class="fa-solid fa-right-from-bracket"></i>LogOut</div>

                </div>
            }
            <Chat></Chat>
            <ScaleLoader color="#fff" loading={loading} >

            </ScaleLoader>
            <div className="chatInput">
                <div className="inputBox">
                    <input type="text" placeholder="Ask Anything"
                    value={prompt}
                    onChange={(e)=>setPrompt(e.target.value)}
                    onKeyDown={(e)=>e.key==='Enter'? getReply():''} />
                    
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">SigmaGPT Can Make Mistakes.Check Important info.See Cookie Preferences</p>

            </div>
            
        </div>
    )
}
export default ChatWindow;