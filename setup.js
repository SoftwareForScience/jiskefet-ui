// setup from https://jestjs.io/docs/en/puppeteer

const chalk = require('chalk');
const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp'); // eslint-disable-line import/no-extraneous-dependencies
const os = require('os');
const path = require('path');
const dotenv = require('dotenv');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
const screenshotDir = '__tests__/screenshots';

module.exports = async function globalSetup() {
  console.log(chalk.green('Setup Puppeteer'));
  dotenv.config();

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  // This global is not available inside tests but only in global teardown
  global.BROWSER_GLOBAL = browser;

  // make directory for setup variables of jest and puppeteer
  mkdirp.sync(DIR);

  // make screenshot directory for puppeteer
  mkdirp.sync(screenshotDir);

  // Instead, we expose the connection details via file system to be used in tests
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};
