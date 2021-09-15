import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import React, { useEffect, useState } from 'react';
import PhotoPostCard from '../../components/Card/PhotoPostCard';
import ContentGrid from '../../components/layouts/ContentGrid';
import Layout from '../../components/layouts/Layout';
import { fetchAPI } from '../../lib/api';
import Head from 'next/head';
import {
  ArticlesResponse,
  CategoriesResponse,
  WritersResponse,
} from '../../custom_typings/models';
import useMounted from '../../hooks/useMounted';
import { useStoreBreadcrumbs } from '../../hooks/useStoreBreadcrumbs';
import { NextSeo } from 'next-seo';
import FallbackPage from '../../components/FallbackPage';
import ShareButtons from '../../components/ShareButtons';
import { GetStaticPaths, GetStaticProps } from 'next';

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
    revalidate: 1*30*60,
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
        description={article.description}
        pt={['16px', '16px', '0', '0', '0']}
      />
    );
  }

  useStoreBreadcrumbs(
    router.locale === 'en'
      ? router.pathname.replace('/en', '').replace('/[slug]', '') +
          `/${article?.slug_2nd_locale}`
      : '/en' +
          router.pathname.replace('/[slug]', '') +
          `/${article?.slug_2nd_locale}`,
    router.isReady,
    router.asPath
  );

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

  const SEO = {
    title: article.title,
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
          heading={article.title}
          footer={shareBtns}
          locale={router.locale}
          asPath={router.asPath}
          renderBreadCrumbs={true}
        >
          {article.photo_posts?.map((photoPost,i) => {
            return (
              <PhotoPostCard
                key={photoPost.id}
                photoPost={photoPost}
                writer_name={article.writer?.name}
                isPortrait={photoPost.image?.width < photoPost.image?.height}
                preload={i===0}
                flex="auto"
                m="0 18px 18px 0"
              />
            );
          })}
        </ContentGrid>
      </Layout>
    </>
  );
};

export default ArticlePage;
