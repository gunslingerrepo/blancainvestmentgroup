import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/about", priority: 0.8, freq: "monthly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/projects", priority: 0.8, freq: "weekly" },
    { path: "/property-management", priority: 0.8, freq: "monthly" },
    { path: "/renewable-energy", priority: 0.9, freq: "monthly" },
    { path: "/contact", priority: 0.9, freq: "yearly" },
    { path: "/privacy-policy", priority: 0.3, freq: "yearly" },
    { path: "/terms-of-service", priority: 0.3, freq: "yearly" },
  ];
  return routes.map((r) => ({ url: `${site.url}${r.path}`, lastModified: now, changeFrequency: r.freq, priority: r.priority }));
}
