import React,{useState} from 'react'
import axios from 'axios';

const Login = ()=> {
  const[data,setData]=useState({
    username:'',
    email:'',
    password:'',
    confirmpassword:'',
  })
  const {username,email,password,confirmpassword}=data;
  const changeHandler= e =>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const submitHandler = e =>{
    e.preventDefault();
    axios({
        method:'post',
        url:'http://localhost:3800/register',
        data:data
    }).then(()=>{alert('Registered Successfully')})
    // if(password===confirmpassword){
    //   console.log(data);
    // }
    // else{
    //    console.log("passwords are not matching");
    // }
  }
  return (
    <div>
      <center>
        <form onSubmit={submitHandler}>
          <input type="text" name="username" placeholder='username' value={username} onChange={changeHandler}/><br/>
          <input type="email" name="email" placeholder='email' value={email} onChange={changeHandler}/><br/>
          <input type="password" name="password" placeholder='password' value={password} onChange={changeHandler}/><br/>
          <input type="password" name="confirmpassword" placeholder='confirm password' value={confirmpassword} onChange={changeHandler}/><br/>
          <input type="submit" name="submit" /><br/>
        </form>
      </center>
    </div>
  );
}

export default Login;