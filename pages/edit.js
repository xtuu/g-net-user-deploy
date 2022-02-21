
import { Box } from "@chakra-ui/react";
import EditUser from "../components/edit_form";
import { useRouter } from "next/router";



const EditPage = ( ) => {
  
  const router = useRouter();

  return (
    <Box>
      <EditUser props={router.query}/>
    </Box>
  )
}


export default EditPage;










