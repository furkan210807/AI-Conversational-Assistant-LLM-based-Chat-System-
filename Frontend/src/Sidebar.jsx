import "./Sidebar.css"
function Sidebar(){
    return(
        <section className="sidebar">
            {/*new chat Button*/}
            <button>
                <img src="https://imgs.search.brave.com/nGld_ROSRtP-EAQeEttK9iuxrd98dDnt7dB2EyFhN5s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvcHJl/dmlld3MvMDIxLzYw/OC83OTAvbm9uXzJ4/L2NoYXRncHQtbG9n/by1jaGF0LWdwdC1p/Y29uLW9uLWJsYWNr/LWJhY2tncm91bmQt/ZnJlZS12ZWN0b3Iu/anBn" alt="gpt logo" className="logo" />
              <span><i className="fa-solid fa-pen-to-square"></i></span> 
            </button>
            {/*history*/}
            <ul className="history">
                <li>Thread1</li>
                <li>Thread2</li>
                <li>Thread3</li>
               
            </ul>
            {/*sign*/}
            <div className="sign">
                <p>By Apna College &hearts;</p>
            </div>
        </section>
    )
}

export default Sidebar;