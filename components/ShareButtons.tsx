import React from 'react';
import { Box, Flex, FlexProps } from '@chakra-ui/layout';
import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'next-share';

interface ShareButtonsProps {
  url: string;
  description: string;
}

const ShareButtons: React.FC<ShareButtonsProps & FlexProps> = ({
  url,
  description,
  ...props
}) => {
  return (
    <Flex
      direction="row"
      alignSelf={['center', 'center', 'flex-end', 'flex-end', 'flex-end']}
      {...props}
    >
      <Box
        color="whiteAlpha.500"
        fontSize={['sm', '2xl', 'xl', 'xl', 'xl']}
        fontWeight="normal"
      >
        Share:{' '}
      </Box>
      <Box
        px="8px"
        _hover={{
          cursor: 'pointer',
          transform: 'scale(1.1, 1.1)',
          textDecoration: 'underline',
        }}
      >
        <FacebookShareButton
          url={url}
          quote={description}
          hashtag={'#nextshare'}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </Box>
      <Box
        px="8px"
        _hover={{
          cursor: 'pointer',
          transform: 'scale(1.1, 1.1)',
          textDecoration: 'underline',
        }}
      >
        <RedditShareButton
          url={url}
          title={description}
          windowWidth={660}
          windowHeight={460}
        >
          <RedditIcon size={32} round />
        </RedditShareButton>
      </Box>
      <Box
        pr="16px"
        pl="8px"
        _hover={{
          cursor: 'pointer',
          transform: 'scale(1.1, 1.1)',
          textDecoration: 'underline',
        }}
      >
        <TwitterShareButton url={url} title={description}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </Box>
    </Flex>
  );
};

export default ShareButtons;
