import React, { useContext, useEffect, useState } from "react"
import "./Navbar.scss"
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../context/authContext.js"
import { BoolContext } from "../../context/boolContext.js"
import { db } from '../../firbase.config.js'
import { Logout, Search } from "@mui/icons-material";
import User from "../../assets/user.png"
import { signOut } from "firebase/auth";
import { auth } from "../../firbase.config.js";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/searchContext";


const Navbar = ()=>{
    const [name,setName] = useState("");
    const {currentUser} = useContext(AuthContext);
    const {setBool} = useContext(BoolContext);
    const {setSearch} = useContext(SearchContext);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchData = async ()=>{
           const docRef = doc(db, "users", currentUser.userId);
           const docSnap = await getDoc(docRef);
           if (docSnap.exists()) {
            setName(docSnap.data().username);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }
        fetchData();
    },[])

    const handleSignout = async ()=>{
        await signOut(auth).then(() => {
            localStorage.setItem("unsplashUser",null);
            navigate("/login");
          }).catch((error) => {
            console.log(error);
          });
    }

    return (
        <div className="navbar">
            <div className="left">
                <div className="items">
                    <img src={User} alt="" style={{height:"25px",width:"25px"}}/>
                    <div className="item">
                        <h3><span>My</span> Unsplash</h3>
                        <span>{name}</span>
                    </div>
                </div>
                <div className="searchBox">
                    <input type="text" placeholder="search by name" onChange={(e)=>setSearch(e.target.value)}/>
                    <Search className="search"/>
                </div>
            </div>
            <div className="right">
                <button onClick={()=>setBool(true)}>Add a Photo</button>
                <Logout style={{cursor:"pointer"}} onClick={handleSignout}/>
            </div>
        </div>
    )
}

export default Navbar;