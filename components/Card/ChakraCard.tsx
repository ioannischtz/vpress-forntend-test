import { Box } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/react';
import React from 'react';

const ChakraCard = ({ children, ...props }) => {
  const header = React.Children.map(children, (child) =>
    child.type.displayName === 'Header' ? child : null
  );
  const body = React.Children.map(children, (child) =>
    child.type.displayName === 'Body' ? child : null
  );
  const footer = React.Children.map(children, (child) =>
    child.type.displayName === 'Footer' ? child : null
  );
  return (
    <Box {...props}>
      <Box>{header}</Box>
      <Box>{body}</Box>
      <Box>{footer}</Box>
    </Box>
  );
};

const Header = chakra(({ children }) => children);
Header.displayName = 'Header';
ChakraCard.Header = Header;

const Body = chakra(({ children }) => children);
Body.displayName = 'Body';
ChakraCard.Body = Body;

const Footer = chakra(({ children }) => children);
Footer.displayName = 'Footer';
ChakraCard.Footer = Footer;

export default ChakraCard;
