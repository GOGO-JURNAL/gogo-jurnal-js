import getJurnal from '../helper/scraping.js';

async function getAllScopus(req, res) {
  const { sintaId } = req.body;
  const link = `https://sinta.kemdikbud.go.id/authors/profile/${sintaId}`;
  const data = await getJurnal(sintaId, link, true);
  res.send(data);

  res.send('error');
}

async function getAllPenelitian(req, res) {
  try {
    const { sintaId } = req.body;
    const link = `https://sinta.kemdikbud.go.id/authors/profile/${sintaId}/?view=researches`;
    res.send(await getJurnal(sintaId, link, false));
  } catch (e) {
    res.send('error');
  }
}

export default { getAllScopus, getAllPenelitian };
