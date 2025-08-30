import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <div className="space-y-2 w-ful">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-10 w-3/4 rounded-2xl" />
        <Skeleton className="h-60 w-full rounded-2xl" />
      </div>
    </div>
  );
}
