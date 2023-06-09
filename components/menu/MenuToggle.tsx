import React from "react";
import { Box, BoxProps } from "@chakra-ui/layout";
import { IconButton, IconButtonProps } from "@chakra-ui/button";
import { BiMenu, BiMenuAltLeft } from "react-icons/bi";

interface MenuToggleProps extends IconButtonProps {
  mysize: number;
  isOpen?: boolean;
}

export type Ref = HTMLButtonElement;

const MenuToggle = React.forwardRef<Ref, MenuToggleProps & BoxProps>(
  ({ mysize, isOpen, ...props }, ref) => {
    return (
      <Box {...props}>
        <IconButton
          ref={ref}
          aria-label="Open menu"
          variant="unstyled"
          size={(2 * mysize).toString() + "vh"}
          _hover={{ color: "gray.300" }}
          _focusVisible={{ outline: "none", color: "gray.300" }}
          icon={
            isOpen ? (
              <BiMenuAltLeft size={(2 * mysize).toString() + "vh"} />
            ) : (
              <BiMenu size={(2 * mysize).toString() + "vh"} />
            )
          }
          onClick={props.onClick}
        />
      </Box>
    );
  }
);

export default MenuToggle;
