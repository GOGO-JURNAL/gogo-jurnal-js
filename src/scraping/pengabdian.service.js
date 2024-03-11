import puppeteer from 'puppeteer';

const getPengabdians = async (sintaiId) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto(`https://sinta.kemdikbud.go.id/authors/profile/${sintaiId}/?view=services`), {
    waitUntil: 'domcontentloaded',
  };

  const pengabdians = await page.evaluate(() => {
    const classPengabdian = document.querySelectorAll('.ar-list-item.mb-5');

    const pengabdianList = [];
    classPengabdian.forEach((pengabdian) => {
      const title = pengabdian.querySelector('.ar-title').innerText;
      const publication = pengabdian.querySelector('.ar-pub').innerText;
      const year = pengabdian.querySelector('.ar-year').innerText;

      const pengabdianTemp = {
        title, publication, year,
      };
      pengabdianList.push(pengabdianTemp);
    });

    return pengabdianList;
  });

  await browser.close();

  return pengabdians;
};

export default getPengabdians;
