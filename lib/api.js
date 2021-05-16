export function getStrapiURL(path = '') {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
  }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  console.log(requestUrl);
  const response = await fetch(requestUrl);
  // const errorCode = response.ok ? false : response.statusCode;
  const data = await response.json();
  return data;
}
