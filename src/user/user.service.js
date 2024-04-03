import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import validate from '../helper/validation.js';
import userValidation from './user.validation.js';
import prisma from '../application/database.js';
import ResponseError from '../helper/response.error.js';

const register = async (request) => {
  const user = validate(userValidation.register, request);

  const data = await prisma.user.count({
    where: {
      username: user.username,
    },
  });

  if (data === 1) {
    throw new ResponseError(400, 'Username already exists');
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prisma.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

const login = async (request) => {
  const user = validate(userValidation.login, request);

  const data = await prisma.user.findUnique({
    where: {
      username: user.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (!data) {
    throw new ResponseError(401, 'Username or password wrong');
  }

  const isPasswordValid = await bcrypt.compare(user.password, data.password);

  if (!isPasswordValid) {
    throw new ResponseError(401, 'Username or password wrong');
  }

  const token = uuid().toString();

  return prisma.user.update({
    data: {
      token,
    },
    where: {
      username: data.username,
    },
    select: {
      token: true,
    },
  });
};

const get = async (request) => {
  const username = validate(userValidation.get, request);

  const data = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
      name: true,
    },
  });

  if (!data) {
    throw new ResponseError(404, 'User is not found');
  }

  return data;
};

const update = async (request) => {
  const user = validate(userValidation.update, request);

  const data = await prisma.user.count({
    where: {
      username: user.username,
    },
  });

  if (data !== 1) {
    throw new ResponseError(404, 'User is not found');
  }

  const updated = {};

  if (user.name) {
    updated.name = user.name;
  }

  if (user.password) {
    updated.password = await bcrypt.hash(user.password, 10);
  }

  return prisma.user.update({
    where: {
      username: user.username,
    },
    data: updated,
    select: {
      username: true,
      name: true,
    },
  });
};

const logout = async (request) => {
  const username = validate(userValidation.get, request);

  const data = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!data) {
    throw new ResponseError(404, 'User is not found');
  }

  return prisma.user.update({
    where: {
      username,
    },
    data: {
      token: null,
    },
    select: {
      username: true,
    },
  });
};

export default {
  register,
  login,
  get,
  update,
  logout,
};
