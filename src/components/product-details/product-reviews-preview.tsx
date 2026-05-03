import type { Review } from "@/types";
import { RatingStars } from "@/components/shared/rating-stars";
import { EmptyState } from "@/components/shared/empty-state";

type ProductReviewsPreviewProps = {
  reviews?: Review[];
  ratingAverage: number;
  ratingCount: number;
};

export function ProductReviewsPreview({
  reviews = [],
  ratingAverage,
  ratingCount,
}: ProductReviewsPreviewProps) {
  return (
    <section className="glass rounded-[2rem] p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold">Customer reviews</h2>
          <div className="mt-2">
            <RatingStars rating={ratingAverage || 0} count={ratingCount} />
          </div>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No reviews yet"
            description="Be the first customer to share your experience with this product."
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {reviews.slice(0, 5).map((review) => (
            <article
              key={review.id}
              className="rounded-[1.5rem] border border-border bg-background/50 p-5"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="font-semibold">
                    {review.user?.name || "Customer"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <RatingStars rating={review.rating} />
              </div>

              <p className="mt-4 leading-7 text-muted-foreground">
                {review.comment}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
