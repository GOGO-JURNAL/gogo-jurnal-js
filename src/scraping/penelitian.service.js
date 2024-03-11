import puppeteer from 'puppeteer';

const getPenelitians = async (sintaiId) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto(`https://sinta.kemdikbud.go.id/authors/profile/${sintaiId}/?view=researches`), {
    waitUntil: 'domcontentloaded',
  };

  const penelitians = await page.evaluate(() => {
    const classPenelitian = document.querySelectorAll('.ar-list-item.mb-5');

    const penelitianList = [];
    classPenelitian.forEach((penelitian) => {
      const title = penelitian.querySelector('.ar-title').innerText;
      const publication = penelitian.querySelector('.ar-pub').innerText;
      const year = penelitian.querySelector('.ar-year').innerText;

      const penelitianTemp = {
        title, publication, year,
      };
      penelitianList.push(penelitianTemp);
    });

    return penelitianList;
  });

  await browser.close();

  return penelitians;
};

export default getPenelitians;
