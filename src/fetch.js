import React, { useState } from 'react'
import axios from 'axios'

let requestPosts = [];
let requestComplited = false;
let page = 1;

const fetchData = async () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  setError(false);
  setLoading(true);
  while (!requestComplited) {
    let newPosts;
    await axios
      .get(
        `https://d3.ru/api/domains/${inputState}/posts/?per_page=42&page=${page}`
      )
      .then((data) => {
        console.log(data.data)
        newPosts = data.data.posts;
        requestPosts = [...requestPosts, ...newPosts];
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        throw err;
      });
    if (newPosts.length < 42 || page === 75) {
      requestComplited = true;
    }
    page += 1;
  }
  setPosts(requestPosts);
  setLoading(false);
};

export default fetchData