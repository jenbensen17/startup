import React from 'react';
import './nav.css';
import './app.css';


export default function App() {
    return (
    <div className='body'>
         <header>
            <a href="index.html" className="logo">
                <img className="logo-img" src="/def-cor.png" />
                <h1>DEFCOR-FIT</h1>
            </a>
            <nav>
                <menu>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="dashboard.html">Dashboard</a></li>
                    <li><a href="log.html">Log Workout</a></li>
                </menu>
            </nav>
        </header>

        <main>App components go here</main>

        <footer>
            <span>Made by Ben Jensen</span>
            <br />
            <a href="https://github.com/jenbensen17/startup">GitHub Repo</a>
        </footer>

    </div>
    );
  }