import { Box, Container, Image,Button, Link } from "@chakra-ui/react";
import SearchContainer from "../components/search_input";


const IndexPage = ( ) => {
  return (
    <Container>
      <Box >
        <Image src="./images/logo.png" p={8}/>
        <Box display={{ md:'flex' }} >
          <SearchContainer/>
        </Box>
      </Box>
    </Container>

  )

}

export default IndexPage;