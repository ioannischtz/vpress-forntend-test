import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import React, { useEffect, useState } from 'react';

import { Masonry } from "masonic";
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
// import MasonryGridCSS from '../../components/layouts/MasonryGridCSS';
import { useScreenType } from '../../hooks/useScreenType';
import MasonryGridJS from '../../components/layouts/MasonryGridJS';

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

  const [items] = React.useState(() =>
    Array.from(article.photo_posts, (photo_post,i) => ({
      id: photo_post.id,
      photoPost: photo_post,
      writer_name: article.writer?.name,
      isPortrait: photo_post.image?.width < photo_post.image?.height,
      preload: i===0,
      previous_slug: i>0? article.photo_posts[i-1]?.slug : '',
      next_slug: i<article.photo_posts.length? article.photo_posts[i+1]?.slug : ''
    }))
  );

  // console.log(items)
  
  const postCard = ({ data: { id, photoPost, writer_name,isPortrait,preload,previous_slug,next_slug }}) => (
    <PhotoPostCard
      key={id}
      photoPost={photoPost}
      writer_name={writer_name}
      isPortrait={isPortrait}
      preload={preload}
      />
  );

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
        <MasonryGridJS
          heading={router.locale === "en"
          ? article.title.includes("/")
            ? article.title.split("/")[1]
            : article.title
          : article.title.includes("/")
          ? article.title.split("/")[0]
          : article.title}
          footer={shareBtns}
          items={items}
          card={postCard}
          locale={router.locale}
          asPath={router.asPath}
          nCols={nCols}
        />
      </Layout>
    </>
  );
};

export default ArticlePage;
