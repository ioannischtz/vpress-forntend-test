import { Box, Flex } from '@chakra-ui/layout';
import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'next-share';
import { useRouter } from 'next/router';
import React from 'react';
import AuthorCard from '../components/Card/AuthorCard';
import ContentGrid from '../components/layouts/ContentGrid';
import Layout from '../components/layouts/Layout';
import {
  TeamPageResponse,
  CategoriesResponse,
  WritersResponse,
} from '../custom_typings/models';
import useMounted from '../hooks/useMounted';
import { useStoreBreadcrumbs } from '../hooks/useStoreBreadcrumbs';
import { fetchAPI } from '../lib/api';
import { NextSeo } from 'next-seo';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { GetStaticProps } from 'next';

export interface TheTeamProps {
  categories: CategoriesResponse[];
  theTeam: TeamPageResponse;
  writers: WritersResponse[];
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // Run API calls in parallel
  const [categories, theTeam, writers] = await Promise.all([
    fetchAPI(`/categories?_locale=${locale}&_sort=order`),
    fetchAPI(`/the-team?_locale=${locale}`),
    fetchAPI(`/writers?_locale=${locale}`),
  ]);

  return {
    props: { categories, theTeam, writers },
    revalidate: 12*60*60,
    // revalidate: 12 hours, // = 1 day
  };
}

const TheTeam: React.FC<TheTeamProps> = ({ categories, theTeam, writers }) => {
  const router = useRouter();
  const isMounted = useMounted();
  useStoreBreadcrumbs(
    router.locale === 'en' ? '/the-team' : '/en/the-team',
    router.isReady,
    router.asPath
  );

  const SEO = {
    title: theTeam.TeamPageHero.title,
    description: theTeam.TeamSEO.metaDescription,
    openGraph: {
      title: theTeam.TeamSEO.metaTitle,
      description: theTeam.TeamSEO.metaDescription,
      image: {
        url: theTeam.TeamSEO.shareImage,
        width: theTeam.TeamSEO.shareImage.width,
        height: theTeam.TeamSEO.shareImage.height,
        alt: theTeam.TeamSEO.shareImage.alternativeText,
      },
    },
  };

  let shareBtns: React.ReactNode;
  if (isMounted)
    shareBtns = (
      <Flex direction="row" alignSelf="flex-end">
        <Box
          color="whiteAlpha.500"
          fontSize={['sm', '2xl', 'xl', 'xl', 'xl']}
          fontWeight="normal"
        >
          Share:{' '}
        </Box>
        <Box
          px="8px"
          _hover={{
            cursor: 'pointer',
            transform: 'scale(1.1, 1.1)',
            textDecoration: 'underline',
          }}
        >
          <FacebookShareButton
            url={router.basePath + router.asPath}
            quote={
              'next-share is a social share buttons for your next React apps.'
            }
            hashtag={'#nextshare'}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </Box>
        <Box
          px="8px"
          _hover={{
            cursor: 'pointer',
            transform: 'scale(1.1, 1.1)',
            textDecoration: 'underline',
          }}
        >
          <RedditShareButton
            url={'https://github.com/next-share'}
            title={
              'next-share is a social share buttons for your next React apps.'
            }
            windowWidth={660}
            windowHeight={460}
          >
            <RedditIcon size={32} round />
          </RedditShareButton>
        </Box>
        <Box
          pr="16px"
          pl="8px"
          _hover={{
            cursor: 'pointer',
            transform: 'scale(1.1, 1.1)',
            textDecoration: 'underline',
          }}
        >
          <TwitterShareButton
            url={'https://github.com/next-share'}
            title={
              'next-share is a social share buttons for your next React apps.'
            }
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </Box>
      </Flex>
    );
  return (
    <>
      <NextSeo {...SEO} />
      <Layout
        categories={categories}
        writers={writers}
        locale={router.locale}
        pathname={router.pathname}
        isOnSearchPage={false}   
      >
        <ContentGrid
          heading={router.locale === 'en' ? 'The Team' : 'Η Ομάδα'}
          footer={
            <Flex
              w="100%"
              direction={['column', 'column', 'row', 'row', 'row']}
              justifyContent="space-around"
            >
              <Box
                color="whiteAlpha.500"
                fontSize={['sm', '2xl', 'xl', 'xl', 'xl']}
                fontWeight="normal"
                m="4px"
              >
                <ReactMarkdown remarkPlugins={[gfm]}>
                  {theTeam.Footer_Message}
                </ReactMarkdown>
              </Box>
              {shareBtns}
            </Flex>
          }
          asPath={router.asPath}
          locale={router.locale}
          renderBreadCrumbs={true}
        >
          {theTeam.writers.map((writer, i) => {
            return (
              <AuthorCard key={writer.slug} writer={writer} preload={i === 0} />
            );
          })}
        </ContentGrid>
      </Layout>
    </>
  );
};

export default TheTeam;
