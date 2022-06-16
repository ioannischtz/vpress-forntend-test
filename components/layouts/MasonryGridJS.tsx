import { Flex, Heading, Box } from "@chakra-ui/layout"
import { FlexboxProps } from "@chakra-ui/styled-system"
import { Masonry, RenderComponentProps } from "masonic"

import * as React from "react"


interface MasonryGridJSProps {
  heading: string
  footer: React.ReactNode
  items: Array<any>
  card: React.ComponentType<RenderComponentProps<any>>
  locale?: string
  asPath: string
  nCols: number
  // children: React.ReactNode
  props?: FlexboxProps
}

const MasonryGridJS: React.FC<MasonryGridJSProps> = ({
  heading,
  footer,
  items,
  card,
  locale,
  asPath,
  nCols,
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
        id="columns"
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
        <Box ml="24px"
          py="12px"
          px="48px">

        <Masonry
          items={items}
          columnCount={nCols}
          columnGutter={18}
          overscanBy={5}
          render={card}
        />
        </Box>
          {/* {children} */}
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

export default MasonryGridJS
