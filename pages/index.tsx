import { fetchAPI } from '../lib/api';
import { getStrapiMedia } from '../lib/media';
import Image from 'next/image';
import Layout from '../components/layouts/Layout';
import ImageHeading from '../components/homePageImage/ImageHeading';
import React from 'react';
import { Box } from '@chakra-ui/layout';
import {
  CategoriesResponse,
  HomepageResponse,
  WritersResponse,
} from '../custom_typings/models';
import filterWriter from '../lib/filterWriter';
import { useStoreBreadcrumbs } from '../hooks/useStoreBreadcrumbs';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';

interface HomePageProps {
  categories: CategoriesResponse[];
  homepage: HomepageResponse;
  writers: WritersResponse[];
  locale: string;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // Run API calls in parallel
  const [categories, homepage, writers] = await Promise.all([
    fetchAPI(`/categories?_locale=${locale}&_sort=order`),
    fetchAPI(`/home-page?_locale=${locale}`),
    fetchAPI(`/writers?_locale=${locale}`),
  ]);

  return {
    props: { categories, homepage, writers, locale },
    revalidate: 1*30*60,
  };
}

const Home: React.FC<HomePageProps> = ({
  categories,
  homepage,
  writers,
  locale,
}) => {
  const { asPath, isReady, pathname } = useRouter();
  const imageUrl = getStrapiMedia(homepage.photo_post?.image);

  useStoreBreadcrumbs(locale === 'en' ? '/' : '/en', isReady, asPath);

  const SEO = {
    title: homepage.HomepageHero.title,
    description: homepage.HomepageSEO.metaDescription,
    openGraph: {
      title: homepage.HomepageSEO.metaTitle,
      description: homepage.HomepageSEO.metaDescription,
      image: {
        url: homepage.HomepageSEO.shareImage,
        width: homepage.HomepageSEO.shareImage.width,
        height: homepage.HomepageSEO.shareImage.height,
        alt: homepage.HomepageSEO.shareImage.alternativeText,
      },
    },
  };

  return (
    <>
      <NextSeo {...SEO} />
      <Layout
        categories={categories}
        writers={writers}
        locale={locale}
        pathname={pathname}
        isOnSearchPage={false}
      >
        <Box zIndex="base">
          <Image
            src={imageUrl}
            alt="Picture of the day"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={
              homepage.photo_post.image.width < 200
                ? 90
                : homepage.photo_post.image.width < 350
                ? 75
                : homepage.photo_post.image.width < 500
                ? 65
                : 55
            }
            priority={true}
          />
        </Box>
        <ImageHeading
          to={'/photo-post/' + homepage.photo_post.slug}
          title={homepage.photo_post.title}
          date={homepage.photo_post.updated_at.toString()}
          credits={filterWriter(writers, homepage.photo_post.writer)?.name}
          locale={locale}
          position="relative"
          zIndex="banner"
        />
      </Layout>
    </>
  );
};
export default Home;
