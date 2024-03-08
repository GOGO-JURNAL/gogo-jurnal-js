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

const get = async (req, res, next) => {
  try {
    const { username } = req.user;
    const data = await userService.get(username);
    res.status(200).json({
      data,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { username } = req.user;
    const request = req.body;
    request.username = username;

    const data = await userService.update(request);
    res.status(200).json({
      data,
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    await userService.logout(req.user.username);
    res.status(200).json({
      data: 'OK',
    });
  } catch (err) {
    next(err);
  }
};

export default {
  register,
  login,
  get,
  update,
  logout,
};
