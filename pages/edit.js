
import { Box } from "@chakra-ui/react";
import EditUser from "../components/edit_form";
import { useRouter } from "next/router";




const EditPage = () => {

  const { query } = useRouter();

  return (
    <Box>
      <EditUser query={query} />
    </Box>
  )
}


export default EditPage;










