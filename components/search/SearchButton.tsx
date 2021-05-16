import { Box, BoxProps } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/button';
import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';

interface SearchButtonProps {
  size: number;
  hoverC?: string;
  type?: 'button' | 'submit' | 'reset';
  onclick: React.MouseEventHandler<HTMLButtonElement>;
}

type Ref = HTMLButtonElement;

const SearchButton = React.forwardRef<Ref, SearchButtonProps & BoxProps>(
  ({ size, hoverC, onclick, type = 'button', ...props }, ref) => {
    const hoverColor = hoverC ? hoverC : 'gray.300';
    return (
      <Box {...props}>
        <IconButton
          ref={ref}
          size={(2 * size).toString() + 'vh'}
          variant="unstyled"
          aria-label="Search database"
          _hover={{ color: hoverColor }}
          _focus={{ outline: 'none', color: hoverColor }}
          icon={<BiSearchAlt size={(2 * size).toString() + 'vh'} />}
          onClick={onclick}
          type={type}
        />
      </Box>
    );
  }
);

export default SearchButton;
