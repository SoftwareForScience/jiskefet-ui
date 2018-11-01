const timeout = global.TIME_OUT;
const url = `${process.env.TEST_URL}`;
describe(
  'Jiskefet Filters',
  () => {
    let page;
    beforeAll(async () => {
      page = await global.BROWSER.newPage();
      await page.goto(`${url}#!/logs/create`);
    }, timeout);

    afterAll(async () => {
      await page.close();
    });

    test('Testing snapshot', async () => {
      const html = await page.evaluate(() => document.body.innerHTML);
      expect(html).toMatchSnapshot();
    });
  },
);
