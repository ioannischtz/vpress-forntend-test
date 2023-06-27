import { fetchAPI } from "../../lib/api";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { CgTag } from "react-icons/cg";
import { FaEye } from "react-icons/fa";
import { Button } from "@chakra-ui/button";
import { Tag } from "@chakra-ui/tag";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/layout";

import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import Head from "next/head";
import {
  CategoriesResponse,
  PhotoPostsResponse,
  WritersResponse,
} from "../../custom_typings/models";
import Layout from "../../components/layouts/Layout";
// import ContentGrid from "../../components/layouts/ContentGrid"
import Image from "next/legacy/image";
import { getStrapiMedia } from "../../lib/media";
import { vhTOpx, vwTOpx } from "../../lib/vhTOpx";
import { useScreenType } from "../../hooks/useScreenType";

import { NextSeo } from "next-seo";
import useMounted from "../../hooks/useMounted";
import FallbackPage from "../../components/FallbackPage";
import ShareButtons from "../../components/ShareButtons";
import { GetStaticPaths, GetStaticProps } from "next";
import CarouselArrowLink from "../../components/CarouselArrowLink";

interface PhotoPostPageProps {
  photo_Post: PhotoPostsResponse;
  categories: CategoriesResponse[];
  writers: WritersResponse[];
  previous_slug: string;
  next_slug: string;
  previous_slug2: string;
  next_slug2: string;
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = [];
  let photoPosts;

  if (locales) {
    for (const locale of locales) {
      photoPosts = await fetchAPI(`/photo-posts?_locale=${locale}`);
      for (let i = 0; i < photoPosts.length; i++) {
        paths.push({
          params: {
            slug: photoPosts[i].slug,
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
  const [photoPosts, categories, writers] = await Promise.all([
    fetchAPI(`/photo-posts?_locale=${locale}&slug=${params?.slug}`),
    fetchAPI(`/categories?_locale=${locale}&_sort=order`),
    fetchAPI(`/writers?_locale=${locale}`),
  ]);

  // console.log("photoPosts[0].article = ",photoPosts[0].article)

  const article = await fetchAPI(
    `/articles?_locale=${locale}&id=${photoPosts[0]?.article?.id}`
  );

  //console.log(article[0]?.photo_posts)

  let p_slug = "";
  let n_slug = "";
  if (article[0]) {
    const p_id = article[0]?.photo_posts?.findIndex(
      (post) => post.id === photoPosts[0].id
    );

    //console.log('pid = ',p_id)

    p_slug = p_id > 0 ? article[0]?.photo_posts[p_id - 1].slug : "";
    n_slug =
      p_id < article[0]?.photo_posts.length - 1
        ? article[0]?.photo_posts[p_id + 1].slug
        : "";
  } else {
    p_slug = "";
    n_slug = "";
  }
  // const p_slug2 = p_id > 0 ?  article[0].photo_posts[p_id -1].slug_2nd_locale : ''
  // const n_slug2 = p_id < article[0].photo_posts.length ? article[0].photo_posts[p_id +1].slug_2nd_locale : ''

  if (photoPosts[0] === undefined) {
    return { notFound: true };
  }

  // console.log(params)

  return {
    props: {
      photo_Post: photoPosts[0],
      categories,
      writers: writers,
      previous_slug: p_slug,
      next_slug: n_slug,
      // previous_slug2: p_slug2,
      // next_slug2: n_slug2,
    },
    revalidate: 1 * 5 * 60,
  };
};

const PhotoPostPage: React.FC<PhotoPostPageProps> = ({
  photo_Post,
  categories,
  writers,
  previous_slug,
  next_slug,
  previous_slug2,
  next_slug2,
}) => {
  const router = useRouter();
  const isMounted = useMounted();

  const [slug2, setSlug2] = useState(photo_Post?.slug_2nd_locale);
  // const [p_slug2, setP_slug2] = useState(previous_slug2)
  // const [n_slug2, setn_slug2] = useState(next_slug2)
  const { isOpen, onToggle, onClose } = useDisclosure();

  const tagSize = useBreakpointValue({
    base: "sm",
    sm: "lg",
    md: "md",
    lg: "lg",
    xl: "lg",
    "2xl": "lg",
  });
  const screenType = useScreenType();

  let dividerComp;
  // let imgContainerH = ["480px","480px","520px","520px","520px"]
  // let imgContainerW = ["480px","480px","520px","520px","520px"]

  // let imgContainerH, imgContainerW
  let imgWlandscape, imgWportrait, imgHlandscape, imgHportrait;
  switch (screenType) {
    case "isDesktop":
    case "isTablet":
    case "isSmallTablet":
      dividerComp = (
        <Divider orientation="vertical" size="sm" variant="white" />
      );
      break;

    case "isMobile":
      dividerComp = (
        <Divider orientation="horizontal" size="sm" variant="white" />
      );
  }

  useEffect(() => {
    if (router.isReady) setSlug2(photo_Post?.slug_2nd_locale);
  }, [router.query.slug]);

  let SEO = {};
  // title: photo_Post.title,
  let modalImgW;
  let modalImgH;
  let aspectRatio;
  if (isMounted) {
    SEO = {
      description: photo_Post.description,
      openGraph: {
        title: photo_Post.title,
        description: photo_Post.description,
        image: {
          url: photo_Post.image.url,
          width: photo_Post.image.width,
          height: photo_Post.image.height,
          alt: photo_Post.image.alternativeText,
        },
      },
    };
    modalImgW =
      (vhTOpx(80) * photo_Post.image?.width) / photo_Post.image?.height;
    modalImgH = vhTOpx(80);
    aspectRatio = photo_Post.image?.width / photo_Post.image?.height;

    switch (screenType) {
      case "isDesktop":
        imgWlandscape = 640;
        imgHlandscape = imgWlandscape / aspectRatio;
        imgWportrait = 400;
        imgHportrait = imgWportrait / aspectRatio;
        break;
      case "isTablet":
        imgWlandscape = 560;
        imgHlandscape = imgWlandscape / aspectRatio;
        imgWportrait = 310;
        imgHportrait = imgWportrait / aspectRatio;
        break;
      case "isSmallTablet":
        dividerComp = (
          <Divider orientation="vertical" size="sm" variant="white" />
        );
        imgWlandscape = 520;
        imgHlandscape = imgWlandscape / aspectRatio;
        imgWportrait = 300;
        imgHportrait = imgWportrait / aspectRatio;
        break;
      case "isMobile":
        dividerComp = (
          <Divider orientation="horizontal" size="sm" variant="white" />
        );
        imgWlandscape = vwTOpx(85) - 48;
        imgHlandscape = vhTOpx(40) - 48;
        imgWportrait = vwTOpx(85) - 48;
        imgHportrait = vhTOpx(65) - 48;
        break;
    }
  }

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <FallbackPage />;
  }

  if (!photo_Post) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

  const imageUrl = getStrapiMedia(photo_Post.image);
  const widthsOuter = [
    "calc(100vw - 48px)",
    "calc(85vw - 48px)",
    "calc(85vw - 48px)",
    "calc(85vw - 48px)",
    "calc(85vw - 48px)",
  ];
  const options = { month: "long", day: "numeric", year: "numeric" } as const;

  // const aspectRatio = photo_Post.image?.width / photo_Post.image?.height;
  // // let imgWlandscape = 520
  // imgHlandscape =  imgWlandscape / aspectRatio
  // // let imgWportrait = 300
  // imgHportrait = imgWportrait / aspectRatio

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
        <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent
            maxW={
              aspectRatio > 1
                ? ["90vw", "65vw", "65vw", "65vw", "65vw"]
                : ["90vw", "40vw", "40vw", "40vw", "40vw"]
            }
            maxH={["75vh", "85vh", "85vh", "85vh", "85vh"]}
            h={["75vh", "85vh", "85vh", "85vh", "85vh"]}
            justifyContent="center"
            alignItems="center"
            overflowX="hidden"
          >
            <Box
              w={["88vw", "60vw", "60vw", "60vw", "60vw"]}
              h={
                aspectRatio > 1
                  ? ["45vh", "80vh", "80vh", "80vh", "80vh"]
                  : ["65vh", "75vh", "75vh", "75vh", "75vh"]
              }
              position="relative"
              borderRadius="4px"
              my="24px"
            >
              <Image
                src={imageUrl}
                alt={photo_Post.description}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                quality={
                  photo_Post.image.width < 200
                    ? 80
                    : photo_Post.image.width < 350
                    ? 70
                    : photo_Post.image.width < 500
                    ? 60
                    : 50
                }
              />
            </Box>
          </ModalContent>
        </Modal>
        <Flex
          direction="column"
          color="whiteAlpha.800"
          alignItems="center"
          w={widthsOuter}
          backgroundColor="whiteAlpha.100"
          overflow={["auto", "unset", "unset", "unset", "unset"]}
        >
          <Flex
            direction={["column", "row", "row", "row", "row"]}
            alignItems="center"
          >
            {screenType === "isMobile" ? null : (
              <CarouselArrowLink
                direction="l"
                to={"/photo-post/" + previous_slug}
                locale={router.locale}
                isDisabled={previous_slug.length < 1}
                mr="16px"
              />
            )}

            <Box
              h={aspectRatio > 1 ? `${imgHlandscape}px` : `${imgHportrait}px`}
              minH={
                aspectRatio > 1 ? `${imgHlandscape}px` : `${imgHportrait}px`
              }
              w={aspectRatio > 1 ? `${imgWlandscape}px` : `${imgWportrait}px`}
              minW={
                aspectRatio > 1 ? `${imgWlandscape}px` : `${imgWportrait}px`
              }
              overflow="clip"
              position="relative"
              borderRadius="4px"
              // backgroundColor= "whiteAlpha.100"
              // style={{ position: '-webkit-sticky', /* Safari */ position: 'sticky', top: '0', }}
            >
              <Image
                src={imageUrl}
                alt={photo_Post.description}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                quality={
                  photo_Post.image.width < 200
                    ? 90
                    : photo_Post.image.width < 350
                    ? 85
                    : photo_Post.image.width < 700
                    ? 85
                    : 80
                }
                priority={true}
              />
            </Box>
            {screenType === "isMobile" ? (
              <Flex direction="row">
                <CarouselArrowLink
                  direction="l"
                  to={"/photo-post/" + previous_slug}
                  locale={router.locale}
                  isDisabled={previous_slug.length < 1}
                  mr="16px"
                />
                <CarouselArrowLink
                  direction="r"
                  to={"/photo-post/" + next_slug}
                  locale={router.locale}
                  isDisabled={next_slug.length < 1}
                  ml="16px"
                />
              </Flex>
            ) : null}

            {screenType === "isMobile" ? null : (
              <CarouselArrowLink
                direction="r"
                to={"/photo-post/" + next_slug}
                locale={router.locale}
                isDisabled={next_slug.length < 1}
                ml="16px"
              />
            )}
          </Flex>
          <Box
            w="100%"
            h="auto"
            py={["24px", "24px", "24px", "24px", "36px"]}
            px="18px"
          >
            <Flex
              direction={["column", "row", "row", "row", "row"]}
              w="100%"
              h="100%"
            >
              <Flex
                direction="column"
                textAlign={["start", "end", "end", "end", "end"]}
                w={["100%", "60%", "60%", "60%", "60%"]}
                pl={["24px", "24px", "72px", "80px", "80px"]}
                pr={["24px", "24px", "48px", "64px", "64px"]}
              >
                <Heading fontSize="20px">
                  {router.locale === "en"
                    ? photo_Post.title.includes("/")
                      ? photo_Post.title.split("/")[1]
                      : photo_Post.title
                    : photo_Post.title.includes("/")
                    ? photo_Post.title.split("/")[0]
                    : photo_Post.title}
                </Heading>
                <Flex
                  direction={["column", "row", "row", "row", "row"]}
                  justifyContent="space-between"
                  alignItems={[
                    "center",
                    "flex-end",
                    "flex-end",
                    "flex-end",
                    "flex-end",
                  ]}
                  py="12px"
                >
                  <Flex
                    direction="column"
                    justifyContent="space-between"
                    alignItems="start"
                  >
                    <Flex direction="row">
                      <Heading
                        as="h4"
                        fontWeight="bold"
                        fontSize="14px"
                        pr={router.locale === "en" ? "3.75ch" : "2.5ch"}
                      >
                        {router.locale === "en" ? "Date: " : "Ημ/νία:"}
                      </Heading>
                      <Box fontSize="12px">
                        <Text>
                          {/* @ts-ignore*/}
                          {new Intl.DateTimeFormat(
                            router.locale,
                            options
                          ).format(
                            new Date(
                              photo_Post.date
                                ? photo_Post.date
                                : photo_Post.published_at
                            )
                          )}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex direction="row">
                      <Heading
                        as="h4"
                        fontWeight="bold"
                        fontSize="14px"
                        pr="2ch"
                      >
                        Credits:{" "}
                      </Heading>
                      <Box fontSize="12px">
                        <Text>
                          {photo_Post.writer ? photo_Post.writer.name : ""}
                        </Text>
                        {/* <Text>{article.author.name_GR}</Text> */}
                      </Box>
                    </Flex>
                    <ShareButtons
                      url={`${process.env.NEXT_PUBLIC_HOST_URL}/${router.locale}${router.asPath}`}
                      description={photo_Post.description}
                      pt="4px"
                      alignSelf="start"
                    />
                  </Flex>
                  <Box
                    pt={["12px", "0", "0", "0", "0"]}
                    pb={["24px", "0", "0", "0", "0"]}
                  >
                    <Button
                      size={tagSize}
                      rightIcon={<FaEye />}
                      bg="semantic.blue.dark"
                      color="whiteAlpha.900"
                      onClick={onToggle}
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
                      {router.locale === "el-GR" ? "Εικόνα" : "Image"}
                    </Button>
                  </Box>
                </Flex>
              </Flex>
              {dividerComp}
              <Flex
                direction="column"
                textAlign="start"
                w={["100%", "40%", "40%", "40%", "40%"]}
                py={["24px", "0", "0", "0", "0"]}
                pr={["24px", "24px", "72px", "80px", "80px"]}
                pl={["24px", "24px", "48px", "64px", "64px"]}
              >
                <Heading fontWeight="normal">
                  <Flex direction="row" fontSize="24px">
                    {router.locale === "el-GR" ? "ΕΤΙΚΕΤΕΣ" : "TAGS"}
                    <Box pl="12px" alignSelf="flex-end">
                      <CgTag />
                    </Box>
                  </Flex>
                </Heading>
                <Text
                  py={["24px", "24px", "24px", "24px", "36px"]}
                  fontSize={["sm", "2xl", "md", "md", "lg"]}
                  overflowX="hidden"
                  overflowY="auto"
                >
                  {photo_Post.tags.map((tag) => {
                    return (
                      <Tag
                        size={tagSize}
                        key={tag.name}
                        variant="subtle"
                        colorScheme="blue"
                        borderRadius="full"
                        m="4px"
                      >
                        <NextLink href={`/tag/${tag.slug}`} legacyBehavior>
                          {tag.name}
                        </NextLink>
                      </Tag>
                    );
                  })}
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Layout>
    </>
  );
};

export default PhotoPostPage;
