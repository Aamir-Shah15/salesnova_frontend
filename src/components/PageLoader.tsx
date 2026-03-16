import { useEffect, useState } from "react";

const PageLoader = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => setProgress(40), 100);
    const timer2 = setTimeout(() => setProgress(70), 400);
    const timer3 = setTimeout(() => setProgress(90), 800);
    const timer4 = setTimeout(() => setProgress(100), 1200);
    const timer5 = setTimeout(() => setVisible(false), 1600);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500"
      style={{ opacity: progress === 100 ? 0 : 1 }}
    >
      {/* Logo */}
      <div className="mb-8 animate-fade-up">
        <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          Sales<span className="text-primary">Nova</span>
        </span>
      </div>

      {/* Spinner */}
      <div className="relative w-12 h-12 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-muted" />
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"
          style={{ animationDuration: "0.8s" }}
        />
      </div>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-4 text-sm text-muted-foreground animate-pulse">
        Loading your experience...
      </p>
    </div>
  );
};

export default PageLoader;
