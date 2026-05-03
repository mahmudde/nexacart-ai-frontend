"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useBlogs } from "@/hooks/use-blogs";
import { BlogCard } from "@/components/shared/blog-card";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";


export function BlogPreviewSection() {
  const { data, isLoading } = useBlogs({ page: 1, limit: 3 });

  return (
    <SectionWrapper>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeader
          eyebrow="Shopping guides"
          title="Latest from the blog"
          description="Read product tips, buying guides, and marketplace insights."
          className="mb-0"
        />

        <Link
          href="/blogs"
          className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}
        >
          View all blogs
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-96 rounded-[1.75rem]" />
          ))}

        {!isLoading &&
          data?.data?.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
      </div>

      {!isLoading && (!data?.data || data.data.length === 0) && (
        <div className="glass mt-10 rounded-[2rem] p-8 text-center">
          <h3 className="text-xl font-semibold">No blogs published yet</h3>
          <p className="mt-2 text-muted-foreground">
            Shopping guides and product tips will appear here once published.
          </p>
        </div>
      )}
    </SectionWrapper>
  );
}
