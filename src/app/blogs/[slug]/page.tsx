"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Newspaper } from "lucide-react";
import { useParams } from "next/navigation";
import { PublicLayout } from "@/components/layout/public-layout";
import { useBlogDetails } from "@/hooks/use-blogs";
import { EmptyState } from "@/components/shared/empty-state";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogDetailsPage() {
  const params = useParams();
  const slug = String(params.slug || "");

  const blogQuery = useBlogDetails(slug);
  const blog = blogQuery.data?.data;

  return (
    <PublicLayout>
      <main className="min-h-screen">
        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href="/blogs"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "mb-6 rounded-full px-0 hover:bg-transparent"
            )}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to blogs
          </Link>

          {blogQuery.isLoading && (
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4 rounded-2xl" />
              <Skeleton className="h-[420px] rounded-[2.5rem]" />
              <Skeleton className="h-40 rounded-[2rem]" />
            </div>
          )}

          {blogQuery.isError && (
            <EmptyState
              title="Blog not found"
              description="The article may be unavailable or removed."
              action={
                <Link
                  href="/blogs"
                  className={cn(buttonVariants(), "rounded-full")}
                >
                  Browse Blogs
                </Link>
              }
            />
          )}

          {blog && (
            <article>
              <div className="glass rounded-[2.5rem] p-6 md:p-8">
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground">
                  <Newspaper className="h-4 w-4" />
                  Shopping guide
                </p>

                <h1 className="text-gradient text-4xl font-semibold tracking-tight md:text-6xl">
                  {blog.title}
                </h1>

                <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                  {blog.excerpt}
                </p>
              </div>

              {blog.coverImage && (
                <div className="glass mt-8 overflow-hidden rounded-[2.5rem] p-3">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-muted">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 900px"
                      priority
                    />
                  </div>
                </div>
              )}

              <div className="glass prose prose-slate mt-8 max-w-none rounded-[2.5rem] p-6 dark:prose-invert md:p-10">
                {blog.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="leading-8 text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          )}
        </section>
      </main>
    </PublicLayout>
  );
}