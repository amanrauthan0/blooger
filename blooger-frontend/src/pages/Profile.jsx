import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Preview from "../components/Preview";
import ReactModal from "react-modal";

export default function Profile() {

  const navigate=useNavigate();
  const[deleteModal,setDeleteModal]=useState(false);
  const[selectedBlog,setSelectedBlog]=useState(null);
  const { user, logout, loading } = useAuth();
  const [blogs,setBlogs]=useState([]);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      console.log("no user");
      navigate("/login");
      return;
    }
      myBlogs()
    
  }, [loading, user, navigate]);

  async function deleteBlog(id){
    const res=await fetch(`http://localhost:3000/api/blog/delete/${id}`,{
      method:"DELETE",
      credentials:"include"
    })
    const data=await res.json();
    console.log(data);

    if(res.ok){

      setBlogs((Prev)=>{
        return Prev.filter((blog)=>blog._id !== id);
      })
    }
  }


//getting blogs 
  async function myBlogs(){
    const res=await fetch("http://localhost:3000/api/blog/myblogs",{
      method:"GET",
      credentials:"include",
    })
    const data=await res.json();
    setBlogs(data.blogs);
  }

  return (
    
    <div className="min-h-screen bg-slate-950 text-white flex p-5 gap-10 py-10">
      <div className="w-full max-w-3xl">

        {/* Profile Card */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-lg p-8">

          <div className="flex items-center gap-6">

            <div className="h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold">
              {user?.username?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                {user?.username}
              </h1>

              <p className="text-slate-400 mt-1">
                {user?.email}
              </p>
            </div>

          </div>

          <div className="mt-8 border-t border-slate-800 pt-6">

            <h2 className="text-xl font-semibold mb-4">
              Account
            </h2>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span className="text-slate-400">Username</span>
                <span>{user?.username}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Email</span>
                <span>{user?.email}</span>
              </div>

            </div>

          </div>

          <div className="mt-10 flex gap-4">

            <Link
              to="/write"
              className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold transition"
            >
              Write Blog
            </Link>

            <button
              onClick={()=>{
                logout();
                navigate("/register")
              }}
              className="ml-auto bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg font-semibold transition"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    <div className="bg-slate-900 rounded-lg w-200 p-4">

      {blogs.length === 0 ?<h1 className="text-xl font-bold">No Content</h1>:
      
        blogs.map((blog) => (
        <div key={blog._id}>
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

          <button onClick={(e)=>{
                e.stopPropagation();
                setSelectedBlog(blog);
                setDeleteModal(true)
              }}>
                <img  className="h-7 pl-140 bg-amber-50" src="bin.png" alt="delete" />
              </button>
              
              <ReactModal
                  isOpen={deleteModal}
                  onRequestClose={() => setDeleteModal(false)}
                  ariaHideApp={false}
                  style={{
                    overlay: {
                      backgroundColor: "rgba(0, 0, 0, 0.75)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    content: {
                      position: "relative",
                      inset: "auto",
                      width: "400px",
                      background: "#1e293b",
                      color: "white",
                      border: "1px solid #334155",
                      borderRadius: "12px",
                      padding: "25px",
                    },
                  }}
                >
                  <h2 className="text-xl font-bold">
                    Delete Blog?
                  </h2>

                  <p className="text-slate-400 mt-3">
                    Are you sure you want to delete{" "}
                    <span className="text-white font-semibold">
                      "{selectedBlog?.title}"
                    </span>
                    ?
                  </p>

                  <p className="text-sm text-slate-500 mt-2">
                    This action cannot be undone.
                  </p>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600"
                      onClick={() => {
                        setDeleteModal(false);
                        setSelectedBlog(null);
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700"
                      onClick={() => {
                        deleteBlog(selectedBlog._id);
                        setDeleteModal(false);
                        setSelectedBlog(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </ReactModal>
              </div>
       ))
      
      }
    
    </div>
    </div>
  );
}