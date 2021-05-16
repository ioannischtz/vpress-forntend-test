import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import SearchButton from '../search/SearchButton';
import MenuToggle from './MenuToggle';
import Logo from '../Logo';
import Link from 'next/link';

interface BottomMenuMobileProps {
  isOpen?: boolean;
  locale: string | undefined;
  shallow: boolean;
  isOnSearchPage?: boolean;
  onToggle?: () => void;
  onSearchModalToggle: () => void;
}

const BottomMenuMobile = React.forwardRef(
  (props: BottomMenuMobileProps, ref: React.Ref<any>) => {
    return (
      <Box
        w={['calc(95vw - 48px)', 'calc(90vw - 48px)', '0px', '0px', '0px']}
        fontFamily="heading"
      >
        <Flex
          w="100%"
          justify="space-between"
          alignItems="flex-end"
          color="whiteAlpha.600"
        >
          <Flex
            flexDirection="row"
            alignItems="flex-end"
            w="50%"
            _hover={{
              cursor: 'pointer',
            }}
          >
            <Link href="/" locale={props.locale} shallow={props.shallow}>
              <a>
                <Logo
                  m="4px"
                  border="2px"
                  size={8}
                  fontFamily="logo"
                  color="semantic.red.medium"
                  backgroundColor="neutral.raisin_black.medium"
                />
              </a>
            </Link>

            <Box
              pl={['2px', '16px', null, null, null]}
              color="semantic.red.dark"
            >
              <Heading fontSize={['lg', '4xl', 'lg', 'lg', 'lg']}>
                Voreia Press{' '}
              </Heading>
            </Box>
          </Flex>
          <Flex
            flexDirection="row"
            alignItems="flex-end"
            justifyContent="flex-end"
            w="50%"
          >
            {
              <SearchButton
                onclick={props.onSearchModalToggle}
                color="whiteAlpha.600"
                size={3}
              />
            }
            <MenuToggle
              ref={ref}
              aria-label="Open menu"
              mysize={3.5}
              color="whiteAlpha.600"
              isOpen={props.isOpen}
              onClick={props.onToggle}
            />
          </Flex>
        </Flex>
      </Box>
    );
  }
);

export default BottomMenuMobile;
