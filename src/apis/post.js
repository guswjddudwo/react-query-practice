import { apiInstance } from "../helpers/api-instance";

export const getAllPost = () => apiInstance.get("posts");
export const getPost = (id) => apiInstance.get(`posts/${id}`);

// 데이터들을 화면에 그려오기
