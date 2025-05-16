import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if(result.error) {
        alert(result.error);
      } else {
        alert('Signup successful');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  }
  
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Sign-Up</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="login-input" 
          />
          <input 
            type="email" 
            placeholder="Email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="login-input" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="login-input" 
          />

          <div style={{ marginBottom: "1rem", textAlign: "left" }}>
            <label style={{ marginRight: "1rem" }}>
              <input 
                type="radio" 
                name="role" 
                value="user"
                checked={formData.role === "user"}
                onChange={handleChange} 
              /> User
            </label>
            <label>
              <input 
                type="radio" 
                name="role" 
                value="admin"
                checked={formData.role === "admin"}
                onChange={handleChange} 
              /> Admin
            </label>
          </div>

          <button type="submit" className="login-button">Signup</button>
        </form>
        <p className="newsuer">
          <Link to='/login'>Already a user?</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
