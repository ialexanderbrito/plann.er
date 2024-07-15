export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-950/90 z-100 opacity-80">
      <div className="flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-lime-400 border-t-transparent" />
      </div>
    </div>
  );
}
