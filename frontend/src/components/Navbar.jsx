import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h3>Reminder App</h3>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;