import { Flex } from '@chakra-ui/layout';
import React from 'react';
import BottomMenuMobile from './BottomMenuMobile';

interface MenuProps {
  size: number;
  locale: string | undefined;
  isOpen?: boolean;
  shallow: boolean;
  isOnSearchPage?: boolean;
  onToggle?: () => void;
  onSearchModalToggle: () => void;
}

const MenuMobile = React.forwardRef((props: MenuProps, ref: React.Ref<any>) => {
  return (
    <Flex ref={ref} w="100%" alignSelf="center" alignItems="center">
      <BottomMenuMobile
        ref={ref}
        locale={props.locale}
        shallow={props.shallow}
        isOpen={props.isOpen}
        onToggle={props.onToggle}
        onSearchModalToggle={props.onSearchModalToggle}
        isOnSearchPage={props.isOnSearchPage}
      />
    </Flex>
  );
});

export default MenuMobile;
