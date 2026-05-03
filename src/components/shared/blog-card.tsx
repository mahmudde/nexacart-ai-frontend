import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import type { Blog } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  blog: Blog;
};

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-border bg-card/80 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {blog.coverImage ? (
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
            NexaCart AI
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          {new Date(blog.createdAt).toLocaleDateString()}
        </div>

        <h3 className="line-clamp-2 text-xl font-semibold leading-tight">
          {blog.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {blog.excerpt}
        </p>

        <Link
          href={`/blogs/${blog.slug}`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "mt-5 rounded-full px-0"
          )}
        >
          Read article
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}