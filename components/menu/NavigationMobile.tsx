import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/modal';
import { useRouter } from 'next/router';
import React from 'react';
import useRouteChanged from '../../hooks/useRouteChanged';

import NavLink from './NavLink';
import I18nSwitch from '../I18nSwitch';
import CloseButton from './CloseButton';
import { Category } from '../../custom_typings/models';

interface NavigationMobileProps {
  categories: Category[];
  slug?: string;
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export type Ref = HTMLButtonElement;

const NavigationMobile = React.forwardRef<Ref, NavigationMobileProps>(
  ({ categories, slug = '', isOpen, onClose, onToggle }, ref) => {
    const { locale, asPath } = useRouter();
    useRouteChanged(onClose);

    return (
      <Drawer onClose={onClose} isOpen={isOpen} size="full" placement="left">
        <DrawerOverlay>
          <DrawerContent bgColor="neutral.raisin_black.medium">
            <DrawerHeader>
              <I18nSwitch
                slug={slug}
                margin="12px"
                size="md"
                colorScheme="chkbox"
              />
              <Box color="semantic.red.medium">
                <Heading fontSize="4vh" textAlign="center">
                  Voreia Press
                </Heading>
                <Text
                  color="neutral.timberwolf.medium"
                  fontSize="2vh"
                  textAlign="center"
                >
                  {locale === 'en'
                    ? 'Press Photo Agency, Thessaloniki'
                    : 'Φωτοειδησεογραφικό Πρακτορείο Θεσσαλονίκης'}
                </Text>
              </Box>
            </DrawerHeader>
            <DrawerBody>
              <Flex
                h="calc(100% - 24px)"
                direction="column"
                align="center"
                justify="space-around"
                hidden={false}
              >
                <NavLink
                  asPath={asPath}
                  to={'/'}
                  key='homepage'
                  isLast={false}
                  fontWeight="normal"
                  fontSize={['xl', 'xl', 'lg', 'lg']}
                  color="whiteAlpha.800"
                  hoverC="semantic.red.light"
                  icon={''}
                >
                  {locale==='en' ? 'HomePage' : 'Αρχική Σελίδα'}
                </NavLink>
                {categories.map((category) => {
                  return (
                    <NavLink
                      asPath={asPath}
                      to={'/category/' + category.slug}
                      key={category.slug}
                      isLast={false}
                      fontWeight="normal"
                      fontSize={['lg', 'xl', 'lg', 'lg', 'lg']}
                      color="whiteAlpha.900"
                      hoverC="semantic.red.light"
                      icon={''}
                    >
                      {category.name}
                    </NavLink>
                  );
                })}
                <NavLink
                  asPath={asPath}
                  to={'/the-team/'}
                  key={'the-team'}
                  isLast={true}
                  fontWeight="normal"
                  fontSize={['xl', 'xl', 'lg', 'lg']}
                  color="whiteAlpha.900"
                  hoverC="semantic.red.light"
                  icon={''}
                >
                  {locale === 'en' ? 'The Team' : 'Η Ομάδα'}
                </NavLink>
                <Box
                  color="whiteAlpha.700"
                  alignSelf="center"
                  justifySelf="baseline"
                >
                  <CloseButton
                    ref={ref}
                    aria-label="Close menu"
                    mysize={3}
                    isOpen={isOpen}
                    onClick={onToggle}
                  />
                </Box>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }
);

export default NavigationMobile;
