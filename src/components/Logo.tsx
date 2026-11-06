import Image from "next/image";
import Link from "next/link";

export default function Logo({ variant = "dark", className = "", priority = false }: { variant?: "dark" | "light"; className?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label="Blanca Investment Limited home page" className={`inline-block shrink-0 ${className}`}>
      <Image
        src={variant === "light" ? "/brand/logo-light.png" : "/brand/logo.png"}
        alt="Blanca Investment Ltd"
        width={1200}
        height={317}
        priority={priority}
        className="h-full w-auto"
        sizes="220px"
      />
    </Link>
  );
}
