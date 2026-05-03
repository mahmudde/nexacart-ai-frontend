import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  blogService,
  type BlogQuery,
  type CreateBlogPayload,
  type UpdateBlogPayload,
} from "@/services/blog.service";
import { queryKeys } from "@/lib/query-keys";
import { getApiErrorMessage } from "@/lib/api-client";

export const useBlogs = (query: BlogQuery = {}) => {
  return useQuery({
    queryKey: queryKeys.blogs.list(query),
    queryFn: () => blogService.getBlogs(query),
  });
};

export const useBlogDetails = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.blogs.detail(slug),
    queryFn: () => blogService.getBlogBySlug(slug),
    enabled: Boolean(slug),
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBlogPayload) => blogService.createBlog(payload),

    onSuccess: (response) => {
      toast.success(response.message || "Blog created successfully");

      queryClient.invalidateQueries({
        queryKey: queryKeys.blogs.all,
      });
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateBlogPayload;
    }) => blogService.updateBlog(id, payload),

    onSuccess: (response) => {
      toast.success(response.message || "Blog updated successfully");

      queryClient.invalidateQueries({
        queryKey: queryKeys.blogs.all,
      });
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.deleteBlog,

    onSuccess: (response) => {
      toast.success(response.message || "Blog deleted successfully");

      queryClient.invalidateQueries({
        queryKey: queryKeys.blogs.all,
      });
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
