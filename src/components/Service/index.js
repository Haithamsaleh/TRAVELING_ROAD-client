import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch} from "react-redux";
import { ThemeProvider, ColorModeProvider } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { Box,Image, forwardRef } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'

import "./style.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Service = () => {
  const [posts, setposts] = useState([]);
  const [title, setTitle] = useState('');
  const [Post, setPost] = useState('');
  const [postImg, setPostImg] = useState('');
  const [newcomment, setNewComment] = useState('');
  const [local,setLocal]= useState("");

  const state = useSelector((state)=>{
    return state
  })
  useEffect(() => {
    getPosts();
  }, []);
  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setLocal(getToken);
    getPosts();
  }, []);
  const getPosts = async () => {
    const result = await axios.get(`${BASE_URL}/service`,{
    headers: {
        Authorization: `Bearer ${state.Login.token}`,
      },});
      setposts(result.data);
  };
  const addPost = async () => {
    await axios.post(
      `${BASE_URL}/newPost`,
      {
        title:title,
        desc:Post,
        img:postImg
      },
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
  
    getPosts(local);
};

const updatePost = async(id)=>{

 
  await axios.put(
      `${BASE_URL}/updatepost/${id}`,
      {
        post: Post,
      },
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        }
      }
    );
    getPosts(local);
  }

  const updatePostimg = async(id)=>{

 
    await axios.put(
        `${BASE_URL}/updateimg/${id}`,
        {
          img: postImg,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          }
        }
      );
      getPosts(local);
    }

  const deletePost =async(id)=>{
     const res = await axios.delete(`${BASE_URL}/deletebyuser/${id}`, {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        })
        getPosts();
  }
  const addcomment = async (postId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/newcomment`,
        {
          desc: newcomment,
          postId: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };
  // const data = async () => {
  //   // eslint-disable-next-line
  //   const posts = await axios
  //     .get(`${BASE_URL}/posts`)
  //     .then((dete) => {
  //       setposts(dete.data);

  //       console.log(dete.data);
  //     });
  // };

  // useEffect(() => {
  //   data();
  // }, []);
 

  return (
  

    <div >
    
    <div >
         <input
           className="addInput"
           onChange={(e) => setPost(e.target.value)}
           placeholder="new post Desc"
         />
         <input
           className="addInput"
           onChange={(e) => setPostImg(e.target.value)}
           placeholder="new Post Img"
         />
         <button className="addBtn" onClick={addPost}>
           Add
         </button>
       </div>
<div className="cards-container"> 
 {posts.map((item, i) => (<>
   <div>
    <h1>{item.titel}</h1> 
    <h1>{item.post}</h1> 

   <ul>
     <div className="photo">
</div>      
<div className="box">   
     <input id="btubdat"onChange={(e)=>{setPost(e.target.value)}} placeholder="edit post "/>
     
     <button
                   className="edit"
                   onClick={() => updatePost(item._id)}
                 >
                   Edit post
                 </button>
                 </div>
                 <div className="box">   
     <input id="btubdat"onChange={(e)=>{setPost(e.target.value)}} placeholder="edit post "/>
     
     <button
                   className="edit"
                   onClick={() => updatePostimg(item._id)}
                 >
                   Edit img
                 </button>
                 </div>

     <li key={`img-${item._id}`}>
       <img src={item.img} alt="postPic" width="300"/></li>
     <div>
                 
                 <button
                   className="delete"
                   onClick={() => {deletePost(item._id)}}
                 >
                   Delete
                 </button>
                                {item.like.map(l => (
    <>
     <h1> 0000000000000000000000likes: {l._id}</h1>
     {/* {console.log(l.id)} */}
    </>  ))}
                 {item.comment.map(s => (
    <div className="pargraph">
     <p> Comment: {s.desc}</p>
    </div>

   ))}
    

 
   
               </div>
               
   </ul>
   <input
               className="commentInput"
               onChange={e => {
                 setNewComment(e.target.value);
               }}
               placeholder="add comment"
             />
             <button className="addBTN" onClick={()=> addcomment(item._id)}>
               add
             </button>
   </div>
 </>))}</div>


 



</div>
  );
};

export default Service;
