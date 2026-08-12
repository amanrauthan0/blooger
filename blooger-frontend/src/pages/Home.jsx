import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Home() {
  
  const [blogs,setBlogs]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    getblogs();
  },[])

  async function getblogs() {
    try {
      const res = await fetch(
        "http://localhost:3000/api/blog/blogs"
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
    <div className="bg-black h-dvh p-5 text-white">
      {loading ? (
        <h1 className="text-xl font-bold">
          Loading...
        </h1>):
       blogs.length === 0 ? (
          <h1 className="text-xl font-bold">
            No Content
          </h1>
        ):
        (blogs.map((blog) => (
          <Link key={blog._id}
           to={`/blog/${blog._id}`}>
            <div
              key={blog._id}
              className="border-b border-slate-700 py-4"
            >
              <h2 className="text-xl font-bold text-white">
                {blog.title}
              </h2>

              <p className="text-slate-400 mt-2">
                {blog.content.slice(0, 150)}...
              </p>

              <p className="text-xs text-slate-500 mt-2 ">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
       )))
      }
    </div>
    
  )
}
