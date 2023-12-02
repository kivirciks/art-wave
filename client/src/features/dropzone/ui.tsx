import { memo, useCallback } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { Api } from '@/shared/api';

interface Props {}

export const Dropzone = memo(({}: Props) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
    Api.post('', acceptedFiles[0]).catch(console.log);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({ onDrop });

  return (
    <Flex {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <Text>Drop the files here ...</Text> : <Text>Drag 'n' drop some files here, or click to select files</Text>}
    </Flex>
  );
});
