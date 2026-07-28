import { UseMarkdown } from "../context/UseMarkdown"

export default function Editor(){
    const {markdown,setMarkdown}=UseMarkdown()

    return(
        <>
        <textarea name="markinput" 
        className="
        bg-slate-900
        text-amber-50
        w-1/2
        h-full
        p-4
        border-r
        outline-none
        resize-none
        font-mono
        "
        value={markdown}
        onChange={(e)=>setMarkdown(e.target.value)}
        placeholder="Write your markdown here..."
        >
      </textarea>
        
        </>
    )
}