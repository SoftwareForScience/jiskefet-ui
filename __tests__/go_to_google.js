const timeout = global.TIME_OUT;
const url = 'https://google.com';

describe(
  'Google Home Page',
  () => {
    let page;
    beforeAll(async () => {
      page = await global.BROWSER.newPage();
      await page.goto(url);
    }, timeout);

    afterAll(async () => {
      await page.close();
    });

    test(`If ${url} is reachable`, async () => {
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain('google');
    });
  },
  timeout,
);
