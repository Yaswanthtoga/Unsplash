import React, { useState } from 'react'
import "./Register.scss"
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth,db} from "../../firbase.config.js"
import { doc, setDoc } from "firebase/firestore"; 

const Register = () => {
    const [user,setUser] = useState({});
    const [error,setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();

        // User Creation
        try{
            createUserWithEmailAndPassword(auth, user.email, user.password)
            .then(async (userCredential) => {
                await setDoc(doc(db, "users", userCredential.user.uid),{...user});
                setError(false);
                navigate("/login");
            })
            .catch((err) => {
                setError(true);
            });
        }catch(err){
            console.log(err);
        }

    }

  return (
    <div className='register'>
        <div className="registerContainer">
            <div className="left">
                <h1><span>My</span> Unsplash</h1>
                <p>Let's Store your images into the secure cloud</p>
            </div>
            <div className="right">
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='email' onChange={(e)=>setUser({...user,email:e.target.value})}/>
                    <input type="username" placeholder='username' onChange={(e)=>setUser({...user,username:e.target.value})}/>
                    <input type="password" placeholder='password' onChange={(e)=>setUser({...user,password:e.target.value})}/>
                    <button type='submit'>Register</button>
                </form>
                <span><Link style={{textDecoration:"none",color:"inherit"}} to="/login">Already have an account??</Link></span>
                { error && <span className='error'>Something Went Wrong!</span> }
            </div>
        </div>
    </div>
  )
}
export default Register;