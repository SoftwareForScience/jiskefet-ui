import faker from "faker";
import puppeteer from "puppeteer";

// Read url from .env
const App = 'http://192.168.253.157/#!/logs/create';

const lead = {
    title: faker.random.words,
    subtype: 'run',
    description: faker.lorem.paragraphs(3)
};

let page;
let browser;
const width = 1920;
const height = 1080;

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: [`--window-size=${width}, ${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({ width, height});
});

describe("Create run form", () => {
    test("lead can submit a run", async () => {
        await page.goto(App);
        await page.waitForSelector("[data-test=quill-container]");
        await page.click("input[name=title]");
        await page.type("input[name=title]", lead.title);
        await page.click("input[name=subtype]");
        await page.type("input[name=subtype]", lead.subtype);
        await page.click("button[type=submit]");
        await page.waitFor(5000);
    }, 16000);
});

afterAll(() => {
    browser.close();
});
