import mongoose from 'mongoose';

// Function to get store products based on price and rating filters
const getStoreProductsQuery = (min, max, rating) => {
  rating = Number(rating);
  max = Number(max);
  min = Number(min);

  const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
  const ratingFilter = rating
    ? { rating: { $gte: rating } }
    : { rating: { $gte: rating } };

  const matchQuery = {
    isActive: true,
    price: priceFilter.price,
    averageRating: ratingFilter.rating
  };

  const basicQuery = [
    // Lookup brands collection
    {
      $lookup: {
        from: 'brands',
        localField: 'brand',
        foreignField: '_id',
        as: 'brands'
      }
    },
    // Unwind the brands array
    {
      $unwind: {
        path: '$brands',
        preserveNullAndEmptyArrays: true
      }
    },
    // Add brand fields to the document
    {
      $addFields: {
        'brand.name': '$brands.name',
        'brand._id': '$brands._id',
        'brand.isActive': '$brands.isActive'
      }
    },
    // Match only active brands
    {
      $match: {
        'brand.isActive': true
      }
    },
    // Lookup reviews collection
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'product',
        as: 'reviews'
      }
    },
    // Add total ratings and total reviews fields
    {
      $addFields: {
        totalRatings: { $sum: '$reviews.rating' },
        totalReviews: { $size: '$reviews' }
      }
    },
    // Calculate average rating
    {
      $addFields: {
        averageRating: {
          $cond: [
            { $eq: ['$totalReviews', 0] },
            0,
            { $divide: ['$totalRatings', '$totalReviews'] }
          ]
        }
      }
    },
    // Match documents based on the match query
    {
      $match: matchQuery
    },
    // Project the required fields
    {
      $project: {
        brands: 0,
        reviews: 0
      }
    }
  ];

  return basicQuery;
};

// Function to get store products wishlist for a user
const getStoreProductsWishListQuery = userId => {
  const wishListQuery = [
    {
      $lookup: {
        from: 'wishlists',
        let: { product: '$_id' },
        pipeline: [
          {
            $match: {
              $and: [
                { $expr: { $eq: ['$$product', '$product'] } },
                { user: new mongoose.Types.ObjectId(userId) }
              ]
            }
          }
        ],
        as: 'isLiked'
      }
    },
    {
      $addFields: {
        isLiked: { $arrayElemAt: ['$isLiked.isLiked', 0] }
      }
    }
  ];

  return wishListQuery;
};

export { getStoreProductsQuery, getStoreProductsWishListQuery };
