import React, { useContext, useState } from 'react'
import "./Login.scss"
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firbase.config.js';
import { AuthContext } from "../../context/authContext.js"


const Register = () => {
    const [user,setUser] = useState({});
    const [error,setError] = useState(false);
    const { login } = useContext(AuthContext); 
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, user.email, user.password)
        .then(async (userCredential) => {
            await login({...user,userId:userCredential.user.uid});
            setError(false);
            navigate('/');
            
        })
        .catch((error) => {
            setError(true);
        });
    }

  return (
    <div className='login'>
        <div className="loginContainer">
            <div className="left">
                <h1><span>My</span> Unsplash.</h1>
                <p>Login to see your pictures which you have stored.</p>
            </div>
            <div className="right">
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='email' onChange={(e)=>setUser({...user,email:e.target.value})}/>
                    <input type="password" placeholder='password' onChange={(e)=>setUser({...user,password:e.target.value})}/>
                    <button type='submit'>Login</button>
                </form>
                <span><Link style={{textDecoration:"none",color:"inherit"}} to="/register">Don't have an account??</Link></span>
                {error && <span className='error'>wrong username and password!</span> }
            </div>
        </div>
    </div>
  )
}

export default Register