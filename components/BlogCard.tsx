import Link from "next/link";
import { Icon } from "./Icon";
import type { blogPosts } from "@/lib/content";

export function BlogCard({ post }: { post: (typeof blogPosts)[number] }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-card transition-colors hover:border-ocean"
    >
      <h3 className="font-display text-lg font-semibold text-navy">{post.title}</h3>
      <p className="text-sm text-muted">{post.excerpt}</p>
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-ocean group-hover:text-navy">
        Read article <Icon name="arrow-right" className="w-4 h-4" />
      </span>
    </Link>
  );
}
