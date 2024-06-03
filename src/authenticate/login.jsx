import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
    // const [token, setToken] = useState('');

    const [data, setData] = useState({
        username: '',
        password: ''
    });
    const { username, password } = data;

    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:3800/login',
            data: data
        })
            .then((res) => {
                console.log(res);
                if (res.data.token) {
                    // setToken(res.data.token);
                    localStorage.setItem('token', res.data.token);
                    alert('Login Successful');
                    // Start the timer after successful login
                    startTokenExpirationTimer();
                } else {
                    alert('User records do not match');
                }
            });
    };

    useEffect(() => {
        // Check if token exists in local storage when component mounts
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            // setToken(storedToken);
            // Start the timer for the stored token
            startTokenExpirationTimer();
        }
    }, []);

    const startTokenExpirationTimer = () => {
        // Clear the existing timer if any
        clearTimeout(window.tokenExpirationTimer);
        // Set a new timer for 1 minute
        window.tokenExpirationTimer = setTimeout(() => {
            // Clear token from local storage and state after 1 minute
            // setToken('');
            localStorage.removeItem('token');
            alert('Session expired. Please log in again.');
        }, 30000); // 1 minute = 60,000 milliseconds
    };

    const logout = () => {
        // Clear token from state and local storage
        // setToken('');
        localStorage.removeItem('token');
        // Clear the expiration timer
        clearTimeout(window.tokenExpirationTimer);
    };

    return (
        <div >
            <div id='formblock'></div>
            <center id='formcenter'>
                <form onSubmit={submitHandler}>
                    <input type="text" name="username" placeholder='username' value={username} onChange={changeHandler} /><br />
                    <input type="password" name="password" placeholder='password' value={password} onChange={changeHandler} /><br />
                    <input type="submit" name="submit" /><br />
                </form>
                <button onClick={() => logout()}>Logout</button>
            </center>
        </div>
    );
};

export default Login;








// import React, { useState } from 'react'
// import axios from 'axios';

// const Login = () => {
//     const [token, setToken] = useState('');

//     const [data, setData] = useState({
//         username: '',
//         password: ''
//     })
//     const { username, password } = data;
//     const changeHandler = e => {
//         setData({ ...data, [e.target.name]: e.target.value })
//     }
//     const submitHandler = e => {
//         e.preventDefault();
//         axios({
//             method: 'post',
//             url: 'http://localhost:3800/login',
//             data: data
//         })
//             .then((res) => {
//                 console.log(res)
//                 if (res.data.token) {
//                     setToken(res.data.token);
//                     localStorage.setItem('token', res.data.token);
//                     alert('login Successfully')
//                 }
//                 else {
//                     alert('User records does not match')
//                 }
//             })
//     }
//     function logout() {
//         setToken('');
//         localStorage.removeItem('token');
//     }
//     return (
//         <div>
//             <center>
//                 <form onSubmit={submitHandler}>
//                     <input type="text" name="username" placeholder='username' value={username} onChange={changeHandler} /><br />
//                     <input type="password" name="password" placeholder='password' value={password} onChange={changeHandler} /><br />
//                     <input type="submit" name="submit" /><br />
//                 </form>
//                 <button onClick={() => logout()}>Logout</button>
//             </center>
//         </div>
//     );
// }

// export default Login;