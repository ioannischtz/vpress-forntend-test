import { Box, Flex } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button"
import { useRouter } from "next/router"
import DefaultErrorPage from "next/error"
import React, { useEffect, useState } from "react"
import PhotoPostCard from "../../components/Card/PhotoPostCard"
import MasonryGridCSS from "../../components/layouts/MasonryGridCSS"
import Layout from "../../components/layouts/Layout"
import { fetchAPI } from "../../lib/api"
import Head from "next/head"
import {
  CategoriesResponse,
  TagsResponse,
  WritersResponse
} from "../../custom_typings/models"
// import { I18nContext } from '../../contexts/I18nContext';
import filterWriter from "../../lib/filterWriter"

// import useSWR from 'swr';
import useMounted from "../../hooks/useMounted"

import { NextSeo } from "next-seo"
import FallbackPage from "../../components/FallbackPage"
import ShareButtons from "../../components/ShareButtons"
import { GetStaticPaths, GetStaticProps } from "next"
import { useScreenType } from "../../hooks/useScreenType"

interface TagPageProps {
  tag: TagsResponse
  writers: WritersResponse[]
  categories: CategoriesResponse[]
}
// const fetcher = (url) => fetch(url).then((r) => r.json());

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = []
  let tags

  if (locales) {
    for (const locale of locales) {
      tags = await fetchAPI(`/tags?_locale=${locale}`)
      for (let i = 0; i < tags.length; i++) {
        if (tags[i].slug) {
          paths.push({
            params: {
              slug: tags[i].slug
            },
            locale
          })
        }
      }
    }
  }

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const [tags, writers, categories] = await Promise.all([
    fetchAPI(`/tags?_locale=${locale}&slug=${params?.slug}`),
    fetchAPI(`/writers?_locale=${locale}`),
    fetchAPI(`/categories?_locale=${locale}&_sort=order`)
  ])

  if (tags[0] === undefined) {
    return { notFound: true }
  }

  return {
    props: {
      tag: tags[0],
      writers,
      categories
    },
    revalidate: 1 * 5 * 60
  }
}

const TagPage: React.FC<TagPageProps> = ({ tag, writers, categories }) => {
  const router = useRouter()
  const [slug2, setSlug2] = useState(tag?.slug_2nd_locale)
  const isMounted = useMounted()

  let nCols
  const screenType = useScreenType()
  switch (screenType) {
    case "isDesktop":
      nCols = tag.photo_posts?.length > 4 ? 4 : 3
      break
    case "isTablet":
      nCols = 3
      break
    case "isSmallTablet":
      nCols = 2
      break
    case "isMobile":
      nCols = 1
      break
  }

  // let shareBtns: React.ReactNode
  let footer: React.ReactNode
  const description_GR = `Δες τις φωτογραφίες που ανήκουν στην ετικέτα ${tag?.name}.`
  const description_EN = `View the Photo-posts that belong to the tag  ${tag?.name}.`

  // pagination
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(
    tag?.photo_posts?.length < 5 ? tag?.photo_posts?.length : 4
  )
  const isEmpty = tag?.photo_posts?.length === 0
  const isReachingEnd =
    isEmpty ||
    (tag?.photo_posts && endIndex >= tag?.photo_posts?.length - 1) ||
    tag?.photo_posts?.length < 5

  if (isMounted) {
    footer =
      screenType === "isMobile" ? (
        <ShareButtons
          url={`${process.env.NEXT_PUBLIC_HOST_URL}/${router.locale}${router.asPath}`}
          description={router.locale === "en" ? description_EN : description_GR}
          pt={["16px", "16px", "0", "0", "0"]}
        />
      ) : (
        <Flex w="100%" direction="row" justifyContent="space-between" px="48px">
          <Box>
            <Button
              bg="semantic.blue.dark"
              color="whiteAlpha.900"
              onClick={() => {
                setStartIndex(endIndex + 1)
                setEndIndex(endIndex + 5)
              }}
              isDisabled={isReachingEnd}
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
              {router.locale === "el-GR" ? "Φόρτωσε Περισσότερα" : "Load More"}
            </Button>
          </Box>

          <ShareButtons
            url={`${process.env.NEXT_PUBLIC_HOST_URL}/${router.locale}${router.asPath}`}
            description={
              router.locale === "en" ? description_EN : description_GR
            }
            pt={["16px", "16px", "0", "0", "0"]}
          />
        </Flex>
      )
  }

  useEffect(() => {
    if (router.isReady) setSlug2(tag?.slug_2nd_locale)
  }, [router.query.slug])

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <FallbackPage />
  }

  if (!tag) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }

  // const skeletonArr = [1, 2, 3];
  // title: tag.name,
  const SEO = {
    description: router.locale === "en" ? description_EN : description_GR,
    openGraph: {
      title: tag.name,
      description: router.locale === "en" ? description_EN : description_GR,
      images: [
        {
          url: tag.photo_posts && tag.photo_posts[0]?.image.url,
          width: tag.photo_posts && tag.photo_posts[0]?.image.width,
          height: tag.photo_posts && tag.photo_posts[0]?.image.height,
          alt: tag.photo_posts && tag.photo_posts[0]?.image.alternativeText
        },
        {
          url: tag.photo_posts && tag.photo_posts[1]?.image.url,
          width: tag.photo_posts && tag.photo_posts[1]?.image.width,
          height: tag.photo_posts && tag.photo_posts[1]?.image.height,
          alt: tag.photo_posts && tag.photo_posts[1]?.image.alternativeText
        },
        {
          url: tag.photo_posts && tag.photo_posts[2]?.image.url,
          width: tag.photo_posts && tag.photo_posts[2]?.image.width,
          height: tag.photo_posts && tag.photo_posts[2]?.image.height,
          alt: tag.photo_posts && tag.photo_posts[2]?.image.alternativeText
        }
      ]
    }
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
        <MasonryGridCSS
          heading={
            router.locale === "en"
              ? `${tag.name} (${tag.photo_posts.length} Images)`
              : `${tag.name} (${tag.photo_posts.length} Φωτογραφίες)`
          }
          footer={footer}
          locale={router.locale}
          asPath={router.asPath}
          nCols={nCols}
        >
          {
            <>
              {tag.photo_posts !== undefined
                ? tag.photo_posts.slice(0, endIndex).map((photoPost, i) => {
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
                        preload={i === 0}
                        // flex="auto"
                        w="100%"
                        m="0 18px 18px 0"
                      />
                    )
                  })
                : null}
              {screenType === "isMobile" ? (
                <Box>
                  <Button
                    bg="semantic.blue.dark"
                    color="whiteAlpha.900"
                    onClick={() => {
                      setStartIndex(endIndex + 1)
                      setEndIndex(endIndex + 5)
                    }}
                    isDisabled={isReachingEnd}
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
              ) : null}
              {/* {!isReachingEnd ? (
                <Box w="100%"
                    //  h="150vh"
                    //  justifySelf="center"
                    //  alignContent="center" 
                    //  textAlign="center"
                     m="0 18px 18px 0"
                     pb="16px"
                    //  display="inline-block"
                    //  sx={{breakInside: 'avoid',
                    //       pageBreakInside: 'avoid'}}
                  >
                  <Button
                    bg="semantic.blue.dark"
                    color="whiteAlpha.900"
                    onClick={() => {
                      setStartIndex(endIndex + 1)
                      setEndIndex(endIndex + 5)
                    }}
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
        </MasonryGridCSS>
      </Layout>
    </>
  )
}

export default TagPage
