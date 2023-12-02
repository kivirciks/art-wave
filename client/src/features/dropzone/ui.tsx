import { memo, useCallback } from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

interface Props {
  onDropDown: (file: File) => void;
}

export const Dropzone = memo(({ onDropDown }: Props) => {
  const onDrop = useCallback((acceptedFile: any) => {
    onDropDown(acceptedFile[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Flex {...getRootProps()}>
      <input {...getInputProps()} />
      <Button
        background={'primary.green'}
        color={'black'}
        fontWeight={'700'}
        fontSize={'18px'}
        width={'276px'}
        height={'65px'}
        cursor={'pointer'}
        p={'20px 36px'}
        borderRadius={'20px'}
        variant={'primary'}
      >
        Вставить изображение
      </Button>
    </Flex>
  );
});
