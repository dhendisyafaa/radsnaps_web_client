import { cloudinaryCloudname } from "@/configs/config";
import axios from "@/lib/axios";

export const uploadImageToCloudinary = (data) => {
  return fetch(
    `https://api.cloudinary.com/v1_1/${cloudinaryCloudname}/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );
};
