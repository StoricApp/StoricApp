/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../initializers/firebase'
import { useRouter } from 'next/router'
import {
  Flex,
  Heading,
  Input,
  Button,
  useColorMode,
  useColorModeValue,
  Box,
  FormControl,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react'
import { useAppContext } from '../../contexts/AppContext'


export default function Login() {
  const [ loading, setLoading ] = useState(false)
  const [ formErrors, setFormErrors ] = useState({
    email: undefined,
    password: undefined
  })

  const { authLoaded, user } = useAppContext()

  const router = useRouter()
  const toast = useToast({
    position: 'top'
  })

  const { toggleColorMode } = useColorMode()
  const formBackground = useColorModeValue("gray.100", "gray.700")

  useEffect(()=> {
    if(authLoaded && user){
      router.push('/dashboard')
    }
  },[authLoaded, user])

  const handleLogin = async(event)=> {
    try {
      setLoading(true)
      event.preventDefault()
    
      //Transform the target into an object
      const form = {}
      for(const input of event.target){
        form[input.id] = input.value
      }
      //Form validation: maybe there's a cleaner way to validate the fields
      const newErrors = {
        email: undefined,
        password: undefined,
      }
      if(!form.email){
        newErrors.email = 'Email is required'
      }
      if(form.password?.length < 6){
        newErrors.password = 'Password must be at least 6 characters'
      }
      
      setFormErrors(newErrors)
      const valid = true
      for(const [key, value] of Object.entries(newErrors)){
        if(value){
          valid = false
        }
      }
      if(!valid){
        return 
      }

      //Now we know that the fields are valid, we can proceed to create the user
      await signInWithEmailAndPassword(auth, form.email, form.password)
    }
    catch(error){
      console.error(error)
      toast({
        title: 'Error with log in',
        description: error?.message,
        status: 'error',
        isClosable: true,
        duration: 3000
      })

    }
    finally {
      setLoading(false)
    }
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box borderRadius='lg' boxShadow={'0px 0px 8px rgba(0,0,0,0.1)'}>
        <Flex direction="column" background="formBackground" p={12} rounded={6}  w={'600px'} >
          <Heading mb={6}>Log In</Heading>
          <form onSubmit = {handleLogin}>
            <FormControl isRequired isInvalid = {formErrors.email}>
                <Input id = {'email'} placeholder="art@storic.app" varient="filled" mt={3} type="email" />
                {
                  formErrors.email &&
                    <FormErrorMessage>{formErrors.email}</FormErrorMessage>
                }
              </FormControl>
              <FormControl isRequired isInvalid = {formErrors.password}>
                <Input id = {'password'} placeholder="Password" varient="filled" mt={3}type="password" />
                {
                  formErrors.password &&
                    <FormErrorMessage>{formErrors.password}</FormErrorMessage>
                }
              </FormControl>
            <Button isLoading = {loading} w={'100%'} mt={9} mb = {6} type = 'submit' colorScheme="teal">Log In</Button>
          </form>
          <Button onClick={toggleColorMode} w={'100%'}>Toggle Color Mode</Button>
          <Flex align={'center'} justify = {'center'} mt = {9}>
            <p>{`Don't have an account? `}<b onClick = {()=> router.push('/register')}>Register instead</b></p>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}
