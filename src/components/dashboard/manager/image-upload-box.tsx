"use client";

import Image from "next/image";
import { ImagePlus, Loader2, Trash2, UploadCloud } from "lucide-react";
import { useRef } from "react";
import type { ProductImagePayload } from "@/services/product.service";
import { useUploadProductImages } from "@/hooks/use-upload";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ImageUploadBoxProps = {
  images: ProductImagePayload[];
  onChange: (images: ProductImagePayload[]) => void;
  altText?: string;
};

export function ImageUploadBox({
  images,
  onChange,
  altText = "Product image",
}: ImageUploadBoxProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const uploadMutation = useUploadProductImages();

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;

    const selectedFiles = Array.from(files).slice(0, 6 - images.length);

    if (!selectedFiles.length) return;

    const response = await uploadMutation.mutateAsync(selectedFiles);

    const uploadedImages =
      response.data?.map((image) => ({
        url: image.url,
        publicId: image.publicId,
        altText,
      })) ?? [];

    onChange([...images, ...uploadedImages]);
  };

  const handleRemove = (publicId: string) => {
    onChange(images.filter((image) => image.publicId !== publicId));
  };

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploadMutation.isPending || images.length >= 6}
        className={cn(
          "flex min-h-44 w-full flex-col items-center justify-center rounded-[2rem] border border-dashed border-border bg-background/50 p-6 text-center transition-colors hover:bg-muted/60",
          images.length >= 6 && "cursor-not-allowed opacity-60"
        )}
      >
        {uploadMutation.isPending ? (
          <Loader2 className="mb-3 h-8 w-8 animate-spin text-primary" />
        ) : (
          <UploadCloud className="mb-3 h-8 w-8 text-primary" />
        )}

        <p className="font-medium">
          {uploadMutation.isPending ? "Uploading images..." : "Upload product images"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          JPG, PNG or WEBP. Maximum 6 images.
        </p>
      </button>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {images.map((image) => (
            <div
              key={image.publicId}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted"
            >
              <Image
                src={image.url}
                alt={image.altText || altText}
                fill
                unoptimized
                className="object-cover"
                sizes="120px"
              />

              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute right-2 top-2 h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => handleRemove(image.publicId)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {images.length < 6 && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-border bg-background/40 text-muted-foreground transition-colors hover:bg-muted"
            >
              <ImagePlus className="h-6 w-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
