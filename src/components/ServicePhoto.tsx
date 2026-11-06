import Photo from "./Photo";

type Svc = { image: string; imageAlt: string; image2?: string; image2Alt?: string };

/** A service's photo; when the service has a second image, both are shown stacked in the same frame. */
export default function ServicePhoto({ service, sizes, className = "object-cover", src, alt }: { service: Svc; sizes: string; className?: string; src?: string; alt?: string }) {
  if (!service.image2 || src) {
    return <Photo src={src ?? service.image} alt={alt ?? service.imageAlt} fill sizes={sizes} className={className} />;
  }
  return (
    <span className="absolute inset-0 grid grid-rows-2 gap-[3px] bg-white">
      <span className="relative block overflow-hidden">
        <Photo src={service.image} alt={service.imageAlt} fill sizes={sizes} className={className} />
      </span>
      <span className="relative block overflow-hidden">
        <Photo src={service.image2} alt={service.image2Alt ?? ""} fill sizes={sizes} className={className} />
      </span>
    </span>
  );
}
