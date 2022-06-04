import { Flex, Heading, Box, SimpleGrid } from "@chakra-ui/layout"
import { FlexboxProps } from "@chakra-ui/styled-system"

import React from "react"
interface FixWContentGridProps {
  children: React.ReactNode
  heading: string
  footer: React.ReactNode
  locale?: string
  asPath: string
  props?: FlexboxProps
}

const FixWContentGrid: React.FC<FixWContentGridProps> = ({
  heading,
  footer,
  locale,
  asPath,
  children,
  ...props
}) => {

  return (
    <Flex
      direction="column"
      h={[
        "calc(85vh - 48px)",
        "calc(85vh - 48px)",
        "calc(100vh - 48px)",
        "calc(100vh - 48px)",
        "calc(100vh - 48px)"
      ]}
      w={[
        "calc(100vw - 48px)",
        "calc(100vw - 48px)",
        "calc(75vw - 48px)",
        "calc(85vw - 48px)",
        "calc(85vw - 48px)"
      ]}
      alignItems="center"
      px="48px"
      borderRadius="4px"
      {...props}
    >
      <Flex
        // h={[
        //   'calc(0.15 * (85vh - 24px))',
        //   'calc(0.2 * (85vh - 24px))',
        //   'calc(0.2 * (100vh - 24px))',
        //   'calc(0.2 * (100vh - 24px))',
        //   'calc(0.2 * (100vh - 24px))',
        // ]}
        w={[
          "calc(100vw - 48px)",
          "calc(100vw - 48px)",
          "calc(75vw - 48px)",
          "calc(85vw - 48px)",
          "calc(85vw - 48px)"
        ]}
        direction="column"
        alignItems="center"
        justifyContent="center"
        bgColor="neutral.raisin_black.dark"
        py="24px"
      >
        <Heading
          textAlign="center"
          fontSize={["2xl", "4xl", "4xl", "4xl", "4xl"]}
          color="whiteAlpha.700"
        >
          {heading}
        </Heading>
      </Flex>
      <Box
        h="400vh"
        // overflowY="auto"
        w={[
          "calc(100vw - 48px)",
          "calc(100vw - 48px)",
          "calc(75vw - 48px)",
          "calc(85vw - 48px)",
          "calc(85vw - 48px)"
        ]}
        overflowX="hidden"
        bgColor="neutral.raisin_black.dark"
      >
          <Flex
            w={[
              "calc(100vw - 64px)",
              "calc(100vw - 64px)",
              "calc(75vw - 64px)",
              "calc(85vw - 64px)",
              "calc(85vw - 64px)"
            ]}
            overflowY="auto"
            overflowX="hidden"
            flexFlow="row wrap"
            justifyItems="center"
            alignItems="center"
            justifyContent="center"
            ml="12px"
            // mx="48px"
            px={["24px", "64px", "80px", "88px", "96px"]}
            pt={["12px", "12px", "24px", "48px", "48px"]}
            pb={["72px", "96px", "48px", "48px", "48px"]}
          >
            {children}
          </Flex>
      </Box>
      <Flex
        w={[
          "calc(100vw - 48px)",
          "calc(100vw - 48px)",
          "calc(75vw - 48px)",
          "calc(85vw - 48px)",
          "calc(85vw - 48px)"
        ]}
        alignItems="center"
        justifyContent="center"
        bgColor="neutral.raisin_black.dark"
        py="24px"
        px="12px"
      >
        {footer}
      </Flex>
    </Flex>
  )
}

export default FixWContentGrid
