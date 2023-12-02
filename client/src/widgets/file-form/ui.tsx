'use client';
import { ChangeEvent, memo, useState } from 'react';
import { Flex, Button, Input } from '@chakra-ui/react';
import { Dropzone } from '@/features/dropzone';

interface Props {}

export const FileForm = memo(({}: Props) => {
  const [file, setFile] = useState<File | null>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      console.error('Файл не выбран');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://example.com/mudata/123', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Ответ сервера:', result);
      } else {
        console.error('Произошла ошибка при загрузке файла');
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  console.log(file);

  return (
    <Flex
      flexDir={'column'}
      gap={'15px'}
      width={'610px'}
      height={'454px'}
      borderRadius={'20px'}
      border={'2px solid #454545'}
      alignItems={'center'}
      justifyContent={'center'}
      padding={'15px'}
      background={`url(rectangles.png), lightgray 50% / cover no-repeat`}
    >
      <Dropzone />
      <Button disabled={!!file} onClick={handleFileUpload}>
        Отправить
      </Button>
    </Flex>
  );
});
