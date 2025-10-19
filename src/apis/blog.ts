import { apiClient } from './client';
import { APIResponse, PaginatedResponse } from './types';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  tags: string[];
  image_url?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

interface BlogPostCreate {
  title: string;
  content: string;
  tags?: string[];
  image_url?: string;
  is_published?: boolean;
}

interface BlogPostUpdate {
  title?: string;
  content?: string;
  tags?: string[];
  image_url?: string;
  is_published?: boolean;
}

class BlogAPI {
  async createBlogPost(data: BlogPostCreate): Promise<APIResponse<BlogPost>> {
    return apiClient.post<BlogPost>('/blog/', data);
  }

  async getBlogPosts(page: number = 1, limit: number = 10, is_published?: boolean, search?: string): Promise<APIResponse<PaginatedResponse<BlogPost>>> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (is_published !== undefined) {
      params.append('is_published', is_published.toString());
    }
    if (search) {
      params.append('search', search);
    }
    return apiClient.get<PaginatedResponse<BlogPost>>(`/blog/?${params.toString()}`);
  }

  async getBlogPost(postId: string): Promise<APIResponse<BlogPost>> {
    return apiClient.get<BlogPost>(`/blog/${postId}`);
  }

  async updateBlogPost(postId: string, data: BlogPostUpdate): Promise<APIResponse<BlogPost>> {
    return apiClient.put<BlogPost>(`/blog/${postId}`, data);
  }

  async deleteBlogPost(postId: string): Promise<APIResponse<null>> {
    return apiClient.delete<null>(`/blog/${postId}`);
  }
}

export default new BlogAPI();
