import logger from '#config/logger.js';
import { jwttoken } from '#utils/jwt.js';

export const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      logger.warn('Authentication failed: No token provided');
      return res
        .status(401)
        .json({ error: 'Unauthorized', message: 'Authentication required' });
    }

    const decoded = jwttoken.verify(token);
    req.user = decoded;

    logger.info(`User authenticated: ${decoded.email}`);
    next();
  } catch (e) {
    logger.error('Authentication error', e);
    return res
      .status(401)
      .json({ error: 'Unauthorized', message: 'Invalid or expired token' });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    logger.warn('Authorization failed: User not authenticated');
    return res
      .status(401)
      .json({ error: 'Unauthorized', message: 'Authentication required' });
  }

  if (req.user.role !== 'admin') {
    logger.warn(`Authorization failed: User ${req.user.email} is not an admin`);
    return res
      .status(403)
      .json({ error: 'Forbidden', message: 'Admin access required' });
  }

  next();
};
