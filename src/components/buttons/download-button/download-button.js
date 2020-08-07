import React from "react";
import { saveAs } from "file-saver";

const DowloadButton = ({ posts }) => {
  const saveFile = () => {
    const postsToFile = posts
      .filter((post) => post.data.link)
      .map((post) => `${post.title} / ${post.data.link.url}`);
    const blob = new Blob([postsToFile.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "posts.txt");
  };

  const buttonStyleToggler = !!posts.length
    ? "invisible sm:visible mx-4 bg-indigo-500 hover:bg-white text-white font-semibold hover:text-indigo-500 py-2 px-4 border border-indigo-500 rounded inline-flex items-center"
    : "invisible sm:visible cursor-not-allowed mx-4 bg-indigo-500 hover:bg-white text-white font-semibold hover:text-indigo-500 py-2 px-4 border border-indigo-500 rounded inline-flex items-center opacity-50";

  return (
    <button
      className={buttonStyleToggler}
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
  );
};

export default DowloadButton;
