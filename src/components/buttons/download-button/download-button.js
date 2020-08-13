import React from "react";
import { saveAs } from "file-saver";
import Popup from "reactjs-popup";

const DowloadButton = ({ posts }) => {
  const savePosts = () => {
    const postsToFile = posts
      .filter((post) => post.data.link)
      .map((post) => `${post.title} / ${post.data.link.url}`);
    const blob = new Blob([postsToFile.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "posts.txt");
  };

  const getID = (url) => {
    return url.match("youtube")
      ? url.split("=")[1]
      : url
          .split("/")
          .filter((elem) => elem)[2]
          .substr(0, 11);
  };

  const saveID = () => {
    const IDToFile = posts
      .filter((post) => post.data.link)
      .map((post) => getID(post.data.link.url));
    const blob = new Blob([IDToFile.join(',')], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "id.txt");
  };

  const buttonStyleToggler = !!posts.length
    ? "invisible sm:visible mx-4 bg-indigo-500 hover:bg-white text-white font-semibold hover:text-indigo-500 py-2 px-4 border border-indigo-500 rounded inline-flex items-center"
    : "invisible sm:visible cursor-not-allowed mx-4 bg-indigo-500 hover:bg-white text-white font-semibold hover:text-indigo-500 py-2 px-4 border border-indigo-500 rounded inline-flex items-center opacity-50";

  return (
    <Popup
      trigger={
        <button className={buttonStyleToggler} type="button">
          <svg
            className="fill-current w-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          Download
        </button>
      }
      modal
    >
      <div className="modal border-solid border-2 border-gray-600 rounded-lg p-4">
        <button
          type="button"
          className="mx-4 bg-indigo-500 hover:bg-white text-white font-semibold hover:text-indigo-500 py-2 px-4 border border-indigo-500 rounded inline-flex items-center"
          onClick={() => savePosts()}
        >
          Title / Link
        </button>
        <button
          type="button"
          className="mx-4 bg-indigo-500 hover:bg-white text-white font-semibold hover:text-indigo-500 py-2 px-4 border border-indigo-500 rounded inline-flex items-center"
          onClick={() => saveID()}
        >
          Youtube ID
        </button>
      </div>
    </Popup>
  );
};

export default DowloadButton;
