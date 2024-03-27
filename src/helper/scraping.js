import puppeteer from 'puppeteer';

const getJurnal = async (sintaiId, link, cite) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto(link), {
    waitUntil: 'domcontentloaded',
  };

  const type = await page.evaluate(() => {
    const classType = document.querySelectorAll('.ar-list-item.mb-5');

    const typeList = [];
    classType.forEach((scope) => {
      const title = scope.querySelector('.ar-title').innerText;
      const publication = scope.querySelector('.ar-pub').innerText;
      const year = scope.querySelector('.ar-year').innerText;

      const cited = scope.querySelector('.ar-cited').innerText;
      const scopeList = {
        title,
        publication,
        cited,
        year,
      };

      typeList.push(scopeList);
    });

    return typeList;
  });

  await browser.close();

  return type;
};

export default getJurnal;
