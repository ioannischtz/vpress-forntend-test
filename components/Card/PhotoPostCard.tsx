import React from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  LinkBox,
  LinkOverlay,
  BoxProps,
} from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import NextLink from 'next/link';
// import { useScreenType } from '../../hooks/useScreenType';
import { getStrapiMedia } from '../../lib/media';
import Image from 'next/image';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { PhotoPost, PhotoPostsResponse } from '../../custom_typings/models';
import { useRouter } from 'next/router';

interface PhotoPostCardProps {
  photoPost: PhotoPost | PhotoPostsResponse;
  writer_name?: string;
  isPortrait?: boolean;
  locale?: string;
  preload: boolean;
}

const PhotoPostCard: React.FC<PhotoPostCardProps & BoxProps> = ({
  photoPost,
  writer_name = '',
  isPortrait = true,
  preload = false,
  ...props
}) => {
  // const screenType = useScreenType();
  const { locale } = useRouter();
  let renderDesktop = true;
  // switch (screenType) {
  //   case 'isDesktop':
  //   case 'isTablet':
  //     renderDesktop = true;
  //     break;
  //   case 'isSmallTablet':
  //   case 'isMobile':
  //     renderDesktop = false;
  // }
  const imageUrl = getStrapiMedia(photoPost.image);

  // const aspectRatio = photoPost.image.width / photoPost.image.height;

  // const widthsOuter = [
  //   'calc(75vw - 48px)',
  //   'calc(40vw - 48px)',
  //   'calc(22vw - 48px)',
  //   'calc(22vw - 48px)',
  //   'calc(20vw - 48px)',
  // ];
  // const heightsOuter = [
  //   'calc(0.65 * (85vh - 48px))',
  //   'calc(0.65 * (85vh - 48px))',
  //   'calc(0.45 * (100vh - 48px))',
  //   'calc(0.45 * (100vh - 48px))',
  //   'calc(0.45 * (100vh - 48px))',
  // ];

  // let w_ar = [
  //   `calc(${aspectRatio} * 0.65 * (85vh - 48px))`,
  //   `calc(${aspectRatio} * 0.65 * (85vh - 48px))`,
  //   `calc(${aspectRatio} * 0.45 * (100vh - 48px))`,
  //   `calc(${aspectRatio} * 0.45 * (100vh - 48px))`,
  //   `calc(${aspectRatio} * 0.45 * (100vh - 48px))`,
  // ];
  

  // const widthsInner = [
  //   'calc(75vw - 50px)',
  //   'calc(40vw - 50px)',
  //   'calc(22vw - 50px)',
  //   'calc(22vw - 50px)',
  //   'calc(20vw - 50px)',
  // ];
  // const widthsLandscape = [
  //   'calc(80vw - 48px)',
  //   'calc(40vw - 48px)',
  //   'calc(33vw - 48px)',
  //   'calc(33vw - 48px)',
  //   'calc(28vw - 48px)',
  // ];
  // const widthsLandscapeInner = 'calc(100% - 2px)';
  // const widthsLandscapeInner = [
  //   'calc(80vw - 50px)',
  //   'calc(50vw - 50px)',
  //   'calc(35vw - 50px)',
  //   'calc(35vw - 50px)',
  //   'calc(30vw - 50px)',
  // ];
  // const heightsHeader = [
  //   'calc(0.7 * (0.65 * (85vh - 48px)))',
  //   'calc(0.7 * (0.65 * (85vh - 48px)))',
  //   'calc(0.6 * (0.45 * (100vh - 48px)))',
  //   'calc(0.6 * (0.45 * (100vh - 48px)))',
  //   'calc(0.6 * (0.45 * (100vh - 48px)))',
  // ];
  // const heightsBody = [
  //   'calc(0.1 * (0.65 * (85vh - 48px)))',
  //   'calc(0.1 * (0.65 * (85vh - 48px)))',
  //   'calc(0.15 * (0.45 * (100vh - 48px)))',
  //   'calc(0.15 * (0.45 * (100vh - 48px)))',
  //   'calc(0.15 * (0.45 * (100vh - 48px)))',
  // ];
  // const heightsFooter = [
  //   'calc(0.2 * (0.65 * (85vh - 48px)))',
  //   'calc(0.2 * (0.65 * (85vh - 48px)))',
  //   'calc(0.25 * (0.45 * (100vh - 48px)))',
  //   'calc(0.25 * (0.45 * (100vh - 48px)))',
  //   'calc(0.25 * (0.45 * (100vh - 48px)))',
  // ];
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return (
    <Card
      // w={isPortrait ? widthsOuter : widthsLandscape}
      // w = {w_ar}
      // h={heightsOuter}
      // h = {isPortrait ? }
      // pb="16px"
      // display="block"
      sx={{breakInside: 'avoid', pageBreakInside: 'avoid'}}
      {...props}
    >
      <Tooltip
        zIndex="popover"
        label="View Post"
        hasArrow
        fontSize="inherit"
        placement="auto"
        openDelay={200}
        bg="semantic.blue.dark"
      >
        <LinkBox _hover={{ cursor: 'pointer' }}>
          <CardHeader
            // w={widthsLandscapeInner}
            // w = {w_ar}
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
              // h={heightsHeader}
              w="100%"
              // overflow="clip"
              textAlign="center"
              position="relative"
              borderRadius="4px"
            >
              <Image
                src={imageUrl}
                alt={photoPost.description}
                layout="intrinsic"
                height={photoPost.image.height}
                width={photoPost.image.width}
                objectFit="contain"
                objectPosition="center"
                quality={photoPost.image.width < 200 ? 90 : 50}
                priority={preload}
              />
            </Box>
          </CardHeader>

          <NextLink href={'/photo-post/' + photoPost.slug}>
            <LinkOverlay>
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
                px="16px"
                py={['8px', '8px', '0px', '4px', '4px']}
              >
                <Box textAlign="start">
                  <Heading
                    as="h3"
                    color="whiteAlpha.800"
                    fontFamily="heading"
                    fontWeight='400'
                    fontSize="16px"
                  >
                    {photoPost.title}
                  </Heading>
                </Box>
              </CardBody>
            </LinkOverlay>
          </NextLink>
          <CardFooter
            justifyContent="flex-end"
            alignItems="flex-start"
            direction="column"
            color="whiteAlpha.800"
            fontSize={["xs", "sm", "xs", "sm", "sm"]}
            p="16px"
          >
            {renderDesktop && (
              <>
                <Flex direction="row">
                  <Box>
                    <Heading
                      as="h4"
                      fontWeight="bold"
                      fontSize={["xs", "sm", "xs", "sm", "sm"]}
                      pr="2.75ch"
                    >
                      {locale === 'en' ? 'Date: ' : 'Ημ/νία'}
                    </Heading>
                  </Box>
                  <Box>
                    <Text>
                      {/* @ts-ignore */}
                      {new Intl.DateTimeFormat(locale, options).format(
                        new Date(photoPost.date ? photoPost.date : photoPost.published_at)
                      )}
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
                      Credits:{' '}
                    </Heading>
                  </Box>
                  <Box>
                    <Text>{writer_name}</Text>
                  </Box>
                </Flex>
              </>
            )}
          </CardFooter>
        </LinkBox>
      </Tooltip>
    </Card>
  );
};

export default PhotoPostCard;
