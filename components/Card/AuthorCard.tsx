import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import Image from 'next/image';
import { BiChevronRight } from 'react-icons/bi';
import { useDisclosure, useUpdateEffect } from '@chakra-ui/hooks';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { Button } from '@chakra-ui/button';
import { Circle, Box, Heading, Text } from '@chakra-ui/layout';
import { getStrapiMedia } from '../../lib/media';
import ButtonLink from '../ButtonLink';
import { useScreenType } from '../../hooks/useScreenType';
import BioDrawer from './BioDrawer';
import { Writer } from '../../custom_typings/models';
import { useRouter } from 'next/router';

export interface AuthorCardProps {
  writer: Writer;
  preload: boolean;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ writer, preload = false }) => {
  const screenType = useScreenType();
  const bioDisclosure = useDisclosure();
  const bioRef = React.useRef<HTMLButtonElement>();
  const buttonSize = useBreakpointValue({
    base: 'sm',
    sm: 'md',
    md: 'md',
    lg: 'md',
    xl: 'lg',
    '2xl': 'lg',
  });
  const { locale } = useRouter();
  useUpdateEffect(() => {
    bioRef.current?.focus();
  }, [bioDisclosure.isOpen]);

  const imageUrl = getStrapiMedia(writer.picture);
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

  const widthsOuter = [
    'calc(80vw - 48px)',
    'calc(43vw - 48px)',
    'calc(25vw - 48px)',
    'calc(25vw - 48px)',
    'calc(22vw - 48px)',
  ];
  const heightsOuter = [
    'calc(0.6 * (85vh - 48px))',
    'calc(0.6 * (85vh - 48px))',
    'calc(0.5 * (100vh - 48px))',
    'calc(0.5 * (100vh - 48px))',
    'calc(0.5 * (100vh - 48px))',
  ];
  const widthsInner = [
    'calc(80vw - 48px)',
    'calc(43vw - 48px)',
    'calc(25vw - 48px)',
    'calc(25vw - 48px)',
    'calc(22vw - 48px)',
  ];
  const heightsAvatar = [
    'calc(0.35 * (0.6 * (85vh - 48px)))',
    'calc(0.35 * (0.6 * (85vh - 48px)))',
    'calc(0.3 * (0.5 * (100vh - 48px)))',
    'calc(0.3 * (0.5 * (100vh - 48px)))',
    'calc(0.3 * (0.5 * (100vh - 48px)))',
  ];
  const heightsHeader = [
    'calc(0.45 * (0.6 * (85vh - 48px)))',
    'calc(0.45 * (0.6 * (85vh - 48px)))',
    'calc(0.4 * (0.5 * (100vh - 48px)))',
    'calc(0.4 * (0.5 * (100vh - 48px)))',
    'calc(0.4 * (0.5 * (100vh - 48px)))',
  ];
  const heightsBody = [
    'calc(0.55 * (0.6 * (85vh - 48px)))',
    'calc(0.55 * (0.6 * (85vh - 48px)))',
    'calc(0.55 * (0.5 * (100vh - 48px)))',
    'calc(0.55 * (0.5 * (100vh - 48px)))',
    'calc(0.55 * (0.5 * (100vh - 48px)))',
  ];
  const heightsFooter = [
    'calc(0 * (0.6 * (85vh - 48px)))',
    'calc(0 * (0.6 * (85vh - 48px)))',
    'calc(0.14 * (0.5 * (100vh - 48px)))',
    'calc(0.14 * (0.5 * (100vh - 48px)))',
    'calc(0.14 * (0.5 * (100vh - 48px)))',
  ];
  return (
    <Card w={widthsOuter} h={heightsOuter}>
      <BioDrawer
        imageUrl={imageUrl}
        writer={writer}
        ref={bioRef}
        isOpen={bioDisclosure.isOpen}
        size={renderDesktop ? 'md' : 'full'}
        onClose={bioDisclosure.onClose}
        onToggle={bioDisclosure.onToggle}
      />
      <CardHeader
        w={widthsInner}
        h={heightsHeader}
        direction="column"
        alignItems="center"
        justifyContent="center"
        borderTopRadius="6px"
        borderColor="whiteAlpha.400"
      >
        <Circle
          size={heightsAvatar}
          bg="neutral.pacific_blue.dark"
          overflow="clip"
        >
          <Box h={heightsHeader} w="100%" position="relative">
            <Image
              src={imageUrl}
              alt={'Picture of team member ' + writer.name}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={writer.picture.width < 200 ? 90 : 40}
              priority={preload}
            />
          </Box>
        </Circle>
      </CardHeader>
      <CardBody
        w={widthsInner}
        h={heightsBody}
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
            fontWeight="bold"
            fontSize={['md', '2xl', 'lg', 'lg', 'xl']}
          >
            {writer.name}
          </Heading>
          {renderDesktop && (
            <Box pt="8px">
              <Heading
                as="h4"
                color="whiteAlpha.600"
                fontWeight="light"
                fontSize={['xs', 'sm', 'sm', 'sm', 'sm']}
              >
                {writer.Role}
              </Heading>
            </Box>
          )}
          {!renderDesktop && (
            <Box pt={['12px', '20px', null, null, null]}>
              <Button
                ref={bioRef}
                borderColor="neutral.timberwolf.dark"
                bg="transparent"
                variant="outline"
                size={buttonSize}
                color="whiteAlpha.700"
                _hover={{
                  borderColor: 'neutral.timberwolf.medium',
                  color: 'white',
                }}
                _focus={{
                  boxShadow: '0 0 0 2px #E2E2DF',
                }}
                _active={{
                  borderColor: 'neutral.timberwolf.light',
                }}
                onClick={bioDisclosure.onToggle}
              >
                {locale === 'en' ? 'Bio' : 'Βιογραφικό'}
              </Button>
            </Box>
          )}
        </Box>
        {renderDesktop && (
          <Box
            color="whiteAlpha.800"
            fontFamily="mono"
            fontWeight="normal"
            fontSize={[
              'calc(0.025 * (85vh - 48px))',
              'calc(0.025 * (85vh - 48px))',
              'calc(0.017 * (100vh - 48px))',
              'calc(0.017 * (100vh - 48px))',
              'calc(0.017 * (100vh - 48px))',
            ]}
          >
            <Text isTruncated={writer.ShortBio.length > 48}>
              {writer.ShortBio}
            </Text>
            {writer.ShortBio.length > 48 && (
              <Button
                ref={bioRef}
                borderColor="neutral.timberwolf.light"
                textDecoration="none"
                bg="transparent"
                variant="ghost"
                size={buttonSize}
                color="accent.radical_red.light"
                _hover={{
                  color: 'white',
                  textDecoration: 'underline',
                }}
                _focus={{
                  boxShadow: '0 0 0 1px #E2E2DF',
                  textDecoration: 'underline',
                }}
                _active={{
                  borderColor: 'neutral.timberwolf.light',
                  textDecoration: 'underline',
                }}
                onClick={bioDisclosure.onToggle}
              >
                {locale === 'en' ? 'Read More' : 'Διάβασε περισσότερα'}
              </Button>
            )}
          </Box>
        )}
        <Box pt="16px" pb={['12px', '12px', '12px', '12px', '6px']}>
          <ButtonLink
            fontWeight="bold"
            to={'/writer/' + writer.slug}
            locale={locale}
            icon={<BiChevronRight />}
            transition="all 0.1s ease-in-out"
            bg="semantic.blue.dark"
            color="whiteAlpha.900"
            _hover={{
              bg: 'semantic.blue.medium',
              color: 'white',
            }}
            _focus={{
              boxShadow: '0 0 0 3px #D5D4D0',
            }}
            _active={{
              bg: 'semantic.blue.light',
            }}
          >
            {locale === 'en' ? 'View Stories' : 'Δες τις ιστορίες'}
          </ButtonLink>
        </Box>
      </CardBody>
      {renderDesktop && (
        <CardFooter
          h={heightsFooter}
          px="28px"
          pb={['12px', '8px', null, null, null]}
          justifyItems="center"
          alignItems="center"
        >
          <Text
            color="whiteAlpha.500"
            fontSize={[
              'calc(0.025 * (85vh - 48px))',
              'calc(0.025 * (85vh - 48px))',
              'calc(0.016 * (100vh - 48px))',
              'calc(0.016 * (100vh - 48px))',
              'calc(0.016 * (100vh - 48px))',
            ]}
          >
            {locale === 'en'
              ? '@ Contact:  ' + writer.email
              : '@ Επικοινωνία:  ' + writer.email}{' '}
          </Text>
        </CardFooter>
      )}
    </Card>
  );
};

export default AuthorCard;
