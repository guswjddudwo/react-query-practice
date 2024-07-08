import { useEffect, useState } from "react";

export default function Photo() {
  const [photo, setPhoto] = useState([]);

  useEffect(() => {
    const setAsyncPhoto = async () => {
      const results = await setAsyncPhoto();
      console.log(results);
      setAsyncPhoto(results.data);
    };
  }, []);
  return <>photo</>;
}
