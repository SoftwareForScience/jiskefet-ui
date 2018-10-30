const chalk = require('chalk');
const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp'); // eslint-disable-line import/no-extraneous-dependencies
const os = require('os');
const path = require('path');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
const screenshotDir = '__tests__/screenshots';

module.exports = async function globalSetup() {
  console.log(chalk.green('Setup Puppeteer'));
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  // This global is not available inside tests but only in global teardown
  global.BROWSER_GLOBAL = browser;
  // Instead, we expose the connection details via file system to be used in tests
  console.log(`directory is ${DIR}`);
  mkdirp.sync(DIR);
  mkdirp.sync(screenshotDir);
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
  console.log(`workspace endpoint is ${browser.wsEndpoint()}`);
  console.log(`working directory path is ${path.join(DIR, 'wsEndpoint')}`);
};
