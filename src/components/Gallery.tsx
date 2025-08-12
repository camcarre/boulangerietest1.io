import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

type GalleryProps = {
  images: GalleryImage[];
  className?: string;
  heightClassName?: string; // e.g. "h-[60vh] md:h-[65vh]"
  fit?: "cover" | "contain"; // how the inline image fits in page view
};

export default function Gallery({ images, className, heightClassName = "h-[52vh] md:h-[58vh] min-h-[260px]", fit = "contain" }: GalleryProps) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const touchX = useRef<number | null>(null);

  const total = images.length;
  const current = images[index] ?? images[0];

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const bullets = useMemo(
    () =>
      images.map((_, i) => (
        <button
          key={i}
          onClick={() => setIndex(i)}
          aria-label={`Aller à l'image ${i + 1}`}
          className={`w-3 h-3 rounded-full transition-colors ${i === index ? "bg-black" : "bg-gray-300"}`}
        />
      )),
    [images, index]
  );

  const imageFitClass = fit === "cover" ? "object-cover" : "object-contain";

  return (
    <div className={"relative max-w-4xl mx-auto " + (className ?? "")}>      
      <div
        className={`relative overflow-hidden rounded-lg ${heightClassName} bg-black`}
        onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
        onTouchEnd={(e) => {
          const start = touchX.current;
          const end = e.changedTouches[0]?.clientX ?? null;
          if (start != null && end != null) {
            const delta = end - start;
            if (Math.abs(delta) > 40) {
              if (delta < 0) next();
              else prev();
            }
          }
          touchX.current = null;
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full h-full"
          aria-label="Ouvrir l'image en grand"
        >
          <img
            src={current.src}
            alt={current.alt}
            className={`w-full h-full ${imageFitClass} object-center select-none`}
            draggable={false}
          />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          {current.caption && (
            <p className="text-white text-lg font-medium line-clamp-2">{current.caption}</p>
          )}
        </div>
      </div>

      <Button
        onClick={prev}
        variant="outline"
        size="icon"
        className="hidden md:inline-flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
        aria-label="Image précédente"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        onClick={next}
        variant="outline"
        size="icon"
        className="hidden md:inline-flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
        aria-label="Image suivante"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="flex justify-center mt-6 space-x-2">{bullets}</div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent overlayClassName="bg-black/80" closeClassName="right-3 top-3 bg-white text-black w-9 h-9 flex items-center justify-center rounded-full" className="max-w-none w-[98vw] h-[96vh] p-0 gap-0 overflow-hidden bg-transparent border-0 shadow-none sm:rounded-none">
          <DialogTitle className="sr-only">{current?.alt || "Image"}</DialogTitle>
          <div
            className="relative w-full h-full flex items-center justify-center"
            onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
            onTouchEnd={(e) => {
              const start = touchX.current;
              const end = e.changedTouches[0]?.clientX ?? null;
              if (start != null && end != null) {
                const delta = end - start;
                if (Math.abs(delta) > 40) {
                  if (delta < 0) next();
                  else prev();
                }
              }
              touchX.current = null;
            }}
          >
            <img
              src={current.src}
              alt={current.alt}
              className="max-w-[92vw] max-h-[86vh] object-contain select-none"
              draggable={false}
            />
            <button
              type="button"
              onClick={prev}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 text-black rounded-full w-10 h-10 items-center justify-center hover:bg-white focus:outline-none z-10"
              aria-label="Image précédente"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 text-black rounded-full w-10 h-10 items-center justify-center hover:bg-white focus:outline-none z-10"
              aria-label="Image suivante"
            >
              ›
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 