import axios from "@/lib/axios";

export const getAllImage = (params) => {
  return axios.get(`/image/${params}`);
};

export const getDetailImage = (id) => {
  return axios.get(`/image/${id}`);
};

export const getTrendingImage = () => {
  return axios.get(`/image/trending`);
};

// const axiosAuth = useAxiosAuth();
// const [image, setImage] = useState({});
// console.log("🚀 ~ GalleryPage ~ image:", image);
// const getImages = async () => {
//   try {
//     const res = await axiosAuth.get("http://localhost:5000/api/image");
//     setImage(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// };
