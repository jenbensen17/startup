import React from "react";

export function Unauthenticated(props) {

    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');

    async function loginUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
      }
    
      async function createUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
      }

    return (
        <>
        <div className="login-form">
            <div className="login">
                <span>Email:</span>
                <input 
                type="text" 
                placeholder="user@email.com"
                onChange={(e) => {
                    setUserName(e.target.value)
                }}
                />
            </div>
            <div className="login">
                <span>Password:</span>
                <input 
                type="password" 
                placeholder="password"
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
                />
            </div>
            <div>
                <button 
                type="button"
                onClick={() => loginUser()}
                disabled={!userName || !password}
                > Login
                </button>
                <button type="button"
                onClick={() => createUser()} disabled={!userName || !password}
                > Register
                </button>
            </div>
        </div>
        
        </>
    )
}