import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  IconButton,
  Spacer,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon, ArrowBackIcon } from '@chakra-ui/icons';

export default function EditUser() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex
      align={'center'}
      justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack
          direction={{base: 'row',md:"row"}}
          width={{base:"full",md:'auto'}}
          alignItems='center'
          flexGrow={1}>
            <Link href='/'>
            <IconButton fontSize={28} icon={<ArrowBackIcon/>} backgroundColor='#202023' ></IconButton>
            </Link>

          <Heading fontSize={'4xl'} textAlign={'center'} pl={4}>
            Editar Usuario
          </Heading>

        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('black', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Nombre y apellido</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Nro de teléfono</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Correo</FormLabel>
              <Input type="email" />
            </FormControl> 
            <FormControl id="email" isRequired>
              <FormLabel>Parroquia</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Sector</FormLabel>
              <Input type="email" />
            </FormControl>
            {/* <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl> */}
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Editar
              </Button>
            </Stack>
            {/* <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'}>Login</Link>
              </Text>
            </Stack> */}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}