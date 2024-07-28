import { apiInstance } from "../helpers/api-instance";

export const getAllPhoto = ({ pageParam }) => {
  if (pageParam === undefined) return;
  const pageLimit = 10;
  return apiInstance.get("photos", {
    params: { _start: pageParam * pageLimit, _limit: pageLimit },
  });
};
export const getPhoto = (id) => apiInstance.get(`photos/${id}`);

// 데이터들을 화면에 그려오기
