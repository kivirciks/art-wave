import { memo, useEffect } from 'react';
import { Flex, Button, Select } from '@chakra-ui/react';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';
import { Api } from '@/shared/api';
import { ErrorAlert } from '@/shared/ui/error-alert';
import { Style } from '@/core/types';

interface Props {
  error: string | null;
  setError: (error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setImage: (image: string) => void;
}

export const PromptForm = memo(({ error, isLoading, setError, setIsLoading, setImage }: Props) => {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [styles, setStyles] = useState<Style[]>([]);
  const [selectedStyle, setSelectedStyle] = useState('');

  useEffect(() => {
    Api.get('/api/v1/styles').then(res => setStyles(res.data));
  }, []);

  const onChangePropmpt = (val: string) => {
    setPrompt(val);
  };

  const onChangeNegPropmpt = (val: string) => {
    setNegativePrompt(val);
  };

  const generateImage = () => {
    setError(null);
    setIsLoading(true);
    Api.post('/api/v1/generate', {
      modelId: 4,
      params: {
        numImages: 1,
        generateParams: {
          query: prompt,
        },
        width: 1024,
        height: 1024,
        negativePromptUnclip: negativePrompt,
        style: selectedStyle,
      },
    })
      .then(res => Api.post('/api/v1/check_generation', { uuid: res.data }))
      .then(res => setImage(res.data))
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <Flex borderRadius={'20px'} border={'1px solid #454545'} p={'20px'} background={'bg.primary'} flexDir={'column'} gap={'40px'}>
      <Flex flexDir={'column'} gap={'12px'}>
        <ErrorAlert isError={!!error} message={`Не удалось получить изображение: ${error}`} />
        <Input label="Введите промпт" example="Красивая девушка в городе" value={prompt} onChange={onChangePropmpt} />
        <Input label="Введите негативный промпт" example="Чайки" value={negativePrompt} onChange={onChangeNegPropmpt} />
        <Select onChange={e => setSelectedStyle(e.target.value)} variant="flushed" placeholder="Выберите стиль">
          {styles.map(style => (
            <option value={style.name} key={style.name}>
              {style.title}
            </option>
          ))}
        </Select>
      </Flex>
      <Button
        h={'65px'}
        variant={'primary'}
        _hover={{ opacity: '0.9' }}
        borderRadius={'20px'}
        isDisabled={isLoading}
        onClick={generateImage}
      >
        Сгенерировать
      </Button>
    </Flex>
  );
});

{
  /* {image && <Img pos={'absolute'} width={'300'} height={'300'} alt="123" src={`data:image/jpeg;base64, ${image}`}></Img>} */
}
