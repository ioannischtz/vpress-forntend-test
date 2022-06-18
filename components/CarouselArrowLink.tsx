import React from 'react';
import { useRouter } from 'next/router';
import { IconButton  } from '@chakra-ui/button';
import {MdKeyboardArrowLeft,MdKeyboardArrowRight} from 'react-icons/md'
import { useBreakpointValue } from '@chakra-ui/media-query';

const CarouselArrowLink = ({ direction, to, locale, isDisabled, ...rest }) => {
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
    <IconButton
      aria-label={direction === 'l' ? 'View previous photo-post' : 'View next photo-post'}
      // size={'lg'}
      height={['34px','48px','58px','58px','68px']}
      icon={direction === 'l' ? <MdKeyboardArrowLeft size={'lg'}/> : <MdKeyboardArrowRight size={'lg'}/>}
      onClick={handleClick}
      isDisabled={isDisabled}
      colorScheme="blackAlpha"
      {...rest}
    />
  );
};

export default CarouselArrowLink;
