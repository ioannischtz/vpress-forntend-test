import { HStack, Text } from '@chakra-ui/layout';
import { Switch } from '@chakra-ui/switch';
import React, { useCallback, useContext } from 'react';
import { useCookies } from 'react-cookie';
import {
  I18nContext,
  I18nContextDispatchContext,
} from '../contexts/I18nContext';
import redirectLocale from '../lib/redirectLocale';

function I18nSwitch({ size, colorScheme, slug = '', ...props }) {
  const [cookie, setCookie] = useCookies(['NEXT_LOCALE']);
  const isDefaultLocale = React.useContext(I18nContext);
  const setIsDefaultLocale = useContext(I18nContextDispatchContext);

  const switchLanguage = useCallback(() => {
    const locale = isDefaultLocale ? 'en' : 'el-GR';

    setIsDefaultLocale.toggle();

    redirectLocale(locale, slug);

    if (cookie.NEXT_LOCALE !== locale) {
      setCookie('NEXT_LOCALE', locale, { path: '/', sameSite: 'lax' });
    }
  }, [
    slug,
    isDefaultLocale,
    setIsDefaultLocale,
    redirectLocale,
    cookie.NEXT_LOCALE,
  ]);

  return (
    <>
      <HStack {...props}>
        <Text
          as="span"
          fontFamily="body"
          fontWeight="bold"
          fontSize={size}
          color={isDefaultLocale ? '#f7fff7' : '#6e8894'}
        >
          GR
        </Text>
        <Switch
          isChecked={!isDefaultLocale}
          onChange={switchLanguage}
          // onChange={setIsDefaultLocale.toggle}
          size={size}
          colorScheme={colorScheme}
          aria-label="language switcher"
        />
        <Text
          as="span"
          fontFamily="body"
          fontWeight="bold"
          fontSize={size}
          color={!isDefaultLocale ? '#f7fff7' : '#6e8894'}
        >
          EN
        </Text>
      </HStack>
    </>
  );
}

export default I18nSwitch;
