import { useEffect, useState } from "react";
import { getAllPhoto, getPhoto } from "../apis/photo";
import { useQuery } from "@tanstack/react-query";
import "./photo.css";

export default function Photo() {
  const [showDialog, setShowDialog] = useState({
    id: null,
    show: false,
  });
  const [photo, setPhoto] = useState([]);

  const { data: photos = [] } = useQuery({
    queryKey: ["photo"],
    queryFn: getAllPhoto,
    select: (data) => data.data,
  });

  // console.log(data);

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
        {photos.map((photo) => (
          <li
            role="button"
            key={photo.id}
            className="list-item"
            onClick={() => handleClickDialog(photo.id)}
          >
            <h1>{photo.title}</h1>
            <p>{photo.body}</p>
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
  const { data: photo, refetch } = useQuery({
    queryKey: ["photo", id],
    queryFn: () => getPhoto(id),
    enabled: !!id,
    select: (data) => data.data,
    staleTime: Infinity,
  });

  console.log("photo", photo);
  return (
    <div className="alert-overlay">
      <div className="alert-dialog">
        <button onClick={handleClose}>close</button>
        <button onClick={refetch}>refresh</button>
        <h1>{photo?.title ?? ""}</h1>
        <p>{photo?.body ?? ""}</p>
      </div>
    </div>
  );
};
