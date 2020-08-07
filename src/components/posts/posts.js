import React from "react";

const Posts = ({ posts }) => {
  return (
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
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{post.data.title}</td>
                    <td className="border px-4 py-2">
                      <a
                        href={post.data.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link
                      </a>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Posts;
