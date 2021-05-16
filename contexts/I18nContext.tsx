import { useBoolean } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { createContext } from 'react';

const I18nContext = createContext(null);
const I18nContextDispatchContext = createContext(null);

const I18nContextProvider = ({ children }) => {
  const router = useRouter();
  const [isDefaultLocale, setIsDefaultLocale] = useBoolean(
    router.locale === router.defaultLocale
  );
  return (
    <I18nContext.Provider value={isDefaultLocale}>
      <I18nContextDispatchContext.Provider value={setIsDefaultLocale}>
        {children}
      </I18nContextDispatchContext.Provider>
    </I18nContext.Provider>
  );
};

export { I18nContext, I18nContextProvider, I18nContextDispatchContext };
