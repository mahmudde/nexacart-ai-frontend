import { Star } from "lucide-react";

type RatingStarsProps = {
  rating: number;
  count?: number;
};

export function RatingStars({ rating, count }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => {
          const active = index < Math.round(rating);

          return (
            <Star
              key={index}
              className={
                active
                  ? "h-4 w-4 fill-amber-400 text-amber-400"
                  : "h-4 w-4 text-muted-foreground/40"
              }
            />
          );
        })}
      </div>

      <span className="text-sm text-muted-foreground">
        {rating.toFixed(1)}
        {typeof count === "number" ? ` (${count})` : ""}
      </span>
    </div>
  );
}
