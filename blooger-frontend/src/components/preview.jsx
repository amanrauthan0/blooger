import { UseMarkdown } from "../context/UseMarkdown";
import ReactMarkdown from "react-markdown";
import remarkgfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export default function Preview() {
  const { markdown } = UseMarkdown();

  return (
    <div
      className="
        h-full
        overflow-y-auto
        bg-[#0d1311]
        text-slate-200
        p-7
        prose
        prose-invert
        prose-headings:text-slate-100
        prose-p:text-slate-400
        prose-a:text-emerald-400
        prose-strong:text-slate-200
        max-w-none
      "
    >
      {markdown ? (
        <ReactMarkdown
          remarkPlugins={[remarkgfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {markdown}
        </ReactMarkdown>
      ) : (
        <p className="text-slate-700 italic">
          Your preview will appear here...
        </p>
      )}
    </div>
  );
}