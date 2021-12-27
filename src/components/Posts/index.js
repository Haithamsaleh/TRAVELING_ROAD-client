import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Posts = () => {
  const [posts, setposts] = useState([]);

  const data = async () => {
    // eslint-disable-next-line
    const posts = await axios
      .get(`${BASE_URL}/posts`)
      .then((dete) => {
        setposts(dete.data);

        console.log(dete.data);
      });
  };

  useEffect(() => {
    data();
  }, []);
 

  return (
    <section className={"cards-section"}>
      <div className="info__name"><h1>POSTS</h1>
      </div>
      <div className="cards-container">
        {posts.map((item) => {
          return (
            
            <div className="card">
            <div className="books">
                <h1 className="info__name">{item.title}</h1> 

                <h2 className="info__name">{item.post}</h2>
                <img src={item.img} alt="img"/>
                <h2 className="info__name">{item.date}</h2>
                {item.comment.map(s => (
         <>
          <p className="pargraph"> Comment: {s.desc}</p>
         </>
        ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Posts;
