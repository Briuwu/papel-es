export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center space-x-2 bg-white dark:invert">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 animate-bounce rounded-full bg-black [animation-delay:-0.3s]"></div>
          <div className="h-8 w-8 animate-bounce rounded-full bg-black [animation-delay:-0.15s]"></div>
          <div className="h-8 w-8 animate-bounce rounded-full bg-black"></div>
        </div>
      </div>
    </div>
  );
}
