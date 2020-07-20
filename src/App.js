import React, { useState } from "react";
import axios from "axios";
import { saveAs } from 'file-saver'

function App() {
  const [inputState, setInputState] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = async () => {
    setError(false);
    setLoading(true);
    await axios
      .get(`/d3-youtube-parser/api/d3/?domain=${inputState}`)
      .then((data) => setPosts(data.data))
      .catch((err) => {
        setError(true);
        setLoading(false);
        throw err;
      });
    setLoading(false);
  };

  const saveFile = () => {
    const postsToFile = posts
        .filter((post) => post.data.link)
        .map((post) => `${post.title} / ${post.data.link.url}`)
    const blob = new Blob([postsToFile.join('\n')], {type: "text/plain;charset=utf-8"})
    console.log(blob);
    saveAs(blob, 'posts.txt')
  };

  return (
    <div>
      <input
        type="text"
        placeholder="введите подсайт"
        value={inputState}
        onChange={(e) => setInputState(e.target.value)}
      />
      <button type="button" onClick={() => request()}>
        YARRR!!!
      </button>
      {posts.length !== 0 && (
        <button type="button" onClick={() => saveFile()}>
          Save File
      </button>
      )}
      <div>
        {loading && <div>Loading...</div>}
        {error && <div>Error. Try again latter please.</div>}
      </div>
      {posts.length !== 0 && (
        <table>
          <thead>
            <tr>
              <td>Title</td>
              <td>URL</td>
            </tr>
          </thead>
          <tbody>
            {posts.map(
              (post) =>
                post.data.link && (
                  <tr key={post.id}>
                    <td>{post.data.title}</td>
                    <td>
                      <a href={post.data.link.url}>Link</a>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
