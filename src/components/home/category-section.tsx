"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCategories } from "@/hooks/use-categories";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { Skeleton } from "@/components/ui/skeleton";

export function CategorySection() {
  const { data, isLoading } = useCategories({ isActive: true, limit: 6 });

  return (
    <SectionWrapper>
      <SectionHeader
        eyebrow="Shop by category"
        title="Explore curated collections"
        description="Browse smart product collections built for modern shopping needs."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-56 rounded-[2rem]" />
          ))}

        {data?.data?.map((category) => (
          <Link
            key={category.id}
            href={`/products?categoryId=${category.id}`}
            className="group relative h-56 overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm"
          >
            {category.imageUrl ? (
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="h-full bg-muted" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">{category.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-white/75">
                    {category.description}
                  </p>
                </div>

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-xl transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}
