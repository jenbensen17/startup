import React from "react";

export function Unauthenticated(props) {

    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');


    async function loginUser() {
        loginOrCreate(`/api/auth/login`);
      }
    
    async function createUser() {
        loginOrCreate(`/api/auth/create`);
      }

    async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ email: userName, password: password }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
          if (response?.status === 200) {
            localStorage.setItem('userName', userName);
            props.onLogin(userName);
          } else {
            const body = await response.json();
          }
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