import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate=useNavigate();
  const { user, logout, loading } = useAuth();
  
  useEffect(()=>{
    if(!loading && !user){
      console.log("no user")
      navigate("/login")
    }
  },[user,navigate,loading]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center px-4 py-10">
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
    </div>
  );
}