import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const primary = defineStyle({
  background: 'primary.green',
  color: 'black',
  fontWeight: '700',
});

export const buttonTheme = defineStyleConfig({
  variants: { primary },
});
