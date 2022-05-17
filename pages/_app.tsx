import "@fontsource/ibm-plex-sans/300.css"
import "@fontsource/ibm-plex-sans/600.css"
import "@fontsource/ibm-plex-sans/700.css"
import "@fontsource/libre-baskerville/400.css"
import "@fontsource/libre-baskerville/700.css"
import "@fontsource/ibm-plex-mono/300.css"
import "@fontsource/cormorant-garamond/700.css"
import "../styles/globalStyles.css"
import "nprogress/nprogress.css"
import "flatpickr/dist/themes/dark.css"

import { ChakraProvider } from "@chakra-ui/react"
import { createContext, useEffect } from "react"
import Head from "next/head"
import NProgress from "nprogress"
import theme from "../styles/theme"

import global_GR from "../data/global-manifest_GR.json"
import global_EN from "../data/global-manifest_EN.json"

import { I18nContextProvider } from "../contexts/I18nContext"
import { Router, useRouter } from "next/router"
import redirectLocale from "../lib/redirectLocale"
import React from "react"
import { useCookies } from "react-cookie"
import { DefaultSeo } from "next-seo"

Router.events.on("routeChangeStart", (url) => {
  // console.log(`Loading: ${url}`);
  NProgress.start()
})
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

// Store Strapi Global object in context
export const GlobalContext = createContext({})

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [cookie, setCookie] = useCookies(["NEXT_LOCALE"])
  const isGR = router.locale === router.defaultLocale

  let global
  isGR ? (global = global_GR) : (global = global_EN)
  const altLang = isGR ? "en" : "el-GR"
  const altLocale = isGR ? "x-default" : "el-gr"

  const SEO = {
    title: global.siteName,
    description: global.defaultSeo.metaDescription,
    // canonical: `/${router.locale}` + router.asPath,
    openGraph: {
      // url: `/${router.locale}` + router.asPath,
      url: `${process.env.NEXT_PUBLIC_HOST_URL}/${router.locale}${router.asPath}`,
      locale: router.locale,
      title: global.defaultSeo.metaTitle,
      description: global.defaultSeo.metaDescription,
      image: {
        url: global.defaultSeo.shareImage,
        width: global.defaultSeo.shareImage.width,
        height: global.defaultSeo.shareImage.height,
        alt: global.defaultSeo.shareImage.alternativeText
      },
      site_name: global.siteName
    },
    robotsProps: {
      notranslate: true
    },
    languageAlternates: [
      {
        hrefLang: altLocale,
        // href: `/${altLang}` + router.asPath,
        href: `${process.env.NEXT_PUBLIC_HOST_URL}/${altLang}${router.asPath}`
        // href: `/${altLang}${router.asPath}`,
      }
    ]
  }

  useEffect(() => {
    if (cookie.NEXT_LOCALE === "el-GR") {
      redirectLocale("el-GR", "")
    } else if (cookie.NEXT_LOCALE === "en") {
      redirectLocale("en", "")
    } else {
      setCookie("NEXT_LOCALE", router.locale, { path: "/" })
    }
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Head>
        {/* You can override this in other pages - see page-2.tsx for an example */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
          key="viewport"
        />
        {/* <link rel="shortcut icon" href={getStrapiMedia(global.favicon)} /> */}

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <DefaultSeo {...SEO} />
      <I18nContextProvider>
        <GlobalContext.Provider value={global}>
          <Component {...pageProps} />
        </GlobalContext.Provider>
      </I18nContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
