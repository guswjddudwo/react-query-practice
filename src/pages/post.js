import { useEffect, useState } from "react";
import { getAllPost, getPost } from "../apis/post";
import { useQuery } from "@tanstack/react-query";
import "./post.css";

export default function Post() {
  const [showDialog, setShowDialog] = useState({
    id: null,
    show: false,
  });
  const [post, setPost] = useState([]);

  const { data: posts = [] } = useQuery({
    queryKey: ["post"],
    queryFn: getAllPost,
    select: (data) => data.data, // 반환되는 데이터 중에 무얼 내보낼지 선택
  });

  const handleClickDialog = (id) => {
    setShowDialog({
      id,
      show: true,
    });
  };

  const handleClickHideDialog = () => {
    setShowDialog({
      id: null,
      show: false,
    });
  };

  return (
    <div>
      <ul className="list">
        {posts.map((post) => (
          <li
            role="button"
            key={post.id}
            className="list-item"
            onClick={() => handleClickDialog(post.id)}
          >
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      {showDialog.show && (
        <AlertDialog id={showDialog.id} onClose={handleClickHideDialog} />
      )}
    </div>
  );
}

const AlertDialog = ({ id, onClose: handleClose }) => {
  const { data: post, refetch } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    enabled: !!id,
    select: (data) => data.data,
    staleTime: Infinity,
  });

  console.log("post", post);
  return (
    <div className="alert-overlay">
      <div className="alert-dialog">
        <button onClick={handleClose}>close</button>
        <button onClick={refetch}>refresh</button>
        <h1>{post?.title ?? ""}</h1>
        <p>{post?.body ?? ""}</p>
      </div>
    </div>
  );
};
