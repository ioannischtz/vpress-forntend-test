import { Flex, FlexProps } from '@chakra-ui/layout';
import React from 'react';

interface CardProps {}

const Card: React.FC<CardProps & FlexProps> = ({ children, ...props }) => {
  return (
    <Flex
      direction="column"
      backgroundColor="whiteAlpha.50"
      border="1px solid"
      borderColor="whiteAlpha.400"
      borderRadius="6px"
      transition="all 0.2s cubic-bezier(.41,0,.07,1.16)"
      _hover={{
        boxShadow:
          '0 2px 2px -1px rgba(0,0,0,0.35),0 1px 20px 1px rgba(0,0,0,0.35)',
        backgroundColor: 'whiteAlpha.100',
        transform: 'translateY(-8px)',
      }}
      boxShadow="0 2px 2px -1px rgba(0,0,0,0.25),0 1px 10px -2px rgba(0,0,0,0.25)"
      justifyContent="space-between"
      {...props}
    >
      {children}
    </Flex>
  );
};

const CardHeader: React.FC<CardProps & FlexProps> = ({
  children,
  ...props
}) => {
  return <Flex {...props}>{children}</Flex>;
};

const CardBody: React.FC<CardProps & FlexProps> = ({ children, ...props }) => {
  return <Flex {...props}>{children}</Flex>;
};

const CardFooter: React.FC<CardProps & FlexProps> = ({
  children,
  ...props
}) => {
  return <Flex {...props}>{children}</Flex>;
};

export { Card, CardHeader, CardBody, CardFooter };
