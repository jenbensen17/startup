import React from 'react';
import './nav.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import {Login} from './login/login';
import {Dashboard} from './dashboard/dashboard';
import {Workout} from './workout/workout';

export default function App() {
    return (
    <BrowserRouter>
    <div className='body'>
         <header>
            <NavLink to="index.html" className="logo">
                <img className="logo-img" src="/def-cor.png" />
                <h1>DEFCOR-FIT</h1>
            </NavLink>
            <nav>
                <menu>
                    <li><NavLink to=''>Login</NavLink></li>
                    <li><NavLink to='dashboard'>Dashboard</NavLink></li>
                    <li><NavLink to="workout">Log Workout</NavLink></li>
                </menu>
            </nav>
        </header>

        

        {/* // to */}

        <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/workout' element={<Workout />} />
            <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
            <span>Made by Ben Jensen</span>
            <br />
            <NavLink to="https://github.com/jenbensen17/startup">GitHub Repo</NavLink>
        </footer>

    </div>
    </BrowserRouter>
    );
  }

  function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }