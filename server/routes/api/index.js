import express from 'express';
const router = express.Router();

import authRoutes from './auth';
import userRoutes from './user';
import addressRoutes from './address';
import newsletterRoutes from './newsletter';
import productRoutes from './product';
import categoryRoutes from './category';
import brandRoutes from './brand';
import contactRoutes from './contact';
import merchantRoutes from './merchant';
import cartRoutes from './cart';
import orderRoutes from './order';
import reviewRoutes from './review';
import wishlistRoutes from './wishlist';

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
