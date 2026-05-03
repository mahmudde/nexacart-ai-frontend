import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api.types";
import type { ProductImage } from "@/types";

export type UploadedImage = {
  url: string;
  publicId: string;
  altText?: string;
};

export const uploadService = {
  uploadProductImages: async (files: File[]) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    const { data } = await apiClient.post<ApiResponse<UploadedImage[]>>(
      "/uploads/product-images",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  },

  deleteProductImage: async (publicId: string) => {
    const { data } = await apiClient.delete<ApiResponse<null>>(
      "/uploads/product-image",
      {
        data: {
          publicId,
        },
      }
    );

    return data;
  },
};

export const mapUploadedImageToProductImage = (
  image: UploadedImage,
  altText?: string
): ProductImage => ({
  url: image.url,
  publicId: image.publicId,
  altText: altText || "Product image",
});