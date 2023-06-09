import React, { useRef } from "react"
import { Box, Flex } from "@chakra-ui/layout"
import Menu from "../menu/Menu"

import Logo from "../Logo"
import { useScreenType } from "../../hooks/useScreenType"
import MenuMobile from "../menu/MenuMobile"
import { useDisclosure, useUpdateEffect } from "@chakra-ui/hooks"
import NavigationMobile from "../menu/NavigationMobile"
import SearchModal from "../search/SearchModal"
import Link from "next/link"
import {
  CategoriesResponse,
  WritersResponse
} from "../../custom_typings/models"

interface LayoutProps {
  children: React.ReactNode
  categories: CategoriesResponse[]
  slug?: string
  isOnSearchPage: boolean
  locale?: string
  pathname: string
  writers: WritersResponse[]
}

const Layout: React.FC<LayoutProps> = ({
  children,
  categories,
  slug = "",
  isOnSearchPage = false,
  locale,
  pathname,
  writers = []
}) => {
  const screenType = useScreenType()
  const mobileNav = useDisclosure()
  const mobileNavBtnRef = useRef<HTMLButtonElement>(null)
  const searchDisclosure = useDisclosure()

  let menu = null
  let fixLogo = null

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus()
  }, [mobileNav.isOpen])

  let layH
  let layW
  switch (screenType) {
    case "isDesktop":
    case "isTablet":
    case "isSmallTablet":
      menu = (
        <Menu
          onSearchModalToggle={searchDisclosure.onToggle}
          locale={locale}
          shallow={pathname === "/"}
          slug={slug}
          categories={categories}
          isOnSearchPage={isOnSearchPage}
        />
      )
      fixLogo = (
        (<Link href="/" locale={locale}>

          <Logo
            size={12}
            fontFamily="logo"
            color="semantic.red.medium"
            backgroundColor="neutral.raisin_black.medium"
            _hover={{
              cursor: "pointer"
            }}
          />

        </Link>)
      )
      // layH = 'auto'
      // layW = "calc(15vw)"
      break
    case "isMobile":
      menu = (
        <MenuMobile
          size={3}
          locale={locale}
          shallow={pathname === "/"}
          ref={mobileNavBtnRef}
          isOpen={mobileNav.isOpen}
          onToggle={mobileNav.onToggle}
          onSearchModalToggle={searchDisclosure.onToggle}
          isOnSearchPage={isOnSearchPage}
        />
      )
      fixLogo = <></>
      // layH = "calc(15vh)"
      // layW = "calc(100vw - 48px)"
  }

  return (
    <>
      <SearchModal
        isOpen={searchDisclosure.isOpen}
        onClose={searchDisclosure.onClose}
        locale={locale}
        isMobile={screenType === "isMobile"}
        writers={writers}
      />
      <Flex
        direction={[
          "column-reverse",
          "row-reverse",
          "row-reverse",
          "row-reverse",
          "row-reverse"
        ]}
        p="24px"
        backgroundColor="neutral.raisin_black.medium"
        overflowX="hidden"
        overflowY="auto"
      >
        <Flex
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
          backgroundColor="neutral.raisin_black.medium"
          position="relative"
          justify="center"
        >
          <NavigationMobile
            slug={slug}
            categories={categories}
            isOpen={mobileNav.isOpen}
            onClose={mobileNav.onClose}
            onToggle={mobileNav.onToggle}
            ref={mobileNavBtnRef}
          />
          {children}
        </Flex>
        <Flex
          as="section"
          h={[
            "calc(15vh)",
            "calc(100vh - 48px)",
            "calc(100vh - 48px)",
            "calc(100vh - 48px)",
            "calc(100vh - 48px)"
          ]}
          w={[
            "calc(100vw - 48px)",
            "calc(15vw)",
            "calc(15vw)",
            "calc(15vw)",
            "calc(15vw)"
          ]}
          // h = {layH}
          // w = {layW}
          
          direction={["row", "column", "column", "column", "column"]}
          justify={[
            "space-between",
            "space-between",
            "space-between",
            "space-between",
            "space-between"
          ]}
          px={["0px", "24px", "24px", "24px", "24px"]}
          backgroundColor="neutral.raisin_black.medium"
        >
          {menu}
        </Flex>
      </Flex>
      <Box
        position="absolute"
        zIndex="docked"
        top={[
          "0vh",
          "calc(50vh - 6vh)",
          "calc(50vh - 6vh)",
          "calc(50vh - 6vh)",
          "calc(50vh - 6vh)"
        ]}
        left={[
          "0vh",
          "calc(15vw + 24px - 6vh)",
          "calc(15vw + 24px - 6vh)",
          "calc(15vw + 24px - 6vh)",
          "calc(15vw + 24px - 6vh)"
        ]}
      >
        {fixLogo}
      </Box>
    </>
  )
}

export default Layout
