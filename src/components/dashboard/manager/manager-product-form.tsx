"use client";

import { z } from "zod";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  CreateProductPayload,
  ProductImagePayload,
} from "@/services/product.service";
import { useCreateProduct } from "@/hooks/use-products";
import { useCategories } from "@/hooks/use-categories";
import { ImageUploadBox } from "./image-upload-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  shortDescription: z
    .string()
    .min(10, "Short description must be at least 10 characters"),
  description: z
    .string()
    .min(30, "Description must be at least 30 characters"),
  brand: z.string().min(2, "Brand is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  discountPrice: z.coerce.number().positive().optional(),
  stock: z.coerce.number().int().nonnegative("Stock cannot be negative"),
  categoryId: z.string().min(1, "Category is required"),
  tagsText: z.string().optional(),
  status: z.enum(["ACTIVE", "DRAFT", "ARCHIVED"]),
  images: z
    .array(
      z.object({
        url: z.string().url(),
        publicId: z.string(),
        altText: z.string().optional().nullable(),
      })
    )
    .min(1, "At least one image is required"),
  specifications: z
    .array(
      z.object({
        name: z.string().min(1, "Specification name is required"),
        value: z.string().min(1, "Specification value is required"),
      })
    )
    .min(1, "At least one specification is required"),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function ManagerProductForm() {
  const createProductMutation = useCreateProduct();
  const categoriesQuery = useCategories({ isActive: true, limit: 100 });

  const categories = categoriesQuery.data?.data ?? [];

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      brand: "",
      price: 0,
      discountPrice: undefined,
      stock: 0,
      categoryId: "",
      tagsText: "",
      status: "ACTIVE",
      images: [],
      specifications: [
        {
          name: "",
          value: "",
        },
      ],
    },
  });

  const specificationFields = useFieldArray<ProductFormValues>({
    control: form.control,
    name: "specifications",
  });

  const productName = form.watch("name");
  const images = form.watch("images");

  const onSubmit = (values: ProductFormValues) => {
    const tags = values.tagsText
      ? values.tagsText
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [];

    const payload: CreateProductPayload = {
      name: values.name.trim(),
      shortDescription: values.shortDescription.trim(),
      description: values.description.trim(),
      brand: values.brand.trim(),
      price: Number(values.price),
      stock: Number(values.stock),
      categoryId: values.categoryId,
      tags,
      images: values.images.map((image) => ({
        url: image.url,
        publicId: image.publicId,
        altText: image.altText || values.name,
      })),
      specifications: values.specifications.map((specification) => ({
        name: specification.name.trim(),
        value: specification.value.trim(),
      })),
      status: values.status,
    };

    if (values.discountPrice && Number(values.discountPrice) > 0) {
      payload.discountPrice = Number(values.discountPrice);
    }

    console.log("Create product payload:", payload);

    createProductMutation.mutate(payload, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  const setImages = (nextImages: ProductImagePayload[]) => {
    form.setValue("images", nextImages, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="glass rounded-[2.5rem] p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold">Create Product</h1>
        <p className="mt-3 text-muted-foreground">
          Upload product images, add product details, and publish a marketplace-ready listing.
        </p>
      </div>

      <Form {...(form as any)}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
          <div className="rounded-[2rem] border border-border bg-background/40 p-5">
            <FormLabel className="mb-4 block">Product images</FormLabel>

            <ImageUploadBox
              images={images}
              onChange={setImages}
              altText={productName || "Product image"}
            />

            {form.formState.errors.images?.message && (
              <p className="mt-3 text-sm font-medium text-destructive">
                {form.formState.errors.images.message}
              </p>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FormField<ProductFormValues>
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product name</FormLabel>
                  <FormControl>
                    <Input
                      {...(field as any)}
                      value={field.value ?? ""}
                      className="h-12 rounded-full bg-background/60 px-5"
                      placeholder="NovaCharge 65W USB-C Fast Charger"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField<ProductFormValues>
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input
                      {...(field as any)}
                      value={field.value ?? ""}
                      className="h-12 rounded-full bg-background/60 px-5"
                      placeholder="NovaCharge"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField<ProductFormValues>
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short description</FormLabel>
                <FormControl>
                  <Input
                    {...(field as any)}
                    value={field.value ?? ""}
                    className="h-12 rounded-full bg-background/60 px-5"
                    placeholder="Compact fast charger for phones, tablets, and laptops."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField<ProductFormValues>
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full description</FormLabel>
                <FormControl>
                  <Textarea
                    {...(field as any)}
                    value={field.value ?? ""}
                    className="min-h-36 rounded-[1.5rem] bg-background/60 p-5"
                    placeholder="Write a detailed product description..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-5 md:grid-cols-4">
            <FormField<ProductFormValues>
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...(field as any)}
                      value={field.value ?? ""}
                      type="number"
                      className="h-12 rounded-full bg-background/60 px-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField<ProductFormValues>
              control={form.control}
              name="discountPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount price</FormLabel>
                  <FormControl>
                    <Input
                      {...(field as any)}
                      value={field.value ?? ""}
                      onChange={(event) =>
                        field.onChange(
                          event.target.value ? Number(event.target.value) : undefined
                        )
                      }
                      type="number"
                      className="h-12 rounded-full bg-background/60 px-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField<ProductFormValues>
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      {...(field as any)}
                      value={field.value ?? ""}
                      type="number"
                      className="h-12 rounded-full bg-background/60 px-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField<ProductFormValues>
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    value={field.value as any}
                    onValueChange={field.onChange as any}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-full bg-background/60">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FormField<ProductFormValues>
              control={form.control}
              name="categoryId"
              render={({ field }) => {
                const selectedCategory = categories.find(
                  (category) => category.id === field.value
                );

                return (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      value={(field.value as any) || ""}
                      onValueChange={field.onChange as any}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 rounded-full bg-background/60">
                          <SelectValue>
                            {selectedCategory?.name || "Select category"}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField<ProductFormValues>
              control={form.control}
              name="tagsText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      {...(field as any)}
                      value={field.value ?? ""}
                      className="h-12 rounded-full bg-background/60 px-5"
                      placeholder="charger, usb-c, electronics"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="rounded-[2rem] border border-border bg-background/40 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold">Specifications</h2>
                <p className="text-sm text-muted-foreground">
                  Add key product specifications.
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                className="rounded-full bg-background/50"
                onClick={() =>
                  specificationFields.append({
                    name: "",
                    value: "",
                  })
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>

            <div className="space-y-3">
              {specificationFields.fields.map((field, index) => (
                <div key={field.id} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                  <FormField<ProductFormValues>
                    control={form.control}
                    name={`specifications.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...(field as any)}
                            value={field.value ?? ""}
                            className="h-12 rounded-full bg-background/60 px-5"
                            placeholder="Power Output"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField<ProductFormValues>
                    control={form.control}
                    name={`specifications.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...(field as any)}
                            value={field.value ?? ""}
                            className="h-12 rounded-full bg-background/60 px-5"
                            placeholder="65W"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full bg-background/50 text-destructive"
                    disabled={specificationFields.fields.length === 1}
                    onClick={() => specificationFields.remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="h-12 rounded-full md:w-fit md:px-8"
            disabled={createProductMutation.isPending}
          >
            {createProductMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Product
          </Button>
        </form>
      </Form>
    </div>
  );
}