"use client";

import { useCallback, useEffect, useState } from "react";

type Size = { width: number; height: number };

export function useElementSize<T extends HTMLElement>() {
  const [node, setNode] = useState<T | null>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const ref = useCallback((element: T | null) => {
    setNode(element);
  }, []);

  useEffect(() => {
    if (!node) return;
    const element = node;
    let frame = 0;

    const updateSize = (nextWidth: number, nextHeight: number) => {
      const width = Math.max(0, Math.round(nextWidth));
      const height = Math.max(0, Math.round(nextHeight));
      setSize((prev) => (prev.width === width && prev.height === height ? prev : { width, height }));
    };

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      updateSize(entry.contentRect.width, entry.contentRect.height);
    });

    // Ensure we measure once immediately in case ResizeObserver callback is delayed.
    frame = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      updateSize(rect.width, rect.height);
    });

    observer.observe(element);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [node]);

  return { ref, size };
}
