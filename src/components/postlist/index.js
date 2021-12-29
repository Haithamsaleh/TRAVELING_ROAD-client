import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import "./style.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const PostsList = () => {
  const [posts, setposts] = useState([]);
  const [title, setTitle] = useState("");
  const [Post, setPost] = useState("");
  const [postImg, setPostImg] = useState("");
  const [local, setLocal] = useState("");

  const state = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    getPosts();
  }, []);
  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setLocal(getToken);
    getPosts();
  }, []);
  const getPosts = async () => {
    const result = await axios.get(`${BASE_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${state.Login.token}`,
      },
    });
    setposts(result.data);
  };
  const addPost = async () => {
    await axios.post(
      `${BASE_URL}/newPost`,
      {
        titel: title,
        post: Post,
        img: postImg,
      },
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );

    getPosts(local);
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
  
    <div className="cards">
      <div className="info__name">
       

        <button className="addBtn" onClick={addPost}>
          Add
        </button>
      </div>
      <div>
        {posts.map((item, i) => (
          <>
            <div className="cards" >
              <h1>{item.titel}</h1>
              <h1>{item.date}</h1>
              {console.log(item)}
            
            <div>
              <div>
                {item.like.map((l) => (
                  <>
                    <h1> likes: {l._id}</h1>
                  </>
                ))}
              </div>

              <div>
                {item.userId.map((u) => (
                  <>
                    <h1> By: {u.username}</h1>
                  </>
                ))}
              </div>
            </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default PostsList;
