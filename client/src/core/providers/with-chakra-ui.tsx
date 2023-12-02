'use client';

import { ChakraProvider, StyleFunctionProps, ThemeConfig, extendTheme } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { buttonTheme } from '@/shared/chakra-themes/button';
import { containerTheme } from '@/shared/chakra-themes/container';
import { inputTheme } from '@/shared/chakra-themes/input';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const breakpoints = {
  sm: '1em', // 360
  md: '48em', // 768
  lg: '68.2em', // 1024
  xl: '100em', // 1600
};

const colors = {
  primary: {
    green: '#D3FD7A;',
  },
  typography: {
    'typography.light': '#888',
    dark: '#0F0D18',
  },
  bg: {
    main: '#242424;',
    primary: '#2D2D2D',
  },
};

const styles = {
  global: ({ props }: StyleFunctionProps) => ({
    body: {
      bg: '#242424;',
    },
  }),
};

const theme = extendTheme({
  colors,
  styles,
  config,
  breakpoints,
  components: {
    Button: buttonTheme,
    Container: containerTheme,
    Input: inputTheme,
  },
});

export const WithChakraUI = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  );
};
