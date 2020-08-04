import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

import Loader from './components/loader'

let requestPosts = [];

function App() {
  const [inputState, setInputState] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetch = async () => {
    setError(false);
    setLoading(true);
    for (let page = 1; page <= 75; page += 1) {
      let newPosts;
      await axios
        .get(
          `https://d3.ru/api/domains/${inputState}/posts/?per_page=42&page=${page}`
        )
        .then((data) => {
          newPosts = data.data.posts;
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
          throw err;
        });
      requestPosts = [...requestPosts, ...newPosts];
      if (newPosts.length < 42) break;
    }
    setPosts(requestPosts);
    setLoading(false);
  };

  const saveFile = () => {
    const postsToFile = posts
      .filter((post) => post.data.link)
      .map((post) => `${post.title} / ${post.data.link.url}`);
    const blob = new Blob([postsToFile.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "posts.txt");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") fetch();
  };

  return (
    <div className="h-screen grid grid-cols-5">
      <div className="col-start-2 col-end-5 p-4 flex flex-col overflow-hidden">
        <header className="flex p-4 mb-2 h-18 bg-gray-400 rounded">
          <input
            className="mx-4 appearance-none border-2 border-gray-500 rounded py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
            type="text"
            placeholder="enter a domain name"
            value={inputState}
            onChange={(e) => setInputState(e.target.value)}
            onKeyDown={(e) => onKeyDown(e)}
          />
          <button
            className="mx-4 bg-indigo-500 hover:bg-white text-white font-semibold hover:text-indigo-500 py-2 px-4 border border-indigo-500 rounded"
            type="button"
            onClick={() => fetch()}
          >
            YARRR!!!
          </button>
          {posts.length !== 0 && (
            <button
              className="mx-4 bg-indigo-500 hover:bg-white text-white font-semibold hover:text-indigo-500 py-2 px-4 border border-indigo-500 rounded inline-flex items-center"
              type="button"
              title="save txt"
              onClick={() => saveFile()}
            >
              <svg
                className="fill-current w-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 25 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              Download
            </button>
          )}
        </header>
        {
          loading && 
          <div className="flex justify-center h-full">
            <div className="text-center flex content-center flex-wrap">
              <Loader />
            </div>
          </div>
        }
        {error && <div>Error. Please, try it again later.</div>}
        <div className="w-full h-auto overflow-y-scroll">
          {posts.length !== 0 && (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">URL</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(
                  (post, index) =>
                    post.data.link && (
                      <tr key={post.id}>
                        <td className="border px-4 py-2">{index}</td>
                        <td className="border px-4 py-2">{post.data.title}</td>
                        <td className="border px-4 py-2">
                          <a href={post.data.link.url}>Link</a>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
