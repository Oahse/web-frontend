import { apiClient } from './client';
import { APIResponse, PaginatedResponse } from './types';

interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  updated_at: string;
  user?: {
    firstname: string;
    lastname: string;
  };
}

class ReviewsAPI {
  async createReview(productId: string, rating: number, comment: string): Promise<APIResponse<Review>> {
    return apiClient.post<Review>('/reviews/', { product_id: productId, rating, comment });
  }

  async getProductReviews(productId: string, page: number = 1, limit: number = 10, minRating?: number, maxRating?: number, sortBy?: string): Promise<APIResponse<PaginatedResponse<Review>>> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (minRating !== undefined) {
      params.append('min_rating', minRating.toString());
    }
    if (maxRating !== undefined) {
      params.append('max_rating', maxRating.toString());
    }
    if (sortBy) {
      params.append('sort_by', sortBy);
    }
    return apiClient.get<PaginatedResponse<Review>>(`/reviews/product/${productId}?${params.toString()}`);
  }

  async getReview(reviewId: string): Promise<APIResponse<Review>> {
    return apiClient.get<Review>(`/reviews/${reviewId}`);
  }

  async updateReview(reviewId: string, rating: number, comment: string): Promise<APIResponse<Review>> {
    return apiClient.put<Review>(`/reviews/${reviewId}`, { rating, comment });
  }

  async deleteReview(reviewId: string): Promise<APIResponse<null>> {
    return apiClient.delete<null>(`/reviews/${reviewId}`);
  }
}

export default new ReviewsAPI();
