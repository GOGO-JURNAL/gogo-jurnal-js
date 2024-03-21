import validate from '../helper/validation.js';
import validateString from '../helper/validationString.js';
import prisma from '../application/database.js';
import ResponseError from '../helper/response.error.js';
import scrapingService from '../scraping/scraping.service.js';

const create = async (request, journalCategory) => {
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

  const journalData = await prisma.jurnal.count({
    where: {
      dosen_id: data.id,
    },
  });

  if (journalData > 1) {
    await prisma.jurnal.deleteMany({
      where: {
        dosen_id: data.id,
      },
    });
  }

  let journal = [];
  for (const category of journalCategory) {
    if (category === 'riset') {
      journal = journal.concat(await scrapingService.getResearch(data.sinta_id));
    } else if (category === 'scopus') {
      journal = journal.concat(await scrapingService.getScopus(data.sinta_id));
    } else if (category === 'pengabdian') {
      journal = journal.concat(await scrapingService.getPengabdian(data.sinta_id));
    } else {
      throw new Error(`Invalid journal category parameter: ${category}`);
    }
  }

  await Promise.all(journal.map(async (item) => {
    const {
      title, publication, cited, year, category,
    } = item;

    const arrYear = year.split(' ');
    const arrCite = cited ? cited.split(' ') : [];

    await prisma.jurnal.create({
      data: {
        dosen_id: data.id,
        title,
        publication,
        cite: cited !== undefined ? arrCite[1] : null,
        year: arrYear[1],
        category,
      },
    });
  }));

  return journal;
};

const getAll = async (requestQuery) => {
  const {
    id, title, year, cite, category, dosenId, dosenName, publication,
  } = requestQuery;

  let where = {
    id: id !== undefined ? id : undefined,
    title: title !== undefined ? title : undefined,
    cite: cite !== undefined ? cite : undefined,
    category: category !== undefined ? category : undefined,
    publication: publication !== undefined ? publication : undefined,
    dosen: {
      id: dosenId !== undefined ? dosenId : undefined,
      name: dosenName !== undefined ? dosenName : undefined,
    },
  };

  if (year !== undefined) {
    // Jika hanya ingin jurnal pada tahun tertentu
    if (requestQuery.gte === undefined) {
      where = { ...where, year: { equals: year } };
    } else {
      // Jika ingin jurnal dari tahun tertentu dan tahun di atasnya
      where = { ...where, year: { gte: year } };
    }
  }

  const result = prisma.jurnal.findMany({
    where,
    select: {
      id: true,
      title: true,
      year: true,
      cite: true,
      category: true,
      publication: true,
      dosen: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!result) {
    throw new ResponseError(400, 'Journal Resesarch is not found');
  }

  return result;
};

export default {
  create,
  getAll,
};
