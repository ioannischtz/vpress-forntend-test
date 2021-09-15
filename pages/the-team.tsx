import { Box, Flex } from '@chakra-ui/layout';
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
import ShareButtons from '../components/ShareButtons';

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
    revalidate: 1*30*60,
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
        url: theTeam.TeamSEO?.shareImage,
        width: theTeam.TeamSEO.shareImage?.width,
        height: theTeam.TeamSEO.shareImage?.height,
        alt: theTeam.TeamSEO.shareImage?.alternativeText,
      },
    },
  };

  let shareBtns: React.ReactNode;
  if (isMounted)
    shareBtns = (
      <ShareButtons
        url={`${process.env.NEXT_PUBLIC_HOST_URL}/${router.locale}${router.asPath}`}
        description={theTeam.TeamSEO.metaDescription}
        pt={['16px', '16px', '0', '0', '0']}
      />
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
