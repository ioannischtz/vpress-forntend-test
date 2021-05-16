import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/button';
import { useBreakpointValue } from '@chakra-ui/media-query';

const ButtonLink = ({ children, icon, to, locale, ...rest }) => {
  const buttonSize = useBreakpointValue({
    base: 'sm',
    sm: 'lg',
    md: 'md',
    lg: 'md',
    xl: 'lg',
    '2xl': 'lg',
  });
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push(to, to, { locale });
  };
  return (
    <Button
      size={buttonSize}
      rightIcon={icon}
      onClick={handleClick}
      borderRadius="full"
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonLink;
