import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const shadow = 'box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25) inset, 4px 5px 6px 0px rgba(0, 0, 0, 0.10)';

const baseStyle = defineStyle({
  _hover: { boxShadow: shadow },
  _active: { boxShadow: shadow },
});

export const inputTheme = defineStyleConfig({
  baseStyle,
});
