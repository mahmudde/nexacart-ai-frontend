"use client";

import { useState } from "react";
import { Newspaper, Plus, Trash2 } from "lucide-react";
import { AdminDashboardShell } from "@/components/dashboard/admin/admin-dashboard-shell";
import { useBlogs, useCreateBlog, useDeleteBlog } from "@/hooks/use-blogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

export default function AdminBlogsPage() {
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const blogsQuery = useBlogs({
    search,
    page: 1,
    limit: 20,
  });

  const createBlogMutation = useCreateBlog();
  const deleteBlogMutation = useDeleteBlog();

  const blogs = blogsQuery.data?.data ?? [];

  const handleCreate = () => {
    createBlogMutation.mutate(
      {
        title,
        excerpt,
        content,
        coverImage: coverImage || undefined,
        isPublished: true,
      },
      {
        onSuccess: () => {
          setTitle("");
          setExcerpt("");
          setContent("");
          setCoverImage("");
        },
      }
    );
  };

  return (
    <AdminDashboardShell>
      <div className="space-y-6">
        <div className="glass rounded-[2.5rem] p-8">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground">
            <Newspaper className="h-4 w-4" />
            Blog management
          </p>

          <h1 className="text-4xl font-semibold">Blogs</h1>

          <p className="mt-3 text-muted-foreground">
            Publish shopping guides, product tips, and marketplace content.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[460px_1fr]">
          <div className="glass h-fit rounded-[2rem] p-6 xl:sticky xl:top-28">
            <h2 className="text-2xl font-semibold">Create Blog</h2>

            <div className="mt-5 space-y-4">
              <Input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Blog title"
                className="h-12 rounded-full bg-background/60 px-5"
              />

              <Input
                value={excerpt}
                onChange={(event) => setExcerpt(event.target.value)}
                placeholder="Short excerpt"
                className="h-12 rounded-full bg-background/60 px-5"
              />

              <Input
                value={coverImage}
                onChange={(event) => setCoverImage(event.target.value)}
                placeholder="Cover image URL"
                className="h-12 rounded-full bg-background/60 px-5"
              />

              <Textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Blog content"
                className="min-h-52 rounded-[1.5rem] bg-background/60 p-5"
              />

              <Button
                type="button"
                className="h-12 w-full rounded-full"
                disabled={createBlogMutation.isPending}
                onClick={handleCreate}
              >
                <Plus className="mr-2 h-4 w-4" />
                Publish Blog
              </Button>
            </div>
          </div>

          <div className="glass rounded-[2rem] p-5">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search blogs..."
              className="mb-5 h-12 rounded-full bg-background/60 px-5"
            />

            {blogsQuery.isLoading && (
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className="h-24 rounded-[1.5rem]" />
                ))}
              </div>
            )}

            {!blogsQuery.isLoading && blogs.length === 0 && (
              <div className="rounded-[1.5rem] border border-border bg-background/50 p-8 text-center">
                <p className="font-medium">No blogs found</p>
              </div>
            )}

            {!blogsQuery.isLoading && blogs.length > 0 && (
              <div className="space-y-3">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="flex flex-col justify-between gap-4 rounded-[1.5rem] border border-border bg-background/50 p-4 md:flex-row md:items-center"
                  >
                    <div className="min-w-0">
                      <p className="line-clamp-1 font-semibold">{blog.title}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {blog.excerpt}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {blog.isPublished ? "Published" : "Draft"} ·{" "}
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full bg-background/50 text-destructive"
                      disabled={deleteBlogMutation.isPending}
                      onClick={() => deleteBlogMutation.mutate(blog.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminDashboardShell>
  );
}