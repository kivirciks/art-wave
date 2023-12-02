import { ReactNode } from 'react';
import { WithChakraUI } from './with-chakra-ui';

interface Props {
  children: ReactNode;
}

export const AppProvider = ({ children }: Props) => {
  return <WithChakraUI>{children}</WithChakraUI>;
};
