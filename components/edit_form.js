import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Link,
  IconButton,
  Select
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import {  ArrowBackIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function EditUser({ query }) {


  
console.log(query, ' data del query')

  const { register, handleSubmit, formState } = useForm();


  /**Obtener las parroquias y sectores  */
  const [parroquias, setParroquias] = useState([]);
  const [buscarSector, setBuscarSector] = useState([]);
  /**Defaul value */
  const [defaulValueSector, setDefaulValueSector] = useState([])


  const getParroquiasSectores = async () => {
    const url = `https://gnetwork.gonavi.dev/sector/?format=json`;
    await axios.get(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      setParroquias(response.data)
    }).catch((err) => {
      console.log(err, ' aqui esta el error ')
    })
  }

  /**Funcion de submit para el registro */
  const onSubmit = async (data) => {
    setCargando(true)
    const url = `https://gnetwork.gonavi.dev/user/`
    await axios.put(url, data, {
      headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }).then((res) => {
      console.log('Fue editado con exito')
      setCargando(false)
    }).catch((err) => {
      console.log('oops, hubo un error!')
      setCargando(false)
    })
  }

  useEffect(() => {
    getParroquiasSectores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  const handleChange = (event) => {
    // eslint-disable-next-line eqeqeq
    let sectores = parroquias.find(n => n.parroquia_id == event.target.value);
    setBuscarSector(sectores.data);
  };


  let sectores = parroquias.find(n => n.parroquia_id == query.parroquia_id);
  let sector = sectores
  console.log(sector)


  return (
    <Flex
      align={'center'}
      justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack
          direction={{ base: 'row', md: "row" }}
          width={{ base: "full", md: 'auto' }}
          alignItems='center'
          flexGrow={1}>
          <Link href='/'>
            <IconButton fontSize={28} icon={<ArrowBackIcon />} backgroundColor='#202023' ></IconButton>
          </Link>

          <Heading fontSize={'4xl'} textAlign={'center'} pl={4}>
            Editar Usuario
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('black', 'black')}
          boxShadow={'lg'}
          p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Nombre y apellido</FormLabel>
                    <Input type="text" defaultValue={query.name} {...register('name', { required: true })} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="telf">
                    <FormLabel>Nro de teléfono</FormLabel>
                    <Input type="text" defaultValue={query.telf} {...register('telf', { required: true })} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Correo</FormLabel>
                <Input type="email" defaultValue={query.email} {...register('email', { required: true })} />
              </FormControl>
              <FormLabel>Parroquia</FormLabel>
              {parroquias.length > 0 && (
                <Select placeholder='Seleciona' defaultValue={query.parroquia_id} onChange={handleChange}>
                  {parroquias.map((item) => (
                    <option value={item.parroquia_id} key={item.parroquia_id}>
                      {item.parroquia}
                    </option>
                  ))}
                </Select>
              )}

              <FormControl>
                <FormLabel>Sector</FormLabel>
                <Select placeholder='Seleciona' defaultValue={query.sector_id}>
                  {buscarSector.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </FormControl>


              <Stack spacing={10} pt={2}>
                <Button
                  type='onSubmit'
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
            </Stack>
          </form>

        </Box>
      </Stack>
    </Flex>
  );
}