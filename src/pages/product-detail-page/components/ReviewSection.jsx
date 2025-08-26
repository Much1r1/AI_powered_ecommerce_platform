import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewSection = ({ reviews, averageRating, totalReviews }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');

  const ratingDistribution = {
    5: Math.floor(totalReviews * 0.6),
    4: Math.floor(totalReviews * 0.25),
    3: Math.floor(totalReviews * 0.1),
    2: Math.floor(totalReviews * 0.03),
    1: Math.floor(totalReviews * 0.02)
  };

  const filteredReviews = reviews?.filter(review => 
    filterRating === 'all' || review?.rating === parseInt(filterRating)
  );

  const sortedReviews = [...filteredReviews]?.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b?.rating - a?.rating;
      case 'lowest':
        return a?.rating - b?.rating;
      case 'helpful':
        return b?.helpfulVotes - a?.helpfulVotes;
      default:
        return 0;
    }
  });

  const handleHelpfulVote = (reviewId) => {
    // Handle helpful vote logic
    console.log('Helpful vote for review:', reviewId);
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-muted p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <span className="text-4xl font-bold text-foreground">{averageRating}</span>
              <div className="flex">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={20}
                    className={`${
                      i < Math.floor(averageRating)
                        ? 'text-yellow-400 fill-current' :'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground">
              Based on {totalReviews} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1]?.map(rating => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm font-medium w-8">{rating}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{
                      width: `${(ratingDistribution?.[rating] / totalReviews) * 100}%`
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">
                  {ratingDistribution?.[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e?.target?.value)}
            className="border border-border rounded-lg px-3 py-2 text-sm bg-background"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="border border-border rounded-lg px-3 py-2 text-sm bg-background"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews?.map(review => (
          <div key={review?.id} className="border-b border-border pb-6 last:border-b-0">
            <div className="flex items-start space-x-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-medium text-sm">
                    {review?.author?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1 space-y-3">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">{review?.author}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex">
                        {[...Array(5)]?.map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={`${
                              i < review?.rating
                                ? 'text-yellow-400 fill-current' :'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date)?.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {review?.verified && (
                    <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full flex items-center mt-2 sm:mt-0">
                      <Icon name="CheckCircle" size={12} className="mr-1" />
                      Verified Purchase
                    </span>
                  )}
                </div>

                {/* Review Title */}
                {review?.title && (
                  <h5 className="font-medium text-foreground">{review?.title}</h5>
                )}

                {/* Review Text */}
                <p className="text-muted-foreground leading-relaxed">
                  {review?.content}
                </p>

                {/* Review Images */}
                {review?.images && review?.images?.length > 0 && (
                  <div className="flex space-x-2 overflow-x-auto">
                    {review?.images?.map((image, index) => (
                      <div key={index} className="flex-shrink-0">
                        <Image
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg border border-border"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Review Actions */}
                <div className="flex items-center space-x-4 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleHelpfulVote(review?.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Icon name="ThumbsUp" size={14} className="mr-1" />
                    Helpful ({review?.helpfulVotes})
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Icon name="Flag" size={14} className="mr-1" />
                    Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      {sortedReviews?.length < totalReviews && (
        <div className="text-center">
          <Button variant="outline">
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;