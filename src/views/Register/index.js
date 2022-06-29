/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../initializers/firebase'
import { useRouter } from 'next/router'
import {
  Flex,
  Heading,
  Input,
  Button,
  useColorMode,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
  Box
} from '@chakra-ui/react'
import { useAppContext } from '../../contexts/AppContext'

export default function Login() {
  const [ loading, setLoading ] = useState(false)
  const [ formErrors, setFormErrors ] = useState({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    passwordConfirm: undefined
  })

  const { user, authLoaded } = useAppContext()

  const router = useRouter()

  const { toggleColorMode } = useColorMode()
  const formBackground = useColorModeValue("gray.100", "gray.700")

  useEffect(()=> {
    if(authLoaded && user){
      router.push('/dashboard')
    }
  },[authLoaded, user])

  const handleRegister = async(event)=> {
    try {
      setLoading(true)
      event.preventDefault()
    
      //Transform the target into an object
      const form = {}
      for(const input of event.target){
        form[input.id] = input.value
      }

      console.log('Event: ', form)
      //Form validation: maybe there's a cleaner way to validate the fields
      const newErrors = {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
        passwordConfirm: undefined
      }
      if(!form.firstName) {
        newErrors.firstName = 'First name is required'
      }
      if(!form.lastName) {
        newErrors.lastName = 'Last name is required'
      }
      if(!form.email){
        newErrors.email = 'Email is required'
      }
      if(form.password?.length < 6){
        newErrors.password = 'Password must be at least 6 characters'
      }
      if(form.password !== form.passwordConfirm) {
        newErrors.passwordConfirm = `Passwords don't match`
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
      await createUserWithEmailAndPassword(auth, form.email, form.password)
      updateProfile(auth.currentUser, {
        displayName: `${form.firstName} ${form.lastName}`,
      })

    }
    catch(error){
      console.error(error)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" mb = {'10vh'}>
      <Box borderRadius='lg' boxShadow={'0px 0px 8px rgba(0,0,0,0.1)'}>
        <Flex direction="column" background="formBackground" p={12} rounded={6} w={'600px'}>
          <Heading mb={6}>Register</Heading>
          <form onSubmit={handleRegister}>
            <FormControl isRequired isInvalid = {formErrors.firstName}>
              <Input id = {'firstName'} placeholder="First Name" varient="filled" type="text" />
              {
                formErrors.firstName &&
                  <FormErrorMessage>{formErrors.firstName}</FormErrorMessage>
              }
            </FormControl>
            <FormControl isRequired isInvalid = {formErrors.lastName}>
              <Input id = {'lastName'} placeholder="Last Name" varient="filled" mt={3} type="text" />
              {
                formErrors.lastName &&
                  <FormErrorMessage>{formErrors.lastName}</FormErrorMessage>
              }
            </FormControl>
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
            <FormControl isRequired isInvalid = {formErrors.passwordConfirm}>
              <Input id = {'passwordConfirm'} placeholder="Confirm Password" varient="filled" mt={3}type="password" />
              {
                formErrors.passwordConfirm &&
                  <FormErrorMessage>{formErrors.passwordConfirm}</FormErrorMessage>
              }
            </FormControl>
            <Button isLoading = {loading} type='submit' mb={6} mt = {9} w={'100%'} colorScheme="teal">Log In</Button>
          </form>
          <Button onClick={toggleColorMode}>Toggle Color Mode</Button>
          <Flex align={'center'} justify = {'center'} mt = {9}>
            <p>{`Have an account? `}<b onClick = {()=> router.push('/login')}>Log In instead</b></p>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}
