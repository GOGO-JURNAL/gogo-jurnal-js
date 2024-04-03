import universityService from './university.service.js';

const create = async (req, res, next) => {
  try {
    const data = await universityService.create(req.body, req.user);
    res.status(200).json({
      status: 'Success create university',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const data = await universityService.getAll(req.user);
    res.status(200).json({
      status: 'Success get all university',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const data = await universityService.get(req.params, req.user);
    res.status(200).json({
      status: 'Success get university detail',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const data = await universityService.update(req.body, req.params, req.user);
    res.status(200).json({
      status: 'Success update university',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const data = await universityService.destroy(req.params, req.user);
    res.status(200).json({
      status: 'Success delete university',
      data,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  create,
  getAll,
  get,
  update,
  destroy,
};
