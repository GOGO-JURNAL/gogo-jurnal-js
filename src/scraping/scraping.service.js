import puppeteer from 'puppeteer';

const getResearch = async (sintaiId) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto(`https://sinta.kemdikbud.go.id/authors/profile/${sintaiId}/?view=researches`), {
    waitUntil: 'domcontentloaded',
  };

  const research = await page.evaluate(() => {
    const classResearch = document.querySelectorAll('.ar-list-item.mb-5');

    const researchList = [];
    classResearch.forEach((penelitian) => {
      const title = penelitian.querySelector('.ar-title').innerText;
      const publication = penelitian.querySelector('.ar-pub').innerText;
      const year = penelitian.querySelector('.ar-year').innerText;
      const category = 'RISET';

      const penelitianTemp = {
        title, publication, year, category,
      };
      researchList.push(penelitianTemp);
    });

    return researchList;
  });

  await browser.close();

  return research;
};

const getPengabdian = async (sintaiId) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto(`https://sinta.kemdikbud.go.id/authors/profile/${sintaiId}/?view=services`), {
    waitUntil: 'domcontentloaded',
  };

  const pengabdian = await page.evaluate(() => {
    const classPengabdian = document.querySelectorAll('.ar-list-item.mb-5');

    const pengabdianList = [];
    classPengabdian.forEach((pengabdian) => {
      const title = pengabdian.querySelector('.ar-title').innerText;
      const publication = pengabdian.querySelector('.ar-pub').innerText;
      const year = pengabdian.querySelector('.ar-year').innerText;
      const category = 'PENGABDIAN';

      const pengabdianTemp = {
        title, publication, year, category,
      };
      pengabdianList.push(pengabdianTemp);
    });

    return pengabdianList;
  });

  await browser.close();

  return pengabdian;
};

const getScopus = async (sintaiId) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto(`https://sinta.kemdikbud.go.id/authors/profile/${sintaiId}`), {
    waitUntil: 'domcontentloaded',
  };

  const scopus = await page.evaluate(() => {
    const classScopus = document.querySelectorAll('.ar-list-item.mb-5');

    const scopusList = [];
    classScopus.forEach((scope) => {
      const title = scope.querySelector('.ar-title').innerText;
      const publication = scope.querySelector('.ar-pub').innerText;
      const cited = scope.querySelector('.ar-cited').innerText;
      const year = scope.querySelector('.ar-year').innerText;
      const category = 'SCOPUS';

      const scopeList = {
        title, publication, cited, year, category,
      };
      scopusList.push(scopeList);
    });

    return scopusList;
  });

  await browser.close();

  return scopus;
};

export default {
  getResearch, getPengabdian, getScopus,
};
