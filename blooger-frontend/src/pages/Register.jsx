  import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";


export default function Register() {
  const navigate = useNavigate();

  const { setUser, setAccessToken, setLoading } = useAuth();

  const [formdata,setFormData]=useState({
      username:"",
      email:"",
      password:""
  });

  function handleChange(e){
      setFormData({
          ...formdata,
          [e.target.name]:e.target.value
      })
      
  }

  async function handleSubmit(e){
      e.preventDefault();

      try{
          const res=await fetch("http://localhost:3000/api/auth/register",{
              method:"POST",
              headers:{
                  "Content-Type":"application/json"
              },
              credentials:"include",
              body:JSON.stringify(formdata)
          });

          const data=await res.json();
          
          localStorage.setItem("accessToken", data.accessToken);
          setUser(data.username);
          setAccessToken(data.accessToken);
          setLoading(false);
          navigate("/");

      }catch(err){
          console.log(err);
      }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-slate-400 mt-2">
            Join our blogging community.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="block text-slate-300 mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="John Doe"
              name="username"
              value={formdata.name}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="john@gmail.com"
              name="email"
              value={formdata.name}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              name="password"
              value={formdata.name}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500"
            />
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 text-white font-semibold"
          >
            Create Account
          </button>

        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-400">
            Already have an account?
            <a
              href="/login"
              className="ml-2 text-blue-400 hover:text-blue-300"
            >
              Login
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}