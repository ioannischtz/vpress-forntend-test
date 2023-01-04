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
      alignSelf='center'
      {...props}
    >
      <Box
        color="whiteAlpha.500"
        fontSize={["sm", "md", "sm", "md", "md"]}
        fontWeight="normal"
      >
        Share:{' '}
      </Box>
      <Box
        px="6px"
        _hover={{
          cursor: 'pointer',
          transform: 'scale(1.1, 1.1)',
          textDecoration: 'underline',
        }}
      >
        <FacebookShareButton
          url={url}
          quote={description}
          hashtag={''}
        >
          <FacebookIcon size={24} round />
        </FacebookShareButton>
      </Box>
      <Box
        px="6px"
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
          <RedditIcon size={24} round />
        </RedditShareButton>
      </Box>
      <Box
        pr="16px"
        pl="6px"
        _hover={{
          cursor: 'pointer',
          transform: 'scale(1.1, 1.1)',
          textDecoration: 'underline',
        }}
      >
        <TwitterShareButton url={url} title={description}>
          <TwitterIcon size={24} round />
        </TwitterShareButton>
      </Box>
    </Flex>
  );
};

export default ShareButtons;
