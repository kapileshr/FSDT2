import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      const { user } = data;
      const name = user?.user_metadata?.name || "Unknown";
      const role = user?.user_metadata?.role || "user";
      console.log("Logged in as:", name, "Role:", role);

      alert(`Welcome ${name}!`);
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Log-In</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="login-input" 
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="login-input" 
            required
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;