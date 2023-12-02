import { memo } from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';

interface Props {
  isError: boolean;
  message: string;
}

export const ErrorAlert = memo(({ isError, message }: Props) =>
  isError ? (
    <Alert status="error">
      <AlertIcon />
      {message}
    </Alert>
  ) : null
);
