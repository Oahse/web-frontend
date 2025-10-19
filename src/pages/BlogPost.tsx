import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRightIcon, CalendarIcon, TagIcon, FacebookIcon, TwitterIcon, LinkedinIcon } from 'lucide-react';
import { BlogAPI } from '../apis';
import { BlogPost as APIBlogPost } from '../apis/types';
import { useApi } from '../../hooks/useApi';
import ErrorMessage from '../components/common/ErrorMessage';

export const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: post,
    loading,
    error,
    execute: fetchBlogPost,
  } = useApi<APIBlogPost>();

  useEffect(() => {
    if (id) {
      fetchBlogPost(() => BlogAPI.getBlogPost(id));
    }
  }, [id, fetchBlogPost]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-8 w-3/4 mb-4 rounded"></div>
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
            <div className="h-4 bg-gray-200 w-40 rounded"></div>
          </div>
          <div className="bg-gray-200 h-64 w-full mb-8 rounded"></div>
          <div className="bg-gray-200 h-4 mb-2 rounded"></div>
          <div className="bg-gray-200 h-4 mb-2 rounded w-5/6"></div>
          <div className="bg-gray-200 h-4 rounded w-4/5"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <ErrorMessage
          error={error}
          onRetry={() => id && fetchBlogPost(() => BlogAPI.getBlogPost(id))}
        />
      </div>
    );
  }

  if (!post) {
    return <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-main mb-4">
          Blog Post Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/blog" className="inline-flex items-center text-primary hover:underline">
          <ChevronRightIcon size={16} className="mr-1 rotate-180" />
          Back to Blog
        </Link>
      </div>;
  }

  // Related posts (excluding current post)
  const relatedPosts = mockBlogPosts.filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(tag => post.tags.includes(tag)))).slice(0, 3);

  return <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm">
        <Link to="/" className="text-gray-500 hover:text-primary">
          Home
        </Link>
        <ChevronRightIcon size={16} className="mx-2" />
        <Link to="/blog" className="text-gray-500 hover:text-primary">
          Blog
        </Link>
        <ChevronRightIcon size={16} className="mx-2" />
        <span className="text-main">{post.title}</span>
      </nav>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <h1 className="text-3xl md:text-4xl font-bold text-main mb-4">
            {post.title}
          </h1>
          <div className="flex items-center mb-6">
            <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full mr-3" />
            <div>
              <p className="font-medium text-main">{post.author.name}</p>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon size={14} className="mr-1" />
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <TagIcon size={14} className="mr-1" />
                <span>{post.category}</span>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <img src={post.image} alt={post.title} className="w-full h-auto rounded-lg" />
          </div>
          <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{
          __html: post.content
        }} />
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => <Link key={index} to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700">
                {tag}
              </Link>)}
          </div>
          {/* Share buttons */}
          <div className="border-t border-b border-gray-200 py-6 mb-8">
            <p className="font-medium text-main mb-3">Share this post:</p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700">
                <FacebookIcon size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500">
                <TwitterIcon size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800">
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>
          {/* Author bio */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <div className="flex items-center mb-4">
              <img src={post.author.avatar} alt={post.author.name} className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h3 className="font-bold text-main text-lg">{post.author.name}</h3>
                <p className="text-gray-600">Content Writer</p>
              </div>
            </div>
            <p className="text-gray-600">
              {post.author.name} is a passionate writer and researcher focused on
              sustainable agriculture, fair trade practices, and traditional
              knowledge from across the African continent.
            </p>
          </div>
        </div>
        {/* Sidebar */}
        <div className="lg:w-1/3">
          {/* Categories */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h3 className="font-bold text-main text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog/category/health-wellness" className="flex items-center justify-between text-gray-600 hover:text-primary">
                  <span>Health & Wellness</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    12
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/blog/category/sustainability" className="flex items-center justify-between text-gray-600 hover:text-primary">
                  <span>Sustainability</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    8
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/blog/category/food-recipes" className="flex items-center justify-between text-gray-600 hover:text-primary">
                  <span>Food & Recipes</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    15
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/blog/category/community" className="flex items-center justify-between text-gray-600 hover:text-primary">
                  <span>Community</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    7
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          {/* Recent posts */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h3 className="font-bold text-main text-lg mb-4">Recent Posts</h3>
            <div className="space-y-4">
              {mockBlogPosts.slice(0, 3).map(recentPost => <div key={recentPost.id} className="flex">
                  <img src={recentPost.image} alt={recentPost.title} className="w-16 h-16 object-cover rounded-md mr-3" />
                  <div>
                    <Link to={`/blog/${recentPost.slug}`} className="font-medium text-main hover:text-primary line-clamp-2">
                      {recentPost.title}
                    </Link>
                    <p className="text-xs text-gray-500">{new Date(recentPost.created_at).toLocaleDateString()}</p>
                  </div>
                </div>)}
            </div>
          </div>
          {/* Popular tags */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-main text-lg mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              <Link to="/blog/tag/fair-trade" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700">
                Fair Trade
              </Link>
              <Link to="/blog/tag/sustainability" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700">
                Sustainability
              </Link>
              <Link to="/blog/tag/recipes" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700">
                Recipes
              </Link>
              <Link to="/blog/tag/skincare" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700">
                Skincare
              </Link>
              <Link to="/blog/tag/african-ingredients" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700">
                African Ingredients
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Related posts */}
      {relatedPosts.length > 0 && <div className="mt-12">
          <h2 className="text-2xl font-bold text-main mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(relatedPost => <div key={relatedPost.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <img src={relatedPost.image} alt={relatedPost.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <span>{new Date(relatedPost.created_at).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{relatedPost.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-main mb-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <Link to={`/blog/${relatedPost.slug}`} className="text-primary hover:underline font-medium">
                    Read More
                  </Link>
                </div>
              </div>)}
          </div>
        </div>}
    </div>;
};