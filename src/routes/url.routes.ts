import { Router } from 'express';

const router = Router();

import AuthMiddleware from '@middlewares/authMiddleware';
import { UrlController } from '@controllers/urlController';
import validateSchema from '@/middlewares/validateSchema';
import { urlCodeSchema, urlSchema } from '@schema/urlSchema';

const authMiddleware = new AuthMiddleware();
const Url = new UrlController();

/**
 * @description Create Short URL - /api/v1/url/ - Private Routes
 * @access User Access - Private
 * @alias POST /api/v1/url/
 */
router.post(
  '/',
  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,
  validateSchema(urlSchema),

  Url.createShortUrl
);

/**
 * @description Get All URLs - /api/v1/url - Private Routes
 * @access User Access - Private
 * @alias GET /api/v1/url
 */
router.get(
  '/',
  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,

  Url.getAllUrls
);

/**
 * @description Update Short URL - /api/v1/url - Private Routes
 * @access User Access - Private
 * @alias PUT /api/v1/url
 * @params urlCode
 */
router.put(
  '/:urlCode',
  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,
  validateSchema(urlCodeSchema),
  validateSchema(urlSchema),

  Url.updateShortUrl
);

/**
 * @description Delete Short URL - /api/v1/url - Private Routes
 * @access User Access - Private
 * @alias DELETE /api/v1/url
 * @params urlCode
 */
router.delete(
  '/:urlCode',
  authMiddleware.isAuthenticated,
  authMiddleware.requireUser,
  validateSchema(urlCodeSchema),

  Url.deleteShortUrl
);

export default router;
