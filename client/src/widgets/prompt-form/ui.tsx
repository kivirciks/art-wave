'use client';

import { memo } from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';

export const PromptForm = memo(() => {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [style, setStyle] = useState('');

  const onChangePropmpt = (val: string) => {
    setPrompt(val);
  };

  const onChangeNegPropmpt = (val: string) => {
    setNegativePrompt(val);
  };

  const onChangeStyle = (val: string) => {
    setStyle(val);
  };
  return (
    <Flex borderRadius={'20px'} border={'1px solid #454545'} p={'20px'} background={'bg.primary'} flexDir={'column'} gap={'40px'}>
      <Flex flexDir={'column'} gap={'12px'}>
        <Input label="Введите промпт" example="Красивая девушка в городе" value={prompt} onChange={onChangePropmpt} />
        <Input label="Введите негативный промпт" example="Чайки" value={negativePrompt} onChange={onChangeNegPropmpt} />
        <Input label="Выберите стиль" example="Аниме" value={style} onChange={onChangeStyle} />
      </Flex>
      <Button h={'65px'} variant={'primary'} _hover={{ opacity: '0.9' }} borderRadius={'20px'}>
        Сгенерировать
      </Button>
    </Flex>
  );
});
