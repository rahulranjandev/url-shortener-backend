import { Router } from 'express';

const router = Router();

import AuthMiddleware from '@middlewares/authMiddleware';

import { AuthController } from '@controllers/authController';

import validateSchema from '@/middlewares/validateSchema';
import { loginUserSchema, registerUserSchema, forgetPasswordSchema, resetPasswordSchema } from '@schema/userSchema';
import { PasswdController } from '@/controllers/passwdController';

const authMiddleware = new AuthMiddleware();

const Auth = new AuthController();
const Password = new PasswdController();

/**
 * @alias   POST /api/v1/auth/register
 * @desc    Register user
 * @access  Public
 * @body    name, email and password
 */
router.post('/register', validateSchema(registerUserSchema), Auth.register);

/**
 * @alias   POST /api/v1/auth/login
 * @desc    Login user
 * @access  Public
 * @body    email and password
 */
router.post('/login', validateSchema(loginUserSchema), Auth.login);

/**
 * @alias   POST /api/v1/auth/forgotpassword
 * @desc    Forgot password
 * @access  Public
 * @body    email
 */
router.post('/forgotpassword', validateSchema(forgetPasswordSchema), Password.forgotPassword);

/**
 * @alias   PUT /api/v1/auth/resetpassword/:resettoken
 * @desc    Reset password
 * @access  Public
 * @body    password (new password) and resettoken
 */
router.post('/resetpassword/:resttoken', Password.resetPassword);

/**
 * @alias   GET /api/v1/auth/changepassword
 * @desc    Change password
 * @access  Private
 * @body    password (old password) and newpassword
 */
router.get('/changepassword', authMiddleware.isAuthenticated, authMiddleware.requireUser, Password.changePassword);

/**
 * @alias   GET /api/v1/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post('/logout', authMiddleware.isAuthenticated, authMiddleware.requireUser, Auth.logout);

/**
 * @alias   GET /confirm/:token
 * @desc    Confirm email
 * @access  Public
 * @body    token
 */
router.get('/confirm/:token', Auth.confirmEmail);

export default router;
