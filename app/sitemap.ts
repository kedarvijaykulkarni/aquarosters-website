import { featureModules, blogPosts } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aquarosters.com";

export default function sitemap() {
  const staticRoutes = [
    "",
    "/features",
    "/solutions/dive-centers",
    "/solutions/kitesurf-surf-schools",
    "/pricing",
    "/comparison",
    "/design-partners",
    "/about",
    "/blog",
    "/contact",
    "/legal/privacy",
    "/legal/terms",
  ];
  const featureRoutes = featureModules.map((feature) => `/features/${feature.slug}`);
  const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);

  return [...staticRoutes, ...featureRoutes, ...blogRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
