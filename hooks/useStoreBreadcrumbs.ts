import { useEffect } from 'react';

const MAX_HISTORY_SIZE_BETWEEN = 2;

export const useStoreBreadcrumbs = (breadcrumb_2nd_loc, isReady, asPath) => {
  useEffect(() => isReady && storePathValues(breadcrumb_2nd_loc), [asPath, isReady,breadcrumb_2nd_loc]);
};

function storePathValues(breadcrumb_2nd_loc) {
  const storage = globalThis?.sessionStorage;
  if (!storage) return;
  // console.log('storePathValues called');

  // // Set the previous path as the value of the current path.
  // const isSamePath =
  //   storage.getItem('currentPath') &&
  //   storage.getItem('prevPath') &&
  //   storage.getItem('currentPath') === storage.getItem('prevPath');
  // if (isSamePath) return;

  const prevPath = storage.getItem('currentPath');
  storage.setItem('prevPath', prevPath);

  // Set the current path value by looking at the browser's location object.
  // if(globalThis.location.pathname.includes('search-page')){
  //   storage.setItem('currentPath', locale === 'en' ? '/search-page' : '/en/search-page');
  // }

  storage.setItem('currentPath', globalThis.location.pathname);

  // Set the previous path as the value of the current path.
  const isSamePath =
    storage.getItem('currentPath') &&
    storage.getItem('prevPath') &&
    storage.getItem('currentPath') === storage.getItem('prevPath');
  if (isSamePath) return;

  let breadcrumbs_EN = JSON.parse(sessionStorage.getItem('breadcrumbs_EN'));
  let breadcrumbs_GR = JSON.parse(sessionStorage.getItem('breadcrumbs_GR'));
  let breadcrumbs3_EN = new Array<string>();
  let breadcrumbs3_GR = new Array<string>();
  if (breadcrumbs_EN) {
    if (breadcrumbs_EN?.length > 1) {
      breadcrumbs3_EN = breadcrumbs_EN.slice(
        -1 * (MAX_HISTORY_SIZE_BETWEEN - 1)
      );
      breadcrumbs3_GR = breadcrumbs_GR.slice(
        -1 * (MAX_HISTORY_SIZE_BETWEEN - 1)
      );
    } else {
      breadcrumbs3_EN = breadcrumbs_EN;
      breadcrumbs3_GR = breadcrumbs_GR;
    }
  }
  if (globalThis.location.pathname.includes('/en')) {
    breadcrumbs3_EN.push(globalThis.location.pathname);
    breadcrumbs3_GR.push(breadcrumb_2nd_loc);
  } else {
    breadcrumbs3_GR.push(globalThis.location.pathname);
    breadcrumbs3_EN.push(breadcrumb_2nd_loc);
  }
  breadcrumbs3_EN = breadcrumbs3_EN.filter(
    (bc, index) => breadcrumbs3_EN.indexOf(bc) === index
  );
  breadcrumbs3_GR = breadcrumbs3_GR.filter(
    (bc, index) => breadcrumbs3_GR.indexOf(bc) === index
  );
  sessionStorage.setItem('breadcrumbs_EN', JSON.stringify(breadcrumbs3_EN));
  sessionStorage.setItem('breadcrumbs_GR', JSON.stringify(breadcrumbs3_GR));
}
