import { ChangeEvent, memo, useCallback } from 'react';
import { Flex, Text, Input as ChakraInput } from '@chakra-ui/react';

interface Props {
  label?: string;
  example?: string;
  value: string;
  onChange: (val: string) => void;
}

export const Input = memo(({ example, label, onChange, value }: Props) => {
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }, []);

  return (
    <Flex flexDir={'column'} gap={'5px'}>
      {label ? (
        <Text fontSize={'18px'} fontWeight={'400'} lineHeight={'normal'} color={'typography.light'}>
          {label}...
        </Text>
      ) : null}
      <ChakraInput
        borderRadius={'20px'}
        fontSize={'18px'}
        color={'black'}
        h={'65px'}
        width={'506px'}
        background={'#D1D1D1'}
        padding={'20px 47px'}
        placeholder={example ? `${example}...` : ''}
        _placeholder={{ color: '#888' }}
        value={value}
        onChange={handleChange}
      />
    </Flex>
  );
});
