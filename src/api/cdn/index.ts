import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const CDN_BASE = "https://cdns.cubeapp.org";

export const UPLOAD_IMAGE_ROUTE = "/api/storage/image/upload";

export const cdnInstance = axios.create({
  baseURL: CDN_BASE,
});

export async function uploadToCDN(file: File): Promise<string> {
  const formData = new FormData();
  const fileName = uuidv4();
  formData.append("fileName", fileName);
  formData.append("file", file);

  try {
    const response = await cdnInstance.post(UPLOAD_IMAGE_ROUTE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.url;
  } catch (error) {
    console.error("CDN Upload Error:", error);
    throw new Error("Failed to upload document to CDN");
  }
}
