import { apiInstance } from "../helpers/api-instance";

export const getAllPhoto = () => apiInstance.get("photos");
export const getPhoto = (id) => apiInstance.get(`photos/${id}`);

// 데이터들을 화면에 그려오기
