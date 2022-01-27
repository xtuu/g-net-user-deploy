import { Box, Container } from '@chakra-ui/react';
import Head from 'next/head';
import Footer from '../footer';


const Main = ({children}) => {

  return ( 
    <Box as='main' >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>G Network</title>
      </Head>
      <Container maxW='container.md' pt={14}  >
        {children}
        <Footer/>
      </Container>
    </Box>

  )

}

export default Main;