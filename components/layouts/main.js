import { Box, Container } from '@chakra-ui/react';
import Head from 'next/head';


const Main = ({children, router}) => {

  return ( 
    <Box as='main' >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>G Network</title>
      </Head>
      <Container maxW='container.md' pt={14}  >
        {children}
      </Container>
    </Box>

  )

}

export default Main;