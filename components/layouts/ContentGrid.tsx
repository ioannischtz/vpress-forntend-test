import { Flex, Heading, Box, SimpleGrid } from '@chakra-ui/layout';
import { FlexboxProps } from '@chakra-ui/styled-system';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/breadcrumb';
import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';

interface ContentGridProps {
  heading: string;
  footer: React.ReactNode;
  useSimpleGrid?: boolean;
  renderBreadCrumbs: boolean;
  locale?: string;
  asPath: string;
  props?: FlexboxProps;
}

const ContentGrid: React.FC<ContentGridProps> = ({
  heading,
  footer,
  useSimpleGrid = true,
  locale,
  asPath,
  renderBreadCrumbs,
  children,
  ...props
}) => {
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  useEffect(() => {
    const bcrumbs_EN_session = sessionStorage.getItem('breadcrumbs_EN');
    const bcrumbs_GR_session = sessionStorage.getItem('breadcrumbs_GR');
    if (locale === 'en' && bcrumbs_EN_session !== null) {
      const bcrumbs_EN = JSON.parse(bcrumbs_EN_session);
      setBreadcrumbs(bcrumbs_EN);
    }
    if (locale === 'el-GR' && bcrumbs_GR_session !== null) {
      const bcrumbs_GR = JSON.parse(bcrumbs_GR_session);
      setBreadcrumbs(bcrumbs_GR);
    }
  }, [locale]);

  return (
    <Flex
      direction="column"
      h={[
        'calc(85vh - 48px)',
        'calc(85vh - 48px)',
        'calc(100vh - 48px)',
        'calc(100vh - 48px)',
        'calc(100vh - 48px)',
      ]}
      w={[
        'calc(100vw - 48px)',
        'calc(100vw - 48px)',
        'calc(75vw - 48px)',
        'calc(85vw - 48px)',
        'calc(85vw - 48px)',
      ]}
      alignItems="center"
      px="48px"
      borderRadius="4px"
      {...props}
    >
      <Flex
        // h={[
        //   'calc(0.15 * (85vh - 24px))',
        //   'calc(0.2 * (85vh - 24px))',
        //   'calc(0.2 * (100vh - 24px))',
        //   'calc(0.2 * (100vh - 24px))',
        //   'calc(0.2 * (100vh - 24px))',
        // ]}
        w={[
          'calc(100vw - 48px)',
          'calc(100vw - 48px)',
          'calc(75vw - 48px)',
          'calc(85vw - 48px)',
          'calc(85vw - 48px)',
        ]}
        direction="column"
        alignItems="center"
        justifyContent="center"
        bgColor="neutral.raisin_black.dark"
        py="24px"
      >
        <Heading
          textAlign="center"
          fontSize={['2xl', '4xl', '4xl', '4xl', '4xl']}
          color="whiteAlpha.700"
        >
          {heading}
        </Heading>
        {renderBreadCrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb color="whiteAlpha.600" p="12px">
            <BreadcrumbItem key={locale === 'en' ? 'Home' : 'Αρχική'}>
              <BreadcrumbLink
                as={NextLink}
                href={locale === 'en' ? '/en' : '/'}
              >
                <a>{locale === 'en' ? 'Home' : 'Αρχική'}</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbs.map((bc) => {
              return (
                bc !== '/' &&
                bc !== '/en' &&
                !(bc.includes('search') && asPath.includes('search')) &&
                bc.split('/').pop() !== asPath.split('/').pop() && (
                  <BreadcrumbItem key={bc.split('/').pop()}>
                    <BreadcrumbLink as={NextLink} href={bc}>
                      <a>{bc.split('/').pop()}</a>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                )
              );
            })}
            <BreadcrumbItem
              isCurrentPage={true}
              color="semantic.red.light"
              key={asPath.split('/').pop()}
            >
              <BreadcrumbLink as={NextLink} href={asPath} shallow={true}>
                <a>
                  {asPath.includes('search')
                    ? 'search-page'
                    : asPath.split('/').pop()}
                </a>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        )}
      </Flex>
      <Box
        h="400vh"
        // overflowY="auto"
        w={[
          'calc(100vw - 48px)',
          'calc(100vw - 48px)',
          'calc(75vw - 48px)',
          'calc(85vw - 48px)',
          'calc(85vw - 48px)',
        ]}
        overflowX="hidden"
        bgColor="neutral.raisin_black.dark"
      >
        {useSimpleGrid ? (
          <SimpleGrid
            overflowY="auto"
            overflowX="hidden"
            px="48px"
            pt={['12px', '12px', '24px', '48px', '48px']}
            pb={['72px', '96px', '48px', '48px', '48px']}
            columns={[1, 2, 2, 3, 3]}
            justifyItems="center"
            alignItems="center"
            justifyContent="center"
            rowGap="36px"
            // resize="none"
            w={[
              'calc(100vw - 48px)',
              'calc(100vw - 48px)',
              'calc(75vw - 48px)',
              'calc(85vw - 48px)',
              'calc(85vw - 48px)',
            ]}
          >
            {children}
          </SimpleGrid>
        ) : (
          <Flex
            w={[
              'calc(100vw - 64px)',
              'calc(100vw - 64px)',
              'calc(75vw - 64px)',
              'calc(85vw - 64px)',
              'calc(85vw - 64px)',
            ]}
            overflowY="auto"
            overflowX="hidden"
            flexFlow="row wrap"
            justifyItems="center"
            alignItems="center"
            justifyContent="center"
            ml="12px"
            // mx="48px"
            px={['24px', '64px', '80px', '88px', '96px']}
            pt={['12px', '12px', '24px', '48px', '48px']}
            pb={['72px', '96px', '48px', '48px', '48px']}
          >
            {children}
          </Flex>
        )}
      </Box>
      <Flex
        // h={[
        //   'calc(0.2 * (85vh - 48px))',
        //   'calc(0.2 * (85vh - 48px))',
        //   'calc(0.15 * (100vh - 48px))',
        //   'calc(0.15 * (100vh - 48px))',
        //   'calc(0.15 * (100vh - 48px))',
        // ]}
        w={[
          'calc(100vw - 48px)',
          'calc(100vw - 48px)',
          'calc(75vw - 48px)',
          'calc(85vw - 48px)',
          'calc(85vw - 48px)',
        ]}
        alignItems="center"
        justifyContent="center"
        bgColor="neutral.raisin_black.dark"
        py="24px"
        px="12px"
      >
        {footer}
      </Flex>
    </Flex>
  );
};

export default ContentGrid;
