import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import React, { useEffect, useState } from 'react';
import PhotoPostCard from '../../components/Card/PhotoPostCard';
// import ContentGrid from '../../components/layouts/ContentGrid';
import Layout from '../../components/layouts/Layout';
import { fetchAPI } from '../../lib/api';
import Head from 'next/head';
import {
  ArticlesResponse,
  CategoriesResponse,
  WritersResponse,
} from '../../custom_typings/models';
import useMounted from '../../hooks/useMounted';

import { NextSeo } from 'next-seo';
import FallbackPage from '../../components/FallbackPage';
import ShareButtons from '../../components/ShareButtons';
import { GetStaticPaths, GetStaticProps } from 'next';
import MasonryGrid from '../../components/layouts/MasonryGrid';
import { useScreenType } from '../../hooks/useScreenType';

interface ArticlePageProps {
  article: ArticlesResponse;
  categories: CategoriesResponse[];
  writers: WritersResponse[];
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = [];
  let articles;
  if(locales){
  for (const locale of locales) {
    articles = await fetchAPI(`/articles?_locale=${locale}`);
    for (let i = 0; i < articles.length; i++) {
      paths.push({
        params: {
          slug: articles[i].slug,
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

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const [articles, categories, writers] = await Promise.all([
    fetchAPI(`/articles?_locale=${locale}&slug=${params?.slug}`),
    fetchAPI(`/categories?_locale=${locale}&_sort=order`),
    fetchAPI(`/writers?_locale=${locale}`),
  ]);

  if (articles[0] === undefined) {
    return { notFound: true };
  }

  return {
    props: {
      article: articles[0],
      categories,
      writers,
    },
    revalidate: 1*5*60,
  };
}

const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  categories,
  writers,
}) => {
  const router = useRouter();
  const isMounted = useMounted();

  const [slug2, setSlug2] = useState(article?.slug_2nd_locale);

  let shareBtns: React.ReactNode;
  if (isMounted) {
    shareBtns = (
      <ShareButtons
        url={`${process.env.NEXT_PUBLIC_HOST_URL}/${router.locale}${router.asPath}`}
        description={article?.description}
        pt={['16px', '16px', '0', '0', '0']}
      />
    );
  }


  useEffect(() => {
    if (router.isReady) setSlug2(article?.slug_2nd_locale);
  }, [router.query.slug]);

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <FallbackPage />;
  }

  if (!article) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }
// title: article.title,
  const SEO = {
    
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [
        {
          url: article.cover_image.url,
          width: article.cover_image.width,
          height: article.cover_image.height,
          alt: article.cover_image.alternativeText,
        },
      ],
    },
  };

  let nCols 
  const screenType = useScreenType()
  switch (screenType) {
    case "isDesktop":
      nCols = (article.photo_posts.length > 4) ? 4 : 3;
      break;
    case "isTablet":
      nCols = 3;
      break
    case "isSmallTablet":
      nCols = 2;
      break;
    case "isMobile":
      nCols = 1;
      break;
  }

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
        <MasonryGrid
          heading={article.title}
          footer={shareBtns}
          locale={router.locale}
          asPath={router.asPath}
          nCols={nCols}
        >
          {article.photo_posts?.map((photoPost,i) => {
            return (
              <PhotoPostCard
                key={photoPost.id}
                photoPost={photoPost}
                writer_name={article.writer?.name}
                isPortrait={photoPost.image?.width < photoPost.image?.height}
                preload={i===0}
                // flex="auto"
                w="100%"
                m="0 18px 18px 0"
              />
            );
          })}
        </MasonryGrid>
      </Layout>
    </>
  );
};

export default ArticlePage;
