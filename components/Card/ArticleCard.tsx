import React from "react";
import {
  Box,
  BoxProps,
  Heading,
  Text,
  Flex,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import NextLink from "next/link";
import { getStrapiMedia } from "../../lib/media";
import Image from "next/legacy/image";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";
import { Article, ArticlesResponse } from "../../custom_typings/models";
import { useRouter } from "next/router";

interface ArticleCardProps {
  article: Article | ArticlesResponse;
  writer_name: string | null | undefined;
  isPortrait?: boolean;
  preload?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps & BoxProps> = ({
  article,
  writer_name,
  isPortrait = "true",
  preload = false,
  ...props
}) => {
  let renderDesktop = true;

  const imageUrl = getStrapiMedia(article.cover_image);

  const { locale } = useRouter();

  const options = { month: "long", day: "numeric", year: "numeric" };
  return (
    <Card
      sx={{
        breakInside: "avoid",
        pageBreakInside: "avoid",
        overflow: "hidden",
      }}
      {...props}
    >
      <LinkBox _hover={{ cursor: "pointer" }}>
        <NextLink href={"/article/" + article.slug} legacyBehavior>
          <LinkOverlay>
            <CardHeader
              direction="column"
              alignItems="center"
              justifyContent="center"
              borderTopRadius="6px"
              borderColor="whiteAlpha.400"
              overflow="clip"
              p="16px"
            >
              <Box
                w="100%"
                textAlign="center"
                position="relative"
                borderRadius="4px"
                className="myContent"
              >
                <div className="myContent-overlay"></div>
                <Image
                  src={imageUrl}
                  alt={article.description}
                  layout="intrinsic"
                  height={article.cover_image.height}
                  width={article.cover_image.width}
                  objectFit="contain"
                  objectPosition="center"
                  quality={article.cover_image.width < 200 ? 90 : 40}
                  priority={preload}
                />
                <div className="myContent-details myFadeIn-bottom">
                  <h3 className="myContent-title">
                    {(locale === "en" ? "Pics: " : "Εικόνες: ") +
                      article.nOfPics}
                  </h3>
                  <p className="myContent-text">{article.description}</p>
                </div>
              </Box>
            </CardHeader>

            <CardBody
              direction="column"
              justifyContent={[
                "space-between",
                "space-around",
                "space-between",
                "space-between",
                "space-between",
              ]}
              px="16px"
              py={["8px", "8px", "0px", "4px", "4px"]}
            >
              <Box textAlign="start">
                <Heading
                  as="h3"
                  color="whiteAlpha.800"
                  fontFamily="heading"
                  fontWeight="400"
                  fontSize="16px"
                >
                  {locale === "en"
                    ? article.title.includes("/")
                      ? article.title.split("/")[1]
                      : article.title
                    : article.title.includes("/")
                    ? article.title.split("/")[0]
                    : article.title}
                </Heading>
              </Box>
            </CardBody>

            <CardFooter
              justifyContent="flex-end"
              alignItems="flex-start"
              direction="column"
              color="whiteAlpha.800"
              fontSize={["xs", "sm", "xs", "sm", "sm"]}
              p="16px"
            >
              {renderDesktop && (
                <>
                  <Flex direction="row">
                    <Box>
                      <Heading
                        as="h4"
                        fontWeight="bold"
                        fontSize={["xs", "sm", "xs", "sm", "sm"]}
                        pr="2.75ch"
                      >
                        {locale === "en" ? "Date: " : "Ημ/νία"}
                      </Heading>
                    </Box>
                    <Box>
                      <Text>
                        {/* @ts-ignore */}
                        {new Intl.DateTimeFormat(locale, { options }).format(
                          new Date(
                            article.date ? article.date : article.published_at
                          )
                        )}
                      </Text>
                    </Box>
                  </Flex>

                  <Flex direction="row">
                    <Box>
                      <Heading
                        as="h4"
                        fontWeight="bold"
                        fontSize={["xs", "sm", "xs", "sm", "sm"]}
                        pr="1ch"
                      >
                        Credits:{" "}
                      </Heading>
                    </Box>
                    <Box>
                      <Text>{writer_name ? writer_name : ""}</Text>
                    </Box>
                  </Flex>
                </>
              )}
            </CardFooter>
          </LinkOverlay>
        </NextLink>
      </LinkBox>
    </Card>
  );
};

export default ArticleCard;
