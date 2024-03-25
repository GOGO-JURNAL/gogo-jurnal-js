import dosenService from './dosen.service.js';

const create = async (req, res, next) => {
  try {
    const data = await dosenService.create(req.body, req.user);
    res.status(200).json({
      status: 'Success create dosen',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const data = await dosenService.getAll(req.user);
    res.status(200).json({
      status: 'Success get all dosen',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const data = await dosenService.get(req.params, req.user);
    res.status(200).json({
      status: 'Success get dosen detail',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const data = await dosenService.update(req.body, req.params, req.user);
    res.status(200).json({
      status: 'Success update dosen',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const data = await dosenService.destroy(req.params, req.user);
    res.status(200).json({
      status: 'Success delete dosen',
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
