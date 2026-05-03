"use client";

import { useState } from "react";
import { Star, Trash2 } from "lucide-react";
import type { Review } from "@/types";
import { useAuthUser } from "@/hooks/use-auth";
import { useDeleteReview, useProductReviews } from "@/hooks/use-reviews";
import { RatingStars } from "@/components/shared/rating-stars";
import { EmptyState } from "@/components/shared/empty-state";
import { ReviewForm } from "./review-form";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type ProductReviewsSectionProps = {
  productId: string;
  initialReviews?: Review[];
  ratingAverage: number;
  ratingCount: number;
};

export function ProductReviewsSection({
  productId,
  initialReviews = [],
  ratingAverage,
  ratingCount,
}: ProductReviewsSectionProps) {
  const [page, setPage] = useState(1);

  const { user } = useAuthUser();
  const deleteReviewMutation = useDeleteReview();

  const reviewsQuery = useProductReviews(productId, {
    page,
    limit: 10,
  });

  const reviews = reviewsQuery.data?.data ?? initialReviews ?? [];
  const meta = reviewsQuery.data?.meta;

  return (
    <section className="glass rounded-[2rem] p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 text-amber-400" />
            Customer feedback
          </p>

          <h2 className="text-2xl font-semibold">Reviews & Ratings</h2>

          <div className="mt-2">
            <RatingStars rating={ratingAverage || 0} count={ratingCount} />
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-border bg-background/50 px-5 py-4 text-center">
          <p className="text-3xl font-bold">
            {Number(ratingAverage || 0).toFixed(1)}
          </p>
          <p className="text-xs text-muted-foreground">
            Based on {ratingCount || 0} reviews
          </p>
        </div>
      </div>

      <div className="mt-6">
        <ReviewForm productId={productId} />
      </div>

      <div className="mt-6">
        {reviewsQuery.isLoading && (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-36 rounded-[1.5rem]" />
            ))}
          </div>
        )}

        {!reviewsQuery.isLoading && reviews.length === 0 && (
          <EmptyState
            title="No reviews yet"
            description="Be the first customer to share your experience with this product."
          />
        )}

        {!reviewsQuery.isLoading && reviews.length > 0 && (
          <div className="space-y-4">
            {reviews.map((review) => {
              const canDelete =
                user?.id === review.userId || user?.role === "ADMIN";

              return (
                <article
                  key={review.id}
                  className="rounded-[1.5rem] border border-border bg-background/50 p-5"
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <p className="font-semibold">
                        {review.user?.name || "Customer"}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>

                      <div className="mt-3">
                        <RatingStars rating={review.rating} />
                      </div>
                    </div>

                    {canDelete && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="rounded-full text-destructive hover:text-destructive"
                        disabled={deleteReviewMutation.isPending}
                        onClick={() => deleteReviewMutation.mutate(review.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <p className="mt-4 leading-7 text-muted-foreground">
                    {review.comment}
                  </p>
                </article>
              );
            })}
          </div>
        )}

        {meta && (meta.totalPages ?? 0) > 1 && (
          <div className="mt-6 flex items-center justify-between rounded-[1.5rem] border border-border bg-background/50 p-4">
            <p className="text-sm text-muted-foreground">
              Page {meta.page ?? 1} of {meta.totalPages ?? 1}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="rounded-full"
                disabled={page <= 1}
                onClick={() => setPage((previous) => previous - 1)}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                className="rounded-full"
                disabled={page >= (meta.totalPages ?? 1)}
                onClick={() => setPage((previous) => previous + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}