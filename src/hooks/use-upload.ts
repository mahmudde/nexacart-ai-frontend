import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadService } from "@/services/upload.service";
import { getApiErrorMessage } from "@/lib/api-client";

export const useUploadProductImages = () => {
  return useMutation({
    mutationFn: uploadService.uploadProductImages,
    onSuccess: (response) => {
      toast.success(response.message || "Images uploaded successfully");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useDeleteProductImage = () => {
  return useMutation({
    mutationFn: uploadService.deleteProductImage,
    onSuccess: (response) => {
      toast.success(response.message || "Image deleted successfully");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
