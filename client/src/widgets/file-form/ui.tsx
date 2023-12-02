'use client';
import { memo, useState } from 'react';
import { Flex, Img, Spinner, Button } from '@chakra-ui/react';
import { Dropzone } from '@/features/dropzone';
import { encodeImageToBase64 } from './utils';
import { Api } from '@/shared/api';
//@ts-ignore
import { triggerBase64Download } from 'react-base64-downloader';

interface Props {
  error: string | null;
  setError: (error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setImage: (image: string) => void;
  image: string;
}

export const FileForm = memo(({ error, isLoading, setError, setIsLoading, image, setImage }: Props) => {
  const [file, setFile] = useState<File | null>();
  const [encodedImage, setEncodedImage] = useState('');

  const onDropDown = async (file: File) => {
    setFile(file);
    const encodeBase64 = await encodeImageToBase64(file);
    setEncodedImage(encodeBase64);
  };

  const upgradeResolution = () => {
    console.log(encodedImage, file, image);
    setIsLoading(true);
    Api.post('/api/v1/super_resolution', { image: encodedImage || image, resolution: 16 }).then(res => {
      triggerBase64Download(res.data, 'image');
      setEncodedImage(res.data);
    });
  };

  const reset = () => {
    setImage('');
    setFile(null);
  };

  return (
    <Flex
      flexDir={'column'}
      gap={'15px'}
      width={'610px'}
      height={'454px'}
      borderRadius={'20px'}
      border={'2px solid #454545'}
      alignItems={'center'}
      justifyContent={file || image ? undefined : 'center'}
      padding={'15px'}
      background={'bg.primary'}
      pos={'relative'}
    >
      {isLoading ? (
        <Spinner thickness="4px" speed="1.4s" emptyColor="rgba(107, 123, 72, 0.77)" color="rgba(211, 253, 122, 1)" size="xl" />
      ) : image || encodedImage ? (
        <>
          <Img
            mt={'30px'}
            pos={'absolute'}
            width={'269'}
            height={'269'}
            alt="123"
            src={`data:image/jpeg;base64, ${image || encodedImage}`}
          ></Img>
          <Flex pos={'absolute'} bottom="20px" gap={'10px'}>
            <Button onClick={upgradeResolution} w={'276px'} borderRadius={'20px'} h={'65px'} variant={'primary'} isDisabled={isLoading}>
              Улучшить качество и скачать
            </Button>
            <Button onClick={reset} w={'276px'} borderRadius={'20px'} h={'65px'} variant={'primary'} background={'#D1D1D1'}>
              Сбросить
            </Button>
          </Flex>
        </>
      ) : (
        <Dropzone onDropDown={onDropDown} />
      )}
    </Flex>
  );
});
