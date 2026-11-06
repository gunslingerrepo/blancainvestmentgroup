"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * next/image wrapper with a graceful branded fallback.
 * If a remote photo cannot load, the frame keeps its dark tone instead of
 * showing a broken-image icon. The parent must be `relative` with a size.
 */
export default function Photo({ className = "", alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span
        role="img"
        aria-label={typeof alt === "string" ? alt : ""}
        className="absolute inset-0 block bg-ink-3 bg-[radial-gradient(rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:18px_18px]"
      />
    );
  }
  return <Image alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
