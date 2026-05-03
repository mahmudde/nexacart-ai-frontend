"use client";

import { useState } from "react";
import { Newspaper, Search } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { BlogCard } from "@/components/shared/blog-card";
import { EmptyState } from "@/components/shared/empty-state";
import { useBlogs } from "@/hooks/use-blogs";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function BlogsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const blogsQuery = useBlogs({
    search,
    page,
    limit: 9,
  });

  const blogs = blogsQuery.data?.data ?? [];
  const meta = blogsQuery.data?.meta;

  return (
    <PublicLayout>
      <main className="min-h-screen">
        <section className="px-4 pt-8 sm:px-6 lg:px-8">
          <div className="glass mx-auto max-w-7xl rounded-[2.5rem] px-6 py-14 text-center md:px-10">
            <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2 text-sm text-muted-foreground">
              <Newspaper className="h-4 w-4" />
              Shopping guides
            </p>

            <h1 className="text-gradient mx-auto max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
              Learn smarter ways to shop.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl leading-8 text-muted-foreground md:text-lg">
              Explore buying guides, product tips, AI shopping insights, and
              marketplace updates from Velora.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="glass mb-8 rounded-[2rem] p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search blogs..."
                className="h-12 rounded-full bg-background/60 pl-11"
              />
            </div>
          </div>

          {blogsQuery.isLoading && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <Skeleton key={index} className="h-96 rounded-[1.75rem]" />
              ))}
            </div>
          )}

          {!blogsQuery.isLoading && blogs.length === 0 && (
            <EmptyState
              title="No blogs found"
              description="Try searching for another topic or check back later for new shopping guides."
            />
          )}

          {!blogsQuery.isLoading && blogs.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}

          {meta?.totalPages && meta.totalPages > 1 && (
            <div className="mt-10 flex items-center justify-between rounded-[2rem] border border-border bg-card/70 p-4 backdrop-blur-xl">
              <p className="text-sm text-muted-foreground">
                Page {meta.page} of {meta.totalPages}
              </p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="rounded-full"
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  Previous
                </Button>

                <Button
                  variant="outline"
                  className="rounded-full"
                  disabled={page >= (meta.totalPages ?? 1)}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </section>
      </main>
    </PublicLayout>
  );
}
