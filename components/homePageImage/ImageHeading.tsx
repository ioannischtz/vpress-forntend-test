import React from 'react';
import { Heading, Text, BoxProps, Flex, Link } from '@chakra-ui/layout';
import NextLink from 'next/link';

interface ImageHeadingProps {
  title: string;
  credits?: string;
  date: string;
  to: string;
  locale: string;
}

const ImageHeading: React.FC<ImageHeadingProps & BoxProps> = ({
  title,
  credits,
  date,
  to,
  locale,
  ...props
}) => {
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return (
    // <Flex
    //   direction={['column', 'column', 'row', 'row', 'row']}
    //   justifyContent="space-around"
    //   alignItems="flex-end"
    //   // h={['12vh', '12vh', '6vh', '6vh', '6vh']}
    //   minH={['12vh', '12vh', '6vh', '6vh', '6vh']}
    //   flex="1 1 auto"
    //   w={[
    //     'calc(75vw - 48px)',
    //     'calc(75vw - 48px)',
    //     'calc(65vw - 48px)',
    //     'calc(65vw - 48px)',
    //     'calc(65vw - 48px)',
    //   ]}
    //   p={['2vh', '2vh', '1vh', '1vh', '1vh']}
    //   mt={['2vh', '2vh', '4vh', '4vh', '4vh']}
    //   backgroundColor="neutral.jet.dark"
    //   borderRadius="6px"
    //   color="whiteAlpha.700"
    //   transition="all 0.2s cubic-bezier(.41,0,.07,1.16)"
    //   _hover={{
    //     cursor: 'pointer',
    //     boxShadow:
    //       '0 2px 2px -1px rgba(0,0,0,0.35),0 1px 20px 1px rgba(0,0,0,0.35)',
    //     backgroundColor: 'neutral.jet.light',
    //     transform: 'scale(1.01, 1.02)',
    //     textDecoration: 'underline',
    //   }}
    //   boxShadow="0 2px 2px -1px rgba(0,0,0,0.25),0 1px 10px -2px rgba(0,0,0,0.25)"
    //   {...props}
    // >
    //   <Box>
    //     <Link as={NextLink} href={to}>
    //       <Flex
    //         as="a"
    //         fontWeight={400}
    //         fontFamily="heading"
    //         lineHeight="1.1"
    //         align="center"
    //         justify={[
    //           'space-around',
    //           'space-around',
    //           'center',
    //           'center',
    //           'center',
    //         ]}
    //         direction={['column', 'column', 'row', 'row', 'row']}
    //       >
    //         <Heading
    //           fontWeight={700}
    //           textAlign="center"
    //           fontSize={['2vh', '2vh', '3vh', '3vh', '3vh']}
    //           pr={['0ch', '0ch', '1ch', '1ch', '1ch']}
    //         >
    //           {title}
    //         </Heading>
    //         <Flex>
    //           <Text
    //             fontSize={['2vh', '2vh', '2vh', '2vh', '2vh']}
    //             alignSelf="flex-end"
    //             px="1ch"
    //           >
    //             {/* @ts-ignore: Unreachable code error */}
    //             {new Intl.DateTimeFormat(locale, options).format(
    //               new Date(date)
    //             )}
    //           </Text>
    //         </Flex>
    //         <Flex>
    //           <Text
    //             fontSize={['2vh', '2vh', '2vh', '2vh', '2vh']}
    //             alignSelf="flex-end"
    //             pl={['0ch', '0ch', '1ch', '1ch', '1ch']}
    //           >
    //             {credits}
    //           </Text>
    //         </Flex>
    //       </Flex>
    //     </Link>
    //   </Box>
    // </Flex>
    <Flex justifyContent="space-between" justifySelf="flex-start" alignItems="flex-start" {...props} w='100%' m='8px'>
      <Link as={NextLink} href={to}>
        <a>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between" 
            flexWrap="wrap"
            textAlign="center"
            as="header"
            background="blackAlpha.600"
            color="whiteAlpha.800"
            p="12px"
            overflow="hidden"
            borderBottomRadius="8px"
            transition="all 0.2s cubic-bezier(.41,0,.07,1.16)"
            _hover={{
              cursor: 'pointer',
              boxShadow:
                '0 2px 2px -1px rgba(0,0,0,0.35),0 1px 20px 1px rgba(0,0,0,0.35)',
              backgroundColor: 'blackAlpha.900',
              color: 'whiteAlpha.900',
              borderTopRadius: '8px',
              transform: 'translateY(4px) translateX(4px)',
              textDecoration: 'underline',
            }}
            boxShadow="0 2px 2px -1px rgba(0,0,0,0.25),0 1px 10px -2px rgba(0,0,0,0.25)"
          >
            <Heading
              fontWeight={700}
              fontSize={['1.25vh', '1.25vh', '1.5vh', '1.5vh', '1.5vh']}
              pr={['0ch', '0ch', '1ch', '1ch', '1ch']}
              textAlign="end"
              alignSelf="flex-end"
            >
              {title}
            </Heading>

            <Text fontSize={['1.25vh', '1.25vh', '1.5vh', '1.5vh', '1.5vh']} px="1ch">
              {/* @ts-ignore: Unreachable code error */}
              {new Intl.DateTimeFormat(locale, options).format(new Date(date))}
            </Text>
            <Text
              fontSize={['1.25vh', '1.25vh', '1.5vh', '1.5vh', '1.5vh']}
              pl={['0ch', '0ch', '1ch', '1ch', '1ch']}
            >
              {credits}
            </Text>
          </Flex>
        </a>
      </Link>
    </Flex>
  );
};

export default ImageHeading;
