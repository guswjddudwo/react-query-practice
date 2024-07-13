import { useEffect, useState } from "react";
import { getAllPhoto } from "../apis/photo";
import { useQuery } from "@tanstack/react-query";

export default function Photo() {
  const [photo, setPhoto] = useState([]);

  const { data } = useQuery({
    queryKey: ["post"],
    queryFn: getAllPhoto,
  });

  console.log(data);
  return (
    <div>
      photo
      <ul>
        {photo.map((photo, index) => (
          <li key={index}>{photo.title}</li>
        ))}
      </ul>
    </div>
  );
}
