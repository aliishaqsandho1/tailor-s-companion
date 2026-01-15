import { Scissors, Ruler } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <div className="relative">
          <Scissors className="h-12 w-12 text-primary" />
          <Ruler className="h-6 w-6 text-accent absolute -bottom-1 -right-2" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        ناپ کی ڈائری
      </h2>
      <p className="text-muted-foreground text-lg max-w-sm">
        گاہک منتخب کریں یا نیا گاہک شامل کریں تاکہ ناپ لینا شروع کریں
      </p>
    </div>
  );
}
