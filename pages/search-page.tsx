import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import PhotoPostCard from '../components/Card/PhotoPostCard';
import ContentGrid from '../components/layouts/ContentGrid';
import Layout from '../components/layouts/Layout';
import { useStoreBreadcrumbs } from '../hooks/useStoreBreadcrumbs';
import { fetchAPI } from '../lib/api';
import { GetStaticProps } from 'next';
import { CategoriesResponse, PhotoPostsResponse, WritersResponse } from '../custom_typings/models';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // Run API calls in parallel
  const [categories, writers] = await Promise.all([
    fetchAPI(`/categories?_locale=${locale}&_sort=order`),
    fetchAPI(`/writers?_locale=${locale}`),
  ]);

  return {
    props: { categories, writers },
    revalidate: 24*60*60,
  };
}

interface SearchPageProps {
  categories: CategoriesResponse[];
  writers: WritersResponse[];
}


const SearchPage: React.FC<SearchPageProps> = ({ categories, writers }) => {
  const { query, asPath, pathname, locale, isReady } = useRouter();
  // const isMounted = useMounted();
  
  const [initialData, setInitialData] = useState<PhotoPostsResponse[]>([]);
  

  const cache = useRef({});
  // const { data, isValidating, error } = useSWR(
  //   query?.q?.length > 0 ? `/photo-posts?_q=${query.q}&_limit=5` : null,
  //   fetchAPI,
  //   { revalidateOnFocus: false, revalidateOnMount: false }
  // );

  // SEO
  const SEO = {
    title: locale === 'en' ? 'Search Photo-posts' : 'Αναζήτηση Φωτογραφιών',
    description:
      locale === 'en'
        ? 'Search Photo-posts Page with queries and filters'
        : 'Αναζήτηση Φωτογραφιών με όρους αναζήτησης και φίλτρα',
    openGraph: {
      title: locale === 'en' ? 'Search Photo-posts' : 'Αναζήτηση Φωτογραφιών',
      description:
        locale === 'en'
          ? 'Search Photo-posts Page with queries and filters'
          : 'Αναζήτηση Φωτογραφιών με όρους αναζήτησης και φίλτρα',
    },
  };

  // pagination
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(
    initialData.length > 0
      ? initialData.length < 15
        ? initialData.length 
        : 14
      : 0
  );
  const [isEmpty, setIsEmpty] = useState(initialData?.length === 0);
  const [isReachingEnd, setIsReachingEnd] = useState(
    isEmpty ||
      (initialData && endIndex >= initialData.length - 1) ||
      initialData.length < 15
  );

  useStoreBreadcrumbs(
    locale === 'en' ? '/search-page' : '/en/search-page',
    isReady,
    asPath
  );

  useEffect(() => {
    // if (isMounted && query && query.q) {
    if (query && query.q) {
      const cacheKey = locale + query.q.toString().trim().toLowerCase();
      if (cache.current[cacheKey]) {
        setInitialData(cache.current[cacheKey]);
      } else {
        const fetchPosts = async () => {
          cache.current[cacheKey] = await fetchAPI(
            `/photo-posts?_locale=${locale}&${query.q}&_sort=published_at:DESC&_limit=50`
          );
          setInitialData(cache.current[cacheKey]);
        };
        fetchPosts();
      }
    }
    return () => {};
  }, [query, locale]);

  useEffect(() => {
    // if (isMounted) {
    setStartIndex(0);
    setEndIndex(initialData.length < 15 ? initialData.length  : 14);
    setIsEmpty(initialData?.length === 0);
    setIsReachingEnd(
      isEmpty ||
        (initialData && endIndex >= initialData.length - 1) ||
        initialData.length < 15
    );
    // }
  }, [initialData]);
  useEffect(() => {
    // if (isMounted) {
    setIsReachingEnd(
      isEmpty ||
        (initialData && endIndex >= initialData.length - 1) ||
        initialData.length < 15
    );
    // }
  }, [endIndex]);

  return (
    <>
      <NextSeo {...SEO} />
      <Layout
        categories={categories}
        isOnSearchPage={true}
        writers={writers}
        locale={locale}
        pathname={pathname}
      >
        <ContentGrid
          useSimpleGrid={false}
          heading={
            locale === 'en'
              ? `Search Results: (${initialData.length} Images)`
              : `Αποτελέσματα Αναζήτησης: (${initialData.length} Φωτογραφίες)`
          }
          footer=""
          asPath={asPath}
          locale={locale}
          renderBreadCrumbs={true}
        >
          {
            <>
              {initialData.length > 0
                ? initialData.slice(0, endIndex).map((post,i) => {
                    return (
                      <PhotoPostCard
                        key={post.id}
                        photoPost={post}
                        writer_name={post.writer?.name}
                        isPortrait={post.image.width < post.image.height}
                        preload={i===0}
                        flex="auto"
                        m="0 18px 18px 0"
                      />
                    );
                  })
                : null}
              {!isReachingEnd ? (
                <Box w="100%" textAlign="center">
                  <Button
                    bg="semantic.blue.dark"
                    color="whiteAlpha.900"
                    onClick={() => {
                      setStartIndex(endIndex + 1);
                      setEndIndex(endIndex + 5);
                    }}
                    _hover={{
                      bg: 'semantic.blue.medium',
                      color: 'white',
                    }}
                    _focus={{
                      boxShadow: '0 0 0 3px #D5D4D0',
                    }}
                    _active={{
                      bg: 'semantic.blue.light',
                    }}
                  >
                    {locale === 'el-GR' ? 'Φόρτωσε Περισσότερα' : 'Load More'}
                  </Button>
                </Box>
              ) : null}
            </>
          }
        </ContentGrid>
      </Layout>
    </>
  );
};

export default SearchPage;
