import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Navbar from "../components/Navbar";

export default function BlogReader() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  async function getblog() {
    const res = await fetch(
      `http://localhost:3000/api/blog/${id}`
    );

    const data = await res.json();
    setBlog(data);
    
  }

  useEffect(() => {
    getblog();
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-lg">
          Loading blog...
        </p>
      </div>
    );
  }

  return (
    
    
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div>
       <Navbar/>
      </div>
      {/* Article header */}
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-10">

        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white">
          {blog.title}
        </h1>

        <div className="flex items-center gap-3 mt-6 text-sm text-slate-400">

          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold">
            {blog.author?.username?.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="text-slate-200 font-medium">
              {blog.author?.username}
            </p>

            <p className="text-slate-500">
              {new Date(blog.createdAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </p>
          </div>

        </div>
      </header>


      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-slate-800" />
      </div>


      {/* Article content */}
      <main className="max-w-3xl mx-auto px-6 py-12">

        <article
          className="
            prose
            prose-invert
            prose-lg
            max-w-none

            prose-headings:text-white
            prose-headings:font-bold

            prose-h1:text-4xl
            prose-h2:text-3xl
            prose-h3:text-2xl

            prose-p:text-slate-300
            prose-p:leading-8

            prose-a:text-blue-400
            prose-a:no-underline
            hover:prose-a:underline

            prose-strong:text-white

            prose-blockquote:border-l-blue-500
            prose-blockquote:text-slate-400

            prose-code:text-blue-300

            prose-li:text-slate-300
          "
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {blog.content}
          </ReactMarkdown>
        </article>

      </main>

    </div>
  );
}

