import React, { useContext, useEffect, useState } from 'react'
import "./Main.scss"
import Navbar from '../../components/navbar/Navbar'
import { BoolContext } from "../../context/boolContext.js"
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import AddImage from '../../components/addimage/AddImage';
import { db } from "../../firbase.config.js"
import { AuthContext } from "../../context/authContext.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { SearchContext } from "../../context/searchContext";



const Main = () => {
  const {currentUser} = useContext(AuthContext);
  const [itemData,setItemData] = useState([]);
  const {search} = useContext(SearchContext);


  useEffect(()=>{
    const fetchData = async ()=>{
      const q = query(collection(db, "userImages"), where("uid", "==", currentUser.userId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const document = {...doc.data(),id:doc.id};
        setItemData((prev)=>([...prev,document]));
      });
    }
    fetchData();
  },[])

  const handleDelete = async (id)=>{
    const password = prompt("Enter the Password : ");
    if(currentUser.password===password){
      await deleteDoc(doc(db, "userImages", id));
      alert("Photo Deleted Successfully, Refresh the Page");
    }else{
      alert("Please enter correct password");
    }
  }

  const {bool} = useContext(BoolContext);


  return (
    <div className="main">
      <div className="mainContainer">
        <Navbar/>
        {bool && <AddImage className="addImage"/>}

        <div className="masonryContainer" style={{marginTop:"50px"}}>
          <Box sx={{ width: "100%", height: "100%" }}>
              <ImageList variant="masonry" cols={3} gap={40} >
              {itemData.filter(data=>data.title.toLowerCase().includes(search)).map((item) => (
                  <ImageListItem key={item.id} className='imageList'>
                    <img
                      style={{width:"430px"}}
                      src={`${item.img}?w=248&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"/>
                    <ImageListItemBar
                      className='listItemBar'
                      style={{width:"430px"}}
                      title={item.title}
                      actionIcon={
                        <IconButton
                          onClick={()=>handleDelete(item.id)}
                          className='iconButton'
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          aria-label={`info about ${item.title}`}
                        >
                          <Delete/>
                        </IconButton>
                      }/>
                  </ImageListItem>
                ))}
              </ImageList>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default Main