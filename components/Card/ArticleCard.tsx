import React from 'react';
import {
  Box,
  BoxProps,
  Heading,
  Text,
  Flex,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/layout';
import NextLink from 'next/link';
import { useScreenType } from '../../hooks/useScreenType';
import { getStrapiMedia } from '../../lib/media';
import Image from 'next/image';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Article, ArticlesResponse } from '../../custom_typings/models';
import { useRouter } from 'next/router';

interface ArticleCardProps {
  article: Article | ArticlesResponse;
  writer_name: string;
  isPortrait?: boolean;
  preload?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps & BoxProps> = ({
  article,
  writer_name,
  isPortrait = 'true',
  preload = false,
  ...props
}) => {
  const screenType = useScreenType();
  let renderDesktop = true;
  switch (screenType) {
    case 'isDesktop':
    case 'isTablet':
      renderDesktop = true;
      break;
    case 'isSmallTablet':
    case 'isMobile':
      renderDesktop = false;
  }
  const imageUrl = getStrapiMedia(article.cover_image);

  const { locale } = useRouter();

  const widthsOuter = [
    'calc(75vw - 48px)',
    'calc(40vw - 48px)',
    'calc(22vw - 48px)',
    'calc(22vw - 48px)',
    'calc(20vw - 48px)',
  ];
  const heightsOuter = [
    'calc(0.65 * (85vh - 48px))',
    'calc(0.65 * (85vh - 48px))',
    'calc(0.45 * (100vh - 48px))',
    'calc(0.45 * (100vh - 48px))',
    'calc(0.45 * (100vh - 48px))',
  ];
  const widthsLandscape = [
    'calc(80vw - 48px)',
    'calc(40vw - 48px)',
    'calc(33vw - 48px)',
    'calc(33vw - 48px)',
    'calc(28vw - 48px)',
  ];
  const widthsLandscapeInner = 'calc(100% - 2px)';

  const heightsHeader = [
    'calc(0.7 * (0.65 * (85vh - 48px)))',
    'calc(0.7 * (0.65 * (85vh - 48px)))',
    'calc(0.6 * (0.45 * (100vh - 48px)))',
    'calc(0.6 * (0.45 * (100vh - 48px)))',
    'calc(0.6 * (0.45 * (100vh - 48px)))',
  ];
  const heightsBody = [
    'calc(0.1 * (0.65 * (85vh - 48px)))',
    'calc(0.1 * (0.65 * (85vh - 48px)))',
    'calc(0.15 * (0.45 * (100vh - 48px)))',
    'calc(0.15 * (0.45 * (100vh - 48px)))',
    'calc(0.15 * (0.45 * (100vh - 48px)))',
  ];
  const heightsFooter = [
    'calc(0.2 * (0.65 * (85vh - 48px)))',
    'calc(0.2 * (0.65 * (85vh - 48px)))',
    'calc(0.25 * (0.45 * (100vh - 48px)))',
    'calc(0.25 * (0.45 * (100vh - 48px)))',
    'calc(0.25 * (0.45 * (100vh - 48px)))',
  ];
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return (
    <Card
      w={isPortrait ? widthsOuter : widthsLandscape}
      // h={heightsOuter}
      pb="16px"
      {...props}
    >
      <LinkBox _hover={{ cursor: 'pointer' }}>
        <NextLink href={'/article/' + article.slug}>
          <LinkOverlay>
            <CardHeader
              // w={widthsLandscapeInner}
              // h={heightsHeader}
              direction="column"
              alignItems="center"
              justifyContent="center"
              borderTopRadius="6px"
              borderColor="whiteAlpha.400"
              overflow="clip"
              p="16px"
            >
              <Box
                h={heightsHeader}
                w="100%"
                overflow="clip"
                position="relative"
                borderRadius="4px"
                className="myContent"
              >
                <div className="myContent-overlay"></div>
                <Image
                  src={imageUrl}
                  alt={article.description}
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                  quality={article.cover_image.width < 200 ? 90 : 40}
                  priority={preload}
                />
                <div className="myContent-details myFadeIn-bottom">
                  <h3 className="myContent-title">
                    {(locale === 'en' ? 'Pics: ' : 'Εικόνες: ') +
                      article.nOfPics}
                  </h3>
                  <p className="myContent-text">{article.description}</p>
                </div>
              </Box>
            </CardHeader>

            <CardBody
              // w={widthsLandscapeInner}
              // h={heightsBody}
              direction="column"
              justifyContent={[
                'space-between',
                'space-around',
                'space-between',
                'space-between',
                'space-between',
              ]}
              px="28px"
              py={['8px', '8px', '0px', '4px', '4px']}
            >
              <Box textAlign="start">
                <Heading
                  as="h3"
                  color="whiteAlpha.800"
                  fontFamily="heading"
                  fontWeight='400'
                  fontSize={['sm', '2xl', 'md', 'md', 'lg']}
                >
                  {article.title}
                </Heading>
              </Box>
            </CardBody>

            <CardFooter
              h={heightsFooter}
              px="28px"
              justifyContent="flex-end"
              alignItems="flex-start"
              direction="column"
              color="whiteAlpha.800"
              fontSize={['sm', 'md', 'sm', 'md', 'md']}
              pb="16px"
            >
              {renderDesktop && (
                <>
                  <Flex direction="row">
                    <Box>
                      <Heading
                        as="h4"
                        fontWeight="bold"
                        fontSize={['sm', 'md', 'sm', 'md', 'md']}
                        pr="2.75ch"
                      >
                        {locale === 'en' ? 'Date: ' : 'Η/νία'}
                      </Heading>
                    </Box>
                    <Box>
                      <Text>
                        {/* @ts-ignore */}
                        {new Intl.DateTimeFormat(locale, { options }).format(
                          new Date(article.date ? article.date : article.published_at )
                        )}
                      </Text>
                    </Box>
                  </Flex>

                  <Flex direction="row">
                    <Box>
                      <Heading
                        as="h4"
                        fontWeight="bold"
                        fontSize={['sm', 'md', 'sm', 'md', 'md']}
                        pr="1ch"
                      >
                        Credits:{' '}
                      </Heading>
                    </Box>
                    <Box>
                      <Text>{writer_name}</Text>
                      {/* <Text>{article.author.name_GR}</Text> */}
                    </Box>
                  </Flex>
                </>
              )}
            </CardFooter>
          </LinkOverlay>
        </NextLink>
      </LinkBox>
    </Card>
  );
};

export default ArticleCard;
