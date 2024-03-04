import userService from './user.service.js';

const register = async (req, res, next) => {
  try {
    const data = await userService.register(req.body);
    res.status(201).json({
      data,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const data = await userService.login(req.body);
    res.status(200).json({
      data,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  register,
  login,
};
