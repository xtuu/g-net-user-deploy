import { Box } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box align="center" opacity={0.4} fontSize="sm" pt={14} pb={4}>
      &copy; {new Date().getFullYear()} G-Network. Todos los Derechos reservados.
    </Box>
  )
}

export default Footer
