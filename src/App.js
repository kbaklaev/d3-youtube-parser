import React, { useState } from "react";
import axios from "axios";

import Loader from "./components/loader/loader";
import WTF from "./components/wtf/wtf";
import Posts from "./components/posts/posts";
import DowloadButton from "./components/buttons/download-button/download-button";

function App() {
  const [inputState, setInputState] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetch = async () => {
    if (!!inputState.length) {
      setError(false)
      setLoading(true);
      let requestPosts = []
      for (let page = 1; page <= 75; page += 1) {
        let newPosts = [];
        let fetchedData = []
        await axios
          .get(
            `https://d3.ru/api/domains/${inputState}/posts/?per_page=42&page=${page}`
          )
          .then((data) => {
            fetchedData = data.data.posts
            data.data.posts.forEach((post) => {
              if (
                post.data.link &&
                (post.data.link.url.includes("youtube.com") ||
                  post.data.link.url.includes("youtu.be"))
              )
                newPosts = [...newPosts, post];
            });
          })
          .catch((err) => {
            setError(true);
            setLoading(false);
            throw err;
          });
        requestPosts = [...requestPosts, ...newPosts];
        if (fetchedData.length < 42) break;
      }
      setPosts(requestPosts);
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setPosts([]);
      fetch();
    }
  };

  return (
    <div className="h-screen grid grid-cols-5">
      <div className="col-start-1 col-end-6 xl:col-start-2 xl:col-end-5 p-4 flex flex-col overflow-hidden">
        <header className="flex p-1 sm:p-2 mb-2 h-18 bg-gray-400 rounded">
          <input
            className="mx-0 sm:mx-4 appearance-none border-2 border-gray-500 rounded py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
            type="text"
            placeholder="enter a domain name"
            value={inputState}
            onChange={(e) => setInputState(e.target.value)}
            onKeyDown={(e) => onKeyDown(e)}
          />
          <button
            className="mx-2 sm:mx-4 bg-indigo-500 hover:bg-white text-white font-semibold hover:text-indigo-500 py-2 px-2 sm:px-4 border border-indigo-500 rounded"
            type="button"
            onClick={() => fetch()}
          >
            YARRR!!!
          </button>
          <DowloadButton posts={posts} />
          <div className="invisible sm:visible w-full flex justify-end">
            <WTF />
          </div>
        </header>
        {loading && (<Loader />)}
        {error && <div>Error. Please, try it again later.</div>}
        <Posts posts={posts} />
      </div>
    </div>
  );
}

export default App;
