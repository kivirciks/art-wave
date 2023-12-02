import { FileForm } from '@/widgets/file-form';
import { PromptForm } from '@/widgets/prompt-form';
import { Box, Flex, Heading, Text, Container } from '@chakra-ui/react';

export default function Home() {
  return (
    <Container alignItems={'center'} justifyContent={'center'} display={'flex'} flexDir={'column'}>
      <Box alignItems={'center'} justifyContent={'center'} m={'50px 0'} display={'flex'} flexDir={'column'} gap={'10px'}>
        <Heading fontSize={'22px'} fontWeight={'600'}>
          Введите промпт и сгенерируйте изображение или загрузите картинку
        </Heading>
        <Box flexDir={'column'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Text fontSize={'18px'} fontWeight={'400'} width={'641px'}>
            Бесплатно удаляйте фон или любые ненужные элементы с изображений.
          </Text>
          <Text align={'center'} fontSize={'18px'} fontWeight={'400'} width={'641px'}>
            Сохраняйте изображение, увеличив его в{' '}
            <Box as="span" color={'primary.green'}>
              4
            </Box>
            ,{' '}
            <Box as="span" color={'primary.green'}>
              16{' '}
            </Box>
            или{' '}
            <Box as="span" color={'primary.green'}>
              64
            </Box>{' '}
            раза.
          </Text>
        </Box>
      </Box>
      <Flex gap={'20px'}>
        <PromptForm />
        <FileForm />
      </Flex>
    </Container>
  );
}
