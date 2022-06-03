import { fetchAPI } from "../../lib/api"
import { useRouter } from "next/router"
import DefaultErrorPage from "next/error"
import NextLink from "next/link"
import React, { useEffect, useState } from "react"
import { CgTag } from "react-icons/cg"
import { FaEye } from "react-icons/fa"
import { Button } from "@chakra-ui/button"
import { Tag } from "@chakra-ui/tag"
import { useBreakpointValue } from "@chakra-ui/media-query"
import { useDisclosure } from "@chakra-ui/hooks"
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/layout"

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/modal"
import Head from "next/head"
import {
  CategoriesResponse,
  PhotoPostsResponse,
  WritersResponse
} from "../../custom_typings/models"
import Layout from "../../components/layouts/Layout"
import ContentGrid from "../../components/layouts/ContentGrid"
import Image from "next/image"
import { getStrapiMedia } from "../../lib/media"
import { vhTOpx } from "../../lib/vhTOpx"
import { getViewportHeightPX } from "../../lib/getViewportHeightPX"
import { useScreenType } from "../../hooks/useScreenType"


import { NextSeo } from "next-seo"
import useMounted from "../../hooks/useMounted"
import FallbackPage from "../../components/FallbackPage"
import ShareButtons from "../../components/ShareButtons"
import { GetStaticPaths, GetStaticProps } from "next"

interface PhotoPostPageProps {
  photo_Post: PhotoPostsResponse
  categories: CategoriesResponse[]
  writers: WritersResponse[]
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = []
  let photoPosts

  if (locales) {
    for (const locale of locales) {
      photoPosts = await fetchAPI(`/photo-posts?_locale=${locale}`)
      for (let i = 0; i < photoPosts.length; i++) {
        paths.push({
          params: {
            slug: photoPosts[i].slug
          },
          locale
        })
      }
    }
  }

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const [photoPosts, categories, writers] = await Promise.all([
    fetchAPI(`/photo-posts?_locale=${locale}&slug=${params?.slug}`),
    fetchAPI(`/categories?_locale=${locale}&_sort=order`),
    fetchAPI(`/writers?_locale=${locale}`)
  ])

  if (photoPosts[0] === undefined) {
    return { notFound: true }
  }

  return {
    props: { photo_Post: photoPosts[0], categories, writers: writers },
    revalidate: 1 * 5 * 60
  }
}

const PhotoPostPage: React.FC<PhotoPostPageProps> = ({
  photo_Post,
  categories,
  writers
}) => {
  const router = useRouter()
  const isMounted = useMounted()

  const [slug2, setSlug2] = useState(photo_Post?.slug_2nd_locale)
  const { isOpen, onToggle, onClose } = useDisclosure()

  const tagSize = useBreakpointValue({
    base: "sm",
    sm: "lg",
    md: "md",
    lg: "lg",
    xl: "lg",
    "2xl": "lg"
  })
  const screenType = useScreenType()

  const aspectRatio = photo_Post.image.width / photo_Post.image.height;

  let dividerComp
  let modalImgW
  let imgContainerH = ["400px","320px","480px","480px","480px"]
  let imgContainerW = ["400px","320px","480px","480px","480px"]
  // let imgContainerH, imgContainerW
  switch (screenType) {
    case "isDesktop":
    case "isTablet":
      // dividerComp = <Divider orientation="vertical" size="sm" variant="white" />
      dividerComp = (
        <Divider orientation="horizontal" size="sm" variant="white" />
      )
      modalImgW = photo_Post.image.height > photo_Post.image.width ? '40%' : '60%'
      // imgContainerH = getViewportHeightPX() > 600 ? 'calc(50vh - 24px)' : 'calc(80vh - 24px)'
      // imgContainerW = getViewportHeightPX() > 600 ? `${(vhTOpx(50) - 24) * aspectRatio}px` : `${(vhTOpx(80) - 24) * aspectRatio}px`
      // let vhPX = getViewportHeightPX()
      // imgContainerH = vhPX > 600 ? `${50*vhPX - 24}px` : `${80*vhPX - 24}px`
      // imgContainerW = 'calc(42.25vw - 24px)' 
      // imgContainerH = aspectRatio > 1 ? '480px' : '640px'
      // imgContainerW = aspectRatio > 1 ? '640px' : '480px'
      // imgContainerH = '50%'
      // imgContainerW = `${50 * aspectRatio}%`
      break
    case "isSmallTablet":
    case "isMobile":
      dividerComp = (
        <Divider orientation="horizontal" size="sm" variant="white" />
      )
      modalImgW = '80%'
      // imgContainerH = '80%'
      // imgContainerW = `${80 * aspectRatio}%`
      // imgContainerH = aspectRatio > 1 ? '480px' : '640px'
      // imgContainerW = aspectRatio > 1 ? '640px' : '480px'
  }

  useEffect(() => {
    if (router.isReady) setSlug2(photo_Post?.slug_2nd_locale)
  }, [router.query.slug])

  let SEO = {}
  // title: photo_Post.title,
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
          alt: photo_Post.image.alternativeText
        }
      }
    }
  }

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <FallbackPage />
  }

  if (!photo_Post) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }

  const imageUrl = getStrapiMedia(photo_Post.image)
  const widthsOuter = [
    "calc(100vw - 48px)",
    "calc(100vw - 48px)",
    "calc(75vw - 48px)",
    "calc(85vw - 48px)",
    "calc(85vw - 48px)"
  ]
  const options = { month: "long", day: "numeric", year: "numeric" }

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
          <ModalContent maxW={modalImgW} justifyContent="center"
                alignItems="center">
            <ModalHeader>{photo_Post.title}</ModalHeader>
            <ModalBody >
              <Box
                w="100%"
                // h="60vh"
                overflow="clip"
                position="relative"
                borderRadius="4px"
              >
                <Image
                  src={imageUrl}
                  alt={photo_Post.description}
                  // layout="fill"
                  layout="intrinsic"
                  width={0.85 * photo_Post.image.width}
                  height={0.85 * photo_Post.image.height}
                  objectFit="cover"
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
                  // priority={true}
                />
              </Box>
            </ModalBody>
            <ModalFooter>
              {/* @ts-ignore: Unreachable code error */}
              {new Intl.DateTimeFormat(router.locale,options)
                            .format(new Date(photo_Post.date ? photo_Post.date : photo_Post.published_at))}
            </ModalFooter>
          </ModalContent>
        </Modal>
        <ContentGrid 
          useSimpleGrid={false}
          heading=""
          footer={<></>}
          asPath={router.asPath}
          locale={router.locale}
          renderBreadCrumbs={false}
        >
        <Flex direction="column" color="whiteAlpha.800" w={widthsOuter}  alignItems="center" 
          backgroundColor="neutral.raisin_black.dark" overflowY="auto"
          overflowX="hidden">
          <Box
            height = {imgContainerH}
            width = {imgContainerW}
            // h = "720px"
            // w = "1080px"
            overflow="clip"
            position="relative"
            borderTopLeftRadius = '8px'
            borderTopRightRadius = '8px'
            backgroundColor= { aspectRatio > 1 ? "whiteAlpha.100" : "whiteAlpha.100"}
            
          >
            <Image
              src={imageUrl}
              alt={photo_Post.description}   
              // height={480}   
              // width={480}      
              layout="fill"
              objectFit={ aspectRatio > 1 ? "contain" : "contain"}
              objectPosition="center"
              quality={
                photo_Post.image.width < 200
                  ? 90
                  : photo_Post.image.width < 350
                  ? 75
                  : photo_Post.image.width < 700
                  ? 70
                  : 65
              }
              priority={true}
            />
          </Box>
          <Box
            w = {imgContainerW}
            py={["24px", "24px", "24px", "24px", "36px"]}
            backgroundColor="whiteAlpha.50"
          >
            <Flex
              direction="column"
              w = {imgContainerW}
              // w="100%"
              // h="100%"
              // overflowY="auto"
              // overflowX="hidden"
            >
              <Flex
                direction="column"
                textAlign={["start", "start", "end", "end", "end"]}
                w={["100%", "100%", "60%", "60%", "60%"]}
                pl={["24px", "24px", "72px", "80px", "80px"]}
                pr={["24px", "24px", "48px", "64px", "64px"]}
              >
                
                <Box>
                  <Heading>{photo_Post.title}</Heading>
                </Box>
                <Flex
                  direction="column"
                  // justifyContent="space-between"
                  alignItems="center"
                  py="12px"
                >
                  <Box w="100%">
                    <Flex direction="row">
                      <Box>
                        <Heading
                          as="h4"
                          fontWeight="bold"
                          fontSize={["xs", "sm", "xs", "sm", "sm"]}
                          pr="2.75ch"
                        >
                          {router.locale === "en" ? "Date: " : "Ημ/νία"}
                        </Heading>
                      </Box>
                      <Box fontSize={["xs", "sm", "xs", "sm", "sm"]}>
                        <Text>
                          {/* @ts-ignore*/}
                          {new Intl.DateTimeFormat(router.locale,options)
                            .format(new Date(photo_Post.date ? photo_Post.date : photo_Post.published_at))}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex direction="row">
                      <Box>
                        <Heading
                          as="h4"
                          fontWeight="bold"
                          fontSize={["xs", "sm", "xs", "sm", "sm"]}
                          pr="1ch"
                        >
                          Credits:{" "}
                        </Heading>
                      </Box>
                      <Box fontSize={["xs", "sm", "xs", "sm", "sm"]}>
                        <Text>{photo_Post.writer?.name}</Text>
                        {/* <Text>{article.author.name_GR}</Text> */}
                      </Box>
                    </Flex>
                  </Box>
                  <ShareButtons
                    url={`${process.env.NEXT_PUBLIC_HOST_URL}/${router.locale}${router.asPath}`}
                    description={photo_Post.description}
                    pt={["16px", "16px", "0", "0", "0"]}
                  />
                  <Box
                    pt={["12px", "12px", "0", "0", "0"]}
                    pb={["24px", "24", "0", "0", "0"]}
                  >
                    <Button
                      size={tagSize}
                      rightIcon={<FaEye />}
                      bg="semantic.blue.dark"
                      color="whiteAlpha.900"
                      onClick={onToggle}
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
                      {router.locale === "el-GR" ? "Εικόνα" : "Image"}
                    </Button>
                  </Box>
                </Flex>
              </Flex>
              {dividerComp}
              <Flex
                direction="column"
                textAlign="start"
                w={["100%", "100%", "40%", "40%", "40%"]}
                py={["24px", "24px", "0", "0", "0"]}
                pr={["24px", "24px", "72px", "80px", "80px"]}
                pl={["24px", "24px", "48px", "64px", "64px"]}
              >
                <Heading fontWeight="normal">
                  <Flex direction="row">
                    {router.locale === "el-GR" ? "ΕΤΙΚΕΤΕΣ" : "TAGS"}
                    <Box pl="12px" alignSelf="flex-end">
                      <CgTag />
                    </Box>
                  </Flex>
                </Heading>
                <Text
                  py={["24px", "24px", "24px", "24px", "36px"]}
                  fontSize={["sm", "2xl", "md", "md", "lg"]}
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
                        <NextLink href={`/tag/${tag.slug}`}>
                          <a>{tag.name}</a>
                        </NextLink>
                      </Tag>
                    )
                  })}
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>
        </ContentGrid>
      </Layout>
    </>
  )
}

export default PhotoPostPage
