import { useState } from 'react'
import Editor from '../components/Editor'
import Preview from '../components/Preview'
import { MarkdownProvider, UseMarkdown } from '../context/UseMarkdown'
import ReactModal from 'react-modal'

export function Writeblog() {

  const{markdown,setMarkdown}=UseMarkdown();

  const[isModal,setisModal]=useState(false);
  const[blogTitle,setblogTitle]=useState("");

  function OpenModal(){
    setisModal(true);
  }

  async function postblog(){
    const res=await fetch("http://localhost:3000/api/blog/postblog",{
      headers: {
        "Content-Type": "application/json",
      },
      method:"POST",
      credentials:"include",
      body:JSON.stringify({
        title:blogTitle,
        content:markdown
      })
    })
  }

  return (
      <div className="flex h-screen">
       <Editor/>
       <Preview />
       <button className='bg-amber-300  flex ' 
       onClick={
        ()=>{OpenModal()}} > POST </button>

       <ReactModal 
       isOpen={isModal}
       ariaHideApp={false}
       style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        content: {
          position: "relative",
          inset: "auto",
          width: "450px",
          background: "#1e293b",
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          padding: "25px",
        },
        
       }}>

        <h2>Blog Name</h2>
            <input
              type="text"
              placeholder="Blog title"
              value={blogTitle}
              style={
                {
                  padding:" 10px  0px",
                  width:"410px",
                  outline:"1px"
                }
              }
              onChange={(e) => setblogTitle(e.target.value)}
            />

            <div className="buttons"
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}>
              <button
                onClick={() => {
                  postblog();
                  setisModal(false);
                  setblogTitle("");
                  setMarkdown("")
                }}
              >
                Create
              </button>

              <button 
              onClick={() => {
                console.log(markdown);
                setisModal(false);
                setblogTitle("");
              }}>
                Cancel
              </button>
              </div>
       </ReactModal>
      </div>    
    
  )
}
