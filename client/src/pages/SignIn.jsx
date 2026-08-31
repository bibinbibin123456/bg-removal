import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import logo from "../assets/assets.jpg";

const SignIn = () => {
  const navigate = useNavigate();
  const { backendUrl, setToken, setUser, setCredit } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    const nextErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!emailRegex.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!passwordRegex.test(password)) {
      nextErrors.password = "Use at least 8 characters with letters and numbers.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(`${backendUrl}/api/user/login`, {
        email: email.trim(),
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
        setCredit(data.user.credits ?? 0);
        toast.success("Signed in successfully");
        navigate("/");
      } else {
        toast.error(data.message || "Unable to sign in");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_35%),linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_45%,_#fdf2f8_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-[0_25px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-16 w-16 rounded-3xl bg-slate-100 p-3" />
        </div>

        <div className="text-center mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
            Sign In
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">
            Welcome back
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Sign in to access your background removal workspace.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email address
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              type="email"
              placeholder="you@example.com"
              className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                errors.email
                  ? "border-rose-400 focus:ring-rose-400"
                  : "border-slate-200 focus:ring-indigo-500"
              }`}
            />
            {errors.email ? <p className="mt-2 text-sm text-rose-500">{errors.email}</p> : null}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-sm font-medium text-indigo-600 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
              }}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                errors.password
                  ? "border-rose-400 focus:ring-rose-400"
                  : "border-slate-200 focus:ring-indigo-500"
              }`}
            />
            {errors.password ? <p className="mt-2 text-sm text-rose-500">{errors.password}</p> : null}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          New here?{" "}
          <Link to="/signup" className="font-semibold text-indigo-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;