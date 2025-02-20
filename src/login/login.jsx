import React from 'react';
import './login.css'
import { AuthState } from './authState';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';



export function Login({userName, authState, onAuthChange}) {
    {console.log(authState)}
    return (
    <main className="login-page">
        {authState !== AuthState.Unknown && <h1>Welcome to DEFCOR-FIT</h1> }
        {authState === AuthState.Authenticated && 
        <Authenticated 
        userName={userName} 
        onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} 
        />}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
    </main>
  );
}