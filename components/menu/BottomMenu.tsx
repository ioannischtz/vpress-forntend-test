import React from 'react';
import { Box, Heading, Text, VStack, BoxProps, Flex } from '@chakra-ui/layout';
import SearchButton from '../search/SearchButton';
import Link from 'next/link';

interface BottomMenuProps {
  size: number;
  locale: string | undefined;
  shallow: boolean;
  isOnSearchPage?: boolean;
  onSearchModalToggle: () => void;
}

const BottomMenu: React.FC<BottomMenuProps & BoxProps> = ({
  size,
  locale,
  shallow,
  isOnSearchPage,
  onSearchModalToggle,
  ...props
}) => {
  return (
    <Box {...props}>
      <Box
        color="semantic.red.dark"
        _hover={{
          cursor: 'pointer',
        }}
      >
        <Link href="/" locale={locale} shallow={shallow}>
          <a>
            <Heading fontSize={size.toString() + 'vh'}>Voreia Press</Heading>
          </a>
        </Link>
      </Box>
      <Flex justify="space-between">
        {
          <SearchButton
            onclick={onSearchModalToggle}
            color="whiteAlpha.500"
            size={size}
          />
        }
        <VStack
          color="whiteAlpha.600"
          spacing={0}
          alignSelf="flex-end"
          fontSize={((3 * size) / 5).toString() + 'vh'}
        >
          <Text>
            {locale === 'en'
              ? 'Photo News Agency'
              : 'Φωτοειδησεογραφικό Πρακτορείο Θεσσαλονίκης'}
          </Text>
          <Text>{locale === 'en' ? 'Thessaloniki' : ''}</Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default BottomMenu;
