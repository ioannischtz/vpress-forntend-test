import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import React, { useEffect, useState } from 'react';
import PhotoPostCard from '../../components/Card/PhotoPostCard';
import ContentGrid from '../../components/layouts/ContentGrid';
import Layout from '../../components/layouts/Layout';
import { fetchAPI } from '../../lib/api';
import Head from 'next/head';
import {
  CategoriesResponse,
  TagsResponse,
  WritersResponse,
} from '../../custom_typings/models';
// import { I18nContext } from '../../contexts/I18nContext';
import filterWriter from '../../lib/filterWriter';

// import useSWR from 'swr';
import useMounted from '../../hooks/useMounted';
import { useStoreBreadcrumbs } from '../../hooks/useStoreBreadcrumbs';
import { NextSeo } from 'next-seo';
import FallbackPage from '../../components/FallbackPage';
import ShareButtons from '../../components/ShareButtons';
import { GetStaticPaths, GetStaticProps } from 'next';

interface TagPageProps {
  tag: TagsResponse;
  writers: WritersResponse[];
  categories: CategoriesResponse[];
}
// const fetcher = (url) => fetch(url).then((r) => r.json());

export const getStaticPaths: GetStaticPaths = async({ locales }) => {
  const paths = [];
  let tags;

  if(locales){
  for (const locale of locales) {
    tags = await fetchAPI(`/tags?_locale=${locale}`);
    for (let i = 0; i < tags.length; i++) {
      paths.push({
        params: {
          slug: tags[i]?.slug,
        },
        locale,
      });
    }
  }}

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async({ params, locale }) => {
  const [tags, writers, categories] = await Promise.all([
    fetchAPI(`/tags?_locale=${locale}&slug=${params?.slug}`),
    fetchAPI(`/writers?_locale=${locale}`),
    fetchAPI(`/categories?_locale=${locale}&_sort=order`),
  ]);

  if (tags[0] === undefined) {
    return { notFound: true };
  }

  return {
    props: {
      tag: tags[0],
      writers,
      categories,
    },
    revalidate: 1*30*60,
  };
}

const TagPage: React.FC<TagPageProps> = ({ tag, writers, categories }) => {
  const router = useRouter();
  const [slug2, setSlug2] = useState(tag?.slug_2nd_locale);
  const isMounted = useMounted();

  let shareBtns: React.ReactNode;
  const description_GR = `Δες τις φωτογραφίες που ανήκουν στην ετικέτα ${tag?.name}.`;
  const description_EN = `View the Photo-posts that belong to the tag  ${tag?.name}.`;
  if (isMounted) {
    shareBtns = (
      <ShareButtons
        url={`${process.env.NEXT_PUBLIC_HOST_URL}/${router.locale}${router.asPath}`}
        description={router.locale === 'en' ? description_EN : description_GR}
        pt={['16px', '16px', '0', '0', '0']}
      />
    );
  }
  useStoreBreadcrumbs(
    router.locale === 'en'
      ? router.pathname.replace('/en', '').replace('/[slug]', '') +
          `/${tag?.slug_2nd_locale}`
      : '/en' +
          router.pathname.replace('/[slug]', '') +
          `/${tag?.slug_2nd_locale}`,
    router.isReady,
    router.asPath
  );

  useEffect(() => {
    if (router.isReady) setSlug2(tag?.slug_2nd_locale);
  }, [router.query.slug]);

  // pagination
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(
    tag?.photo_posts?.length < 5 ? tag?.photo_posts?.length  : 4
  );
  const isEmpty = tag?.photo_posts?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (tag?.photo_posts && endIndex >= tag?.photo_posts?.length - 1) ||
    tag?.photo_posts?.length < 5;

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <FallbackPage />;
  }

  if (!tag) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  // const skeletonArr = [1, 2, 3];
  const SEO = {
    title: tag.name,
    description: router.locale === 'en' ? description_EN : description_GR,
    openGraph: {
      title: tag.name,
      description: router.locale === 'en' ? description_EN : description_GR,
      images: [
        {
          url: tag.photo_posts && tag.photo_posts[0]?.image.url,
          width: tag.photo_posts && tag.photo_posts[0]?.image.width,
          height: tag.photo_posts && tag.photo_posts[0]?.image.height,
          alt: tag.photo_posts && tag.photo_posts[0]?.image.alternativeText,
        },
        {
          url: tag.photo_posts && tag.photo_posts[1]?.image.url,
          width: tag.photo_posts && tag.photo_posts[1]?.image.width,
          height: tag.photo_posts && tag.photo_posts[1]?.image.height,
          alt: tag.photo_posts && tag.photo_posts[1]?.image.alternativeText,
        },
        {
          url: tag.photo_posts && tag.photo_posts[2]?.image.url,
          width: tag.photo_posts && tag.photo_posts[2]?.image.width,
          height: tag.photo_posts && tag.photo_posts[2]?.image.height,
          alt: tag.photo_posts && tag.photo_posts[2]?.image.alternativeText,
        },
      ],
    },
  };

  return (
    <>
      <NextSeo {...SEO} />
      <Layout
        categories={categories}
        writers={writers}
        slug={slug2}
        locale={router.locale}
        pathname={router.pathname}
        isOnSearchPage={false}
      >
        <ContentGrid
          useSimpleGrid={false}
          heading={
            router.locale === 'en'
              ? `${tag.name} (${tag.photo_posts.length} Images)`
              : `${tag.name} (${tag.photo_posts.length} Φωτογραφίες)`
          }
          footer={shareBtns}
          locale={router.locale}
          asPath={router.asPath}
          renderBreadCrumbs={true}
        >
          {
            <>
              {tag.photo_posts !== undefined
                ? tag.photo_posts.slice(0, endIndex).map((photoPost,i) => {
                    return (
                      <PhotoPostCard
                        key={photoPost.id}
                        photoPost={photoPost}
                        writer_name={
                          filterWriter(writers, photoPost.writer)?.name
                        }
                        isPortrait={
                          photoPost.image.width < photoPost.image.height
                        }
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
                    {router.locale === 'el-GR'
                      ? 'Φόρτωσε Περισσότερα'
                      : 'Load More'}
                  </Button>
                </Box>
              ) : null}
            </>
          }

          {/* {tag.photo_posts.map((photoPost) => {
          return (
            <PhotoPostCard
              key={photoPost.id}
              photoPost={photoPost}
              writer_name={filterWriter(writers, photoPost.writer).name}
              isPortrait={photoPost.image.width < photoPost.image.height}
              flex="auto"
              m="0 18px 18px 0"
            />
          );
        })} */}
        </ContentGrid>
      </Layout>
    </>
  );
};

export default TagPage;
