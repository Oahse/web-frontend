import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { ReviewsAPI } from '../../apis';
import { useMutation } from '../../hooks/useApi';

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onReviewSubmitted }) => {
  const { isAuthenticated } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const createReviewMutation = useMutation<any, { productId: string; rating: number; comment: string }>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('You must be logged in to submit a review.');
      return;
    }
    if (rating === 0) {
      toast.error('Please provide a rating.');
      return;
    }

    try {
      await createReviewMutation.mutate(
        (vars) => ReviewsAPI.createReview(vars.productId, vars.rating, vars.comment),
        { productId, rating, comment }
      );
      toast.success('Review submitted successfully!');
      setRating(0);
      setComment('');
      onReviewSubmitted();
    } catch (error) {
      toast.error('Failed to submit review.');
      console.error('Review submission error:', error);
    }
  };

  return (
    <div className="mt-8 p-6 bg-surface rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-main mb-4">Write a Review</h3>
      {!isAuthenticated ? (
        <p className="text-copy-light">Please log in to submit a review.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-main mb-2">Your Rating</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    size={28}
                                    className={`cursor-pointer transition-colors duration-200 ${star <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    fill={star <= (hoverRating || rating) ? 'currentColor' : 'none'}
                                  />              ))}
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-main mb-2">Your Comment</label>
            <textarea
              id="comment"
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-background text-copy"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you think about this product..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
            disabled={createReviewMutation.loading}
          >
            {createReviewMutation.loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
