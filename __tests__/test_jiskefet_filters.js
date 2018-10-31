const timeout = global.TIME_OUT;
const url = `${process.env.TEST_URL}`;
const currentDateTime = new Date().toLocaleString();
const logTestTitle = `puppeteer test title ${currentDateTime}`;

describe(
  'Home Page Logs Filter',
  () => {
    let page;
    beforeAll(async () => {
      page = await global.BROWSER.newPage();
      await page.goto(`${url}#!/logs`);
      await page.screenshot({ path: '__tests__/screenshots/jiskefet_home_page_logs_filter.png' });
    }, timeout);

    afterAll(async () => {
      await page.close();
    });

    test('create a log', async () => {
      await page.goto(`${url}#!/logs/create`);
      await page.waitFor('#title');
      await page.click('input[id=title]');
      await page.type('input[id=title]', `${logTestTitle}`);
      await page.select('select[id=subtype]', 'run');
      await page.click('button[type=submit]');
      await page.screenshot({ path: '__tests__/screenshots/jiskefet_log_filled_in.png' });
    }, timeout);

    test('home page should show the filter', async () => {
      await page.goto(`${url}#!/logs`);
      await page.waitFor('.filters-responsive');

      const expectedElementsArray = ['#logId', '#searchterm'];
      let foundElementsCounter = 0;

      await Promise.all(expectedElementsArray.map(async (element) => {
        if (await page.$(element) !== null) {
          foundElementsCounter += 1;
        }
      }));

      await expect(foundElementsCounter).toBe(expectedElementsArray.length);
    });

    test('test log filter', async () => {
      await page.waitFor('.filters-responsive');
      await page.click('input[id=searchterm]');
      await page.type('input[id=searchterm]', `${logTestTitle}`);
      await page.click('div[class=container-fluid]');
      await page.waitFor(1000);
      await page.screenshot({ path: '__tests__/screenshots/jiskefet_log_table_result.png' });

      const selector = '.table-responsive-xl > .table > tbody > tr';

      // creates a 2D array of the table row content
      const row = await page.$$eval(selector, trs => trs.map((tr) => {
        const tds = [...tr.getElementsByTagName('td')];
        return tds.map(td => td.textContent);
      }));

      // console.log(row[0][1]);
      await expect(row[0][1]).toContain(logTestTitle);
    });

    test('runs page should show the filter', async () => {
      await page.goto(`${url}#!/runs`);
      await page.waitFor('.filters-responsive');
      await page.screenshot({ path: '__tests__/screenshots/jiskefet_runs_filter.png' });

      const expectedElementsArray = ['#runNumber', '#timeO2Start'];
      let foundElementsCounter = 0;

      await Promise.all(expectedElementsArray.map(async (element) => {
        if (await page.$(element) !== null) {
          foundElementsCounter += 1;
        }
      }));

      await expect(foundElementsCounter).toBe(expectedElementsArray.length);
    });
  },
  timeout,
);
