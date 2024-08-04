import { useEffect, useState } from "react";
import { getAllPhoto, getPhoto } from "../apis/photo";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "framer-motion";
import { useRef } from "react";
import "./photo.css";

export default function Photo() {
  const ref = useRef(null);
  const isInView = useInView(ref);
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
    select: (data) => data.pages.flatMap((photo) => photo.data),
  });

  useEffect(() => {
    isInView && fetchNextPage();
  }, [isInView, fetchNextPage]);

  return (
    <div>
      <ul className="list" style={{ minHeight: "100vh", marginBottom: "1px" }}>
        {(photos ?? []).map((photo) => (
          <li key={photo.id} role="button" className="list-item">
            <h1>{photo.title}</h1>
            <p>{photo.url}</p>
          </li>
        ))}
      </ul>
      <div ref={ref} />
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
