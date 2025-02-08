import React from 'react';
import './login.css'
export function Login() {
  return (
    <main className="login-page">
        <h1>Welcome to DEFCOR-FIT</h1>
        
        <form method="get" action="dashboard.html">
            <div className="login">
                <span>Email:</span>
                <input type="text" placeholder="user@email.com" />
            </div>
            <div className="login">
                <span>Password:</span>
                <input type="password" placeholder="password" />
            </div>
            <div>
                <button type="submit">Login</button>
                <button type="submit">Register</button>
            </div>
        </form>
    </main>
  );
}