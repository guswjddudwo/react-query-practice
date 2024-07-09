import { useEffect, useState } from "react";
import { getAllPost } from "../apis/post";

export default function Post() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const setAsyncPost = async () => {
      const results = await getAllPost();
      console.log(results.data);
    };
    setAsyncPost();
  }, []);

  return (
    <div>
      <ul>
        {post.map((post, index) => (
          <li key={index}>{post.title}</li>
        ))}
      </ul>
      post
    </div>
  );
}
