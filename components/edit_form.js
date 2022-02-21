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

export default function EditUser({props}) {



  const [parroquias, setParroquias] = useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [nombre, setNombre] = useState();
  const [email, setEmail] = useState();
  const [telefono, setTelefono] = useState();
  const [parroquia, setParroquia] = useState();
  const [sector, setSector] = useState();
  const [sectores, setSectores] = useState([]);
  const [cargando, setCargando] = useState(false);

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



  const handleChange = (event) => {
      setParroquia(event.target.value);
      // eslint-disable-next-line eqeqeq
      let sectores = parroquias.find(n => n.parroquia_id == event.target.value);
      
         setSectores(sectores.data);
         setMostrar(!mostrar);
  };

  const handleChange2 = (event) => {
      setSector(event.target.value);
  };

  const handleChange3 = (event) => {
      setNombre(event.target.value);
  };

  const handleChange4 = (event) => {
      setTelefono(event.target.value);
  };

  const handleChange5 = (event) => {
      setEmail(event.target.value);
  };


  // TODO: acomodar el put
  const handleSubmit = (e) => {

    console.log(props.id)

      e.preventDefault();
      setCargando(!cargando);

      fetch(`https://gnetwork.gonavi.dev/user/${props.id}`, {
          method: 'PUT',
          body: JSON.stringify({
              name: nombre,
              email: email,
              phone: telefono,
              parroquia: parseInt(parroquia),
              sector: parseInt(sector),
          }),
          supportHeaderParams: true,
          headers: { "Content-Type": "application/json; charset=UTF-8" },
      })
          .then(res => res.json())
          .then(res => {

              if (res.message === 'Ok') {
                  alert('Gracias por regístarse, pronto recibirá un mensaje de texto.');
              } else {
                  if (res.phone) {
                      alert('El número de telefono ya esta registrado.')
                  } else {
                      if (res.name) {
                          alert('El nombre no puede estar en blanco.')
                      } else {
                          alert('Ha ocurrido un error, intente más tarde.')
                      }
                  }

              }
              setCargando(false);
          }).catch(function (error) {                        // catch
              console.log('Request failed', error);
              setCargando(false);
          });


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
          <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Nombre y apellido</FormLabel>
                  <Input type="text" defaultValue={props.name}  onChange={handleChange3}

                                    value={nombre}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Nro de teléfono</FormLabel>
                  <Input type="text" defaultValue={props.telf}  onChange={handleChange5}
                                    value={email}/>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Correo</FormLabel>
              <Input type="email" defaultValue={props.email}
                                    value={telefono}
                                    onChange={handleChange4}/>
            </FormControl> 
              <FormLabel>Parroquia</FormLabel>
              {parroquias.length > 0 && (
                <Select placeholder='Seleciona' defaultValue={props.parroquia_id} onChange={handleChange} >
                  {
                    parroquias.map(( parroquia )=> 
                      <option key={parroquia.parroquia_id} value={parroquia.parroquia_id}>{parroquia.parroquia}</option>
                   )
                  }
                </Select>
              )}
                   {sectores.length > 0 ? (
                  <FormControl>
                    <FormLabel>Sector</FormLabel>
                      <Select placeholder='Seleciona' defaultValue={props.sector_id} onChange={handleChange2}>
                        {
                           sectores.map((sitio) =>
                           <option key={sitio.id} value={sitio.id} >{sitio.name}</option>
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