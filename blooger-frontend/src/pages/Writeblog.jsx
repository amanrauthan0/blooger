import { useState } from 'react'
import Editor from '../components/Editor'
import Preview from '../components/Preview'
import { MarkdownProvider } from '../context/UseMarkdown'
import ReactModal from 'react-modal'

export function Writeblog() {

  const[isModal,setisModal]=useState(false);
  const[blogTitle,setblogTitle]=useState("");

  function OpenModal(){
    setisModal(true);
  }
  return (
      <MarkdownProvider> 
      <div className="flex h-screen">
        <Editor/>
       <Preview />
       <button className='bg-amber-300  flex ' 
       onClick={
        ()=>{OpenModal()}} > POST </button>

       <ReactModal 
       isOpen={isModal}
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
                  console.log(blogTitle);
                  setisModal(false);
                  setblogTitle("");
                }}
              >
                Create
              </button>

              <button 
              onClick={() => {
                setisModal(false);
                setblogTitle("");
              }}>
                Cancel
              </button>
              </div>
       </ReactModal>
      </div>
      
     </MarkdownProvider>
    
    
  )
}
