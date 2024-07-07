import { useEffect, useState } from "react";
import { getAllPost } from "../apis/post";

export default function Post() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const setAsyncPost = async () => {
      const results = await getAllPost();
      console.log(results);
      setPost(results.data);
    };
    setAsyncPost();
  }, []);
  return <>post</>;
}
