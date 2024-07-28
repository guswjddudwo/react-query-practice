import { useEffect, useState } from "react";
import { getAllPhoto, getPhoto } from "../apis/photo";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import "./photo.css";

export default function Photo() {
  const { data: photos, fetchNextPage } = useInfiniteQuery({
    queryKey: ["photos"],
    queryFn: getAllPhoto,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPage, lastPageParam) => {
      if (lastPage.length == 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    select: (data) => {
      return data.pages.flatMap((photo) => photo.data);
    },
  });
  console.log(photos);

  return (
    <div>
      <ul className="list">
        {photos.map((photo) => {
          return (
            <li key={photo.id} role="button" className="list-item">
              <h1>{photo.title}</h1>
              <p>{photo.url}</p>
            </li>
          );
        })}
      </ul>
      <button onClick={fetchNextPage}>next page</button>

      {/* {showDialog.show && (
        <AlertDialog id={showDialog.id} onClose={handleClickHideDialog} />
      )} */}
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
