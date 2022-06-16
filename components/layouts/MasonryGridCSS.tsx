import { Flex, Heading, Box } from "@chakra-ui/layout"
import { FlexboxProps } from "@chakra-ui/styled-system"
import React from "react"
// import { useScreenType } from "../../hooks/useScreenType"

interface MasonryGridProps {
  heading: string
  footer: React.ReactNode
  locale?: string
  asPath: string
  nCols: number
  children: React.ReactNode
  props?: FlexboxProps
}

const MasonryGridCSS: React.FC<MasonryGridProps> = ({
  heading,
  footer,
  locale,
  asPath,
  nCols,
  children,
  ...props
}) => {
  return (
    <Flex
      direction="column"
      h={[
        "calc(85vh - 48px)",
        "calc(100vh - 48px)",
        "calc(100vh - 48px)",
        "calc(100vh - 48px)",
        "calc(100vh - 48px)"
      ]}
      w={[
        "calc(100vw - 48px)",
        "calc(85vw - 48px)",
        "calc(85vw - 48px)",
        "calc(85vw - 48px)",
        "calc(85vw - 48px)"
      ]}
      alignItems="center"
      px="48px"
      borderRadius="4px"
      {...props}
    >
      <Flex
        w={[
          "calc(100vw - 48px)",
          "calc(85vw - 48px)",
          "calc(85vw - 48px)",
          "calc(85vw - 48px)",
          "calc(85vw - 48px)"
        ]}
        direction="column"
        alignItems="center"
        justifyContent="center"
        bgColor="neutral.raisin_black.dark"
        px="4px"
        py="24px"
      >
        <Heading
          textAlign="center"
          fontSize={["2xl", "2xl", "2xl", "2xl", "2xl"]}
          color="whiteAlpha.700"
        >
          {heading}
        </Heading>
      </Flex>
      <Box
        h="400vh"
        w={[
          "calc(100vw - 48px)",
          "calc(85vw - 48px)",
          "calc(85vw - 48px)",
          "calc(85vw - 48px)",
          "calc(85vw - 48px)"
        ]}
        overflowX="hidden"
        bgColor="neutral.raisin_black.dark"
      >
        <Box
          w="100%"
          overflowY="auto"
          overflowX="hidden"
          
          ml="24px"
          py="12px"
          px="48px"
          sx={{columnCount: nCols, columnGap: '18px'}}
        >
          {children}
        </Box>
      </Box>
      <Flex
        w={[
          "calc(100vw - 48px)",
          "calc(85vw - 48px)",
          "calc(85vw - 48px)",
          "calc(85vw - 48px)",
          "calc(85vw - 48px)"
        ]}
        alignItems="center"
        justifyContent="center"
        bgColor="neutral.raisin_black.dark"
        py="18px"
        px="12px"
      >
        {footer}
      </Flex>
    </Flex>
  )
}

export default MasonryGridCSS
