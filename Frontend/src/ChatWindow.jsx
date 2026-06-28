import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import {MyContext} from "./MyContext.jsx";
import { useContext } from "react";
function ChatWindow(){
    const {prompt,setPrompt,reply,setReply} = useContext(MyContext)
    return (
        <div className="ChatWindow">
            <div className="navbar">
                <span>SigmaGPT <i class="fa-solid fa-angle-down"></i></span>
                <div className="userIconDiv">
                    <span className="userIcon"><i class="fa-solid fa-user"></i></span>
                </div>

            </div>
            <Chat></Chat>
            <div className="chatInput">
                <div className="inputBox">
                    <input type="text" placeholder="Ask Anything"
                    value={prompt}
                    onChange={(e)=>setPrompt(e.target.value)} />
                    
                    <div id="submit"><i class="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">SigmaGPT Can Make Mistakes.Check Important info.See Cookie Preferences</p>

            </div>
            
        </div>
    )
}
export default ChatWindow;