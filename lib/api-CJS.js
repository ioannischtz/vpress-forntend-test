/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('isomorphic-unfetch');

function getStrapiURL(path = '') {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
  }${path}`;
}

// Helper to make GET requests to Strapi
async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  console.log(requestUrl);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}

module.exports = getStrapiURL;
module.exports = fetchAPI;
