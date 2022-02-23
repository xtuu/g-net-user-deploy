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
import { ViewIcon, ViewOffIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';


export default function EditUser({props}) {
  const [parroquias, setParroquias] = useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [sectores, setSectores] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [parroquia, setParroquia ] = useState([])

   
  useEffect(() => {

      async function fetchParroquia() {
          try {
              let url =
                  'https://gnetwork.gonavi.dev/sector/?format=json';
              let responseEndpoint = await fetch(url, {
                  method: 'GET',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                  },
              });

              

              let respuesta = await responseEndpoint.json();
              setParroquias(respuesta);
              let sectores = respuesta.find(n => n.parroquia_id == props.parroquia_id);
              console.log(respuesta, 'respuesta')
              setSectores(sectores.data);
              

          } catch (e) {
              // error reading value
          }
      }

      fetchParroquia();
  }, []);

  const { register, handleSubmit, watch, formState } = useForm();


  const handleChange = (event) => {
      setParroquia(event.target.value);
      // eslint-disable-next-line eqeqeq
      let sectores = parroquias.find(n => n.parroquia_id == event.target.value);
      
         setSectores(sectores.data);
         setMostrar(!mostrar);
  };


  const onSubmit = (data) => {
    console.log(data);


  }



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
                bg={useColorModeValue('black', 'black')}
                boxShadow={'lg'}
                p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Nombre y apellido</FormLabel>
                  <Input type="text" defaultValue={props.name} {...register('name' ,{required: true })} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="telf">
                  <FormLabel>Nro de teléfono</FormLabel>
                  <Input type="text" defaultValue={props.telf} {...register('telf' ,{required: true })}/>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Correo</FormLabel>
              <Input type="email" defaultValue={props.email} {...register('email' ,{required: true })}/>
            </FormControl> 
              <FormLabel>Parroquia</FormLabel>
              {parroquias.length > 0 && (
                <Select placeholder='Seleciona' defaultValue={props.parroquia_id} onChange={handleChange}>
                  {
                    parroquias.map(( parroquia )=> 
                      <option key={parroquia.parroquia_id} {...register('parroquia' ,{required: true })} value={parroquia.parroquia_id}>{parroquia.parroquia}</option>
                   )
                  }
                </Select>
              )}
                   {sectores.length > 0 ? (
                  <FormControl>
                    <FormLabel>Sector</FormLabel>
                      <Select placeholder='Seleciona' defaultValue={props.sector_id}>
                        {
                           sectores.map((sitio) =>
                           <option key={sitio.id} value={sitio.id} {...register('sector' ,{required: true })}>{sitio.name}</option>
                          )
                        }
                    </Select>
                  </FormControl>
                  ):<></>}
              
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