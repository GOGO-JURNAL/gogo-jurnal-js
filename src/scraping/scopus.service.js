import puppeteer from 'puppeteer';

const getScopuses = async (sintaiId) => {
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

      const scopeList = {
        title, publication, cited, year,
      };
      scopusList.push(scopeList);
    });

    return scopusList;
  });

  await browser.close();

  return scopus;
};

export default getScopuses;
