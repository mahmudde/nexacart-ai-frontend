"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductImage } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ProductGalleryProps = {
  name: string;
  images: ProductImage[];
};

export function ProductGallery({ name, images }: ProductGalleryProps) {
  const safeImages = images?.length ? images : [];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedImage = safeImages[selectedIndex];

  const goToPrevious = () => {
    setSelectedIndex((current) =>
      current === 0 ? safeImages.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setSelectedIndex((current) =>
      current === safeImages.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="glass relative h-[420px] overflow-hidden rounded-[2.25rem] bg-muted sm:h-[520px] lg:h-full">
        {selectedImage?.url ? (
          <Image
            src={selectedImage.url}
            alt={selectedImage.altText || name}
            fill
            unoptimized
            priority
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No product image
          </div>
        )}

        {safeImages.length > 1 && (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-background/80 shadow-lg backdrop-blur-xl"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={goToNext}
              className="absolute right-4 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full bg-background/80 shadow-lg backdrop-blur-xl"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      {safeImages.length > 1 && (
        <div className="relative">
          <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
            {safeImages.map((image, index) => {
              const isActive = selectedIndex === index;

              return (
                <button
                  key={image.id || image.url}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    "relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-muted transition-all sm:h-24 sm:w-24",
                    isActive
                      ? "border-orange-500 ring-2 ring-orange-400/40"
                      : "border-border opacity-75 hover:opacity-100"
                  )}
                >
                  <Image
                    src={image.url}
                    alt={image.altText || name}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="100px"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
