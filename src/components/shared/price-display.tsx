type PriceDisplayProps = {
  price: string | number;
  discountPrice?: string | number | null;
  size?: "sm" | "md" | "lg";
};

export function PriceDisplay({
  price,
  discountPrice,
  size = "md",
}: PriceDisplayProps) {
  const activePrice = discountPrice ?? price;

  const sizeClass = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  }[size];

  return (
    <div className="flex items-end gap-2">
      <span className={`${sizeClass} font-bold text-foreground`}>
        ${Number(activePrice).toFixed(2)}
      </span>

      {discountPrice && (
        <span className="mb-1 text-sm text-muted-foreground line-through">
          ${Number(price).toFixed(2)}
        </span>
      )}
    </div>
  );
}
