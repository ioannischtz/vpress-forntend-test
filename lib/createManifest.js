/* eslint-disable @typescript-eslint/no-var-requires */

const fetchAPI = require('../lib/api-CJS');
const fs = require('fs');

async function createManifestsFromCMS() {
  const [data_GR, data_EN] = await Promise.all([
    fetchAPI('/global'),
    fetchAPI('/global?_locale=en'),
  ]);
  fs.writeFile(
    './data/global-manifest_GR.json',
    JSON.stringify(data_GR),
    (err) => {
      if (err) throw err;
      console.info('Global data manifest written to file');
    }
  );
  fs.writeFile(
    './data/global-manifest_EN.json',
    JSON.stringify(data_EN),
    (err) => {
      if (err) throw err;
      console.info('Global data manifest written to file');
    }
  );
}

async function main() {
  try {
    await createManifestsFromCMS();
  } catch (err) {
    throw new Error(err);
  }
}

main();
