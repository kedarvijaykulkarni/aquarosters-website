import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { blogPosts } from "@/lib/content";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — AquaRosters Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <main className="py-12 md:py-20">
      <Container className="max-w-2xl">
        <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
        <h1 className="font-display text-3xl font-bold text-navy md:text-4xl">{post.title}</h1>
        <div className="mt-8 flex flex-col gap-5 text-lg text-ink">
          {post.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </Container>
      <div className="mt-20">
        <CTASection title="See how AquaRosters runs the operational day." />
      </div>
    </main>
  );
}
