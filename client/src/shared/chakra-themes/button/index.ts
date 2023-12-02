import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const primary = defineStyle({
  background: 'primary.green',
  color: 'black',
  fontWeight: '700',
  _hover: { opacity: '0.8' },
  transition: '0.2s',
  _disabled: {
    cursor: 'not-allowed',
    background: '#A4A4A4',
    color: '#737373',
    opacity: 1,
  },
});

export const buttonTheme = defineStyleConfig({
  variants: { primary },
});
