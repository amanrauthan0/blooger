import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser, setAccessToken, setLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setUser(data.user);
      setAccessToken(data.accessToken);
      setLoading(false);

      navigate("/");

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  }

  return (
  <div className="min-h-screen bg-[#0b0f0e] flex items-center justify-center px-4">

    <div
      className="
        w-full
        max-w-md
        bg-[#111816]
        border
        border-[#1c2925]
        rounded-3xl
        p-8
        shadow-2xl
      "
    >

      {/* Brand */}

      <div className="text-center mb-8">

        <p className="text-emerald-500 text-sm tracking-[0.25em] uppercase">
          Blooger
        </p>

        <h1 className="text-3xl font-bold text-slate-100 mt-3">
          Welcome Back
        </h1>


      </div>


      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* Email */}

        <div>

          <label className="block text-sm text-slate-400 mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="
              w-full
              px-4
              py-3
              rounded-xl
              bg-[#0b0f0e]
              border
              border-[#293a33]
              text-slate-100
              placeholder:text-slate-600
              outline-none
              focus:border-emerald-500
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
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="
              w-full
              px-4
              py-3
              rounded-xl
              bg-[#0b0f0e]
              border
              border-[#293a33]
              text-slate-100
              placeholder:text-slate-600
              outline-none
              focus:border-emerald-500
              transition
            "
          />

        </div>


        {/* Submit */}

        <button
          type="submit"
          className="
            w-full
            py-3
            rounded-xl
            bg-emerald-500
            hover:bg-emerald-400
            text-[#07100d]
            font-semibold
            transition
          "
        >
          Login
        </button>

      </form>


      {/* Footer */}

      <div className="mt-8 text-center">

        <p className="text-slate-500">
          Don't have an account?

          <Link
            to="/register"
            className="
              ml-2
              text-emerald-400
              hover:text-emerald-300
              font-medium
            "
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  </div>
)
}