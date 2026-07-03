import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { BlogCard } from "@/components/BlogCard";
import { blogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "AquaRosters Blog — Dive Center & Watersports Operations",
  description:
    "Articles about dive center booking software, watersports operations, scheduling, POS, gear rentals, direct bookings, and 0% commission workflows.",
};

export default function BlogPage() {
  return (
    <main className="py-12 md:py-20">
      <Container>
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-bold text-navy md:text-5xl">AquaRosters Blog</h1>
          <p className="mt-4 text-lg text-muted">
            Notes on dive center and watersports operations, scheduling, and running the day without spreadsheets.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </main>
  );
}
