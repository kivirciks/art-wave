import { defineStyleConfig } from '@chakra-ui/react';

const baseStyle = {
  maxWidth: {
    xl: '120em',
    md: '1286px',
    base: '100%',
  },
  pl: {
    xl: '105px',
    md: '50px',
    base: '20px',
  },
  pr: {
    xl: '105px',
    md: '50px',
    base: '20px',
  },
};

export const containerTheme = defineStyleConfig({ baseStyle });
