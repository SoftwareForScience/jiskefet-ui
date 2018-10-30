const timeout = global.TIME_OUT;
const url = 'http://145.92.8.34/';

describe(
  'Home Page Logs Filter',
  () => {
    let page;
    beforeAll(async () => {
      page = await global.BROWSER.newPage();
      // replace url with .env url
      await page.goto(`${url}#!/logs`);
      await page.screenshot({ path: '__tests__/screenshots/jiskefet_home_page_logs_filter.png' });
    }, timeout);

    afterAll(async () => {
      await page.close();
    });

    test('should show the filter', async () => {
      const expectedElementsArray = ['#logId', '#searchterm'];
      let foundElementsCounter = 0;

      console.log(`time out is ${timeout}`);
      await Promise.all(expectedElementsArray.map(async (element) => {
        console.log(`checking ${element}`);
        if (await page.$(element) !== null) {
          foundElementsCounter += 1;
          console.log(`found ${element}`);
        } else {
          console.log(`unable to find ${element}`);
        }
      }));

      await expect(foundElementsCounter).toBe(expectedElementsArray.length);
    });
  },
  timeout,
);
