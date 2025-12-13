export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-foreground/60 text-sm uppercase tracking-widest animate-pulse">Loading Experience...</p>
      </div>
    </div>
  );
}
