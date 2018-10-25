const timeout = global.TIMEOUT;

describe(
  '/ (Home Page)',
  () => {
    let page;
    beforeAll(async () => {
      page = await global.BROWSER_INSTANCE.newPage();
      // replace url with .env url
      await page.goto('http://192.168.253.157/');
      await page.screenshot({ path: '__tests__/screenshots/jiskefet_home_page.png' });
    }, timeout);

    afterAll(async () => {
      await page.close();
    });

    it('should load without error', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain('Jiskefet');
    });
  },
  timeout,
);
