import puppeteer from 'puppeteer';

const getDosen = async (affiliationId) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto(`https://sinta.kemdikbud.go.id/affiliations/authors/${affiliationId}`), {
    waitUntil: 'domcontentloaded',
  };

  const affiliationPage = await page.evaluate(() => {
    const classPenelitian = document.querySelectorAll('.au-item.mt-3.mb-3.pb-5.pt-3');

    const penelitianList = [];
    classPenelitian.forEach((affiliation) => {
      const name = affiliation.querySelector('.profile-name').innerText;
      const dept = affiliation.querySelector('.profile-dept').innerText;
      let sintaId = affiliation.querySelector('.profile-id').innerText;

      sintaId = sintaId.replace('ID : ', '').trim();

      const affliationTemp = { name, dept, sintaId };
      penelitianList.push(affliationTemp);
    });

    return penelitianList;
  });

  await browser.close();

  return affiliationPage;
};

export default getDosen;
