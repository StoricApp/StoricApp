import React from 'react'
import {
  Flex,
  Heading,
  Input,
  Button,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react'

export default function Login() {

  const { toggleColorMode } = useColorMode()
  const formBackground = useColorModeValue("gray.100", "gray.700")

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="formBackground" p={12} rounded={6} w={'30vw'} maxW = {'600px'}>
        <Heading mb={6}>Register</Heading>
        <Input placeholder="First Name" varient="filled" mb={3} type="text" />
        <Input placeholder="Last Name" varient="filled" mb={3} type="text" />
        <Input placeholder="art@storic.app" varient="filled" mb={3} type="email" />
        <Input placeholder="Password" varient="filled" mb={6}type="password" />
        <Input placeholder="Confirm Password" varient="filled" mb={6}type="password" />
        <Button mb={6} colorScheme="teal">Log In</Button>
        <Button onClick={toggleColorMode}>Toggle Color Mode</Button>
      </Flex>
    </Flex>
  )
}
