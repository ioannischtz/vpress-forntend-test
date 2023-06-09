export default function storePathValues(nextPath) {
  const storage = globalThis?.sessionStorage;
  if (!storage) return;

  const isSamePath =
    globalThis.location.pathname === nextPath &&
    sessionStorage.getItem('breadcrumbs');
  if (isSamePath) return;

  const changeToEN =
    !globalThis.location.pathname.includes('/en') && nextPath.includes('/en');
  const changeToGR =
    globalThis.location.pathname.includes('/en') && !nextPath.includes('/en');

  if (globalThis.location.pathname.includes('/en')) {
    let breadcrumbs_EN = JSON.parse(sessionStorage.getItem('breadcrumbs_EN'));
    let breadcrumbs3_EN = new Array<string>();
    if (breadcrumbs_EN) {
      if (breadcrumbs_EN.length > 0) {
        if (changeToGR) {
          if (nextPath === '/') {
            if (globalThis.location.pathname + '/' === '/en' + nextPath) {
              return;
            }
          }
          if (globalThis.location.pathname === '/en' + nextPath) {
            return;
          }
        }
      }

      if (breadcrumbs_EN?.length > 1) {
        breadcrumbs3_EN = breadcrumbs_EN.slice(-1 * 2);
      } else {
        breadcrumbs3_EN = breadcrumbs_EN;
      }
    }

    breadcrumbs3_EN.push(nextPath);
    sessionStorage.setItem('breadcrumbs', JSON.stringify(breadcrumbs3_EN));
  } else {
    if (changeToEN) {
      if (nextPath === '/en') {
        if ('/en' + globalThis.location.pathname === nextPath + '/') {
          return;
        }
      }

      if ('/en' + globalThis.location.pathname === nextPath) {
        return;
      }
    }
  }
}
