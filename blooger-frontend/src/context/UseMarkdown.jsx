import { useContext,createContext,useState } from "react";

const MarkdownContext=createContext();

export const MarkdownProvider=({children})=>{
    const[markdown,setMarkdown]=useState("");

    return(
        <MarkdownContext.Provider value={{markdown,setMarkdown}}>
            {children}
        </MarkdownContext.Provider>
    )

}

export const UseMarkdown=()=>useContext(MarkdownContext); 