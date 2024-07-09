import { useEffect, useState } from "react";
import { getAllPhoto } from "../apis/photo";

export default function Photo() {
  const [photo, setPhoto] = useState([]);

  useEffect(() => {
    const setAsyncPhoto = async () => {
      const results = await getAllPhoto();
      setPhoto(results.data);
    };
    setAsyncPhoto();
  }, []);

  return (
    <div>
      <ul>
        {photo.map((photo, index) => (
          <li key={index}>{photo.title}</li>
        ))}
      </ul>
      photo
    </div>
  );
}
