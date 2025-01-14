import express from 'express';
const router = express.Router();

import authRoutes from './auth.js';
import userRoutes from './user.js';
import addressRoutes from './address.js';
import newsletterRoutes from './newsletter.js';
import productRoutes from './product.js';
import categoryRoutes from './category.js';
import brandRoutes from './brand.js';
import contactRoutes from './contact.js';

import merchantRoutes from './merchant.js';
import cartRoutes from './cart.js';
import orderRoutes from './order.js';
import reviewRoutes from './review.js';
import wishlistRoutes from './wishlist.js';

// auth routes
router.use('/auth', authRoutes);

// user routes
router.use('/user', userRoutes);

// address routes
router.use('/address', addressRoutes);

// newsletter routes
router.use('/newsletter', newsletterRoutes);

// product routes
router.use('/product', productRoutes);

// category routes
router.use('/category', categoryRoutes);

// brand routes
router.use('/brand', brandRoutes);

// contact routes
router.use('/contact', contactRoutes);

// merchant routes
router.use('/merchant', merchantRoutes);

// cart routes
router.use('/cart', cartRoutes);

// order routes
router.use('/order', orderRoutes);

// Review routes
router.use('/review', reviewRoutes);

// Wishlist routes
router.use('/wishlist', wishlistRoutes);

export default router;
