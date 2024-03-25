import prodiService from './prodi.service.js';

const create = async (req, res, next) => {
  try {
    const data = await prodiService.create(req.body, req.user);
    res.status(200).json({
      status: 'Success create prodi',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const data = await prodiService.getAll(req.user);
    res.status(200).json({
      status: 'Success get all prodi',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const data = await prodiService.get(req.params, req.user);
    res.status(200).json({
      status: 'Success get prodi detail',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const data = await prodiService.update(req.body, req.params, req.user);
    res.status(200).json({
      status: 'Success update prodi',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const data = await prodiService.destroy(req.params, req.user);
    res.status(200).json({
      status: 'Success delete prodi',
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
