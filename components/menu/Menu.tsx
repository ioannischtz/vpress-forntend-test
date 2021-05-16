import { VStack } from '@chakra-ui/layout';
import React from 'react';
import { CategoriesResponse } from '../../custom_typings/models';
import I18nSwitch from '../I18nSwitch';
import BottomMenu from './BottomMenu';
import Navigation from './Navigation';

interface MenuProps {
  categories: CategoriesResponse[];
  slug: string;
  locale: string | undefined;
  shallow: boolean;
  isOnSearchPage?: boolean;
  onSearchModalToggle: () => void;
}

const Menu: React.FC<MenuProps> = ({
  categories,
  slug = '',
  locale,
  shallow,
  isOnSearchPage,
  onSearchModalToggle,
}) => {
  return (
    <>
      <VStack
        spacing={12}
        align="flex-start"
        justify={['center', 'flex-end', 'flex-end', 'flex-end', 'flex-end']}
        hidden={false}
      >
        <I18nSwitch slug={slug} size="md" colorScheme="chkbox" />
        <Navigation categories={categories} />
      </VStack>
      <BottomMenu
        onSearchModalToggle={onSearchModalToggle}
        locale={locale}
        shallow={shallow}
        isOnSearchPage={isOnSearchPage}
        size={3}
        fontFamily="heading"
        alignSelf="flex-start"
      />
    </>
  );
};

export default Menu;
