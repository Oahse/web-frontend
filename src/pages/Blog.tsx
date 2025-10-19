import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRightIcon, SearchIcon, TagIcon } from 'lucide-react';
import { BlogAPI } from '../apis';
import { BlogPost as APIBlogPost } from '../apis/types';
import { usePaginatedApi } from '../hooks/useApi';

export const Blog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const tagFilter = searchParams.get('tag');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [showPublishedOnly, setShowPublishedOnly] = useState(searchParams.get('is_published') !== 'false');
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: blogPostsData,
    loading,
    error,
    execute: fetchBlogPosts,
  } = usePaginatedApi<APIBlogPost>();

  // Fetch blog posts when filters or page change
  useEffect(() => {
    const params: any = {
      page: currentPage,
      limit: 10,
    };
    if (categoryFilter && categoryFilter !== 'All') {
      params.category = categoryFilter;
    }
    if (tagFilter) {
      params.tag = tagFilter;
    }
    if (searchTerm) {
      params.search = searchTerm;
    }
    params.is_published = showPublishedOnly;

    fetchBlogPosts(() => BlogAPI.getBlogPosts(params.page, params.limit, params.is_published, params.search));
  }, [currentPage, categoryFilter, tagFilter, searchTerm, showPublishedOnly, fetchBlogPosts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);
    if (searchTerm) {
      newSearchParams.set('search', searchTerm);
    } else {
      newSearchParams.delete('search');
    }
    newSearchParams.set('is_published', String(showPublishedOnly));
    setSearchParams(newSearchParams);
    setCurrentPage(1);
  };

  const handleTogglePublished = () => {
    const newPublishedState = !showPublishedOnly;
    setShowPublishedOnly(newPublishedState);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('is_published', String(newPublishedState));
    setSearchParams(newSearchParams);
    setCurrentPage(1);
  };

  const categories = ['All', 'Technology', 'Health', 'Food', 'Travel']; // Example categories
  const popularTags = ['Organic', 'Farming', 'Sustainable', 'Africa', 'Healthy']; // Example tags
  const blogPosts: any[] = []; // Placeholder for blog posts data

  return <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm">
        <Link to="/" className="text-gray-500 hover:text-primary dark:text-gray-400">
          Home
        </Link>
        <ChevronRightIcon size={16} className="mx-2" />
        <span className="text-main dark:text-white">Blog</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-main dark:text-white mb-4">
              {categoryFilter ? `${categoryFilter} Articles` : 'Our Blog'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Discover insights about organic products, sustainable farming
              practices, and the rich agricultural heritage of Africa.
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(category => <button key={category} onClick={() => handleCategoryClick(category)} className={`px-4 py-2 rounded-full text-sm ${!categoryFilter && category === 'All' || categoryFilter === category ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                {category}
              </button>)}
          </div>

          {/* Blog Posts */}
          {loading ? <div className="space-y-8">
              {[...Array(3)].map((_, index) => <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
                      <div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-1"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div> : blogPostsData?.data && blogPostsData.data.length > 0 ? <div className="space-y-8">
              {blogPostsData.data.map(post => <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
                  <Link to={`/blog/${post.id}`}>
                    <img src={post.image_url} alt={post.title} className="w-full h-64 object-cover hover:opacity-90 transition-opacity" loading="lazy" />
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">
                        {post.tags?.[0]}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm ml-3">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <Link to={`/blog/${post.id}`}>
                      <h2 className="text-xl font-bold text-main dark:text-white mb-3 hover:text-primary dark:hover:text-primary-light transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {post.content.substring(0, 150)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {/* <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full mr-3" loading="lazy" /> */}
                        <div>
                          <p className="font-medium text-main dark:text-white">
                            {post.author_id}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Author
                          </p>
                        </div>
                      </div>
                      <Link to={`/blog/${post.id}`} className="text-primary hover:underline">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>)}
            </div> : <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-main dark:text-white mb-2">
                No articles found
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We couldn't find any articles matching your criteria.
              </p>
              <button onClick={() => {
            searchParams.delete('category');
            searchParams.delete('tag');
            setSearchParams(new URLSearchParams());
            setSearchTerm('');
          }} className="text-primary hover:underline">
                Clear all filters
              </button>
            </div>}

          {/* Pagination */}
          {blogPostsData?.pagination && blogPostsData.pagination.pages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-md bg-surface border border-border text-copy hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {Array.from({ length: blogPostsData.pagination.pages }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-md ${
                      page === currentPage
                        ? 'bg-primary text-white'
                        : 'bg-surface border border-border text-copy hover:bg-surface-hover'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(blogPostsData.pagination.pages, prev + 1))}
                disabled={currentPage === blogPostsData.pagination.pages}
                className="px-3 py-2 rounded-md bg-surface border border-border text-copy hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3">
          {/* Search */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-main dark:text-white mb-4">
              Search
            </h3>
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input type="text" placeholder="Search articles..." className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  <SearchIcon size={18} />
                </button>
              </div>
            </form>
          </div>

          {/* Filter by Published Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-main dark:text-white mb-4">
              Filter
            </h3>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
                checked={showPublishedOnly}
                onChange={handleTogglePublished}
              />
              <span className="text-gray-700 dark:text-gray-300">Show Published Only</span>
            </label>
          </div>

          {/* Categories */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-main dark:text-white mb-4">
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.filter(cat => cat !== 'All').map(category => <li key={category}>
                    <button onClick={() => handleCategoryClick(category)} className="flex items-center justify-between w-full text-left hover:text-primary transition-colors">
                      <span className={`${categoryFilter === category ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300'}`}>
                        {category}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {blogPosts.filter(post => post.category === category).length}
                      </span>
                    </button>
                  </li>)}
            </ul>
          </div>

          {/* Popular Tags */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-main dark:text-white mb-4">
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map(tag => <button key={tag} onClick={() => handleTagClick(tag)} className={`flex items-center px-3 py-1 rounded-full text-xs ${tagFilter === tag ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                  <TagIcon size={12} className="mr-1" />
                  {tag}
                </button>)}
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-main dark:text-white mb-4">
              Recent Posts
            </h3>
            <div className="space-y-4">
              {blogPosts.slice(0, 3).map(post => <div key={post.id} className="flex">
                  <Link to={`/blog/${post.slug}`} className="w-20 h-20 flex-shrink-0">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover rounded-md" loading="lazy" />
                  </Link>
                  <div className="ml-3">
                    <Link to={`/blog/${post.slug}`}>
                      <h4 className="font-medium text-main dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors text-sm">
                        {post.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Blog;