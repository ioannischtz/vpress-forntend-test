import React from "react";
import NextLink from "next/link";
import { Flex, Link, Text } from "@chakra-ui/layout";

const NavLink = ({
  children,
  isLast,
  hoverC,
  icon,
  to = "/",
  asPath,
  ...rest
}) => {
  const isActive = asPath === to;
  const activeColorUnderline = isActive ? hoverC : "transparent";
  const activeColor = isActive ? hoverC : "whiteAlpha.800";

  return (
    <Link as={NextLink} href={to}>
      <Flex
        {...rest}
        color={activeColor}
        direction="row"
        align="center"
        textDecoration="underline"
        sx={{ textDecorationColor: activeColorUnderline }}
        fontWeight={isActive ? "medium" : "normal"}
        transition="color 0.15s, font-weight 0.15s, text-decoration-color 0.5s cubic-bezier(.41,0,.07,1.16)"
        _hover={{
          fontWeight: "medium",
          cursor: "pointer",
          color: hoverC,
          textDecorationColor: "currentcolor",
          transform: "translateX(2px)",
        }}
      >
        <Text display="block" mr="8px">
          {children}
        </Text>
        {icon}
      </Flex>
    </Link>
  );
};

export default NavLink;
