import React, { useContext, useState } from "react";
import "./AddImage.scss";
import { BoolContext } from "../../context/boolContext.js";
import { AuthContext } from "../../context/authContext.js";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firbase.config.js"


const AddImage = ()=>{
    const [data,setData] = useState({});
    const {setBool} = useContext(BoolContext);
    const {currentUser} = useContext(AuthContext);

    console.log(currentUser);
    const handleImage = async()=>{
        try{
            await addDoc(collection(db, "userImages"),{...data,uid:currentUser.userId});
            alert("Added Successfully");
        }catch(err){
            console.log(err);
        }
        setBool(false);
    }

    return (
        <div className="addImage">
            <div className="addContainer">
                <h1>Add a new photo</h1>
                <div className="items">
                    <label>Title</label>
                    <div className="input">
                       <input type="text" placeholder="Enter the Photo Title" onChange={(e)=>setData({...data,title:e.target.value})}/>
                    </div>
                </div>
                <div className="items">
                    <label>URL</label>
                    <div className="input">
                       <input type="text" placeholder="Enter the Photo URL" onChange={(e)=>setData({...data,img:e.target.value})}/>
                    </div>
                </div>
                <div className="buttons">
                    <span onClick={()=>setBool(false)}>Cancel</span>
                    <button onClick={handleImage}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default AddImage;