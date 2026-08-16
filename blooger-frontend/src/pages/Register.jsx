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
          setUser(data.user);
          setAccessToken(data.accessToken);
          setLoading(false);
          navigate("/");

      }catch(err){
          console.log(err);
      }
  }

  return (
    <div className="min-h-screen bg-[#0b0f0e] text-white flex items-center justify-center px-4">

      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-3xl" />

      <div
        className="
          relative
          w-full
          max-w-md
          bg-[#111816]
          border
          border-[#1c2925]
          rounded-3xl
          shadow-[0_20px_60px_rgba(0,0,0,0.35)]
          p-8
        "
      >

        {/* Header */}

        <div className="text-center mb-8">

          <div
            className="
              w-16
              h-16
              mx-auto
              rounded-2xl
              bg-[#17352b]
              border
              border-emerald-900
              flex
              items-center
              justify-center
              text-2xl
              text-emerald-400
            "
          >
            ✦
          </div>

          <h1 className="text-3xl font-bold mt-5">
            Create Account
          </h1>

          <p className="text-slate-400 mt-2">
            Join the community and start sharing your stories.
          </p>

        </div>


        {/* Form */}

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >

          {/* Username */}

          <div>

            <label className="block text-sm text-slate-400 mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="John Doe"
              name="username"
              value={formdata.username}
              onChange={handleChange}
              required
              className="
                w-full
                rounded-xl
                bg-[#0b0f0e]
                border
                border-[#29352f]
                px-4
                py-3
                text-white
                placeholder:text-slate-600
                outline-none
                focus:border-emerald-500
                focus:ring-2
                focus:ring-emerald-500/20
                transition
              "
            />

          </div>


          {/* Email */}

          <div>

            <label className="block text-sm text-slate-400 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="john@gmail.com"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              required
              className="
                w-full
                rounded-xl
                bg-[#0b0f0e]
                border
                border-[#29352f]
                px-4
                py-3
                text-white
                placeholder:text-slate-600
                outline-none
                focus:border-emerald-500
                focus:ring-2
                focus:ring-emerald-500/20
                transition
              "
            />

          </div>


          {/* Password */}

          <div>

            <label className="block text-sm text-slate-400 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              required
              className="
                w-full
                rounded-xl
                bg-[#0b0f0e]
                border
                border-[#29352f]
                px-4
                py-3
                text-white
                placeholder:text-slate-600
                outline-none
                focus:border-emerald-500
                focus:ring-2
                focus:ring-emerald-500/20
                transition
              "
            />

          </div>


          {/* Create Account */}

          <button
            type="submit"
            className="
              w-full
              rounded-xl
              bg-emerald-500
              py-3
              font-semibold
              text-[#07100d]
              transition-all
              hover:bg-emerald-400
              hover:-translate-y-0.5
            "
          >
            Create Account
          </button>

        </form>


        {/* Divider */}

        <div className="flex items-center gap-3 my-8">

          <div className="flex-1 h-px bg-[#1c2925]" />

          <span className="text-slate-600 text-sm">
            or
          </span>

          <div className="flex-1 h-px bg-[#1c2925]" />

        </div>


        {/* Login */}

        <div className="text-center">

          <p className="text-slate-400">
            Already have an account?
          </p>

          <Link
            to="/login"
            className="
              inline-block
              mt-3
              text-emerald-400
              font-medium
              hover:text-emerald-300
              transition
            "
          >
            Login →
          </Link>

        </div>

      </div>

    </div>
  );
}