import risetService from './riset.service.js';

const create = async (req, res, next) => {
  try {
    const data = await risetService.create(req.body);
    res.status(200).json({
      status: 'Success create journal research',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const data = await risetService.getAll();
    res.status(200).json({
      status: 'Success get all journal research',
      data,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  create,
  getAll,
};
