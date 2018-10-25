const timeout = global.TIMEOUT;

describe(
  '/ (Home Page Logs Filter)',
  () => {
    let page;
    beforeAll(async () => {
      page = await global.BROWSER_INSTANCE.newPage();
      // replace url with .env url
      await page.goto('http://192.168.253.157/#!/logs');
      await page.screenshot({ path: '__tests__/screenshots/jiskefet_home_page_logs_filter.png' });
    }, timeout);

    afterAll(async () => {
      await page.close();
    });

    it('should show the filter', async () => {
      const expectedFiltersArray = ['logId', 'searchterm'];
      const foundElementsArray = [];

      await page.evaluate(() => {
        foundElementsArray.push(document.getElementById('logId'));
        foundElementsArray.push(document.getElementById('searchterm'));
      });

      await foundElementsArray.forEach((text) => {
        expect(text).toContain(expectedFiltersArray);
      });
    });
  },
  timeout,
);
