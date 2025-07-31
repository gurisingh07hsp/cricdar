"use client";
import React from 'react';
import Link from 'next/link';
import { RiArrowLeftSLine } from 'react-icons/ri';

// Get pages from localStorage
const getPages = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('pages');
    if (stored) {
      return JSON.parse(stored);
    }
  }
  return [];
};

interface PageProps {
  params: { slug: string };
}

export default function PageComponent({ params }: PageProps) {
  const [page, setPage] = React.useState<any>(null);

  React.useEffect(() => {
    const pages = getPages();
    const foundPage = pages.find((p: any) => p.slug === params.slug);
    setPage(foundPage);
  }, [params.slug]);

  if (!page) {
    return (
      <div className="min-h-screen bg-app-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-app-surface border border-app-border rounded-lg p-8">
              <h1 className="text-2xl font-bold text-app-text-base mb-4">Page Not Found</h1>
              <p className="text-app-text-muted mb-6">The page you're looking for doesn't exist.</p>
              <Link href="/" className="inline-flex items-center space-x-2 px-4 py-2 bg-app-primary text-white rounded-lg hover:bg-app-primary-hover transition-colors">
                <RiArrowLeftSLine className="w-4 h-4" />
                <span>Back to Home</span>
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
            href="/" 
            className="inline-flex items-center space-x-2 text-app-primary hover:text-app-primary-hover transition-colors mb-4"
          >
            <RiArrowLeftSLine className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <article className="bg-app-surface border border-app-border rounded-lg overflow-hidden">
            <div className="p-6 lg:p-8">
              {/* Page Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-app-text-base mb-6">{page.title}</h1>

              {/* Page Content */}
              <div 
                className="prose prose-lg max-w-none text-app-text-base"
                dangerouslySetInnerHTML={{ __html: page.content || `
                  <p class="mb-4">
                    This is the full content of the page "${page.title}". In a real application, 
                    this would contain the actual page content that was saved when the page was created.
                  </p>
                  <p class="mb-4">
                    The content would be stored in the page data and displayed here. For now, 
                    this is placeholder content to demonstrate the page layout.
                  </p>
                  <p class="mb-4">
                    You can see that the page has been successfully created and is now accessible 
                    via its unique URL slug: <code class="bg-app-bg px-2 py-1 rounded">${page.slug}</code>
                  </p>
                  <p class="mb-4">
                    This page uses the "${page.template}" template and was last modified on ${page.lastModified}.
                  </p>
                ` }}
              />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
} 