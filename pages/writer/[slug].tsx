import { Box, Flex } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import React, { useEffect, useState } from "react";
import ArticleCard from "../../components/Card/ArticleCard";
import MasonryGridCSS from "../../components/layouts/MasonryGridCSS";
import Layout from "../../components/layouts/Layout";
import { fetchAPI, getStrapiURL } from "../../lib/api";
import Head from "next/head";
import {
  Article,
  WritersResponse,
  CategoriesResponse,
} from "../../custom_typings/models";
import useMounted from "../../hooks/useMounted";
import { Skeleton } from "@chakra-ui/skeleton";
import { Button } from "@chakra-ui/button";
import { KeyLoader } from "swr";
import useSWRInfinite from "swr/infinite";
import { NextSeo } from "next-seo";
import FallbackPage from "../../components/FallbackPage";
import ShareButtons from "../../components/ShareButtons";
import { GetStaticPaths, GetStaticProps } from "next";
import { useScreenType } from "../../hooks/useScreenType";

interface WriterArticlesPageProps {
  categories: CategoriesResponse[];
  articles: Article[];
  writer: WritersResponse;
  writers: WritersResponse[];
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = [];
  let writers;

  if (locales) {
    for (const locale of locales) {
      writers = await fetchAPI(`/writers?_locale=${locale}`);
      for (let i = 0; i < writers.length; i++) {
        paths.push({
          params: {
            slug: writers[i].slug,
          },
          locale,
        });
      }
    }
  }

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  // const writers = await fetchAPI(`/writers?_locale=${locale}`);
  const [writers, writer, categories, articles] = await Promise.all([
    fetchAPI(`/writers?_locale=${locale}`),
    fetchAPI(`/writers?_locale=${locale}&slug=${params?.slug}`),
    fetchAPI(`/categories?_locale=${locale}&_sort=order`),
    fetchAPI(
      `/articles?_locale=${locale}&writer.slug=${params?.slug}&_sort=published_at:DESC&_start=0&_limit=7`
    ),
  ]);

  if (writer[0] === undefined) {
    return { notFound: true };
  }

  return {
    props: {
      writer: writer[0],
      writers: writers,
      categories: categories,
      articles: articles,
    },
    revalidate: 1 * 5 * 60,
  };
};

const WriterArticlesPage: React.FC<WriterArticlesPageProps> = ({
  writer,
  writers,
  articles,
  categories,
}) => {
  const router = useRouter();
  const [slug2, setSlug2] = useState(writer?.slug_2nd_locale);
  const isMounted = useMounted();
  const getKey: KeyLoader<string> = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null;
    return getStrapiURL(
      `/articles?_locale=${router.locale}&writer.slug=${
        writer?.slug
      }&_sort=published_at:DESC&_start=${pageIndex + articles?.length}&_limit=1`
    );
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    initialSize: 0,
    revalidateAll: true,
  });
  // let shareBtns: React.ReactNode
  let footer: React.ReactNode;
  const description_GR = `Δες τις ιστορίες του συντάκτη ${writer?.name}. ${writer?.ShortBio}`;
  const description_EN = `View ${writer?.name}'s Stories. ${writer?.ShortBio}`;

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data && data[data.length - 1]?.length < 1) ||
    articles?.length < 7;

  if (isMounted) {
    footer = (
      <Flex w="100%" direction="row" justifyContent="space-between" px="48px">
        {!isReachingEnd ? (
          <Box
          // w="100%"
          //  h="150vh"
          //  justifySelf="start"
          //  alignContent="center"
          //  textAlign="center"
          // m="0 18px 18px 0"
          // pb="16px"
          //  display="inline-block"
          //  sx={{breakInside: 'avoid',
          //       pageBreakInside: 'avoid'}}
          >
            <Button
              bg="semantic.blue.dark"
              color="whiteAlpha.900"
              onClick={() => setSize(size + 4)}
              _hover={{
                bg: "semantic.blue.medium",
                color: "white",
              }}
              _focusVisible={{
                boxShadow: "0 0 0 3px #D5D4D0",
              }}
              _active={{
                bg: "semantic.blue.light",
              }}
            >
              {router.locale === "el-GR" ? "Φόρτωσε Περισσότερα" : "Load More"}
            </Button>
          </Box>
        ) : null}
        <ShareButtons
          url={`${process.env.NEXT_PUBLIC_HOST_URL}/${router.locale}${router.asPath}`}
          description={router.locale === "en" ? description_EN : description_GR}
          pt={["16px", "16px", "0", "0", "0"]}
        />
      </Flex>
    );
  }

  useEffect(() => {
    if (router.isReady) setSlug2(writer?.slug_2nd_locale);
  }, [router.query.slug]);

  let nCols;
  const screenType = useScreenType();
  switch (screenType) {
    case "isDesktop":
      nCols = articles?.length > 4 ? 4 : 3;
      break;
    case "isTablet":
      nCols = 3;
      break;
    case "isSmallTablet":
      nCols = 2;
      break;
    case "isMobile":
      nCols = 1;
      break;
  }

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <FallbackPage />;
  }

  if (!writer) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  const skeletonArr = [1, 2, 3];
  // title: writer.name,
  const SEO = {
    description: router.locale === "en" ? description_EN : description_GR,
    openGraph: {
      title: writer.name,
      description: router.locale === "en" ? description_EN : description_GR,
      images: [
        {
          url: writer.picture.url,
          width: writer.picture.width,
          height: writer.picture.height,
          alt: writer.picture.alternativeText,
        },
        {
          url: articles && articles[0]?.cover_image.url,
          width: articles && articles[0]?.cover_image.width,
          height: articles && articles[0]?.cover_image.height,
          alt: articles && articles[0]?.cover_image.alternativeText,
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
        <MasonryGridCSS
          heading={"By " + writer.name}
          footer={footer}
          asPath={router.asPath}
          locale={router.locale}
          nCols={nCols}
        >
          {!articles ? (
            skeletonArr.map((i) => {
              return (
                <div key={i}>
                  <Skeleton fitContent>
                    <Box h="100px" w="60px"></Box>
                  </Skeleton>
                </div>
              );
            })
          ) : error ? (
            <div>Error.</div>
          ) : (
            <>
              {articles.map((article, i) => {
                return (
                  <ArticleCard
                    article={article}
                    writer_name={writer.name}
                    key={article.id}
                    isPortrait={
                      article.cover_image.width < article.cover_image.height
                    }
                    preload={i === 0}
                    w="100%"
                    m="0 18px 18px 0"
                  />
                );
              })}
              {data !== undefined
                ? data.map((articles, i) => {
                    return articles.map((article) => {
                      return (
                        <ArticleCard
                          article={article}
                          writer_name={writer.name}
                          key={article.id}
                          isPortrait={
                            article.cover_image.width <
                            article.cover_image.height
                          }
                          preload={i === 0}
                          w="100%"
                          m="0 18px 18px 0"
                        />
                      );
                    });
                  })
                : null}
              {/* {!isReachingEnd ? (
                <Box w="100%" textAlign="center">
                  <Button
                    bg="semantic.blue.dark"
                    color="whiteAlpha.900"
                    onClick={() => setSize(size + 4)}
                    _hover={{
                      bg: "semantic.blue.medium",
                      color: "white"
                    }}
                    _focus={{
                      boxShadow: "0 0 0 3px #D5D4D0"
                    }}
                    _active={{
                      bg: "semantic.blue.light"
                    }}
                  >
                    {router.locale === "el-GR"
                      ? "Φόρτωσε Περισσότερα"
                      : "Load More"}
                  </Button>
                </Box>
              ) : null} */}
            </>
          )}
          {/* {articles.map((article) => {
          return (
            <ArticleCard
              article={article}
              writer_name={writer.name}
              key={article.id}
              isPortrait={
                article.cover_image.width < article.cover_image.height
              }
              flex="auto"
              m="0 18px 18px 0"
            />
          );
        })} */}
        </MasonryGridCSS>
      </Layout>
    </>
  );
};

export default WriterArticlesPage;
