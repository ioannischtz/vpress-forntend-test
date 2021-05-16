import { Box, Text, Flex, Heading, Circle } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/button';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/modal';
import React from 'react';
import Image from 'next/image';

import { BiX } from 'react-icons/bi';
import { Writer } from '../../custom_typings/models';
import { useRouter } from 'next/router';

interface BioDrawerProps {
  writer: Writer;
  imageUrl: string;
  isOpen: boolean;
  size:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | 'full';
  onClose: () => void;
  onToggle: () => void;
}
export type Ref = HTMLButtonElement;

const BioDrawer = React.forwardRef<Ref, BioDrawerProps>(
  ({ writer, imageUrl, isOpen, size, onClose, onToggle }, ref) => {
    const { locale } = useRouter();
    return (
      <Drawer
        onClose={onClose}
        isOpen={isOpen}
        size={size}
        // placement="bottom"
        isCentered={true}
      >
        <DrawerOverlay>
          <DrawerContent bgColor="neutral.raisin_black.medium">
            <DrawerHeader>
              <Flex px="24px" py="32px">
                <Circle
                  size="20vh"
                  bg="neutral.pacific_blue.dark"
                  overflow="clip"
                >
                  <Box h="25vh" w="100%" position="relative">
                    <Image
                      src={imageUrl}
                      alt={'Picture of team member ' + writer.name}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </Box>
                </Circle>
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <Flex
                px="24px"
                h="calc(100% - 24px)"
                w="100%"
                direction="column"
                align="start"
                justify="space-around"
                hidden={false}
              >
                <Flex w="100%" direction="column">
                  <Box>
                    <Heading fontSize="4vh" color="whiteAlpha.800">
                      {writer.name}
                    </Heading>
                  </Box>
                  <Box>
                    <Heading color="whiteAlpha.600" fontSize="2vh">
                      {writer.Role}
                    </Heading>
                  </Box>
                </Flex>
                <Box>
                  <Text color="whiteAlpha.800">{writer.ShortBio}</Text>
                </Box>
                <Box>
                  <Text color="whiteAlpha.600">
                    {locale === 'en' ? '@ Contact Info: ' : 'Επικοινωνία: '}{' '}
                    {writer.email}
                  </Text>
                </Box>

                <Flex direction="column" alignSelf="center">
                  <Box
                    color="whiteAlpha.700"
                    alignSelf="center"
                    justifySelf="baseline"
                  >
                    <IconButton
                      ref={ref}
                      aria-label="Close Bio"
                      variant="unstyled"
                      size={(2 * 3).toString() + 'vh'}
                      _hover={{ color: 'gray.300' }}
                      _focus={{ outline: 'none', color: 'gray.300' }}
                      icon={<BiX size={(2 * 3).toString() + 'vh'} />}
                      onClick={onToggle}
                    />
                  </Box>
                </Flex>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }
);

export default BioDrawer;
