import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="noise-dark text-white">
      <div className="container-x flex min-h-[70vh] flex-col justify-center py-24">
        <p className="font-display text-[7rem] font-semibold leading-none text-brand sm:text-[10rem]">404</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">This page could not be found.</h1>
        <p className="mt-4 max-w-lg text-white/70">The link may be out of date, or the page may have moved.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-red">Back to home <ArrowRight className="size-4" /></Link>
          <Link href="/contact" className="btn btn-outline-light">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
