"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FolderTree, ImagePlus, Loader2, Plus, Trash2, X } from "lucide-react";
import { AdminDashboardShell } from "@/components/dashboard/admin/admin-dashboard-shell";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
} from "@/hooks/use-categories";
import { useUploadProductImages } from "@/hooks/use-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

export default function AdminCategoriesPage() {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uploadImageMutation = useUploadProductImages();

  const categoriesQuery = useCategories({
    search,
    page: 1,
    limit: 30,
  });

  const createCategoryMutation = useCreateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const categories = categoriesQuery.data?.data ?? [];

  const handleCategoryImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const response = await uploadImageMutation.mutateAsync([file]);
    const uploadedImage = response.data?.[0];

    if (uploadedImage?.url) {
      setImageUrl(uploadedImage.url);
    }

    event.target.value = "";
  };

  const handleCreate = () => {
    createCategoryMutation.mutate(
      {
        name,
        description,
        imageUrl: imageUrl || undefined,
        isActive: true,
      },
      {
        onSuccess: () => {
          setName("");
          setDescription("");
          setImageUrl("");
        },
      }
    );
  };

  return (
    <AdminDashboardShell>
      <div className="space-y-6">
        <div className="glass rounded-[2.5rem] p-8">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground">
            <FolderTree className="h-4 w-4" />
            Category management
          </p>

          <h1 className="text-4xl font-semibold">Categories</h1>

          <p className="mt-3 text-muted-foreground">
            Create and manage product categories for the marketplace.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
          <div className="glass h-fit rounded-[2rem] p-6 xl:sticky xl:top-28">
            <h2 className="text-2xl font-semibold">Create Category</h2>

            <div className="mt-5 space-y-4">
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Category name"
                className="h-12 rounded-full bg-background/60 px-5"
              />

              <Textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Category description"
                className="min-h-28 rounded-[1.5rem] bg-background/60 p-5"
              />

              <div className="space-y-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="hidden"
                  onChange={handleCategoryImageUpload}
                />

                {!imageUrl ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadImageMutation.isPending}
                    className="flex min-h-40 w-full flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-border bg-background/50 p-5 text-center transition-colors hover:bg-muted/60"
                  >
                    {uploadImageMutation.isPending ? (
                      <Loader2 className="mb-3 h-7 w-7 animate-spin text-primary" />
                    ) : (
                      <ImagePlus className="mb-3 h-7 w-7 text-primary" />
                    )}

                    <p className="font-medium">
                      {uploadImageMutation.isPending
                        ? "Uploading image..."
                        : "Upload category image"}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      JPG, PNG or WEBP. Optional but recommended.
                    </p>
                  </button>
                ) : (
                  <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-muted">
                    <div className="relative h-44 w-full">
                      <Image
                        src={imageUrl}
                        alt={name || "Category image"}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="420px"
                      />
                    </div>

                    <div className="absolute right-3 top-3 flex gap-2">
                      <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-xl"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <ImagePlus className="h-4 w-4" />
                      </Button>

                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="h-9 w-9 rounded-full"
                        onClick={() => setImageUrl("")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <Button
                type="button"
                className="h-12 w-full rounded-full"
                disabled={createCategoryMutation.isPending}
                onClick={handleCreate}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Category
              </Button>
            </div>
          </div>

          <div className="glass rounded-[2rem] p-5">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search categories..."
              className="mb-5 h-12 rounded-full bg-background/60 px-5"
            />

            {categoriesQuery.isLoading && (
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className="h-20 rounded-[1.5rem]" />
                ))}
              </div>
            )}

            {!categoriesQuery.isLoading && categories.length === 0 && (
              <div className="rounded-[1.5rem] border border-border bg-background/50 p-8 text-center">
                <p className="font-medium">No categories found</p>
              </div>
            )}

            {!categoriesQuery.isLoading && categories.length > 0 && (
              <div className="space-y-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex flex-col justify-between gap-4 rounded-[1.5rem] border border-border bg-background/50 p-4 md:flex-row md:items-center"
                  >
                    <div>
                      <p className="font-semibold">{category.name}</p>
                      <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                        {category.description || "No description"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Products: {category._count?.products ?? 0}
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full bg-background/50 text-destructive"
                      disabled={deleteCategoryMutation.isPending}
                      onClick={() => deleteCategoryMutation.mutate(category.id)}
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
