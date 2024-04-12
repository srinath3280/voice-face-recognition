import React, { useState } from 'react'
import axios from 'axios';

const Login = () => {
    const [token, setToken] = useState('');

    const [data, setData] = useState({
        username: '',
        password: ''
    })
    const { username, password } = data;
    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const submitHandler = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:3800/login',
            data: data
        })
            .then((res) => {
                console.log(res)
                if (res.data.token) {
                    setToken(res.data.token);
                    localStorage.setItem('token', res.data.token);
                    alert('login Successfully')
                }
                else {
                    alert('User records does not match')
                }
            })
    }
    function logout() {
        setToken('');
        localStorage.removeItem('token');
    }
    return (
        <div>
            <center>
                <form onSubmit={submitHandler}>
                    <input type="text" name="username" placeholder='username' value={username} onChange={changeHandler} /><br />
                    <input type="password" name="password" placeholder='password' value={password} onChange={changeHandler} /><br />
                    <input type="submit" name="submit" /><br />
                </form>
                <button onClick={() => logout()}>Logout</button>
            </center>
        </div>
    );
}

export default Login;