import validate from '../helper/validation.js';
import validateString from '../helper/validationString.js';
import prisma from '../application/database.js';
import ResponseError from '../helper/response.error.js';
import getPenelitians from '../scraping/penelitian.service.js';

const create = async (request) => {
  const dosen = validate(validateString, request.name);

  const data = await prisma.dosen.findFirst({
    where: {
      name: dosen,
    },
    select: {
      id: true,
      name: true,
      sinta_id: true,
    },
  });

  if (!data) {
    throw new ResponseError(400, 'Dosen is not found');
  }

  const jurnal = await prisma.jurnal.count({
    where: {
      dosen_id: data.id,
    },
  });

  if (jurnal > 1) {
    await prisma.jurnal.deleteMany({
      where: {
        dosen_id: data.id,
      },
    });
  }

  const riset = await getPenelitians(data.sinta_id);

  await Promise.all(riset.map(async (item) => {
    const {
      title, publication, year, category,
    } = item;

    await prisma.jurnal.create({
      data: {
        dosen_id: data.id,
        title,
        publication,
        year,
        category,
      },
    });
  }));

  return riset;
};

const getAll = async () => prisma.jurnal.findMany({
  where: {
    category: 'RISET',
  },
});

export default {
  create,
  getAll,
};
