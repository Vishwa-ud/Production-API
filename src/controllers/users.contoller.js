import logger from '#config/logger.js';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '#services/users.service.js';
import {
  userIdSchema,
  updateUserSchema,
} from '#validations/users.validation.js';
import { formatValidationErrors } from '#utils/format.js';

export const fetchAllUsers = async (req, res, next) => {
  try {
    logger.info('Fetching all users');

    const allUsers = await getAllUsers();
    res.json({
      message: 'Users fetched successfully',
      users: allUsers,
      count: allUsers.length,
    });
  } catch (e) {
    logger.error(e);
    next(e);
  }
};

export const fetchUserById = async (req, res, next) => {
  try {
    // Validate request params
    const validationResult = userIdSchema.safeParse(req.params);

    if (!validationResult.success) {
      logger.warn('Validation failed for getUserById', {
        errors: validationResult.error,
      });
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationErrors(validationResult.error),
      });
    }

    const { id } = validationResult.data;
    logger.info(`Fetching user with id: ${id}`);

    const user = await getUserById(id);
    res.json({
      message: 'User fetched successfully',
      user,
    });
  } catch (e) {
    logger.error('Error in fetchUserById', e);

    if (e.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }

    next(e);
  }
};

export const modifyUser = async (req, res, next) => {
  try {
    // Validate user ID from params
    const idValidationResult = userIdSchema.safeParse(req.params);

    if (!idValidationResult.success) {
      logger.warn('Validation failed for user ID', {
        errors: idValidationResult.error,
      });
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationErrors(idValidationResult.error),
      });
    }

    const { id } = idValidationResult.data;

    // Validate update data from body
    const updateValidationResult = updateUserSchema.safeParse(req.body);

    if (!updateValidationResult.success) {
      logger.warn('Validation failed for update data', {
        errors: updateValidationResult.error,
      });
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationErrors(updateValidationResult.error),
      });
    }

    const updates = updateValidationResult.data;

    // Check if user is authenticated
    if (!req.user) {
      logger.warn('Update attempt without authentication');
      return res
        .status(401)
        .json({ error: 'Unauthorized', message: 'Authentication required' });
    }

    // Authorization checks:
    // 1. Users can only update their own information (except role)
    // 2. Only admins can update any user's information
    // 3. Only admins can change roles
    if (req.user.role !== 'admin') {
      // Non-admin users can only update themselves
      if (req.user.id !== id) {
        logger.warn(`User ${req.user.id} attempted to update user ${id}`);
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You can only update your own information',
        });
      }

      // Non-admin users cannot change role
      if (updates.role) {
        logger.warn(`User ${req.user.id} attempted to change role`);
        return res.status(403).json({
          error: 'Forbidden',
          message: 'Only admins can change user roles',
        });
      }
    }

    logger.info(`Updating user with id: ${id}`);

    const updatedUser = await updateUser(id, updates);
    res.json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (e) {
    logger.error('Error in modifyUser', e);

    if (e.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }

    if (e.message === 'Email already in use') {
      return res.status(409).json({ error: 'Email already in use' });
    }

    next(e);
  }
};

export const removeUser = async (req, res, next) => {
  try {
    // Validate user ID from params
    const validationResult = userIdSchema.safeParse(req.params);

    if (!validationResult.success) {
      logger.warn('Validation failed for user ID', {
        errors: validationResult.error,
      });
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationErrors(validationResult.error),
      });
    }

    const { id } = validationResult.data;

    // Check if user is authenticated
    if (!req.user) {
      logger.warn('Delete attempt without authentication');
      return res
        .status(401)
        .json({ error: 'Unauthorized', message: 'Authentication required' });
    }

    // Authorization checks:
    // 1. Users can delete their own account
    // 2. Admins can delete any user account
    if (req.user.role !== 'admin' && req.user.id !== id) {
      logger.warn(`User ${req.user.id} attempted to delete user ${id}`);
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You can only delete your own account',
      });
    }

    logger.info(`Deleting user with id: ${id}`);

    const result = await deleteUser(id);
    res.json({
      message: 'User deleted successfully',
      id: result.id,
    });
  } catch (e) {
    logger.error('Error in removeUser', e);

    if (e.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }

    next(e);
  }
};
