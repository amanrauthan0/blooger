import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getblogs();
  }, []);

  async function getblogs() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blog/blogs`
      );

      const data = await res.json();

      setBlogs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0f0e] text-white">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">

        <div className="max-w-3xl">

          <p className="text-sm uppercase tracking-[0.25em] text-emerald-500 font-medium">
            Discover & Read
          </p>

        </div>

      </section>


      {/* BLOG SECTION */}
      <section className="max-w-5xl mx-auto  pb-20">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-2xl font-semibold text-slate-100">
              Latest posts
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Freshly published from the community
            </p>
          </div>

          {!loading && blogs.length > 0 && (
            <span className="text-sm text-slate-500">
              {blogs.length} posts
            </span>
          )}

        </div>


        {/* LOADING */}

        {loading ? (

          <div className="space-y-4">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  animate-pulse
                  bg-[#111816]
                  border
                  border-[#1c2925]
                  rounded-2xl
                  
                "
              >

                <div className="h-6 bg-slate-800 rounded-md w-2/3" />

                <div className="h-4 bg-slate-800 rounded-md w-full mt-5" />

                <div className="h-4 bg-slate-800 rounded-md w-4/5 mt-2" />

                <div className="h-3 bg-slate-800 rounded-md w-28 mt-6" />

              </div>
            ))}

          </div>


        ) : blogs.length === 0 ? (

          /* EMPTY STATE */

          <div
            className="
              bg-[#111816]
              border
              border-[#1c2925]
              rounded-3xl
              py-24
              px-6
              text-center
            "
          >

            <div className="text-5xl mb-5">
              🌱
            </div>

            <h2 className="text-2xl font-semibold text-slate-200">
              Nothing here yet
            </h2>

            <p className="text-slate-500 mt-2">
              Be the first person to share a story.
            </p>

          </div>


        ) : (

          /* BLOGS */

          <div className="space-y-4">

            {blogs.map((blog) => (

              <Link
                key={blog._id}
                to={`/blog/${blog._id}`}
                className="block group"
              >

                <article
                  className="
                    bg-[#111816]
                    border
                    border-[#1c2925]
                    rounded-2xl
                    p-6
                    md:p-7
                    transition-all
                    duration-300
                    hover:border-emerald-900
                    hover:bg-[#131d1a]
                    hover:-translate-y-0.5
                    hover:shadow-[0_10px_40px_rgba(0,0,0,0.25)]
                  "
                >

                  {/* TOP */}

                  <div className="flex items-start justify-between gap-5">

                    <div className="min-w-0">

                      <h2
                        className="
                          text-xl
                          md:text-2xl
                          font-semibold
                          text-slate-100
                          group-hover:text-emerald-400
                          transition-colors
                        "
                      >
                        {blog.title}
                      </h2>

                    </div>

                    <span
                      className="
                        hidden
                        sm:flex
                        shrink-0
                        w-9
                        h-9
                        rounded-full
                        bg-emerald-950
                        text-emerald-400
                        items-center
                        justify-center
                        group-hover:bg-emerald-900
                        transition
                      "
                    >
                      →
                    </span>

                  </div>


                  {/* CONTENT PREVIEW */}

                  <p
                    className="
                      text-slate-400
                      mt-4
                      leading-7
                      line-clamp-2
                      max-w-3xl
                    "
                  >
                    {blog.content.length > 150
                      ? `${blog.content.slice(0, 150)}...`
                      : blog.content}
                  </p>


                  {/* FOOTER */}

                  <div className="flex items-center gap-3 mt-6">

                    <div
                      className="
                        w-8
                        h-8
                        rounded-full
                        bg-[#1d332c]
                        flex
                        items-center
                        justify-center
                        text-xs
                        font-semibold
                        text-emerald-400
                      "
                    >
                      {blog.author?.username
                        ?.charAt(0)
                        .toUpperCase() || "U"}
                    </div>

                    <div>

                      <p className="text-sm text-slate-300">
                        {blog.author?.username || "Anonymous"}
                      </p>

                      <p className="text-xs text-slate-600">
                        {new Date(
                          blog.createdAt
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>

                    </div>

                  </div>

                </article>

              </Link>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}