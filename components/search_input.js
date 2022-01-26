import { Container, Box, Input, InputGroup, InputRightAddon, Stack, Button, Link } from "@chakra-ui/react";
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";



const ListItem = ({  name,telf, parroquia, sector  }) => {
  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' mt={4}> 
      <Stack
        direction={{base: 'row',md:"row"}}
        width={{base:"full",md:'auto'}}
        alignItems='center'
        flexGrow={1}
      >
      <Box
      ml={4}
      mt='1'
      fontWeight='semibold'
      as='h3'
      lineHeight='tight'
      isTruncated>
        {name}
      </Box>
      <Box
        paddingRight={4}
        ml={4}
        flex={1}
        align="right"
        mt='1'
        fontWeight='semibold'
        as='h3'
        lineHeight='tight'
        isTruncated>
        {telf}
      </Box>


      </Stack>
      <Box
        ml={4}
        color='gray.500'
        fontWeight='semibold'
        // letterSpacing='normal'
        fontSize='xs'>
        {` ${ parroquia } - ${ sector } `}
      </Box>
    </Box>
  )

}


const SearchContainer = (props) => {


  const [total, setTotal] = useState([]);
  const [user, setUser] = useState([]);
  const [query, setQuery] = useState('');

  const getTotalUserData = async () => {
  
    const _url = 'https://gnetwork.gonavi.dev/user/';

    await axios.get(_url).then((value)=>{
  
      setUser(value.data.results)
      setTotal(value.data)
    })
  }

  const getSearchUser =  () => {
    
    
    setTimeout(async ()  => {
      console.log('hola')
      let _url = `https://gnetwork.gonavi.dev/user?search=${query}`;
      
        await axios.get(_url).then( (value) => { 
  
          setUser(value.data.results)
          setTotal(value.data)
    
        })      
    }, 500);


  }
  
  useEffect(() => {
    getTotalUserData()
  },[]);

  useEffect(() => {
    getSearchUser()
  },[query]);

  
  return (
  
    <Container >
      <InputGroup>
      <Input id="input" placeholder="Buscar Cliente" onChange={ (query) => {setQuery(query.target.value)}}/>
      <InputRightAddon children={`Total ${ total.count == null ? '0': total.count } `}/>
      </InputGroup>
      { user.map((item, key ) => (

        <ListItem key={key} name={item.name} parroquia={item.parroquia} sector={item.sector} telf={item.phone}/>

      )) }
      <Link href="/">
        <Button margin={4} colorScheme='red'> Buscar </Button>
      </Link>
    </Container>
  )
}



export default SearchContainer;


