import { VStack } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React from 'react';
import { Category } from '../../custom_typings/models';
import NavLink from './NavLink';

interface NavigationProps {
  categories: Category[];
}

const Navigation: React.FC<NavigationProps> = ({ categories }) => {
  const { locale, asPath } = useRouter();
  return (
    <VStack
      direction="column"
      spacing={6}
      align="flex-start"
      justify={['center', 'flex-end', 'flex-end', 'flex-end', 'flex-end']}
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
            fontSize={['xl', 'xl', 'lg', 'lg']}
            color="whiteAlpha.800"
            hoverC="semantic.red.light"
            icon={''}
          >
            {category.name}
          </NavLink>
        );
      })}
      <NavLink
        asPath={asPath}
        to={'/the-team'}
        key={'the-team'}
        isLast={true}
        fontWeight="normal"
        fontSize={['xl', 'xl', 'lg', 'lg']}
        color="whiteAlpha.800"
        hoverC="semantic.red.light"
        icon={''}
      >
        {locale === 'en' ? 'The Team' : 'Η Ομάδα'}
      </NavLink>
    </VStack>
  );
};

export default Navigation;
