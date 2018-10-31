const chalk = require('chalk');
const rimraf = require('rimraf');
const os = require('os');
const path = require('path');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function globalTearDown() {
  console.log(chalk.green('Teardown Puppeteer'));
  await global.BROWSER_GLOBAL.close();

  // remove the directory of temporary setup variables
  rimraf.sync(DIR);
};
