const timeout = global.TIME_OUT;
const url = 'http://145.92.8.34/';
// process.env is undefined
// const processEnvUrl = `${process.env.API_URL}`;

describe(
  '/ (Home Page)',
  () => {
    let page;
    beforeAll(async () => {
      page = await global.BROWSER.newPage();
      // replace url with .env url
      await page.goto(url);
      await page.screenshot({ path: '__tests__/screenshots/jiskefet_home_page.png' });
    }, timeout);

    afterAll(async () => {
      await page.close();
    });

    test(`Check if ${url} is reachable`, async () => {
      // console.log(`environment url is ${processEnvUrl}`);
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain('Jiskefet');
    });
  },
  timeout,
);
