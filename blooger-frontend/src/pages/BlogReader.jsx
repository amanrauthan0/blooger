import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Navbar from "../components/Navbar";

export default function BlogReader() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getblog() {
    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blog/${id}`
      );

      const data = await res.json();

      setBlog(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getblog();
  }, [id]);


  /* LOADING */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f0e] text-white">

        <Navbar />

        <main className="max-w-4xl mx-auto px-6 pt-5">

          <div className="animate-pulse">

            <div className="h-5 bg-slate-800 rounded w-24" />

            <div className="h-12 bg-slate-800 rounded w-4/5 mt-7" />

            <div className="h-12 bg-slate-800 rounded w-3/5 mt-3" />

            <div className="flex items-center gap-3 mt-8">

              <div className="w-10 h-10 rounded-full bg-slate-800" />

              <div>
                <div className="h-4 bg-slate-800 rounded w-24" />
                <div className="h-3 bg-slate-800 rounded w-32 mt-2" />
              </div>

            </div>

          </div>

        </main>

      </div>
    );
  }


  /* BLOG NOT FOUND */

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#0b0f0e] text-white">

        <Navbar />

        <div className="min-h-[70vh] flex flex-col items-center justify-center">

          <div className="text-5xl mb-5">
            ✦
          </div>

          <h1 className="text-2xl font-semibold">
            post not found
          </h1>

          <p className="text-slate-500 mt-2">
            This post may have been deleted or doesn't exist.
          </p>

          <Link
            to="/"
            className="
              mt-6
              px-5
              py-2.5
              rounded-xl
              bg-emerald-500
              hover:bg-emerald-400
              text-[#07100d]
              font-semibold
              transition
            "
          >
            Back to Home
          </Link>

        </div>

      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#0b0f0e] text-slate-100">

      <Navbar />

      {/* ARTICLE HEADER */}

      <header className="max-w-4xl mx-auto px-6 pt-1 md:pt-2 pb-12">

        {/* TITLE */}

        <h1
          className="
            text-4xl
            md:text-6xl
            font-bold
            leading-[1.1]
            tracking-tight
            text-slate-100
            mt-8
            max-w-4xl
          "
        >
          {blog.title}
        </h1>


        {/* AUTHOR */}

        <div className="flex items-center gap-4 mt-8">

          <div
            className="
              w-11
              h-11
              rounded-full
              bg-[#17352b]
              border
              border-[#294139]
              flex
              items-center
              justify-center
              text-emerald-400
              font-semibold
              text-lg
            "
          >
            {blog.author?.username
              ?.charAt(0)
              .toUpperCase() || "U"}
          </div>


          <div>

            <p className="text-sm font-medium text-slate-200">
              {blog.author?.username || "Anonymous"}
            </p>

            <p className="text-sm text-slate-600 mt-1">
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


      {/* DIVIDER */}

      <div className="max-w-4xl mx-auto px-6">

        <div className="h-px bg-[#1c2925]" />

      </div>


      {/* ARTICLE */}

      <main className="max-w-4xl mx-auto p-6 md:py-5">

        <article
          className="
            prose
            prose-lg
            prose-invert
            max-w-none

            prose-headings:text-slate-100
            prose-headings:font-bold
            prose-headings:tracking-tight

            prose-h1:text-4xl
            prose-h1:mt-12
            prose-h1:mb-6

            prose-h2:text-3xl
            prose-h2:mt-12
            prose-h2:mb-5

            prose-h3:text-2xl
            prose-h3:mt-10

            prose-p:text-slate-300
            prose-p:leading-[1.9]

            prose-a:text-emerald-400
            prose-a:no-underline
            hover:prose-a:underline

            prose-strong:text-slate-100

            prose-em:text-slate-300

            prose-blockquote:border-l-emerald-500
            prose-blockquote:text-slate-400
            prose-blockquote:bg-[#111816]
            prose-blockquote:rounded-r-xl
            prose-blockquote:py-2

            prose-li:text-slate-300
            prose-li:marker:text-emerald-500

            prose-hr:border-[#1c2925]

            prose-code:text-emerald-300
            prose-code:bg-[#111816]
            prose-code:px-1.5
            prose-code:py-0.5
            prose-code:rounded

            prose-pre:bg-[#080c0b]
            prose-pre:border
            prose-pre:border-[#1c2925]
            prose-pre:rounded-xl
            prose-pre:shadow-lg
          "
        >

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {blog.content}
          </ReactMarkdown>

        </article>


        {/* END OF ARTICLE */}
      </main>

    </div>
  );
}