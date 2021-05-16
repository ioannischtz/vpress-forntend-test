import React from 'react';
import { Circle, Text, Box, BoxProps } from '@chakra-ui/layout';

interface LogoProps {
  size: number;
}

const Logo: React.FC<LogoProps & BoxProps> = ({ size, ...props }) => {
  return (
    <Circle {...props} size={size.toString() + 'vh'}>
      <Box justifyItems="baseline">
        <Text
          as="span"
          fontSize={((2 * size) / 3).toString() + 'vh'}
          fontWeight="bold"
        >
          V
        </Text>
        <Text
          as="span"
          fontSize={((1 * size) / 3).toString() + 'vh'}
          fontWeight="bold"
        >
          P
        </Text>
      </Box>
    </Circle>
  );
};

export default Logo;
