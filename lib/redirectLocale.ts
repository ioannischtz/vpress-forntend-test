import router from 'next/router';

const redirectLocale = (locale, slug) => {
  if (slug === '') {
    router.push(
      { pathname: router.pathname, query: router.query },
      router.asPath,
      { locale: locale }
    );
  } else {
    router.push(
      { pathname: router.pathname, query: { slug: slug } },
      `${router.pathname.replace('/[slug]', '')}/${slug}`,
      {
        locale: locale,
      }
    );
  }
};

export default redirectLocale;
