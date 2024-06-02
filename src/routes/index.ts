import { Router } from 'express';
import { NextFunction, Request, Response } from 'express';

const router = Router();

import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import urlRoutes from './url.routes';
import { RedirectController } from '@controllers/redirectController';

const Redirect = new RedirectController();

/**
 * @description Status Routes - / - Public Routes
 * @description Get Server Status
 * @access Public
 * @alias GET /health
 */
const status = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    status: 'success',
    message: 'Server is Healthy 🚀',
  });
};

router.route('/health').get(status);

/**
 * @description Redirect Short URL - /:code - Public Routes
 * @description Redirect to Original URL
 * @access Public
 * @alias GET /:urlCode
 * @params code
 */
router.route('/:urlCode').get(Redirect.redirect);

/**
 * @description Auth Routes - /api/auth - Public Routes
 * @route /api/auth
 */
router.use('/api/auth', authRoutes);

/**
 * @description User Routes - /api/user - Private Routes
 * @route /api/user
 */
router.use('/api/user', userRoutes);

/**
 * @description URL Routes - /api/url - Private Routes
 * @route /api/url
 */
router.use('/api/url', urlRoutes);

export default router;
