"use client";
import React from 'react';
import Link from 'next/link';
import { RiArrowLeftSLine, RiCalendarLine, RiUserLine, RiEyeLine, RiPriceTag3Line, RiTimeLine } from 'react-icons/ri';

// Get blog posts from localStorage
const getBlogPosts = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('blogPosts');
    if (stored) {
      return JSON.parse(stored);
    }
  }
  return [];
};

interface PageProps {
  params: { slug: string };
}

export default function BlogPostPage({ params }: PageProps) {
  const [post, setPost] = React.useState<any>(null);
  const [relatedPosts, setRelatedPosts] = React.useState<any[]>([]);

  React.useEffect(() => {
    const posts = getBlogPosts();
    const foundPost = posts.find((p: any) => p.slug === params.slug);
    setPost(foundPost);
    
    // Get related posts (excluding current post)
    const related = posts.filter((p: any) => p.id !== foundPost?.id).slice(0, 3);
    setRelatedPosts(related);
  }, [params.slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-app-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-app-surface border border-app-border rounded-lg p-8">
              <h1 className="text-2xl font-bold text-app-text-base mb-4">Blog Post Not Found</h1>
              <p className="text-app-text-muted mb-6">The blog post you're looking for doesn't exist.</p>
              <Link href="/blog" className="inline-flex items-center space-x-2 px-4 py-2 bg-app-primary text-white rounded-lg hover:bg-app-primary-hover transition-colors">
                <RiArrowLeftSLine className="w-4 h-4" />
                <span>Back to Blog</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center space-x-2 text-app-primary hover:text-app-primary-hover transition-colors mb-4"
          >
            <RiArrowLeftSLine className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-app-surface border border-app-border rounded-lg overflow-hidden">
              {/* Article Header */}
              <div className="h-64 bg-gradient-to-br from-app-primary/20 to-app-secondary/20 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-center">
                  <div className="text-sm text-white/80 mb-2">BLOG POST</div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{post.title}</h1>
                </div>
              </div>

              <div className="p-6 lg:p-8">
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-app-text-muted mb-6">
                  <div className="flex items-center space-x-1">
                    <RiUserLine className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RiCalendarLine className="w-4 h-4" />
                    <span>{post.publishedAt}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RiEyeLine className="w-4 h-4" />
                    <span>{post.views} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RiTimeLine className="w-4 h-4" />
                    <span>5 min read</span>
                  </div>
                </div>

                {/* Article Title */}
                <h1 className="text-3xl lg:text-4xl font-bold text-app-text-base mb-6">{post.title}</h1>

                {/* Article Excerpt */}
                <p className="text-lg text-app-text-muted mb-8 leading-relaxed">{post.excerpt}</p>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none text-app-text-base">
                  <p className="mb-4">
                    This is the full content of the blog post "{post.title}". In a real application, 
                    this would contain the actual blog post content that was saved when the post was created.
                  </p>
                  <p className="mb-4">
                    The content would be stored in the blog post data and displayed here. For now, 
                    this is placeholder content to demonstrate the blog post layout.
                  </p>
                  <p className="mb-4">
                    You can see that the blog post has been successfully created and is now accessible 
                    via its unique URL slug: <code className="bg-app-bg px-2 py-1 rounded">{post.slug}</code>
                  </p>
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-app-border">
                  <div className="flex items-center space-x-2">
                    <RiPriceTag3Line className="w-4 h-4 text-app-text-muted" />
                    <span className="text-sm text-app-text-muted">Tags:</span>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-app-primary/10 text-app-primary text-xs rounded-full">Cricket</span>
                      <span className="px-3 py-1 bg-app-primary/10 text-app-primary text-xs rounded-full">Analysis</span>
                    </div>
                  </div>
                </div>

                {/* Author Info */}
                <div className="mt-6 p-4 bg-app-bg rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-app-primary/20 rounded-full flex items-center justify-center">
                      <RiUserLine className="w-6 h-6 text-app-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-app-text-base">{post.author}</h4>
                      <p className="text-sm text-app-text-muted">Cricket Analyst & Writer</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="bg-app-surface border border-app-border rounded-lg p-4">
                <h3 className="font-semibold text-app-text-base mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="border-b border-app-border pb-4 last:border-b-0 last:pb-0">
                      <Link href={`/blog/${relatedPost.slug}`} className="block">
                        <h4 className="font-medium text-app-text-base mb-2 hover:text-app-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-app-text-muted line-clamp-2 mb-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-app-text-muted">
                          <span>{relatedPost.publishedAt}</span>
                          <span>•</span>
                          <span>{relatedPost.views} views</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 