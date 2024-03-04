import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { request } from 'express';
import validate from '../helper/validation.js';
import userValidation from './user.validation.js';
import prisma from '../application/database.js';
import ResponseError from '../helper/response.error.js';

const register = async (request) => {
  const user = validate(userValidation.register, request);

  const countUser = await prisma.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
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

  const getUser = await prisma.user.findUnique({
    where: {
      username: user.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (!getUser) {
    throw new ResponseError(401, 'Username or password wrong');
  }

  const isPasswordValid = await bcrypt.compare(user.password, getUser.password);

  if (!isPasswordValid) {
    throw new ResponseError(401, 'Username or password wrong');
  }

  const token = uuid().toString();

  return prisma.user.update({
    data: {
      token,
    },
    where: {
      username: getUser.username,
    },
    select: {
      token: true,
    },
  });
};

export default {
  register,
  login,
};
