"use client";

import { useState } from "react";
import { Loader2, Star } from "lucide-react";
import { toast } from "sonner";
import { useAuthUser } from "@/hooks/use-auth";
import { useCreateReview } from "@/hooks/use-reviews";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ReviewFormProps = {
  productId: string;
};

export function ReviewForm({ productId }: ReviewFormProps) {
  const { isAuthenticated } = useAuthUser();
  const createReviewMutation = useCreateReview();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!isAuthenticated) {
      toast.error("Please login to submit a review");
      return;
    }

    if (!comment.trim() || comment.trim().length < 5) {
      toast.error("Review comment must be at least 5 characters");
      return;
    }

    createReviewMutation.mutate(
      {
        productId,
        rating,
        comment: comment.trim(),
      },
      {
        onSuccess: () => {
          setRating(5);
          setComment("");
        },
      }
    );
  };

  return (
    <div className="rounded-[1.75rem] border border-border bg-background/50 p-5">
      <h3 className="text-xl font-semibold">Write a review</h3>

      <p className="mt-1 text-sm text-muted-foreground">
        Share your experience to help other shoppers make better decisions.
      </p>

      <div className="mt-5">
        <p className="mb-2 text-sm font-medium">Your rating</p>

        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => {
            const starValue = index + 1;
            const active = starValue <= rating;

            return (
              <button
                key={starValue}
                type="button"
                onClick={() => setRating(starValue)}
                className="rounded-full p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    "h-6 w-6",
                    active
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground"
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <Textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Write your review..."
          className="min-h-32 rounded-[1.5rem] bg-background/70 p-4"
        />
      </div>

      <Button
        type="button"
        className="mt-4 rounded-full px-6"
        disabled={createReviewMutation.isPending}
        onClick={handleSubmit}
      >
        {createReviewMutation.isPending && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Submit Review
      </Button>

      {!isAuthenticated && (
        <p className="mt-3 text-xs text-muted-foreground">
          You need to login before submitting a review.
        </p>
      )}
    </div>
  );
}