import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ReactModal from "react-modal";

export default function Profile() {
  const navigate = useNavigate();

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const { user, logout, loading } = useAuth();

  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    myBlogs();
  }, [loading, user, navigate]);

  async function deleteBlog(id) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blog/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setBlogs((prev) =>
          prev.filter((blog) => blog._id !== id)
        );
      }

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function myBlogs() {
    try {
      setBlogsLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blog/myblogs`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      setBlogs(data.blogs);
    } catch (error) {
      console.error(error);
    } finally {
      setBlogsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0f0e] text-white px-6 py-10">

      <div className="max-w-6xl mx-auto">

        {/* PAGE HEADER */}

        <div className="mb-10">

          <p className="text-sm uppercase tracking-[0.2em] text-emerald-500">
            Your space
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Profile
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your account and stories.
          </p>

        </div>


        {/* MAIN GRID */}

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">


          {/* PROFILE CARD */}

          <div
            className="
              bg-[#111816]
              border
              border-[#1c2925]
              rounded-2xl
              p-6
              h-fit
            "
          >

            {/* Avatar */}

            <div className="flex flex-col items-center text-center">

              <div
                className="
                  w-24
                  h-24
                  rounded-full
                  bg-[#17352b]
                  border
                  border-emerald-900
                  flex
                  items-center
                  justify-center
                  text-3xl
                  font-bold
                  text-emerald-400
                "
              >
                {user?.username
                  ?.charAt(0)
                  .toUpperCase()}
              </div>

              <h2 className="text-2xl font-semibold mt-5">
                {user?.username}
              </h2>

              <p className="text-slate-500 text-sm mt-1 break-all">
                {user?.email}
              </p>

            </div>


            {/* Divider */}

            <div className="h-px bg-[#1c2925] my-7" />


            {/* ACCOUNT */}

            <div>

              <p className="text-xs uppercase tracking-widest text-slate-600 mb-4">
                Account
              </p>

              <div className="space-y-5">

                <div>
                  <p className="text-xs text-slate-600">
                    Username
                  </p>

                  <p className="text-slate-300 mt-1">
                    {user?.username}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-600">
                    Email
                  </p>

                  <p className="text-slate-300 mt-1 break-all">
                    {user?.email}
                  </p>
                </div>

              </div>

            </div>


            {/* BUTTONS */}

            <div className="mt-8 space-y-3">

              <Link
                to="/write"
                className="
                  flex
                  justify-center
                  items-center
                  w-full
                  bg-emerald-500
                  hover:bg-emerald-400
                  text-[#07100d]
                  font-semibold
                  py-3
                  rounded-xl
                  transition
                "
              >
                + Write a story
              </Link>

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="
                  w-full
                  py-3
                  rounded-xl
                  border
                  border-[#29352f]
                  text-slate-400
                  hover:text-red-400
                  hover:border-red-900
                  transition
                "
              >
                Log out
              </button>

            </div>

          </div>


          {/* BLOGS */}

          <div>

            {/* BLOG HEADER */}

            <div className="flex items-end justify-between mb-6">

              <div>

                <h2 className="text-2xl font-semibold">
                  Your stories
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                  Stories you've published.
                </p>

              </div>

              {!blogsLoading && (
                <span
                  className="
                    text-sm
                    text-slate-500
                    bg-[#111816]
                    border
                    border-[#1c2925]
                    px-3
                    py-1.5
                    rounded-full
                  "
                >
                  {blogs.length}{" "}
                  {blogs.length === 1 ? "story" : "stories"}
                </span>
              )}

            </div>


            {/* SKELETON */}

            {blogsLoading ? (

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
                      p-6
                    "
                  >
                    <div className="h-6 bg-slate-800 rounded w-2/3" />

                    <div className="h-4 bg-slate-800 rounded w-full mt-5" />

                    <div className="h-4 bg-slate-800 rounded w-4/5 mt-2" />

                    <div className="h-3 bg-slate-800 rounded w-28 mt-5" />
                  </div>
                ))}

              </div>

            ) : blogs.length === 0 ? (

              /* EMPTY */

              <div
                className="
                  bg-[#111816]
                  border
                  border-[#1c2925]
                  rounded-2xl
                  py-24
                  text-center
                "
              >

                <div className="text-4xl mb-4">
                  ✍
                </div>

                <h3 className="text-xl font-semibold">
                  No stories yet
                </h3>

                <p className="text-slate-500 mt-2">
                  Start writing and publish your first story.
                </p>

                <Link
                  to="/write"
                  className="
                    inline-block
                    mt-6
                    px-5
                    py-2.5
                    bg-emerald-500
                    hover:bg-emerald-400
                    text-[#07100d]
                    font-semibold
                    rounded-xl
                    transition
                  "
                >
                  Start writing
                </Link>

              </div>

            ) : (

              /* BLOG LIST */

              <div className="space-y-4">

                {blogs.map((blog) => (

                  <div
                    key={blog._id}
                    className="
                      group
                      relative
                      bg-[#111816]
                      border
                      border-[#1c2925]
                      rounded-2xl
                      p-6
                      hover:bg-[#131d1a]
                      hover:border-[#294139]
                      transition
                    "
                  >

                    <Link
                      to={`/blog/${blog._id}`}
                      className="block pr-12"
                    >

                      <div className="flex items-start gap-4">

                        {/* Blog icon */}

                        <div
                          className="
                            hidden
                            sm:flex
                            shrink-0
                            w-10
                            h-10
                            rounded-lg
                            bg-[#17352b]
                            items-center
                            justify-center
                            text-emerald-400
                          "
                        >
                          ✦
                        </div>


                        <div className="min-w-0">

                          <h3
                            className="
                              text-xl
                              font-semibold
                              text-slate-100
                              group-hover:text-emerald-400
                              transition
                            "
                          >
                            {blog.title}
                          </h3>


                          <p
                            className="
                              text-slate-400
                              mt-3
                              leading-7
                              line-clamp-2
                            "
                          >
                            {blog.content.length > 150
                              ? `${blog.content.slice(0, 150)}...`
                              : blog.content}
                          </p>


                          <p className="text-xs text-slate-600 mt-4">
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

                    </Link>


                    {/* DELETE */}

                    <button
                      onClick={() => {
                        setSelectedBlog(blog);
                        setDeleteModal(true);
                      }}
                      className="
                        absolute
                        top-5
                        right-5
                        w-9
                        h-9
                        rounded-lg
                        text-slate-600
                        hover:text-red-400
                        hover:bg-red-950/40
                        transition
                      "
                      title="Delete story"
                    >
                      🗑
                    </button>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>


      {/* DELETE MODAL */}

      <ReactModal
        isOpen={deleteModal}
        onRequestClose={() => {
          setDeleteModal(false);
          setSelectedBlog(null);
        }}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(5px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
          },

          content: {
            position: "relative",
            inset: "auto",
            width: "min(420px, 90%)",
            background: "#111816",
            color: "white",
            border: "1px solid #293a33",
            borderRadius: "20px",
            padding: "30px",
          },
        }}
      >

        <div className="text-center">

          <div className="text-3xl mb-4">
            🗑
          </div>

          <h2 className="text-xl font-semibold">
            Delete story?
          </h2>

          <p className="text-slate-500 mt-3">
            Are you sure you want to delete{" "}
            <span className="text-slate-200 font-medium">
              "{selectedBlog?.title}"
            </span>
            ?
          </p>

          <p className="text-xs text-slate-600 mt-2">
            This action cannot be undone.
          </p>

        </div>


        <div className="flex justify-center gap-3 mt-7">

          <button
            className="
              px-5
              py-2.5
              rounded-xl
              border
              border-[#29352f]
              text-slate-400
              hover:bg-[#18221f]
              transition
            "
            onClick={() => {
              setDeleteModal(false);
              setSelectedBlog(null);
            }}
          >
            Cancel
          </button>

          <button
            className="
              px-5
              py-2.5
              rounded-xl
              bg-red-600
              hover:bg-red-500
              text-white
              transition
            "
            onClick={async () => {
              await deleteBlog(selectedBlog._id);

              setDeleteModal(false);
              setSelectedBlog(null);
            }}
          >
            Delete
          </button>

        </div>

      </ReactModal>

    </div>
  );
}