import { UseMarkdown } from "../context/UseMarkdown";
import ReactMarkdown from "react-markdown";
import remarkgfm from "remark-gfm";
import 'highlight.js/styles/github-dark.css'
import rehypeHighlight from "rehype-highlight";

export default function Preview(){

    const {markdown}=UseMarkdown()

    return(
        
        <div 
        className="bg-slate-900 text-slate-100 w-1/2 h-full overflow-y-auto p-6 prose prose-invert max-w-none">
        <ReactMarkdown
        remarkPlugins={[remarkgfm]}
        rehypePlugins={[rehypeHighlight]}
        >
            {markdown || "EMPTY"}
        </ReactMarkdown>
      </div>
        
    )
}