import { ReactNode } from "react";
import { PackageSearch } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="glass flex min-h-[320px] flex-col items-center justify-center rounded-[2rem] px-6 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <PackageSearch className="h-8 w-8 text-muted-foreground" />
      </div>

      <h3 className="text-2xl font-semibold">{title}</h3>

      {description && (
        <p className="mt-2 max-w-md text-muted-foreground">{description}</p>
      )}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
