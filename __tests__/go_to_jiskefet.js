const timeout = global.TIME_OUT;
const url = `${process.env.TEST_URL}`;

describe(
  '/ (Home Page)',
  () => {
    let page;
    beforeAll(async () => {
      page = await global.BROWSER.newPage();
      await page.goto(url);
      await page.screenshot({ path: '__tests__/screenshots/jiskefet_home_page.png' });
    }, timeout);

    afterAll(async () => {
      await page.close();
    });

    test(`Check if ${url} is reachable`, async () => {
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain('Jiskefet');
    });
  },
  timeout,
);
